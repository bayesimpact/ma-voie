"""A script to generate a password for each internal partner."""

import json
from os import path
import random
import string
from typing import Dict, Iterable

_PARTNERS_FILE = path.join(
    path.dirname(path.realpath(__file__)), '../src/store/partners.json')
_ALLOWED_CHARS = string.ascii_letters + string.digits


def _get_random_string(length: int) -> str:
    return ''.join(random.choice(_ALLOWED_CHARS) for i in range(length))


def _get_inter_partner_ids() -> Iterable[str]:
    with open(_PARTNERS_FILE) as file:
        all_partners = json.load(file)
    return (partner['partnerId'] for partner in all_partners if partner.get('isInternal'))


def _create_partner_passwords(length: int) -> Dict[str, str]:
    return ' '.join(
        f'basicauth.{partner}={_get_random_string(length)}'
        for partner in _get_inter_partner_ids())


if __name__ == '__main__':
    print(_create_partner_passwords(12))
