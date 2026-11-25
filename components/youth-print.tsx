import {
  formatAppCount,
  formatFeatureCount,
  formatYouthNumber,
  youthTotals,
} from "@/lib/youth-format";
import type { YouthPerson } from "@/lib/youth";

export function YouthPrint({ people }: { people: YouthPerson[] }) {
  return (
    <div className="youth-print-block">
      <h3>إحصائية العمل</h3>

      <table className="week-table youth-print-table">
        <thead>
          <tr>
            <th scope="col">الشاب</th>
            <th scope="col">عدد الأسطر البرمجية المكتوبة</th>
            <th scope="col">عدد الميزات المنفذة</th>
            <th scope="col">عدد المنتجات التي عمل عليها</th>
            <th scope="col">عدد التطبيقات</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => {
            const totals = youthTotals(person);

            return (
              <tr key={person.id}>
                <th scope="row">{person.name}</th>
                <td>{formatYouthNumber(person.lines)}</td>
                <td>{formatYouthNumber(totals.features)}</td>
                <td>{formatYouthNumber(totals.products)}</td>
                <td>{formatYouthNumber(totals.apps)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="youth-print-tasks">
        {people.map((person) => (
          <section className="youth-print-person" key={person.id}>
            <h4>
              {person.name}
              <span>ملخص المهام</span>
            </h4>

            <div className="print-solutions">
              {person.solutions.map((solution) => (
                <section className="print-solution" key={solution.id}>
                  <div className="print-solution-head">
                    <span className="print-solution-logo">
                      <img src={solution.logo} alt="" width={44} height={32} />
                    </span>
                    <h5>{solution.name}</h5>
                    <span>{formatAppCount(solution.apps.length)}</span>
                  </div>

                  <ul>
                    {solution.apps.map((app) => (
                      <li key={`${solution.id}-${app.name}`}>
                        <span>{app.name}</span>
                        <span>{formatFeatureCount(app.features)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
