"use client";

import { useId, useState } from "react";
import styles from "./tech-structure.module.css";
import type { TechStructure } from "@/lib/tech-structure";
import { toArabicDigits } from "@/lib/format";

type View = "current" | "next";

function DirectorIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M12 2.8v1.4M18.4 5.6l-1 1M5.6 5.6l1 1" />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3.5" y="4.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="4.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="14.5" width="7" height="5" rx="1.6" />
      <path d="M14 15.5h5.5M14 19h3.5" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.4 7.7 7.6 4.4 7.6-4.4M12 12.1V21" />
    </svg>
  );
}

function SwapIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 8h13" />
      <path d="m14 5 3 3-3 3" />
      <path d="M20 16H7" />
      <path d="m10 13-3 3 3 3" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.2" />
      <path d="M12 16.2h.01" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 4.4 4.4L19 6.8" />
    </svg>
  );
}

function CurrentChart({ data }: { data: TechStructure }) {
  return (
    <div className={styles.chart}>
      <header className={styles.chartHead}>
        <div>
          <p className={styles.chartLabel}>
            {data.current.label}
            <span className={styles.chartSep} aria-hidden="true" />
            {data.current.year}
          </p>
          <h3 className={styles.chartTitle}>{data.current.title}</h3>
        </div>
        <span className={styles.chartYear} aria-hidden="true">
          {data.current.year}
        </span>
      </header>

      <div className={styles.directorWrap}>
        <article className={styles.director}>
          <span className={styles.directorAvatar} aria-hidden="true">
            {data.director.initials}
          </span>
          <span className={styles.directorCopy}>
            <span className={styles.directorName}>
              {data.director.name}
            </span>
            <span className={styles.directorRole}>
              {data.director.role}
            </span>
          </span>
          <span className={styles.directorIcon} aria-hidden="true">
            <DirectorIcon />
          </span>
        </article>
      </div>

      <div className={styles.dashedTree} aria-hidden="true">
        <span className={styles.dashedStem} />
        <span className={styles.dashedRail}>
          <span className={`${styles.railDrop} ${styles.railDropStart}`} />
          <span className={`${styles.railDrop} ${styles.railDropMid}`} />
          <span className={`${styles.railDrop} ${styles.railDropEnd}`} />
        </span>
      </div>

      <ul className={styles.currentPeople} aria-label="أعضاء الفريق">
        {data.current.people.map((person) => (
          <li className={styles.currentPerson} key={person.id}>
            <span
              className={`${styles.personAvatar} ${styles.personAvatarMuted}`}
              aria-hidden="true"
            >
              {person.initials}
            </span>
            <span className={styles.personCopy}>
              <span className={styles.personName}>{person.name}</span>
              <span className={styles.personRole}>{person.role}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.scopeChip}>
        <span className={styles.scopeDot} aria-hidden="true" />
        <span className={styles.scopeLabel}>النطاق</span>
        <span className={styles.scopeValue}>{data.current.scope}</span>
      </div>

      <p className={styles.problem}>
        <span className={styles.problemIcon} aria-hidden="true">
          <AlertIcon />
        </span>
        <span>{data.current.summary}</span>
      </p>
    </div>
  );
}

function NextChart({ data }: { data: TechStructure }) {
  return (
    <div className={styles.chart}>
      <header className={styles.chartHead}>
        <div>
          <p className={styles.chartLabel}>
            {data.next.label}
            <span className={styles.chartSep} aria-hidden="true" />
            {data.next.year}
          </p>
          <h3 className={styles.chartTitle}>{data.next.title}</h3>
        </div>
        <span
          className={`${styles.chartYear} ${styles.chartYearGold}`}
          aria-hidden="true"
        >
          {data.next.year}
        </span>
      </header>

      <div className={styles.directorWrap}>
        <article className={`${styles.director} ${styles.directorNext}`}>
          <span className={styles.directorAvatar} aria-hidden="true">
            {data.director.initials}
          </span>
          <span className={styles.directorCopy}>
            <span className={styles.directorName}>
              {data.director.name}
            </span>
            <span className={styles.directorRole}>
              {data.director.role}
            </span>
            <span className={styles.directorBadge}>
              {data.director.departmentBadge}
            </span>
          </span>
        </article>
      </div>

      <div className={styles.solidTree} aria-hidden="true">
        <span className={styles.solidStem} />
        <span className={styles.solidRail} />
        <span className={`${styles.solidDrop} ${styles.solidDropStart}`} />
        <span className={`${styles.solidDrop} ${styles.solidDropEnd}`} />
      </div>

      <div className={styles.departments}>
        {data.next.departments.map((department) => (
          <section
            className={`${styles.department} ${
              department.id === "projects"
                ? styles.departmentGreen
                : styles.departmentGold
            }`}
            key={department.id}
            aria-label={department.name}
          >
            <header className={styles.departmentHead}>
              <div className={styles.departmentTitleRow}>
                <span className={styles.departmentIcon} aria-hidden="true">
                  {department.id === "projects" ? (
                    <ProjectsIcon />
                  ) : (
                    <ProductsIcon />
                  )}
                </span>
                <h4 className={styles.departmentName}>{department.name}</h4>
              </div>
              <p className={styles.departmentScope}>{department.scope}</p>
            </header>

            <div className={styles.departmentPeople}>
              <div className={`${styles.personRow} ${styles.personRowHead}`}>
                <span className={styles.personAvatar} aria-hidden="true">
                  {department.head.initials}
                </span>
                <span className={styles.personCopy}>
                  <span className={styles.personName}>
                    {department.head.name}
                  </span>
                  <span className={styles.personRole}>
                    {department.head.role}
                  </span>
                </span>
                <span className={styles.headTag}>رئيس القسم</span>
              </div>

              <div className={styles.personRow}>
                <span
                  className={`${styles.personAvatar} ${styles.personAvatarLight}`}
                  aria-hidden="true"
                >
                  {department.engineer.initials}
                </span>
                <span className={styles.personCopy}>
                  <span className={styles.personName}>
                    {department.engineer.name}
                  </span>
                  <span className={styles.personRole}>
                    {department.engineer.role}
                  </span>
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <p className={styles.chartSummary}>{data.next.summary}</p>
    </div>
  );
}

export function TechStructureView({ data }: { data: TechStructure }) {
  const [view, setView] = useState<View>("next");
  const headingId = useId();
  const whyId = useId();
  const flexId = useId();
  const saifId = useId();

  const handleToggleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      setView((current) => (current === "next" ? "current" : "next"));
    }
  };

  return (
    <section
      className={`${styles.tech} tech-screen`}
      id="tech-structure"
      aria-labelledby={headingId}
    >
      <header className={styles.head}>
        <div className={styles.headCopy}>
          <p className={styles.kicker}>
            <span className={styles.kickerRule} aria-hidden="true" />
            الهيكل التنظيمي
          </p>
          <h2 className={styles.title} id={headingId}>
            من فريق عام إلى قسمين متخصصين.
          </h2>
        </div>
        <p className={styles.hint}>
          بدّل بين هيكلة ٢٠٢٦ وهيكلة ٢٠٢٧ لترى الفرق في الأدوار والمسؤوليات.
        </p>
      </header>

      <div className={styles.toggleWrap}>
        <div
          className={styles.toggle}
          role="group"
          aria-label="اختيار الهيكلة المعروضة"
          onKeyDown={handleToggleKeyDown}
        >
          <button
            type="button"
            className={styles.toggleButton}
            aria-pressed={view === "current"}
            onClick={() => setView("current")}
          >
            <span className={styles.toggleTitle}>هيكلة ٢٠٢٦</span>
            <span className={styles.toggleNote}>السابقة</span>
          </button>
          <button
            type="button"
            className={styles.toggleButton}
            aria-pressed={view === "next"}
            onClick={() => setView("next")}
          >
            <span className={styles.toggleTitle}>هيكلة ٢٠٢٧</span>
            <span className={styles.toggleNote}>القادمة</span>
          </button>
        </div>
      </div>

      <p className={styles.srOnly} role="status">
        {view === "next"
          ? "تُعرض الآن هيكلة ٢٠٢٧."
          : "تُعرض الآن هيكلة ٢٠٢٦."}
      </p>

      <div className={styles.stage} data-view={view}>
        <div className={styles.stageInner} key={view}>
          {view === "next" ? (
            <NextChart data={data} />
          ) : (
            <CurrentChart data={data} />
          )}
        </div>
      </div>

      <section
        className={styles.why}
        id="why"
        aria-labelledby={whyId}
      >
        <div className={styles.sectionHead}>
          <div>
            <p className={styles.bandKicker}>المبرر</p>
            <h3 className={styles.sectionTitle} id={whyId}>
              لماذا قسمان؟
            </h3>
          </div>
          <span className={styles.sectionNote}>ثلاثة أسباب مباشرة</span>
        </div>

        <ul className={styles.reasons}>
          {data.reasons.map((reason, index) => (
            <li className={styles.reason} key={reason.id}>
              <span className={styles.reasonNum}>
                {toArabicDigits(index + 1)}
              </span>
              <h4 className={styles.reasonTitle}>{reason.title}</h4>
              <p className={styles.reasonText}>{reason.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className={styles.flexibility}
        id="flexibility"
        aria-labelledby={flexId}
      >
        <div className={styles.flexHead}>
          <span className={styles.flexIcon} aria-hidden="true">
            <SwapIcon size={19} />
          </span>
          <div>
            <p className={styles.flexKicker}>حدود مرنة</p>
            <h3 className={styles.flexTitle} id={flexId}>
              {data.flexibility.title}
            </h3>
          </div>
        </div>

        <div className={styles.flexPills} aria-hidden="true">
          <span className={styles.flexPill}>المشاريع</span>
          <span className={styles.flexSwap}>
            <SwapIcon size={16} />
          </span>
          <span className={`${styles.flexPill} ${styles.flexPillGold}`}>
            المنتجات
          </span>
        </div>

        <p className={styles.flexText}>{data.flexibility.text}</p>
      </section>

      <section className={styles.saif} id="saif" aria-labelledby={saifId}>
        <span className={styles.saifMark} aria-hidden="true">
          <CheckIcon />
        </span>
        <div className={styles.saifBody}>
          <p className={styles.saifLabel}>{data.saif.label}</p>
          <h3 className={styles.saifTitle} id={saifId}>
            {data.saif.title}
          </h3>
          <p className={styles.saifText}>{data.saif.text}</p>
        </div>
      </section>
    </section>
  );
}
