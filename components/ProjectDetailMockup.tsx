"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronDown, ChevronLeft, ChevronRight, Database, LayoutDashboard, ListTodo, MoreHorizontal, Plus, Search, Sun } from "lucide-react";
import styles from "./ProjectDetailMockup.module.css";

const screens = [
  { id: "today", label: "오늘의 할 일", caption: "복잡한 메뉴를 거치지 않고 오늘 해야 할 일을 바로 확인합니다." },
  { id: "board", label: "프로젝트 보드", caption: "할 일의 진행 상태를 보드로 나누어 프로젝트의 흐름을 확인합니다." },
  { id: "calendar", label: "일정 캘린더", caption: "날짜별로 흩어진 일정을 한눈에 보고 작업의 우선순위를 정합니다." },
] as const;

type Screen = (typeof screens)[number]["id"];

const tasks = [
  { title: "포트폴리오 화면 정리하기", category: "개인 작업", done: true },
  { title: "로그인 API 연결하기", category: "모아 프로젝트", done: true },
  { title: "이번 주 회고 작성하기", category: "기록", done: false },
  { title: "반응형 레이아웃 점검", category: "모아 프로젝트", done: false },
];

function TaskRows({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.phoneTasks : styles.taskRows}>
      {tasks.slice(0, compact ? 3 : 4).map((task) => (
        <div className={styles.taskRow} key={task.title}>
          <span className={task.done ? styles.checked : styles.unchecked}>{task.done && <Check size={11} strokeWidth={2.5} />}</span>
          <span className={task.done ? styles.taskDone : ""}>{task.title}</span>
          {!compact && <small>{task.category}</small>}
        </div>
      ))}
    </div>
  );
}

function ProductScreen({ screen }: { screen: Screen }) {
  return (
    <div className={styles.browser} aria-hidden="true">
      <div className={styles.browserChrome}>
        <span className={styles.windowDots}><i /><i /><i /></span>
        <span className={styles.address}>moa.app / workspace</span>
        <MoreHorizontal size={15} />
      </div>
      <div className={styles.appShell}>
        <aside className={styles.appSidebar}>
          <div className={styles.appLogo}>m<span>oa.</span></div>
          <p>나의 작업 공간</p>
          <div className={screen === "today" ? styles.selectedMenu : ""}><LayoutDashboard size={14} /> 오늘의 할 일</div>
          <div className={screen === "board" ? styles.selectedMenu : ""}><ListTodo size={14} /> 프로젝트</div>
          <div className={screen === "calendar" ? styles.selectedMenu : ""}><CalendarDays size={14} /> 캘린더</div>
          <p className={styles.sidebarLabel}>내 프로젝트 <Plus size={12} /></p>
          <span className={styles.projectDot}>모아 프로젝트</span>
          <span className={styles.projectDot}>개인 작업</span>
          <div className={styles.appUser}><span>민</span><strong>민의 워크스페이스<small>Personal workspace</small></strong></div>
        </aside>
        <div className={styles.appMain}>
          <div className={styles.appTopline}><span>내 작업 공간 / {screens.find((item) => item.id === screen)?.label}</span><Search size={14} /></div>
          {screen === "today" && <>
            <div className={styles.appHeading}><div><p>5월 24일 금요일</p><h3>작은 완료가 쌓이는 하루 <Sun size={20} /></h3></div><span className={styles.addTask}><Plus size={12} /> 할 일 추가</span></div>
            <div className={styles.appStats}><div><span>오늘의 할 일</span><strong>06<small>개</small></strong></div><div><span>완료한 일</span><strong>02<small>개</small></strong></div><div><span>진행 중인 프로젝트</span><strong>01<small>개</small></strong></div></div>
            <div className={styles.taskHeading}><strong>오늘 집중할 일</strong><span>전체 보기 <ChevronRight size={12} /></span></div>
            <TaskRows />
            <div className={styles.progressNote}><span>차근차근, 잘하고 있어요.</span><div><i /></div><small>오늘의 목표 2 / 6</small></div>
          </>}
          {screen === "board" && <>
            <div className={styles.appHeading}><div><p>내 프로젝트</p><h3>모아 프로젝트</h3></div><span className={styles.addTask}><Plus size={12} /> 할 일 추가</span></div>
            <div className={styles.board}>
              {[{ name: "할 일", items: ["마이페이지 화면 구성", "사용자 피드백 정리"] }, { name: "진행 중", items: ["반응형 레이아웃 점검", "로그인 API 연결"] }, { name: "완료", items: ["프로젝트 구조 설계", "기본 컴포넌트 구현"] }].map((column, index) => <div key={column.name} className={styles.boardColumn}><h4><i />{column.name}<span>2</span></h4>{column.items.map((item) => <div className={styles.boardCard} key={item}><small>{index === 2 ? "완료된 작업" : "모아 프로젝트"}</small><strong>{item}</strong><span>5월 {24 + index}일 <span>민</span></span></div>)}</div>)}
            </div>
          </>}
          {screen === "calendar" && <>
            <div className={styles.appHeading}><div><p>이번 달의 흐름</p><h3>2026년 5월</h3></div><span className={styles.calendarArrows}><ChevronLeft size={16} /><ChevronRight size={16} /></span></div>
            <div className={styles.calendar}>
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => <strong key={day}>{day}</strong>)}
              {Array.from({ length: 35 }, (_, index) => <div key={index}><span className={index === 25 ? styles.todayDate : ""}>{index < 4 ? 27 + index : index > 34 ? index - 34 : index - 3}</span>{[8, 12, 16, 25, 29].includes(index) && <small>{index === 25 ? "화면 점검" : index === 16 ? "팀 회의" : "프로젝트 작업"}</small>}</div>)}
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}

