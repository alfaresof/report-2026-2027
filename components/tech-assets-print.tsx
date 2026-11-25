import { formatSar, formatUsd } from "@/lib/format";
import {
  aiProjects,
  aiRates,
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

function annualOf(service: { monthly?: number; annual?: number }): number {
  return service.monthly ? service.monthly * 12 : service.annual ?? 0;
}

export function TechAssetsPrint() {
  const services = serviceGroups.flatMap((group) => group.services);
  const aiAnnual = aiProjects.reduce(
    (total, project) =>
      total +
      (project.defaultFull * aiRates.full +
        project.defaultPart * aiRates.part) *
        12,
    0,
  );

  return (
    <div className="tech-assets-print-block">
      <section className="tech-assets-print-summary">
        <div>
          <span>الاشتراكات التقنية</span>
          <strong>{formatSar(serviceAnnualTotal)}</strong>
          <span>ر.س / سنة</span>
        </div>
        <div>
          <span>المساحات الحالية</span>
          <strong>{formatSar(cloudSpacesCurrentMonthlyTotal)}</strong>
          <span>ر.س / شهر · {formatSar(cloudSpacesCurrentAnnualTotal)} سنويًا</span>
        </div>
        <div>
          <span>الإجمالي الحالي</span>
          <strong>{formatSar(techAssetsCurrentAnnual)}</strong>
          <span>ر.س / سنة</span>
        </div>
        <div>
          <span>الهدف بعد الدمج</span>
          <strong>{formatSar(techAssetsTargetAnnual)}</strong>
          <span>ر.س / سنة · وفر {formatSar(cloudSpacesAnnualSaving)}</span>
        </div>
      </section>

      <section className="tech-assets-print-section">
        <h3>الاشتراكات التقنية ٢٠٢٧</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>الخدمة</th>
              <th>البند</th>
              <th>شهريًا</th>
              <th>سنويًا</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.label}</td>
                <td>
                  {service.monthly ? `${formatSar(service.monthly)} ر.س` : "—"}
                </td>
                <td>{formatSar(annualOf(service))} ر.س</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>إجمالي الاشتراكات</td>
              <td>{formatSar(serviceAnnualTotal)} ر.س</td>
            </tr>
          </tfoot>
        </table>
        <p className="tech-assets-print-note">
          الأسعار شاملة الضريبة، ومبنية على آخر دورة سعرية في فواتير ٢٠٢٦.
          الاشتراكات الشهرية محسوبة ×١٢. لا يشمل الذكاء الاصطناعي.
        </p>
      </section>

      <section className="tech-assets-print-section">
        <h3>المساحات السحابية — الوضع الحالي</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>المزوّد</th>
              <th>شهريًا</th>
              <th>سنويًا</th>
            </tr>
          </thead>
          <tbody>
            {cloudSpacesCurrent.map((space) => (
              <tr key={space.id}>
                <td>{space.name}</td>
                <td>{formatSar(space.monthly)} ر.س</td>
                <td>{formatSar(space.monthly * 12)} ر.س</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>الإجمالي</td>
              <td>{formatSar(cloudSpacesCurrentMonthlyTotal)} ر.س</td>
              <td>{formatSar(cloudSpacesCurrentAnnualTotal)} ر.س</td>
            </tr>
          </tfoot>
        </table>
        <p className="tech-assets-print-note">
          الوضع الحالي: مزوّدان في الوقت نفسه. الهدف دمج المساحات والبريد في
          مزوّد واحد، بتكلفة تقديرية {formatSar(cloudSpacesTargetMonthly)} ر.س
          شهريًا ({formatSar(cloudSpacesTargetAnnual)} ر.س سنويًا)، أي توفير{" "}
          {formatSar(cloudSpacesMonthlySaving)} ر.س شهريًا و
          {formatSar(cloudSpacesAnnualSaving)} ر.س سنويًا.
        </p>
      </section>

      <section className="tech-assets-print-section">
        <h3>خيارات الدمج</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>الخيار</th>
              <th>شهريًا</th>
              <th>سنويًا</th>
              <th>المزايا</th>
              <th>العيوب</th>
            </tr>
          </thead>
          <tbody>
            {mergeOptions.map((option) => (
              <tr key={option.id}>
                <td>{option.title}</td>
                <td>{formatSar(option.monthly)} ر.س</td>
                <td>{formatSar(option.annual)} ر.س</td>
                <td>{option.pros.join(" · ")}</td>
                <td>{option.cons.join(" · ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="tech-assets-print-note">
          الخياران بتكلفة تقديرية واحدة. الفرق في المساحة وOffice وGemini،
          والقرار يعتمد على عدد الموظفين الذين يحتاجون Office فعليًا.
        </p>
      </section>

      <section className="tech-assets-print-section">
        <h3>مقارنة الخيارين</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>المعيار</th>
              <th>Microsoft</th>
              <th>Google</th>
            </tr>
          </thead>
          <tbody>
            {cloudComparison.map((row) => (
              <tr key={row.id}>
                <td>{row.label}</td>
                <td>{row.microsoft}</td>
                <td>{row.google}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="tech-assets-print-note">
          الدمج على Google أوسع (١ تيرا لكل موظف) وGemini مشمول، لكنه لا يشمل
          Office. الدمج على Microsoft يحافظ على Office والوضع الحالي، لكن
          المساحة المشتركة محدودة (١ تيرا) وكل تيرا إضافية ٢٠٠ ر.س.
        </p>
      </section>

      <section className="tech-assets-print-section">
        <h3>الذكاء الاصطناعي — التقدير الافتراضي ٢٠٢٧</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>المشروع</th>
              <th>دوام كامل</th>
              <th>دوام جزئي</th>
              <th>سنويًا (دولار)</th>
              <th>سنويًا (ريال)</th>
            </tr>
          </thead>
          <tbody>
            {aiProjects.map((project) => {
              const usd =
                (project.defaultFull * aiRates.full +
                  project.defaultPart * aiRates.part) *
                12;
              return (
                <tr key={project.id}>
                  <td>{project.name}</td>
                  <td>{formatSar(project.defaultFull)}</td>
                  <td>{formatSar(project.defaultPart)}</td>
                  <td>{formatUsd(usd)}</td>
                  <td>{formatSar(usd * aiRates.usdToSar)} ر.س</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>الإجمالي</td>
              <td>{formatUsd(aiAnnual)}</td>
              <td>{formatSar(aiAnnual * aiRates.usdToSar)} ر.س</td>
            </tr>
          </tfoot>
        </table>
        <p className="tech-assets-print-note">
          لكل موظف: ١٠٠ دولار شهريًا للدوام الكامل، و٢٠ دولارًا للدوام الجزئي.
          التحويل إلى الريال بسعر ٣٫٧٥. هذا البند مستقل عن العهد التقنية
          والمساحات.
        </p>
      </section>
    </div>
  );
}
