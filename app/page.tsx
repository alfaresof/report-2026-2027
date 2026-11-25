import Link from "next/link";
import { topics, reportMeta } from "@/lib/topics";
import { ArrowLeftIcon, DownloadIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-topline">
            <span className="hero-kicker">
              <span className="pulse-dot" aria-hidden="true" />
              وثيقة عمل داخلية
            </span>
            <span>{reportMeta.date}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy">
              <h1>
                تقرير ختام <span className="hero-year">٢٠٢٦</span>{" "}
                <br />
                <span className="hero-next">وخطة ٢٠٢٧</span>
              </h1>

              <p className="hero-desc">
                مراجعة لما تحقق، وقرارات لما يجب أن يتغير، وتصور واضح لما نبدأ
                به العام القادم. عشرة محاور تُقرأ واحدة واحدة.
              </p>

              <div className="hero-actions">
                <Link href="#index" className="btn btn-gold">
                  استعرض المحاور
                  <ArrowLeftIcon size={17} />
                </Link>
                <Link href="/print/" className="btn btn-ghost">
                  <DownloadIcon size={17} />
                  تحميل PDF
                </Link>
              </div>

              <div className="hero-note">
                <span className="status-dot" aria-hidden="true" />
                {reportMeta.status}
                <span className="hero-note-sep" aria-hidden="true" />
                {reportMeta.topicCount} محاور
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="cover-card">
                <span className="cover-badge" aria-hidden="true">
                  <strong>١٠</strong>
                  <span>محاور</span>
                </span>

                <div className="cover-head">
                  <span>وثيقة العمل</span>
                  <span>٢٠٢٦ / ٢٠٢٧</span>
                </div>

                <div className="cover-years">
                  <div className="cover-year">
                    <span className="cover-year-num">٢٠٢٦</span>
                    <span className="cover-year-label">المراجعة</span>
                  </div>
                  <span className="cover-arrow" aria-hidden="true">
                    ←
                  </span>
                  <div className="cover-year">
                    <span className="cover-year-num is-gold">٢٠٢٧</span>
                    <span className="cover-year-label">الخطة</span>
                  </div>
                </div>

                <p className="cover-line">ما تحقق · ما يتغير · ما نبدأ به</p>

                <div className="cover-foot">
                  <span>نسخة أولى</span>
                  <span>نوفمبر ٢٠٢٦</span>
                </div>
              </div>
            </div>
          </div>

          <ol className="hero-phases">
            <li>
              <span>٠١</span>
              نُغلق ٢٠٢٦
            </li>
            <li>
              <span>٠٢</span>
              نحسم القرارات
            </li>
            <li>
              <span>٠٣</span>
              نبدأ ٢٠٢٧
            </li>
          </ol>
        </div>
      </section>

      <section className="index-section" id="index">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" />
                الفهرس
              </p>
              <h2>
                عشرة محاور،
                <span className="heading-muted"> صفحة لكل واحد.</span>
              </h2>
            </div>
            <p className="section-side">
              اضغط على أي محور لعرض تفاصيله وأسئلته. المحتوى التفصيلي يُضاف
              تباعًا بعد الاعتماد.
            </p>
          </div>

          <div className="topic-list">
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
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {reportMeta.status}
            </span>
            <Link href="/print/" className="text-link">
              تحميل النسخة الكاملة PDF
              <ArrowLeftIcon size={15} />
            </Link>
          </div>
        </div>
      </section>

      <section className="approach" id="approach">
        <div className="container">
          <div className="section-head approach-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" />
                طريقة القراءة
              </p>
              <h2>ثلاث حركات، لا أكثر.</h2>
            </div>
            <p className="section-side">
              التقرير مرتب بهذا المنطق: نغلق ما انتهى، نحسم ما يحتاج قرارًا، ثم
              نبدأ العام بخطة واضحة.
            </p>
          </div>

          <ol className="approach-grid">
            <li className="approach-card">
              <span className="approach-num">٠١</span>
              <h3>نُغلق ٢٠٢٦</h3>
              <p>
                إجازة ديسمبر، وإنجازات الشباب، والعهد والمساحات: ملفات تُقفل
                قبل نهاية العام.
              </p>
            </li>
            <li className="approach-card">
              <span className="approach-num">٠٢</span>
              <h3>نحسم القرارات</h3>
              <p>
                كفاءة العمل، واستمرار سيف: قرارات واضحة لا تُترك لبداية العام.
              </p>
            </li>
            <li className="approach-card">
              <span className="approach-num">٠٣</span>
              <h3>نبدأ ٢٠٢٧</h3>
              <p>
                خطة الشباب، والعقود، والذكاء الاصطناعي، والجمعيات، واجتماع أوقاف
                حسنى.
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section className="download-band">
        <div className="container download-inner">
          <div>
            <p className="eyebrow eyebrow-light">
              <span className="eyebrow-rule" />
              النسخة الكاملة
            </p>
            <h2>التقرير في مستند واحد، جاهز للطباعة.</h2>
            <p className="download-desc">
              نسخة نظيفة بكل المحاور، تُحفظ PDF من المتصفح أو تُطبع للاجتماع.
            </p>
          </div>
          <Link href="/print/" className="btn btn-gold">
            <DownloadIcon size={17} />
            افتح نسخة PDF
          </Link>
        </div>
      </section>
    </>
  );
}
