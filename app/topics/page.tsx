import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";
import { reportMeta, topics } from "@/lib/topics";
import { toArabicDigits } from "@/lib/format";

export const metadata: Metadata = {
  title: "فهرس المحاور",
  description:
    "فهرس محاور تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧: الإجازة، إنجازات الشباب، خطة ٢٠٢٧ (الشباب والعقود)، هيكلة القسم التقني، الذكاء الاصطناعي، الجمعيات، والعهد التقنية، واجتماع أوقاف حسنى.",
};

export default function TopicsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link href="/">الرئيسية</Link>
            <span aria-hidden="true">·</span>
            <span>فهرس المحاور</span>
          </nav>

          <p className="eyebrow">
            <span className="eyebrow-rule" />
            فهرس التقرير
          </p>

          <h1>محاور التقرير</h1>
          <p className="page-lead">
            {toArabicDigits(topics.length, 1)} محاور تغطي إغلاق ٢٠٢٦، والقرارات،
            وخطة ٢٠٢٧. كل محور صفحة مستقلة: ما يغطيه، والأسئلة التي يجيب عنها،
            ثم التفاصيل بعد الاعتماد.
          </p>

          <div className="page-meta">
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {reportMeta.status}
            </span>
            <span>{toArabicDigits(topics.length, 1)} محاور</span>
            <span>آخر تحديث: {reportMeta.date}</span>
            <Link href="/print/" className="text-link">
              النسخة الكاملة PDF
              <ArrowLeftIcon size={14} />
            </Link>
          </div>
        </div>
      </header>

      <section className="index-section">
        <div className="container">
          <div className="topic-list topic-list-page">
            {topics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/report/${topic.slug}/`}
                className="topic-row"
              >
                <span className="topic-num">{topic.number}</span>
                <span className="topic-body">
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-short">{topic.short}</span>
                </span>
                <span className="topic-chip">{topic.category}</span>
                <span className="topic-arrow">
                  <ArrowLeftIcon size={16} />
                </span>
              </Link>
            ))}
          </div>

          <div className="list-foot">
            <span className="list-foot-note">
              اضغط على أي محور لعرض صفحته وأسئلته.
            </span>
            <Link href="/print/" className="text-link">
              تحميل النسخة الكاملة PDF
              <ArrowLeftIcon size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
