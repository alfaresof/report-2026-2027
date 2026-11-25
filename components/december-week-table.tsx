import type { DecemberWeek } from "@/lib/topics";

export function DecemberWeekTable({ weeks }: { weeks: DecemberWeek[] }) {
  return (
    <table className="week-table">
      <thead>
        <tr>
          <th scope="col">الأسبوع</th>
          <th scope="col">الفترة</th>
          <th scope="col">الحالة</th>
          <th scope="col">التقييم</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week) => (
          <tr key={week.id}>
            <th scope="row">{week.label}</th>
            <td>{week.dates}</td>
            <td>
              <span className={`week-status tone-${week.tone}`}>
                <span className="week-status-dot" aria-hidden="true" />
                {week.tag}
              </span>
            </td>
            <td>{week.assessment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
