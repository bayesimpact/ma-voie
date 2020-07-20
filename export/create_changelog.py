"""Script to create a changelog file from all release notes."""

import os
import re
import sys

import github
import yaml


def _extract_repo_from_url(git_url: str) -> str:
    """Extracts the qualified repo name from a GitHub SSH URL.

    Args:
        git_url: a GitHub SSH URL, e.g. git@github.com:bayesimpact/bob-emploi.git.
    Returns:
        The qualified repo name, e.g. bayesimpact/bob-emploi.
    """

    return re.sub(r'^git@github.com:(.*)\.git', r'\1', git_url)


_REPO = _extract_repo_from_url(os.getenv('GIT_REMOTE_URL'))


def auth_token_from_hub_config(config_filename: str = '/home/user/.config/hub') -> str:
    """Retrieves the GitHub auth token from the hub CLI tool's config."""

    with open(config_filename, 'r') as config_file:
        config = yaml.safe_load(config_file)
    return config['github.com'][0]['oauth_token']


def main(output) -> None:
    """Computes a Changelog file from GitHub release history."""

    client = github.Github(auth_token_from_hub_config())
    repos = client.get_repo(_REPO)
    output.write(
        'This is a detailed changelog of past product releases. For a high level non-technical '
        'view of the project history, see [HISTORY.md](HISTORY.md).\n\n',
    )
    first = True
    for release in repos.get_releases():
        if release.draft:
            continue
        if not first:
            output.write('\n')
        first = False
        output.write('# %s\n\n' % release.title)
        output.write(release.body.replace('\r\n', '\n').strip())
        output.write('\n')


if __name__ == '__main__':
    main(sys.stdout)
