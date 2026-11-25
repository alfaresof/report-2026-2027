import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ListIcon,
  PenIcon,
  QuestionIcon,
} from "@/components/icons";
import {
  getTopic,
  getTopicNeighbours,
  reportMeta,
  topics,
} from "@/lib/topics";
import { toArabicDigits } from "@/lib/format";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return topics.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    return { title: "محور غير موجود" };
  }

  return {
    title: topic.title,
    description: topic.lead,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  const { previous, next, index } = getTopicNeighbours(slug);

  return (
    <article className="topic-page">
      <header className="topic-hero">
        <div className="container topic-hero-inner">
          <div className="topic-seal" aria-hidden="true">
            <span className="topic-seal-label">المحور</span>
            <strong>{topic.number}</strong>
            <span className="topic-seal-total">من ١٠</span>
          </div>

          <nav className="breadcrumb" aria-label="مسار التنقل">
            <Link href="/">الفهرس</Link>
            <span aria-hidden="true">·</span>
            <span>المحور {topic.number}</span>
          </nav>

          <p className="eyebrow">
            <span className="eyebrow-rule" />
            {topic.category}
          </p>

          <h1>{topic.title}</h1>
          <p className="topic-lead">{topic.lead}</p>

          <div className="topic-meta">
            <span>
              المحور {toArabicDigits(index + 1)} من {toArabicDigits(topics.length)}
            </span>
            <span className="meta-dot" aria-hidden="true" />
            <span>آخر تحديث: {reportMeta.date}</span>
            <span className="meta-dot" aria-hidden="true" />
            <span className="draft-inline">{reportMeta.status}</span>
          </div>
        </div>
      </header>

      <div className="container topic-layout">
        <div className="topic-main">
          <section aria-labelledby="covers-title">
            <div className="block-head">
              <h2 id="covers-title">ما يغطيه هذا المحور</h2>
              <span className="count-label">
                {toArabicDigits(topic.sections.length)} أقسام
              </span>
            </div>

            <div className="section-list">
              {topic.sections.map((section, sectionIndex) => (
                <section
                  className="content-section"
                  id={`section-${sectionIndex + 1}`}
                  key={section.title}
                >
                  <span className="content-num">
                    {toArabicDigits(sectionIndex + 1)}
                  </span>
                  <div>
                    <div className="content-head">
                      <h3>{section.title}</h3>
                      <span className="draft-tag">
                        <span className="status-dot" aria-hidden="true" />
                        قيد التعبئة
                      </span>
                    </div>
                    <p>{section.summary}</p>
                  </div>
                </section>
              ))}
            </div>
          </section>

          <section
            className="questions-block"
            id="questions"
            aria-labelledby="questions-title"
          >
            <div className="questions-head">
              <QuestionIcon size={19} />
              <h2 id="questions-title">أسئلة يُجيب عنها المحور</h2>
            </div>
            <ul>
              {topic.questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </section>

          <div className="draft-note">
            <PenIcon size={18} />
            <div>
              <strong>هذه الصفحة جاهزة لاستقبال التفاصيل.</strong>
              <p>
                أرسل محتوى هذا المحور — النقاط، الأرقام، والصور إن وجدت —
                وسيُضاف هنا مباشرة، مع تحديث نسخة PDF.
              </p>
            </div>
          </div>

          <nav className="topic-nav" aria-label="التنقل بين المحاور">
            {previous ? (
              <Link
                href={`/report/${previous.slug}/`}
                className="topic-nav-card"
              >
                <span className="topic-nav-label">
                  <ArrowRightIcon size={13} />
                  المحور السابق
                </span>
                <span className="topic-nav-title">{previous.title}</span>
              </Link>
            ) : (
              <Link href="/" className="topic-nav-card">
                <span className="topic-nav-label">
                  <ListIcon size={13} />
                  الفهرس
                </span>
                <span className="topic-nav-title">كل المحاور العشرة</span>
              </Link>
            )}

            {next ? (
              <Link href={`/report/${next.slug}/`} className="topic-nav-card">
                <span className="topic-nav-label">
                  المحور التالي
                  <ArrowLeftIcon size={13} />
                </span>
                <span className="topic-nav-title">{next.title}</span>
              </Link>
            ) : (
              <Link href="/" className="topic-nav-card">
                <span className="topic-nav-label">
                  <ListIcon size={13} />
                  الفهرس
                </span>
                <span className="topic-nav-title">العودة إلى كل المحاور</span>
              </Link>
            )}
          </nav>
        </div>

        <aside className="topic-aside" aria-label="معلومات المحور">
          <div className="aside-card fact-card">
            <p className="aside-title">بطاقة المحور</p>
            <dl>
              <div>
                <dt>الترتيب</dt>
                <dd>
                  {topic.number} من {toArabicDigits(topics.length)}
                </dd>
              </div>
              <div>
                <dt>التصنيف</dt>
                <dd>{topic.category}</dd>
              </div>
              <div>
                <dt>الحالة</dt>
                <dd className="is-draft">مسودة</dd>
              </div>
              <div>
                <dt>آخر تحديث</dt>
                <dd>{reportMeta.date}</dd>
              </div>
            </dl>
          </div>

          <nav className="aside-card toc" aria-label="فهرس المحور">
            <p className="aside-title">في هذه الصفحة</p>
            <ol>
              {topic.sections.map((section, sectionIndex) => (
                <li key={section.title}>
                  <a href={`#section-${sectionIndex + 1}`}>{section.title}</a>
                </li>
              ))}
              <li>
                <a href="#questions">أسئلة المحور</a>
              </li>
            </ol>
          </nav>

          <PrintButton
            label="طباعة المحور"
            className="btn btn-line btn-block"
          />
          <p className="aside-note">
            تُفتح نافذة الطباعة، ويمكنك اختيار «حفظ PDF».
          </p>
        </aside>
      </div>
    </article>
  );
}
