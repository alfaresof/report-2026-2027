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
  const initialId =
    weeks.find((week) => week.tone === "green")?.id ?? weeks[0]?.id ?? "";
  const [selectedId, setSelectedId] = useState(initialId);
  const selectedWeek =
    weeks.find((week) => week.id === selectedId) ??
    weeks.find((week) => week.tone === "green") ??
    weeks[0];

  return (
    <div className="december">
      <div className="cal-legend" aria-label="دليل ألوان الأسابيع">
        <span className="cal-legend-item">
          <span className="cal-legend-dot is-red" aria-hidden="true" />
          غير موصى به
        </span>
        <span className="cal-legend-item">
          <span className="cal-legend-dot is-orange" aria-hidden="true" />
          ممكن مع تحفظ
        </span>
        <span className="cal-legend-item">
          <span className="cal-legend-dot is-green" aria-hidden="true" />
          توصيتنا
        </span>
      </div>

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
                className={`cal-week tone-${week.tone}${
                  isSelected ? " is-selected" : ""
                }`}
                aria-pressed={isSelected}
                aria-label={`${week.label}: ${week.dates} — ${week.tag}`}
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
        <div
          className={`cal-panel tone-${selectedWeek.tone}`}
          id="week-assessment"
          aria-live="polite"
        >
          <div className="cal-panel-body" key={selectedWeek.id}>
            <div className="cal-panel-head">
              <span className="cal-panel-kicker">تقييم الأسبوع</span>
              <h3>{selectedWeek.label}</h3>
              <span className="cal-panel-dates">{selectedWeek.dates}</span>
              <span className="cal-panel-status">{selectedWeek.tag}</span>
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
