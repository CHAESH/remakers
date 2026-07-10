// Netlify가 폼 제출(검증 완료) 시 자동 호출하는 특수 함수.
// 하루봇 봇토큰으로 #하루 채널에 신청 알림 발송. (토큰·채널ID는 Netlify 환경변수 — 코드엔 비밀값 없음)
exports.handler = async (event) => {
  try {
    const token = process.env.SLACK_BOT_TOKEN;
    const channel = process.env.SLACK_CHANNEL_ID;
    if (!token || !channel) {
      console.log('SLACK env 미설정 — 알림 건너뜀');
      return { statusCode: 200, body: 'no slack env' };
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

    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({ channel: channel, text: text, unfurl_links: false }),
    });
    const j = await res.json();
    if (!j.ok) console.log('Slack 발송 실패:', j.error);
    return { statusCode: 200, body: j.ok ? 'sent' : ('slack error: ' + j.error) };
  } catch (e) {
    console.log('함수 오류:', e && e.message);
    return { statusCode: 200, body: 'error handled' };
  }
};
