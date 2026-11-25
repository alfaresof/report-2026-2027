import type { Metadata } from "next";
import Link from "next/link";
import { PrintButton } from "@/components/print-button";
import { LogoMark, ArrowRightIcon } from "@/components/icons";
import { DecemberWeekTable } from "@/components/december-week-table";
import { YouthPrint } from "@/components/youth-print";
import { reportMeta, topics } from "@/lib/topics";
import { toArabicDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "النسخة الكاملة",
  description:
    "النسخة الكاملة من تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧، جاهزة للطباعة أو الحفظ كملف PDF.",
};

export default function PrintPage() {
  return (
    <div className="print-wrap">
      <div className="print-toolbar no-print">
        <div className="container print-toolbar-inner">
          <div>
            <p className="eyebrow">
              <span className="eyebrow-rule" />
              النسخة الكاملة
            </p>
            <h1>{reportMeta.title}</h1>
            <p>
              اضغط «طباعة / حفظ PDF»، ثم اختر «حفظ كملف PDF» من نافذة الطباعة.
              الملف يُحفظ على جهازك مباشرة.
            </p>
          </div>

          <div className="toolbar-actions">
            <Link href="/topics/" className="btn btn-line">
              <ArrowRightIcon size={16} />
              العودة للفهرس
            </Link>
            <PrintButton label="طباعة / حفظ PDF" />
          </div>
        </div>
      </div>

      <div className="container">
        <article className="print-doc">
          <section className="print-cover">
            <div className="print-cover-top">
              <span className="print-brand">
                <LogoMark />
                تقرير ٢٠٢٦–٢٠٢٧
              </span>
              <span>{reportMeta.date}</span>
            </div>

            <div className="print-cover-body">
              <p className="eyebrow">
                <span className="eyebrow-rule" />
                وثيقة عمل داخلية
              </p>
              <h2>
                تقرير ختام <span>٢٠٢٦</span>{" "}
                <span className="print-cover-next">وخطة ٢٠٢٧</span>
              </h2>
              <p className="print-cover-desc">
                مراجعة لما تحقق، وقرارات لما يجب أن يتغير، وتصور واضح لما نبدأ
                به العام القادم. عشرة محاور تُقرأ واحدة واحدة.
              </p>
            </div>

            <div className="print-cover-index">
              <p className="print-index-title">المحاور</p>
              <ol>
                {topics.map((topic) => (
                  <li key={topic.slug}>
                    <span>{topic.number}</span>
                    {topic.title}
                  </li>
                ))}
              </ol>
            </div>

            <div className="print-cover-foot">
              <span>{reportMeta.status}</span>
              <span>
                {toArabicDigits(reportMeta.topicCount)} محاور · {reportMeta.edition}
              </span>
            </div>
          </section>

          {topics.map((topic) => (
            <section className="print-topic" key={topic.slug}>
              <header>
                <span className="print-topic-num">{topic.number}</span>
                <p className="print-topic-cat">{topic.category}</p>
                <h2>{topic.title}</h2>
                {topic.lead ? (
                  <p className="print-topic-lead">{topic.lead}</p>
                ) : null}
              </header>

              {topic.youthPeople ? (
                <YouthPrint people={topic.youthPeople} />
              ) : topic.leaveCalendar ? (
                <div className="print-calendar">
                  <h3>ديسمبر ٢٠٢٦</h3>
                  <DecemberWeekTable weeks={topic.leaveCalendar} />
                </div>
              ) : (
                <>
                  <div className="print-sections">
                    {topic.sections.map((section, sectionIndex) => (
                      <section className="print-section" key={section.title}>
                        <h3>
                          <span>{toArabicDigits(sectionIndex + 1)}</span>
                          {section.title}
                        </h3>
                        <p>{section.summary}</p>
                      </section>
                    ))}
                  </div>

                  {topic.questions.length > 0 ? (
                    <div className="print-questions">
                      <h3>أسئلة المحور</h3>
                      <ul>
                        {topic.questions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              )}
            </section>
          ))}

          <div className="print-end no-print">
            <PrintButton label="طباعة / حفظ PDF" className="btn btn-ink" />
          </div>
        </article>
      </div>
    </div>
  );
}
