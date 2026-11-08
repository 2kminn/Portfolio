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

- 프로필: `data/profile.ts`
- 기술 스택, 경험 및 자격: `data/home.ts`
- 공개 프로젝트: `data/projects.ts`

`/projects/mockup`은 가상의 서비스 '모아'로 구성한 상세 페이지 디자인 예시입니다.

## 주요 구성

- React, TypeScript, Vinext 및 Tailwind CSS
- 섹션 재진입 시 반복되는 명령어 입력 애니메이션
- 애니메이션 켜기·끄기 설정 저장
- 공책 페이지와 곡면 포스트잇 스타일의 기술 스택

환경 변수는 `.env.example`을 참고해 로컬에 설정하며, 실제 환경 설정 파일과 빌드 결과물은 Git에서 제외합니다.
