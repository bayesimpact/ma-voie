# Export to Open Source

This folder helps you easily export our internal repo
(https://github.com/bayesimpact/cas-contact-internal) to the Open Source one
(https://github.com/bayesimpact/briser-la-chaine).

We do not copy all files as we prefer to keep some parts to ourselves, at least
for now so the export process will copy most of the files and create a git
commit with the modifications in a local clone of the Open Source repo. Then
you just need to send the diff for review and push it with the usual process.

While exporting, the script will also generate a changelog pulled from the
notes from every Git release in the internal repo.

## Setup

This setup is only needed the first time:

* Clone the internal repo on your computer if it's not done yet (usually in ~/cas-contact-internal).
* Clone the Open Source repo on your computer.
* Make sure that you have GitHub credentials in ~/.config/hub (usually the case if you've installed the developer tools).

## Export

To launch the script, go to the root of the internal repo on your computer and run:

```
export/export_for_open_source.sh /path/to/open-source/briser-la-chaine
```

The argument is the path to the Open Source repo on your computer. By default
it uses `../briser-la-chaine` which works perfectly if you have cloned both repo next
to each other with the default names.

The next step is to go to the Open Source repo and send the created commit for review:

```
pushd /path/to/open-source/briser-la-chaine
git review pcorpet
popd
```

## Configuration

The files to copy are listed in [whitelist.txt](whitelist.txt), using the
.gitignore syntax to select files. By the way, note that git-ignored files are
ignored during the export as well.

There is also a list of files that are only in the Open Source repo. They are
listed in [only-in-open-source](only-in-open-source).

Finally few files are modified or created during the export:
* `CHANGELOG.md` (see [create_changelog.py](create_changelog.py))
