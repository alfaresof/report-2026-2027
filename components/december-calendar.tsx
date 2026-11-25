"use client";

import { useState } from "react";
import { DecemberWeekTable } from "@/components/december-week-table";
import { toArabicDigits } from "@/lib/format";
import type { DecemberWeek } from "@/lib/topics";

const weekdays = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

export function DecemberCalendar({ weeks }: { weeks: DecemberWeek[] }) {
  const [selectedId, setSelectedId] = useState(weeks[0]?.id ?? "");
  const selectedWeek =
    weeks.find((week) => week.id === selectedId) ?? weeks[0];

  return (
    <div className="december">
      <div className="cal-card">
        <div className="cal-weekdays" aria-hidden="true">
          <span className="cal-weekdays-label">الأسبوع</span>
          {weekdays.map((day, index) => (
            <span
              key={day}
              className={index >= 5 ? "is-weekend" : undefined}
            >
              {day}
            </span>
          ))}
        </div>

        <div className="cal-weeks" role="group" aria-label="أسابيع ديسمبر">
          {weeks.map((week) => {
            const isSelected = week.id === selectedWeek?.id;
            return (
              <button
                key={week.id}
                type="button"
                className={`cal-week${isSelected ? " is-selected" : ""}`}
                aria-pressed={isSelected}
                aria-label={`${week.label}: ${week.dates}`}
                onClick={() => setSelectedId(week.id)}
              >
                <span className="cal-week-meta">
                  <span className="cal-week-label">{week.label}</span>
                  <span className="cal-week-dates">{week.dates}</span>
                </span>

                {week.days.map((day, index) => (
                  <span
                    key={`${week.id}-${index}`}
                    className={`cal-day${day.weekend ? " is-weekend" : ""}${
                      day.outside ? " is-outside" : ""
                    }`}
                  >
                    <span className="cal-day-num">
                      {toArabicDigits(day.day, 1)}
                    </span>
                    {day.month ? (
                      <span className="cal-day-month">{day.month}</span>
                    ) : null}
                  </span>
                ))}
              </button>
            );
          })}
        </div>
      </div>

      {selectedWeek ? (
        <div className="cal-panel" id="week-assessment" aria-live="polite">
          <div className="cal-panel-body" key={selectedWeek.id}>
            <div className="cal-panel-head">
              <span className="cal-panel-kicker">تقييم الأسبوع</span>
              <h3>{selectedWeek.label}</h3>
              <span className="cal-panel-dates">{selectedWeek.dates}</span>
            </div>
            <p className="cal-verdict">{selectedWeek.assessment}</p>
          </div>
        </div>
      ) : null}

      <div className="calendar-print">
        <h3>ديسمبر ٢٠٢٦</h3>
        <DecemberWeekTable weeks={weeks} />
      </div>
    </div>
  );
}
