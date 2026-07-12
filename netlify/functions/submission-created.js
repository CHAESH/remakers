// Netlify가 폼 제출(검증 완료) 시 자동 호출하는 특수 함수.
// 개인 슬랙 #리메이커스 알림용 채널로 Incoming Webhook 발송.
// 웹훅 URL은 Netlify 환경변수 SLACK_WEBHOOK_URL — 코드엔 비밀값 없음. 채널은 웹훅에 고정(다른 채널로 샐 수 없음).
exports.handler = async (event) => {
  try {
    const webhook = process.env.SLACK_WEBHOOK_URL;
    if (!webhook) {
      console.log('SLACK_WEBHOOK_URL 미설정 — 알림 건너뜀');
      return { statusCode: 200, body: 'no webhook' };
    }

    const payload = (JSON.parse(event.body || '{}').payload) || {};
    const d = payload.data || {};
    const contact = d['연락처'] || '(연락처 없음)';
    const type = d['유형'] || '-';
    const want = d['하고싶은거'] || '-';
    const src = d['유입채널'] || '-';

    const text =
      '🫧 *리메이커스 1기 새 신청!*\n' +
      '• 연락처: *' + contact + '*\n' +
      '• 유형: ' + type + ' · 하고싶은거: ' + want + '\n' +
      '• 유입채널: ' + src + '\n' +
      '→ 이 연락처로 입금 확인/확정 메시지 보내주세요';

    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text }),
    });
    const bodyTxt = (await res.text()).trim();
    const ok = res.ok && bodyTxt === 'ok';
    if (!ok) console.log('Slack 웹훅 응답 이상:', res.status, bodyTxt);
    return { statusCode: 200, body: ok ? 'sent' : ('fail:' + res.status + ':' + bodyTxt.slice(0, 40)) };
  } catch (e) {
    console.log('함수 오류:', e && e.message);
    return { statusCode: 200, body: 'error handled' };
  }
};
