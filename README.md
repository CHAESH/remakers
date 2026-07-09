# remakers (랜딩)

리메이커스 스모크테스트 랜딩페이지 — **remakers.kr**

- **성격**: 정적 HTML 단일 파일(빌드 없음). 마케팅 + 사전신청 수집(스모크테스트).
- **최종 제품 앱**(리메이커스 서비스 — 매일 인증·버디)은 **별도 repo**(`remakers-app`, 1기 검증 후 시작).
- 카피·VoC 등 개발 **근거 문서**는 개인 볼트에 있음: `CHAE/outputs/2026-07/모두의창업/`

## 로컬 미리보기

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## 배포 (Netlify)

- Netlify가 이 repo `main` 브랜치를 연동 → **`git push` 하면 자동배포**.
- Publish directory: 리포 루트(`.`), 빌드 명령 없음 (`netlify.toml` 참고).
- 신청 폼: **Netlify Forms** (`data-netlify="true"`).

## 측정 (예정 — Phase 2)

- PostHog 퍼널 이벤트: 히어로뷰 → 퀴즈시작 → 퀴즈완료 → 신청.
- 유입원 태깅: `remakers.kr?src=...`