function PhonePreview() {
  return <div className={styles.phone} aria-hidden="true">
    <div className={styles.phoneStatus}><span>9:41</span><i /></div>
    <div className={styles.phoneContent}><div className={styles.phoneLogo}>moa.</div><p>오늘도, 가볍게 시작해요.</p><h4>나의 하루</h4><div className={styles.phoneProgress}><span>오늘의 작은 완료</span><strong>2 <small>/ 6</small></strong><div><i /></div></div><h5>오늘의 할 일</h5><TaskRows compact /><div className={styles.phoneAdd}><Plus size={15} /></div></div>
    <div className={styles.phoneHome} />
  </div>;
}

export default function ProjectDetailMockup() {
  const [activeScreen, setActiveScreen] = useState<Screen>("today");
  const active = screens.find((screen) => screen.id === activeScreen)!;

  return (
    <main id="project-mockup-top" className={styles.desk}>
      <div className={styles.topbar}><Link href="/#projects"><ArrowLeft size={16} /> 프로젝트 목록</Link><span>상세 페이지 목업</span></div>
      <article className={styles.paper}>
        <header className={styles.hero}>
          <p className={styles.command}><span>visitor@portfolio</span> ~ % open ./projects/moa</p>
          <div className={styles.titleRow}>
            <div><span className={styles.sampleLabel}>샘플 프로젝트</span><h1>모아<span>moa.</span></h1><p className={styles.headline}>흩어진 할 일을,<br />하나의 흐름으로.</p><p className={styles.summary}>해야 할 일을 기록하고, 우선순위를 정하고, 작은 완료를 쌓아가는 할 일 관리 서비스입니다.</p></div>
            <dl className={styles.metadata}><div><dt>프로젝트 형태</dt><dd>개인 프로젝트</dd></div><div><dt>담당 범위</dt><dd>프론트엔드 · 백엔드</dd></div><div><dt>플랫폼</dt><dd>반응형 웹 · PWA</dd></div></dl>
          </div>
          <div className={styles.heroLinks}><a href="#mockup-screens">주요 화면 살펴보기 <ArrowDown size={14} /></a><span>상세 화면 구성을 위한 가상의 프로젝트입니다.</span></div>
        </header>

        <section id="mockup-screens" className={styles.screenSection} aria-label="서비스 화면 목업">
          <div className={styles.visual}><div className={styles.visualCaption}><span>하루의 시작부터, 작은 완료까지.</span><span>Web & Mobile</span></div><ProductScreen screen={activeScreen} /><PhonePreview /></div>
          <div className={styles.screenControls}>
            <div role="group" aria-label="서비스 화면 선택" className={styles.screenTabs}>{screens.map((screen) => <button key={screen.id} type="button" aria-pressed={activeScreen === screen.id} aria-controls="screen-caption" onClick={() => setActiveScreen(screen.id)}>{screen.label}</button>)}</div>
            <p id="screen-caption" aria-live="polite">{active.caption}</p>
          </div>
        </section>

        <nav className={styles.contents} aria-label="프로젝트 상세 목차"><a href="#mockup-overview">프로젝트 개요</a><a href="#mockup-decisions">구현 기록</a><a href="#mockup-structure">서비스 구조</a><a href="#mockup-retrospect">회고</a></nav>

        <section id="mockup-overview" className={styles.detailSection}>
          <div className={styles.sectionTitle}><span>프로젝트 개요</span><h2>기록하는 데 쓰는 시간보다,<br />해내는 시간이 많아지도록.</h2></div>
          <div className={styles.overviewGrid}><div className={styles.prose}><p>메모 앱에는 아이디어가, 캘린더에는 일정이, 메신저에는 해야 할 일이 흩어져 있습니다. 모아는 이 기록들을 한곳에서 정리하고 실행으로 이어지게 하는 데서 시작했습니다.</p><p>입력은 간단하게, 현재 상태는 분명하게. 서비스를 처음 접하는 사람도 설명 없이 자신의 첫 할 일을 만들 수 있는 흐름을 목표로 했습니다.</p></div><aside className={styles.memo}><span>이번 프로젝트의 기준</span><p>“지금 무엇을 하면 되는지<br />바로 알 수 있는 화면.”</p><div><Check size={14} /> 입력 단계 줄이기</div><div><Check size={14} /> 상태를 명확하게 보여주기</div><div><Check size={14} /> 모바일에서도 이어서 사용하기</div></aside></div>
          <div className={styles.stackRow}><h3>사용 기술</h3><ul>{["React", "TypeScript", "Spring Boot", "Spring Security", "JPA", "MySQL", "PWA"].map((skill) => <li key={skill}>{skill}</li>)}</ul></div>
        </section>

        <section id="mockup-decisions" className={styles.detailSection}>
          <div className={styles.sectionTitle}><span>구현 기록</span><h2>화면 뒤에서 고민한 것들.</h2><p>기능을 만드는 과정에서 마주한 문제와 선택한 해결 방법을 기록했습니다.</p></div>
          <div className={styles.decisions}>
            <details open><summary><span><small>사용 경험</small><strong>할 일 하나를 만드는 데, 여러 화면이 필요할까?</strong></span><ChevronDown size={20} /></summary><div className={styles.decisionBody}><p>제목과 날짜만 입력하면 바로 저장할 수 있는 빠른 입력 영역을 구성했습니다. 상세 설정은 생성 후 추가할 수 있도록 나눠, 처음 입력할 때의 부담을 줄였습니다.</p><div className={styles.decisionTags}><span>간단한 입력</span><span>점진적 정보 공개</span></div></div></details>
            <details><summary><span><small>상태 관리</small><strong>화면을 바꿔도 같은 작업 상태를 유지하려면?</strong></span><ChevronDown size={20} /></summary><div className={styles.decisionBody}><p>할 일을 하나의 데이터 모델로 관리하고 목록, 보드, 캘린더가 같은 상태를 바라보도록 설계했습니다. 작업을 완료하거나 날짜를 바꾼 결과가 각 화면에 일관되게 반영되도록 구성했습니다.</p><div className={styles.decisionTags}><span>일관된 데이터 모델</span><span>화면 간 동기화</span></div></div></details>
            <details><summary><span><small>인증과 권한</small><strong>개인의 기록을 안전하게 분리하려면?</strong></span><ChevronDown size={20} /></summary><div className={styles.decisionBody}><p>JWT 인증과 Spring Security를 적용하고, 요청한 사용자가 해당 작업의 소유자인지 서버에서 검증하는 구조로 구성했습니다. 인증 확인과 데이터 접근 권한 확인을 각각 처리했습니다.</p><div className={styles.decisionTags}><span>JWT 인증</span><span>소유자 검증</span></div></div></details>
          </div>
        </section>

        <section id="mockup-structure" className={styles.detailSection}>
          <div className={styles.sectionTitle}><span>서비스 구조</span><h2>각자의 역할은 분명하게,<br />연결은 단순하게.</h2></div>
          <div className={styles.architecture}><div><LayoutDashboard size={24} /><span>사용자 화면</span><strong>React</strong><small>할 일 입력 · 상태 표시</small></div><span className={styles.flowArrow}>REST API<ArrowUpRight size={20} /></span><div><ListTodo size={24} /><span>애플리케이션 서버</span><strong>Spring Boot</strong><small>인증 · 권한 · 비즈니스 로직</small></div><span className={styles.flowArrow}>JPA<ArrowUpRight size={20} /></span><div><Database size={24} /><span>데이터 저장</span><strong>MySQL</strong><small>사용자 · 프로젝트 · 할 일</small></div></div>
        </section>

        <section id="mockup-retrospect" className={styles.detailSection}>
          <div className={styles.retrospect}><div className={styles.sectionTitle}><span>회고</span><h2>작은 기능에도,<br />이어지는 경험이 필요했습니다.</h2></div><div className={styles.prose}><p>할 일을 추가하는 기능보다 더 중요했던 것은 추가한 일을 어디서든 같은 상태로 확인할 수 있게 만드는 일이었습니다. 화면과 API를 함께 설계하며 사용자의 흐름을 기준으로 기능을 나누는 방법을 고민했습니다.</p><p>다음 단계에서는 실제 사용 흐름을 관찰하고, 반복 일정과 오프라인 사용처럼 꾸준한 기록을 돕는 기능을 검토하려 합니다.</p></div></div>
        </section>
        <footer className={styles.pageFooter}><Link href="/#projects"><ArrowLeft size={16} /> 프로젝트 목록으로</Link><span>모아 · 상세 페이지 목업</span><a href="#project-mockup-top">맨 위로 <ArrowUpRight size={15} /></a></footer>
      </article>
    </main>
  );
}
