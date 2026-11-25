"use client";

import { useState } from "react";
import styles from "./tech-assets.module.css";
import { formatSar, formatUsd, toArabicDigits } from "@/lib/format";
import {
  aiProjects,
  aiRates,
  aiTools,
  cloudSpaces,
  cloudSpacesCurrentTotal,
  cloudSpacesTargetTotal,
  serviceAnnualTotal,
  serviceGroups,
  techAssetsTotal,
} from "@/lib/tech-assets";

type SeatState = Record<string, { full: number; part: number }>;

const initialSeats = (): SeatState =>
  Object.fromEntries(
    aiProjects.map((project) => [
      project.id,
      { full: project.defaultFull, part: project.defaultPart },
    ]),
  );

const allProjectIds = aiProjects.map((project) => project.id);

function annualOf(service: {
  monthly?: number;
  annual?: number;
}): number {
  return service.monthly ? service.monthly * 12 : service.annual ?? 0;
}

function ChevronDownIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </svg>
  );
}

function SparkIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="m5.6 5.6 2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}

function SeatStepper({
  label,
  hint,
  value,
  disabled,
  onChange,
  tone,
  context,
}: {
  label: string;
  hint: string;
  value: number;
  disabled: boolean;
  onChange: (next: number) => void;
  tone: "gold" | "green";
  context: string;
}) {
  return (
    <div className={`${styles.stepper} ${tone === "green" ? styles.stepperGreen : ""}`}>
      <div className={styles.stepperCopy}>
        <span className={styles.stepperLabel}>{label}</span>
        <span className={styles.stepperHint}>{hint}</span>
      </div>
      <div className={styles.stepperControls}>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={disabled || value <= 0}
          aria-label={`تقليل ${label} — ${context}`}
        >
          −
        </button>
        <span className={styles.stepValue}>{toArabicDigits(value, 1)}</span>
        <button
          type="button"
          className={styles.stepButton}
          onClick={() => onChange(Math.min(30, value + 1))}
          disabled={disabled || value >= 30}
          aria-label={`زيادة ${label} — ${context}`}
        >
          +
        </button>
      </div>
    </div>
  );
}

