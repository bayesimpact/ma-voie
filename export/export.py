import glob
import os
from os import path
import shutil
import stat
import sys

import pathspec

_DRY_RUN = os.getenv('DRY_RUN')


class GitIgnoreMatcher(object):

    def __init__(self, source):
        files = glob.glob(path.join(source, '**/.gitignore'), recursive=True)
        self._specs = {}
        for gitignore_filename in files:
            with open(gitignore_filename, 'r') as gitignore_file:
                self._specs[path.relpath(path.dirname(gitignore_filename), start=source)] = \
                    pathspec.PathSpec.from_lines('gitignore', gitignore_file)

    def match_file(self, filename):
        if filename.startswith('.git/'):
            return True
        for start, spec in self._specs.items():
            relative_filename = path.relpath(filename, start=start)
            if not relative_filename.startswith('../') and spec.match_file(relative_filename):
                return True
        return False


def _iter_git_tree(root):
    """Walk the specified directory for all files and links."""

    for f in _iter_git_tree_next(os.path.abspath(root), ''):
        yield f


def _iter_git_tree_next(root_full, dir_rel):
    """Scan the directory for all files and links."""

    dir_full = path.join(root_full, dir_rel)
    for node in os.listdir(dir_full):
        node_rel = os.path.join(dir_rel, node)
        node_full = os.path.join(root_full, node_rel)
        node_stat = os.lstat(node_full)

        if stat.S_ISREG(node_stat.st_mode) or stat.S_ISLNK(node_stat.st_mode):
            yield node_rel
        elif stat.S_ISDIR(node_stat.st_mode):
            for file_rel in _iter_git_tree_next(root_full, node_rel):
                yield file_rel


def export_source(source, destination, whitelist_file, blacklist_file):
    """Export whitelisted files to destination."""

    spec_all_files = pathspec.PathSpec.from_lines('gitignore', ['*'])
    unexported_files = set(f for f in _iter_git_tree(source) if spec_all_files.match_file(f))

    ignored_files = GitIgnoreMatcher(source)

    with open(path.join(source, whitelist_file), 'r') as whitelist_file:
        whitelist_spec = pathspec.PathSpec.from_lines('gitignore', whitelist_file)

    with open(path.join(source, blacklist_file), 'r') as blacklist_file:
        blacklist_spec = pathspec.PathSpec.from_lines('gitignore', blacklist_file)

    for source_file in _iter_git_tree(source):
        if ignored_files.match_file(source_file):
            continue

        if not whitelist_spec.match_file(source_file):
            if blacklist_spec.match_file(source_file):
                unexported_files.remove(source_file)
            continue

        if blacklist_spec.match_file(source_file):
            raise ValueError(f'{source_file} matches both white list and black list.')
        unexported_files.remove(source_file)
        if _DRY_RUN:
            continue

        destination_file = path.join(destination, source_file)
        os.makedirs(path.dirname(destination_file), exist_ok=True)
        try:
            shutil.copy2(path.join(source, source_file), destination_file, follow_symlinks=False)
        except FileExistsError:
            pass

    # TODO(pascal): Nicer print, grouping unexported folders for instance.
    print('Unexported files:\n%s' % '\n'.join(sorted(
        f for f in unexported_files
        if not ignored_files.match_file(f))))


if __name__ == '__main__':
    export_source('/src/', '/dst', sys.argv[1], sys.argv[2])
