"use client";

import { useId, useState } from "react";
import styles from "./youth-stats.module.css";

import type { YouthPerson } from "@/lib/youth";

export type { YouthPerson };

const numberFormatter = new Intl.NumberFormat("ar-EG");

function formatNumber(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "—";
  }

  return numberFormatter.format(value);
}

function CheckIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.2 8.4 6.3 11.5 12.8 4.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YouthStats({ people }: { people: YouthPerson[] }) {
  const headingId = useId();
  const [selectedId, setSelectedId] = useState<string | null>(
    people[0]?.id ?? null,
  );

  const selected =
    people.find((person) => person.id === selectedId) ?? people[0] ?? null;

  if (!selected) {
    return null;
  }

  const selectedIndex = Math.max(
    people.findIndex((person) => person.id === selected.id),
    0,
  );
  const visibleTasks = selected.tasks
    .filter((task) => task.trim().length > 0)
    .slice(0, 15);

  const stats: { label: string; value: number | null; hint: string }[] = [
    {
      label: "عدد الأسطر البرمجية المكتوبة",
      value: selected.lines,
      hint: "الأسطر المضافة في مستودعات GitHub",
    },
    {
      label: "عدد الميزات المنفذة",
      value: selected.features,
      hint: "محطات تطويرية مكتملة من ملف تقدم المشاريع",
    },
    {
      label: "عدد المنتجات التي عمل عليها",
      value: selected.productsCount,
      hint: "حسب تقسيم العمل",
    },
  ];

  return (
    <section
      className={`${styles.youth} youth-screen`}
      id="youth"
      aria-labelledby={headingId}
    >
      <header className={styles.head}>
        <div className={styles.headCopy}>
          <p className={styles.kicker}>
            <span className={styles.kickerRule} aria-hidden="true" />
            فريق الشباب
          </p>
          <h2 className={styles.title} id={headingId}>
            إنجازات ٢٠٢٦
          </h2>
        </div>
        <p className={styles.hint}>
          اختر عضوًا لعرض إحصائيته وملخص مهامه.
        </p>
      </header>

      <ul className={styles.people} aria-label="أعضاء فريق الشباب">
        {people.map((person) => {
          const isSelected = person.id === selected.id;

          return (
            <li className={styles.person} key={person.id}>
              <button
                type="button"
                className={styles.personButton}
                aria-pressed={isSelected}
                aria-label={`عرض إنجازات ${person.name}`}
                onClick={() => setSelectedId(person.id)}
              >
                <span className={styles.portraitWrap} aria-hidden="true">
                  <span className={styles.portrait}>
                    <img
                      className={styles.portraitImage}
                      src={person.image}
                      alt=""
                      width={640}
                      height={640}
                    />
                  </span>
                  <span className={styles.check}>
                    <CheckIcon />
                  </span>
                </span>
                <span className={styles.personName}>{person.name}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className={styles.panel} aria-live="polite">
        <div className={styles.panelBody} key={selected.id}>
          <header className={styles.panelHead}>
            <div className={styles.identity}>
              <h3 className={styles.personTitle}>{selected.name}</h3>
              <p className={styles.products}>
                <span className={styles.productsLabel}>المنتجات:</span>{" "}
                {selected.products.join("، ")}
              </p>
            </div>
            <div className={styles.indexMark} aria-hidden="true">
              <span className={styles.indexNumber}>
                {formatNumber(selectedIndex + 1)}
              </span>
              <span className={styles.indexTotal}>
                من {formatNumber(people.length)}
              </span>
            </div>
          </header>

          <section
            className={styles.block}
            id="youth-work"
            aria-labelledby={`${headingId}-work`}
          >
            <h4 className={styles.blockTitle} id={`${headingId}-work`}>
              <span className={styles.blockRule} aria-hidden="true" />
              إحصائية عن العمل
            </h4>

            <dl className={styles.stats}>
              {stats.map((stat) => (
                <div className={styles.stat} key={stat.label}>
                  <dt className={styles.statLabel} title={stat.hint}>
                    {stat.label}
                  </dt>
                  <dd
                    className={styles.statValue}
                    data-empty={stat.value === null ? "true" : undefined}
                    aria-label={
                      stat.value === null ? "غير متوفر" : undefined
                    }
                  >
                    {formatNumber(stat.value)}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section
            className={styles.block}
            id="youth-tasks"
            aria-labelledby={`${headingId}-tasks`}
          >
            <h4 className={styles.blockTitle} id={`${headingId}-tasks`}>
              <span className={styles.blockRule} aria-hidden="true" />
              ملخص المهام
            </h4>

            {visibleTasks.length > 0 ? (
              <ul className={styles.tasks}>
                {visibleTasks.map((task, index) => (
                  <li key={`${selected.id}-${index}`}>{task}</li>
                ))}
              </ul>
            ) : (
              <p className={styles.empty}>—</p>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
