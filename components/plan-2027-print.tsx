import {
  calculatePlan,
  formatEngineerCount,
  formatPlanNumber,
  formatProductCount,
  planAllSelected,
  planDefaults,
  planTeam,
} from "@/lib/plan-2027";

export function Plan2027Print() {
  const calc = calculatePlan(planAllSelected, planDefaults.units);
  const fullEngineers = Math.floor(calc.engineers);
  const partTimeEngineers = calc.engineers % 1 > 0 ? 1 : 0;
  const additionalFullEngineers = Math.floor(calc.additional.engineers);
  const additionalPartTimeEngineers =
    calc.additional.engineers % 1 > 0 ? 1 : 0;

  return (
    <div className="plan-print">
      <h3>ملخص الخطة</h3>

      <div className="plan-print-stats">
        <div>
          <span>عدد المنتجات المتوقعة</span>
          <strong>{formatPlanNumber(calc.products)}</strong>
        </div>
        <div>
          <span>المشاريع المؤكدة</span>
          <strong>{formatPlanNumber(calc.selectedCount)}</strong>
        </div>
        <div>
          <span>عدد الموظفين التقنيين المطلوبين</span>
          <strong>{formatPlanNumber(calc.total)}</strong>
          <small>بدوام كامل مكافئ</small>
        </div>
      </div>

      <h4>المشاريع</h4>
      <table className="week-table plan-print-table">
        <thead>
          <tr>
            <th scope="col">المشروع</th>
            <th scope="col">المنتجات</th>
            <th scope="col">المهندسون</th>
            <th scope="col">مدير منتجات</th>
            <th scope="col">مختبر</th>
          </tr>
        </thead>
        <tbody>
          {calc.selected.map((project) => (
            <tr key={project.id}>
              <th scope="row">
                {project.name}
                {project.note ? <small>{project.note}</small> : null}
              </th>
              <td>{formatProductCount(project.computedProducts)}</td>
              <td>
                {project.computedEngineers > 0
                  ? formatEngineerCount(project.computedEngineers)
                  : "—"}
              </td>
              <td>{project.projectManagers > 0 ? "نعم" : "—"}</td>
              <td>{project.testers > 0 ? "نعم" : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>الفريق المطلوب</h4>
      <table className="week-table plan-print-table plan-print-team">
        <thead>
          <tr>
            <th scope="col">الدور</th>
            <th scope="col">العدد</th>
            <th scope="col">الأسماء / الملاحظات</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">مدير تقني</th>
            <td>{formatPlanNumber(calc.director)}</td>
            <td>{planTeam.director}</td>
          </tr>
          <tr>
            <th scope="row">مدير منتجات</th>
            <td>{formatPlanNumber(calc.projectManagers)}</td>
            <td>
              {planTeam.productManager}
              {calc.additional.projectManagers > 0
                ? ` + ${formatPlanNumber(calc.additional.projectManagers)} إضافي`
                : ""}
            </td>
          </tr>
          <tr>
            <th scope="row">مهندس برمجيات — دوام كامل</th>
            <td>{formatPlanNumber(fullEngineers)}</td>
            <td>
              {calc.engineers > 0 ? planTeam.engineers.join("، ") : "—"}
              {additionalFullEngineers > 0
                ? ` + ${formatPlanNumber(additionalFullEngineers)} إضافي`
                : ""}
            </td>
          </tr>
          <tr>
            <th scope="row">مهندس برمجيات — دوام جزئي</th>
            <td>{formatPlanNumber(partTimeEngineers)}</td>
            <td>
              {partTimeEngineers > 0 ? "مهندس جزئي إضافي" : "—"}
            </td>
          </tr>
          <tr>
            <th scope="row">مختبر</th>
            <td>{formatPlanNumber(calc.testers)}</td>
            <td>{calc.testers > 0 ? "مختبر إضافي" : "—"}</td>
          </tr>
          <tr>
            <th scope="row">الإجمالي</th>
            <td>{formatPlanNumber(calc.total)}</td>
            <td>بدوام كامل مكافئ</td>
          </tr>
        </tbody>
      </table>

      <p className="plan-print-note">
        الفريق الحالي {formatPlanNumber(calc.baseTotal)}: {planTeam.director}، {planTeam.productManager}،{" "}
        {planTeam.engineers.join("، ")}. المطلوب إضافته:{" "}
        {formatPlanNumber(calc.additional.projectManagers)} مدير منتجات،{" "}
        {formatPlanNumber(additionalFullEngineers)} مهندس دوام كامل،{" "}
        {formatPlanNumber(additionalPartTimeEngineers)} مهندس دوام جزئي،{" "}
        {formatPlanNumber(calc.additional.testers)} مختبر.
      </p>
    </div>
  );
}
