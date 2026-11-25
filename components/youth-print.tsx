import type { YouthPerson } from "@/lib/youth";

const numberFormatter = new Intl.NumberFormat("ar-EG");

const formatNumber = (value: number | null) =>
  value === null || !Number.isFinite(value)
    ? "—"
    : numberFormatter.format(value);

export function YouthPrint({ people }: { people: YouthPerson[] }) {
  return (
    <div className="youth-print-block">
      <h3>إحصائية العمل</h3>

      <table className="week-table youth-print-table">
        <thead>
          <tr>
            <th scope="col">الشاب</th>
            <th scope="col">المنتجات</th>
            <th scope="col">عدد الأسطر البرمجية المكتوبة</th>
            <th scope="col">عدد الميزات المنفذة</th>
            <th scope="col">عدد المنتجات التي عمل عليها</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id}>
              <th scope="row">{person.name}</th>
              <td>{person.products.join("، ")}</td>
              <td>{formatNumber(person.lines)}</td>
              <td>{formatNumber(person.features)}</td>
              <td>{formatNumber(person.productsCount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="youth-print-tasks">
        {people.map((person) => {
          const tasks = person.tasks
            .filter((task) => task.trim().length > 0)
            .slice(0, 15);

          return (
            <section key={`${person.id}-tasks`}>
              <h4>
                {person.name}
                <span>ملخص المهام</span>
              </h4>
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map((task, index) => (
                    <li key={`${person.id}-${index}`}>{task}</li>
                  ))}
                </ul>
              ) : (
                <p>—</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
