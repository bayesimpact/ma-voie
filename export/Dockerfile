FROM python:3

ARG UID

RUN pip install PyGithub PyYAML pathspec ;\
  adduser user -uid $UID --no-create-home --disabled-password;\
  mkdir /src/ && mkdir /dst/ ;\
  chown user:user /src/ /dst/
