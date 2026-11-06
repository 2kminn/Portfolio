# 개발자 포트폴리오

공책과 CLI를 모티브로 만든 이경민의 개발자 포트폴리오입니다.

## 실행

Node.js 22.13 이상을 사용합니다.

```sh
npm ci
npm run dev
```

## 확인

```sh
npm run build
npx tsc --noEmit
npm run lint
```

## 내용 수정

- 프로필 및 이력서 경로: `data/profile.ts`
- 기술 스택, 경험 및 자격: `data/home.ts`
- 공개 프로젝트: `data/projects.ts`
- 다운로드용 이력서: `public/resume.pdf`

이력서 PDF는 현재 포트폴리오 정보로 작성한 초안입니다. 내용을 수정할 때는 PDF도 갱신합니다. 첫 화면의 다운로드 버튼을 누르면 `이경민_이력서.pdf`로 저장됩니다.

`/projects/mockup`은 가상의 서비스 '모아'로 구성한 상세 페이지 디자인 예시입니다.

## 주요 구성

- React, TypeScript, Vinext 및 Tailwind CSS
- 섹션 재진입 시 반복되는 명령어 입력 애니메이션
- 애니메이션 켜기·끄기 설정 저장
- 공책 페이지와 곡면 포스트잇 스타일의 기술 스택
- 이력서 PDF 다운로드

환경 변수는 `.env.example`을 참고해 로컬에 설정하며, 실제 환경 설정 파일과 빌드 결과물은 Git에서 제외합니다.
