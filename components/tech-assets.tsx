"use client";

import { useState } from "react";
import styles from "./tech-assets.module.css";
import { formatSar, formatUsd, toArabicDigits } from "@/lib/format";
import {
  aiProjects,
  aiRates,
  aiTools,
  cloudComparison,
  cloudSpacesAnnualSaving,
  cloudSpacesCurrent,
  cloudSpacesCurrentAnnualTotal,
  cloudSpacesCurrentMonthlyTotal,
  cloudSpacesMonthlySaving,
  cloudSpacesTargetAnnual,
  cloudSpacesTargetMonthly,
  mergeOptions,
  serviceAnnualTotal,
  serviceGroups,
  techAssetsCurrentAnnual,
  techAssetsTargetAnnual,
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
            الاشتراكات سنوية، والمساحات شهرية. الهدف دمج مزوّدي المساحات في
            مزوّد واحد.
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
            <span className={styles.statLabel}>المساحات الحالية</span>
            <strong className={styles.statValue}>
              {formatSar(cloudSpacesCurrentMonthlyTotal)}
            </strong>
            <span className={styles.statUnit}>
              ريال / شهر · {formatSar(cloudSpacesCurrentAnnualTotal)} سنويًا
            </span>
          </div>

          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>الإجمالي الحالي</span>
            <strong className={styles.statValue}>
              {formatSar(techAssetsCurrentAnnual)}
            </strong>
            <span className={styles.statUnit}>ريال / سنة · بدون الذكاء الاصطناعي</span>
          </div>

          <div className={styles.summaryStat}>
            <span className={styles.statLabel}>الهدف بعد الدمج</span>
            <strong className={`${styles.statValue} ${styles.statValueGold}`}>
              {formatSar(techAssetsTargetAnnual)}
            </strong>
            <span className={styles.statUnit}>
              ريال / سنة · وفر {formatSar(cloudSpacesAnnualSaving)} سنويًا
            </span>
          </div>
        </div>

        <div className={styles.summaryFoot}>
          <span>
            المتوسط الشهري للاشتراكات ≈ {formatSar(monthlyAverage)} ر.س · وفر
            المساحات {formatSar(cloudSpacesMonthlySaving)} ر.س شهريًا
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
            <p className={styles.blockKicker}>المساحات · هدف الدمج</p>
            <h2 className={styles.blockTitle} id="tech-spaces-title">
              مزوّدان الآن، ومزوّد واحد بعد الدمج.
            </h2>
          </div>
          <p className={styles.blockNote}>
            الوضع الحالي ٣٬٠٠٠ ر.س شهريًا. الهدف دمج المساحات والبريد في مزوّد
            واحد بخيارين: Microsoft أو Google.
          </p>
        </div>

        <div className={styles.spaceSummary}>
          <article className={styles.spaceCurrent}>
            <header className={styles.spaceSummaryHead}>
              <div>
                <span className={styles.spaceSummaryKicker}>الوضع الحالي</span>
                <h3 className={styles.spaceSummaryTitle}>
                  ندفع لمزوّدين في الوقت نفسه.
                </h3>
              </div>
              <span className={styles.spaceStatusTag}>قبل الدمج</span>
            </header>

            <div className={styles.spaceBigNumber}>
              <strong>{formatSar(cloudSpacesCurrentMonthlyTotal)}</strong>
              <span>ر.س / شهر</span>
              <small>{formatSar(cloudSpacesCurrentAnnualTotal)} ر.س سنويًا</small>
            </div>

            <div className={styles.currentProviders}>
              {cloudSpacesCurrent.map((space) => (
                <div className={styles.currentProvider} key={space.id}>
                  <span className={styles.currentProviderLogo}>
                    <img src={space.logo} alt="" />
                  </span>
                  <div>
                    <strong>{space.name}</strong>
                    <span>{formatSar(space.monthly)} ر.س / شهر</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.providerDetails}>
              {cloudSpacesCurrent.map((space) => (
                <div className={styles.providerDetail} key={space.id}>
                  <span className={styles.providerDetailName}>
                    <img src={space.logo} alt="" />
                    {space.label}
                  </span>
                  <ul>
                    {space.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className={styles.spaceTarget}>
            <header className={styles.spaceSummaryHead}>
              <div>
                <span className={styles.spaceSummaryKicker}>الهدف بعد الدمج · تقديري</span>
                <h3 className={styles.spaceSummaryTitle}>
                  مزوّد واحد للبريد والمساحة.
                </h3>
              </div>
              <span className={`${styles.spaceStatusTag} ${styles.spaceStatusGold}`}>
                هدف ٢٠٢٧
              </span>
            </header>

            <div className={styles.spaceBigNumber}>
              <strong>{formatSar(cloudSpacesTargetMonthly)}</strong>
              <span>ر.س / شهر</span>
              <small>{formatSar(cloudSpacesTargetAnnual)} ر.س سنويًا</small>
            </div>

            <p className={styles.spaceTargetText}>
              إلغاء الاشتراك الثاني، والانتقال إلى مزوّد واحد بحسب الخيار
              المعتمد.
            </p>

            <div className={styles.targetOptions}>
              {mergeOptions.map((option) => (
                <span className={styles.targetOption} key={option.id}>
                  <img src={option.logo} alt="" />
                  {option.name} · {formatSar(option.monthly)} ر.س
                </span>
              ))}
            </div>

            <div className={styles.savingChip}>
              <span>التوفير المتوقع</span>
              <strong>{formatSar(cloudSpacesMonthlySaving)} ر.س / شهر</strong>
              <span>{formatSar(cloudSpacesAnnualSaving)} ر.س / سنة</span>
            </div>
          </article>
        </div>

        <div className={styles.mergeGrid}>
          {mergeOptions.map((option) => (
            <article className={styles.mergeCard} key={option.id}>
              <header className={styles.mergeHead}>
                <span className={styles.mergeLogo}>
                  <img src={option.logo} alt="" />
                </span>
                <div className={styles.mergeIdentity}>
                  <span className={styles.mergeBadge}>
                    {option.id === "microsoft"
                      ? "الأقرب للوضع الحالي"
                      : "الأوسع مساحة"}
                  </span>
                  <h3>{option.title}</h3>
                  <p>{option.tagline}</p>
                </div>
                <div className={styles.mergePrice}>
                  <strong>{formatSar(option.monthly)}</strong>
                  <span>ر.س / شهر</span>
                </div>
              </header>

              <div className={styles.prosCons}>
                <div className={styles.pros}>
                  <h4>المزايا</h4>
                  <ul>
                    {option.pros.map((pro) => (
                      <li key={pro}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.cons}>
                  <h4>العيوب</h4>
                  <ul>
                    {option.cons.map((con) => (
                      <li key={con}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className={styles.bestFor}>
                <strong>الأفضل إذا:</strong> {option.bestFor}
              </p>
            </article>
          ))}
        </div>

        <div className={styles.compareBlock}>
          <div className={styles.compareHead}>
            <h3>مقارنة الخيارين</h3>
            <span>نفس التكلفة، والفرق في المساحة وOffice وGemini.</span>
          </div>

          <div className={styles.compareTableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr>
                  <th scope="col">المعيار</th>
                  <th scope="col">
                    <span className={styles.compareLogo}>
                      <img src={mergeOptions[0].logo} alt="" />
                    </span>
                    Microsoft
                  </th>
                  <th scope="col">
                    <span className={styles.compareLogo}>
                      <img src={mergeOptions[1].logo} alt="" />
                    </span>
                    Google
                  </th>
                </tr>
              </thead>
              <tbody>
                {cloudComparison.map((row) => (
                  <tr key={row.id}>
                    <th scope="row">{row.label}</th>
                    <td
                      className={
                        row.microsoftTone === "positive"
                          ? styles.positive
                          : row.microsoftTone === "negative"
                            ? styles.negative
                            : undefined
                      }
                    >
                      {row.microsoft}
                    </td>
                    <td
                      className={
                        row.googleTone === "positive"
                          ? styles.positive
                          : row.googleTone === "negative"
                            ? styles.negative
                            : undefined
                      }
                    >
                      {row.google}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.recommendation}>
          <span className={styles.recommendationBadge}>الخلاصة</span>
          <div>
            <h3 className={styles.recommendationTitle}>
              الدمج على Google أوسع، والدمج على Microsoft أقرب للوضع الحالي.
            </h3>
            <p className={styles.recommendationText}>
              الخياران بتكلفة ١٬٠٠٠ ر.س شهريًا. Google يمنح ١ تيرا لكل موظف
              وGemini، لكنه لا يشمل Office. Microsoft يحافظ على Office والوضع
              الحالي، لكن المساحة محدودة (١ تيرا) وكل تيرا إضافية ٢٠٠ ر.س.
              القرار يعتمد على عدد الموظفين الذين يحتاجون Office فعليًا: إذا
              كان Office أساسيًا لمعظم الفريق فـMicrosoft هو الخيار العملي،
              وإذا كان مقتصرًا على عدد محدود فـGoogle يوفّر مساحة أكبر.
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
            المصدر: تسويات العهدة (أبريل–أكتوبر ٢٠٢٦)، وطلبات الصرف
            (مايو–نوفمبر ٢٠٢٦)، وصورة المساحات الحالية والمستهدفة. استُخدمت
            آخر دورة سعرية متاحة لكل خدمة، واستُبعدت اشتراكات الذكاء الاصطناعي
            والتحويلات والبنود المكررة. الذكاء الاصطناعي يُحسب في القسم أعلاه
            بحسب المشاريع.
          </p>
        </div>
      </section>
    </div>
  );
}
