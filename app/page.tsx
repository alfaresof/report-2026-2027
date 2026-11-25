import Link from "next/link";
import { reportMeta } from "@/lib/topics";
import { toArabicDigits } from "@/lib/format";
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
                <Link href="/topics/" className="btn btn-gold">
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
                {toArabicDigits(reportMeta.topicCount)} محاور
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="cover-card">
                <span className="cover-badge">
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

      <section className="home-intro">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-rule" />
                عن التقرير
              </p>
              <h2>
                من إغلاق ٢٠٢٦
                <span className="heading-muted"> إلى خطة ٢٠٢٧.</span>
              </h2>
            </div>

            <div className="home-intro-copy">
              <p className="section-side">
                عشرة محاور مرتبة: ما نُغلقه في ٢٠٢٦، والقرارات التي لا تحتمل
                التأجيل، ثم خطة العام القادم للشباب والعقود وكفاءة العمل
                والذكاء الاصطناعي والشراكات.
              </p>
              <Link href="/topics/" className="text-link home-intro-link">
                افتح فهرس المحاور
                <ArrowLeftIcon size={15} />
              </Link>
            </div>
          </div>
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
