import { formatSar, formatUsd } from "@/lib/format";
import {
  aiProjects,
  aiRates,
  cloudSpaces,
  cloudSpacesCurrentTotal,
  cloudSpacesTargetTotal,
  serviceAnnualTotal,
  serviceGroups,
  techAssetsTotal,
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
          <span>المساحات السحابية</span>
          <strong>{formatSar(cloudSpacesTargetTotal)}</strong>
          <span>ر.س / سنة</span>
        </div>
        <div>
          <span>إجمالي العهد التقنية</span>
          <strong>{formatSar(techAssetsTotal)}</strong>
          <span>ر.س / سنة</span>
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
        <h3>المساحات السحابية</h3>
        <table className="tech-assets-print-table">
          <thead>
            <tr>
              <th>المساحة</th>
              <th>الوضع الحالي</th>
              <th>تقدير ٢٠٢٧</th>
            </tr>
          </thead>
          <tbody>
            {cloudSpaces.map((space) => (
              <tr key={space.id}>
                <td>{space.name}</td>
                <td>{formatSar(space.current)} ر.س</td>
                <td>{formatSar(space.target)} ر.س</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>الإجمالي</td>
              <td>{formatSar(cloudSpacesCurrentTotal)} ر.س</td>
              <td>{formatSar(cloudSpacesTargetTotal)} ر.س</td>
            </tr>
          </tfoot>
        </table>
        <p className="tech-assets-print-note">
          التقدير على بقاء الوضع الحالي، مع نقل مساحة Google إلى باقة ١٬٠٠٠
          ريال. إذا بقيت على وضعها الحالي (٢٬٠٠٠ ريال) يصبح إجمالي المساحات
          ٣٬٠٠٠ ريال.
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