export function TechAssets() {
  const [selected, setSelected] = useState<string[]>(() => [...allProjectIds]);
  const [seats, setSeats] = useState<SeatState>(initialSeats);
  const selectedSet = new Set(selected);

  const toggleProject = (id: string) => {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const updateSeat = (
    id: string,
    kind: "full" | "part",
    next: number,
  ) => {
    setSeats((current) => ({
      ...current,
      [id]: { ...current[id], [kind]: next },
    }));
  };

  const resetAll = () => {
    setSelected([...allProjectIds]);
    setSeats(initialSeats());
  };

  const totalFull = selected.reduce(
    (total, id) => total + (seats[id]?.full ?? 0),
    0,
  );
  const totalPart = selected.reduce(
    (total, id) => total + (seats[id]?.part ?? 0),
    0,
  );
  const monthlyUsd = totalFull * aiRates.full + totalPart * aiRates.part;
  const annualUsd = monthlyUsd * 12;
  const annualSar = annualUsd * aiRates.usdToSar;

  const serviceCount = serviceGroups.reduce(
    (total, group) => total + group.services.length,
    0,
  );
  const monthlyAverage = serviceAnnualTotal / 12;

  return (
    <div className={`${styles.assets} tech-assets-screen`}>
      <section
        className={styles.summary}
        id="tech-assets-summary"
        aria-labelledby="tech-assets-summary-title"
      >
        <div className={styles.summaryTop}>
          <div>
            <p className={styles.summaryKicker}>العهد التقنية · توقع ٢٠٢٧</p>
            <h2 className={styles.summaryTitle} id="tech-assets-summary-title">
              الأرقام المجملة للسنة القادمة.
            </h2>
          </div>
          <p className={styles.summaryNote}>
            مبنية على فواتير ٢٠٢٦، بعد استبعاد الذكاء الاصطناعي والبنود غير
            المتكررة.
          </p>
        </div>

        <div className={styles.summaryStats}>
          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>الاشتراكات التقنية</span>
            <strong className={styles.statValue}>
              {formatSar(serviceAnnualTotal)}
            </strong>
            <span className={styles.statUnit}>
              ريال / سنة · {toArabicDigits(serviceCount, 1)} خدمة
            </span>
          </div>

          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>المساحات السحابية</span>
            <strong className={styles.statValue}>
              {formatSar(cloudSpacesTargetTotal)}
            </strong>
            <span className={styles.statUnit}>
              ريال / سنة · بعد نقل قوقل
            </span>
          </div>

          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>الإجمالي مع المساحات</span>
            <strong className={`${styles.statValue} ${styles.statValueGold}`}>
              {formatSar(techAssetsTotal)}
            </strong>
            <span className={styles.statUnit}>ريال / سنة · بدون الذكاء الاصطناعي</span>
          </div>
        </div>

        <div className={styles.summaryFoot}>
          <span>
            المتوسط الشهري للاشتراكات ≈ {formatSar(monthlyAverage)} ر.س
          </span>
          <a href="#ai-forecast" className={styles.summaryLink}>
            حاسبة الذكاء الاصطناعي
            <ChevronDownIcon />
          </a>
        </div>
      </section>

      <section className={styles.method} aria-label="منهجية التقدير">
        <div className={styles.methodItem}>
          <span className={styles.methodNum}>٠١</span>
          <div>
            <h3>جرد الفواتير</h3>
            <p>
              تسويات العهدة من أبريل إلى أكتوبر ٢٠٢٦، وطلبات الصرف حتى نوفمبر.
            </p>
          </div>
        </div>
        <div className={styles.methodItem}>
          <span className={styles.methodNum}>٠٢</span>
          <div>
            <h3>استبعاد غير المتكرر</h3>
            <p>
              الذكاء الاصطناعي، التحويلات، والبنود المكررة خارج حساب التوقع.
            </p>
          </div>
        </div>
        <div className={styles.methodItem}>
          <span className={styles.methodNum}>٠٣</span>
          <div>
            <h3>تثبيت آخر سعر</h3>
            <p>
              آخر دورة سعرية لكل خدمة، مع إضافة البنود السنوية والنطاقات.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.services}
        id="tech-services"
        aria-labelledby="tech-services-title"
      >
        <div className={styles.blockHead}>
          <div>
            <p className={styles.blockKicker}>الاشتراكات</p>
            <h2 className={styles.blockTitle} id="tech-services-title">
              ما ندفعه فعليًا، خدمة بخدمة.
            </h2>
          </div>
          <p className={styles.blockNote}>
            الأسعار شاملة الضريبة وبالريال السعودي. الاشتراكات الشهرية محسوبة
            ×١٢.
          </p>
        </div>

        {serviceGroups.map((group) => (
          <div className={styles.serviceGroup} key={group.id}>
            <div className={styles.groupHead}>
              <div>
                <h3 className={styles.groupTitle}>{group.title}</h3>
                <p className={styles.groupNote}>{group.note}</p>
              </div>
              <span className={styles.groupTotal}>
                {formatSar(
                  group.services.reduce(
                    (total, service) => total + annualOf(service),
                    0,
                  ),
                )}{" "}
                ر.س / سنة
              </span>
            </div>

            <div className={styles.serviceGrid}>
              {group.services.map((service) => (
                <article className={styles.serviceCard} key={service.id}>
                  <header className={styles.serviceHead}>
                    <span className={styles.serviceLogo}>
                      <img src={service.logo} alt="" />
                    </span>
                    <div className={styles.serviceIdentity}>
                      <h4 className={styles.serviceName}>{service.name}</h4>
                      <p className={styles.serviceLabel}>{service.label}</p>
                    </div>
                    <span className={styles.cycleTag}>
                      {service.cycle === "annual"
                        ? "سنوي"
                        : service.cycle === "usage"
                          ? "حسب الاستخدام"
                          : "شهري"}
                    </span>
                  </header>

                  <div className={styles.serviceFigures}>
                    {service.monthly ? (
                      <span className={styles.figure}>
                        <span className={styles.figureLabel}>شهريًا</span>
                        <strong>
                          {formatSar(service.monthly)} <small>ر.س</small>
                        </strong>
                      </span>
                    ) : null}
                    <span className={`${styles.figure} ${styles.figureAnnual}`}>
                      <span className={styles.figureLabel}>سنويًا</span>
                      <strong>
                        {formatSar(annualOf(service))} <small>ر.س</small>
                      </strong>
                    </span>
                  </div>

                  {service.note ? (
                    <p className={styles.serviceNote}>{service.note}</p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}

        <div className={styles.servicesTotal}>
          <div>
            <span className={styles.totalLabel}>إجمالي الاشتراكات التقنية</span>
            <strong className={styles.totalValue}>
              {formatSar(serviceAnnualTotal)}
            </strong>
            <span className={styles.totalUnit}>ر.س / سنة</span>
          </div>
          <div className={styles.totalSide}>
            <span>
              المتوسط الشهري: <strong>{formatSar(monthlyAverage)}</strong>{" "}
              ر.س
            </span>
            <span className={styles.totalSideNote}>
              لا يشمل المساحات ولا الذكاء الاصطناعي.
            </span>
          </div>
        </div>
      </section>

      <section
        className={styles.spaces}
        id="tech-spaces"
        aria-labelledby="tech-spaces-title"
      >
        <div className={styles.blockHead}>
          <div>
            <p className={styles.blockKicker}>بنود منفصلة</p>
            <h2 className={styles.blockTitle} id="tech-spaces-title">
              المساحات السحابية.
            </h2>
          </div>
          <p className={styles.blockNote}>
            محسوبة لوحدها، ولا تدخل في جدول الاشتراكات أعلاه.
          </p>
        </div>

        <div className={styles.spacesGrid}>
          {cloudSpaces.map((space) => {
            const isGoogle = space.id === "google";
            return (
              <article
                className={`${styles.spaceCard} ${
                  isGoogle ? styles.spaceCardGold : ""
                }`}
                key={space.id}
              >
                <header className={styles.spaceHead}>
                  <span className={styles.spaceLogo}>
                    <img src={space.logo} alt="" />
                  </span>
                  <div>
                    <h3 className={styles.spaceName}>{space.name}</h3>
                    <p className={styles.spaceLabel}>{space.label}</p>
                  </div>
                  <span className={styles.spaceTag}>
                    {isGoogle ? "موصى به" : "مستمر"}
                  </span>
                </header>

                <p className={styles.spaceDetail}>{space.detail}</p>

                <div className={styles.spacePrice}>
                  <span className={styles.spaceCurrentLabel}>
                    {isGoogle ? "بعد نقل الباقة" : "التقدير السنوي"}
                  </span>
                  <div className={styles.spaceAmount}>
                    <strong>{formatSar(space.target)}</strong>
                    <span>ر.س / سنة</span>
                  </div>
                  {isGoogle ? (
                    <span className={styles.spaceOld}>
                      الوضع الحالي: <s>{formatSar(space.current)}</s> ر.س
                    </span>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.spaceCompare}>
          <div className={styles.compareItem}>
            <span className={styles.compareLabel}>الوضع الحالي</span>
            <strong className={styles.compareValue}>
              {formatSar(cloudSpacesCurrentTotal)}
            </strong>
            <span className={styles.compareUnit}>ر.س / سنة</span>
            <span className={styles.compareBreak}>
              Google ٢٬٠٠٠ + Microsoft ١٬٠٠٠
            </span>
          </div>

          <span className={styles.compareArrow} aria-hidden="true">
            ←
          </span>

          <div className={`${styles.compareItem} ${styles.compareItemTarget}`}>
            <span className={styles.compareLabel}>بعد نقل قوقل · المعتمد</span>
            <strong className={styles.compareValue}>
              {formatSar(cloudSpacesTargetTotal)}
            </strong>
            <span className={styles.compareUnit}>ر.س / سنة</span>
            <span className={styles.compareBreak}>
              Google ١٬٠٠٠ + Microsoft ١٬٠٠٠
            </span>
          </div>

          <div className={styles.compareSaving}>
            <span>الفرق</span>
            <strong>
              − {formatSar(cloudSpacesCurrentTotal - cloudSpacesTargetTotal)}
            </strong>
            <span>ر.س / سنة</span>
          </div>
        </div>

        <div className={styles.recommendation}>
          <span className={styles.recommendationBadge}>التوصية</span>
          <div>
            <h3 className={styles.recommendationTitle}>
              التقدير على بقاء الوضع الحالي، والمعتمد بعد نقل قوقل ٢٬٠٠٠ ريال.
            </h3>
            <p className={styles.recommendationText}>
              إذا بقيت مساحة Google على وضعها الحالي (٢٬٠٠٠ ريال) يصبح إجمالي
              المساحات ٣٬٠٠٠ ريال. وبعد نقلها إلى باقة ١٬٠٠٠ ريال ينخفض الإجمالي
              إلى ٢٬٠٠٠ ريال — وهو الرقم المعتمد في توقع ٢٠٢٧.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.ai}
        id="ai-forecast"
        aria-labelledby="ai-forecast-title"
      >
        <div className={styles.blockHead}>
          <div>
            <p className={styles.blockKicker}>بند مستقل</p>
            <h2 className={styles.blockTitle} id="ai-forecast-title">
              الذكاء الاصطناعي بحسب المشروع.
            </h2>
          </div>
          <p className={styles.blockNote}>
            لا يدخل ضمن العهد التقنية أو المساحات. لكل موظف في المشروع اشتراك
            شهري.
          </p>
        </div>

        <div className={styles.aiTop}>
          <div className={styles.rateCards}>
            <div className={styles.rateCard}>
              <span className={styles.rateLabel}>دوام كامل</span>
              <strong className={styles.rateValue}>{toArabicDigits(aiRates.full, 1)}</strong>
              <span className={styles.rateUnit}>دولار / شهر · موظف</span>
            </div>
            <div className={styles.rateCard}>
              <span className={styles.rateLabel}>دوام جزئي</span>
              <strong className={styles.rateValue}>{toArabicDigits(aiRates.part, 1)}</strong>
              <span className={styles.rateUnit}>دولار / شهر · موظف</span>
            </div>
          </div>

          <div className={styles.aiTools}>
            <p className={styles.aiToolsLabel}>
              <SparkIcon />
              الأدوات المستخدمة حاليًا
            </p>
            <ul className={styles.aiToolsList}>
              {aiTools.map((tool) => (
                <li key={tool.id}>
                  <span className={styles.toolLogo}>
                    <img src={tool.logo} alt="" />
                  </span>
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.aiLayout}>
          <div className={styles.aiProjects}>
            <div className={styles.aiProjectsHead}>
              <div>
                <h3 className={styles.aiProjectsTitle}>مشاريع خطة ٢٠٢٧</h3>
                <p className={styles.aiProjectsNote}>
                  حدّد المشاريع، وعدّل المقاعد الكاملة والجزئية.
                </p>
              </div>
              <div className={styles.aiActions}>
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => setSelected([...allProjectIds])}
                >
                  تحديد الكل
                </button>
                <button
                  type="button"
                  className={styles.actionBtnGhost}
                  onClick={() => setSelected([])}
                >
                  إلغاء الكل
                </button>
                <button
                  type="button"
                  className={styles.actionBtnGhost}
                  onClick={resetAll}
                >
                  إعادة الضبط
                </button>
              </div>
            </div>

            <div className={styles.aiList}>
              {aiProjects.map((project) => {
                const active = selectedSet.has(project.id);
                const seat = seats[project.id] ?? {
                  full: project.defaultFull,
                  part: project.defaultPart,
                };
                const projectMonthly = active
                  ? seat.full * aiRates.full + seat.part * aiRates.part
                  : 0;

                return (
                  <article
                    className={`${styles.aiProject} ${
                      active ? styles.aiProjectActive : styles.aiProjectOff
                    }`}
                    key={project.id}
                  >
                    <div className={styles.aiProjectTop}>
                      <label className={styles.aiCheck}>
                        <input
                          type="checkbox"
                          checked={active}
                          onChange={() => toggleProject(project.id)}
                        />
                        <span className={styles.aiIdentity}>
                          <span className={styles.aiTag}>{project.tag}</span>
                          <strong className={styles.aiName}>
                            {project.name}
                          </strong>
                          <span className={styles.aiBasis}>
                            {project.basis}
                          </span>
                        </span>
                      </label>

                      <div className={styles.aiProjectCost}>
                        <strong>{formatUsd(projectMonthly * 12)}</strong>
                        <span className={styles.aiProjectYear}>
                          دولار / سنة · {formatUsd(projectMonthly)} / شهر
                        </span>
                        <span className={styles.aiProjectSar}>
                          {formatSar(projectMonthly * 12 * aiRates.usdToSar)} ر.س
                        </span>
                      </div>
                    </div>

                    <div className={styles.aiSeats}>
                      <SeatStepper
                        label="دوام كامل"
                        hint={`${toArabicDigits(aiRates.full, 1)} دولار / شهر`}
                        value={seat.full}
                        disabled={!active}
                        onChange={(next) =>
                          updateSeat(project.id, "full", next)
                        }
                        tone="gold"
                        context={project.name}
                      />
                      <SeatStepper
                        label="دوام جزئي"
                        hint={`${toArabicDigits(aiRates.part, 1)} دولار / شهر`}
                        value={seat.part}
                        disabled={!active}
                        onChange={(next) =>
                          updateSeat(project.id, "part", next)
                        }
                        tone="green"
                        context={project.name}
                      />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className={styles.aiSummary} aria-live="polite">
            <p className={styles.aiSummaryKicker}>الإجمالي المتوقع ٢٠٢٧</p>
            <strong className={styles.aiSummaryValue}>
              {formatUsd(annualUsd)}
            </strong>
            <span className={styles.aiSummarySar}>
              دولار / سنة · {formatSar(annualSar)} ر.س
            </span>

            <dl className={styles.aiSummaryList}>
              <div>
                <dt>المشاريع المحددة</dt>
                <dd>
                  {toArabicDigits(selected.length, 1)} من {toArabicDigits(aiProjects.length, 1)}
                </dd>
              </div>
              <div>
                <dt>مقاعد دوام كامل</dt>
                <dd>{toArabicDigits(totalFull, 1)}</dd>
              </div>
              <div>
                <dt>مقاعد دوام جزئي</dt>
                <dd>{toArabicDigits(totalPart, 1)}</dd>
              </div>
              <div>
                <dt>التكلفة الشهرية</dt>
                <dd>{formatUsd(monthlyUsd)} دولار</dd>
              </div>
            </dl>

            <p className={styles.aiSummaryNote}>
              التحويل إلى الريال بسعر ٣٫٧٥. المشاريع غير المحددة لا تدخل في
              الحساب.
            </p>

            <div className={styles.aiSummaryFoot}>
              <span>يُعاد الحساب تلقائيًا</span>
              <span className={styles.aiLiveDot} aria-hidden="true" />
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.source} aria-label="مصدر الأرقام">
        <div className={styles.sourceIcon} aria-hidden="true">
          <SparkIcon />
        </div>
        <div>
          <h3 className={styles.sourceTitle}>كيف بُنيت الأرقام؟</h3>
          <p className={styles.sourceText}>
            المصدر: تسويات العهدة (أبريل–أكتوبر ٢٠٢٦) وطلبات الصرف
            (مايو–نوفمبر ٢٠٢٦). استُخدمت آخر دورة سعرية متاحة لكل خدمة،
            واستُبعدت اشتراكات الذكاء الاصطناعي والتحويلات والبنود المكررة.
            الذكاء الاصطناعي يُحسب في القسم أعلاه بحسب المشاريع.
          </p>
        </div>
      </section>
    </div>
  );
}
