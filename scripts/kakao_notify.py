"""카카오톡 '나에게 보내기'로 텍스트 메시지를 전송한다.

leoleo0813/blog-automation의 blog_automation/kakao_notify.py와 동일한 방식이며,
같은 카카오 개발자 앱의 KAKAO_REST_API_KEY / KAKAO_REFRESH_TOKEN을 그대로 재사용한다.

사용법:
    python scripts/kakao_notify.py "메시지 본문" "https://example.com/link"
    (link_url은 생략 가능)

환경변수(GitHub Actions secrets 또는 로컬 .env):
    KAKAO_REST_API_KEY
    KAKAO_REFRESH_TOKEN
"""
import json
import os
import sys

import requests
from dotenv import load_dotenv

load_dotenv()

REST_API_KEY_ENV = 'KAKAO_REST_API_KEY'
REFRESH_TOKEN_ENV = 'KAKAO_REFRESH_TOKEN'
TOKEN_URL = 'https://kauth.kakao.com/oauth/token'
SEND_URL = 'https://kapi.kakao.com/v2/api/talk/memo/default/send'


def _get_access_token():
    resp = requests.post(TOKEN_URL, data={
        'grant_type': 'refresh_token',
        'client_id': os.environ[REST_API_KEY_ENV],
        'refresh_token': os.environ[REFRESH_TOKEN_ENV],
    })
    resp.raise_for_status()
    return resp.json()['access_token']


def send_kakao_message(text, link_url=''):
    access_token = _get_access_token()
    template_object = {
        'object_type': 'text',
        'text': text,
        'link': {'web_url': link_url, 'mobile_web_url': link_url},
    }
    resp = requests.post(
        SEND_URL,
        headers={'Authorization': f'Bearer {access_token}'},
        data={'template_object': json.dumps(template_object, ensure_ascii=False)},
    )
    resp.raise_for_status()
    print("카카오톡 알림 전송 완료!")
    return resp.json()


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("사용법: python scripts/kakao_notify.py \"메시지\" [\"링크 URL\"]")
        sys.exit(1)
    message = sys.argv[1]
    link = sys.argv[2] if len(sys.argv) > 2 else ''
    send_kakao_message(message, link)
