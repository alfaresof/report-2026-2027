"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { reportMeta, topics } from "@/lib/topics";
import { assetPath } from "@/lib/base-path";
import { toArabicDigits } from "@/lib/format";

export function HomeLanding() {
  const [topicsOpen, setTopicsOpen] = useState(false);
  const topicsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!topicsOpen) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      topicsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [topicsOpen]);

  const handleTopicsToggle = () => {
    const next = !topicsOpen;
    setTopicsOpen(next);

    if (!next) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="hero home-hero">
        <div className="container">
          <div className="hero-topline home-topline">
            <a
              href="https://ryadh.com.sa"
              className="hero-logo-link"
              aria-label="الريادة الاجتماعية"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={assetPath("/logos/riyadh.svg")}
                alt="الريادة الاجتماعية"
                className="hero-logo"
                width={215}
                height={96}
              />
            </a>
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
                به العام القادم. {toArabicDigits(topics.length, 1)} محاور تُقرأ
                واحدة واحدة.
              </p>

              <div className="hero-actions">
                <button
                  type="button"
                  className="btn btn-gold"
                  aria-expanded={topicsOpen}
                  aria-controls="home-topics"
                  onClick={handleTopicsToggle}
                >
                  {topicsOpen ? "إخفاء المحاور" : "استعرض المحاور"}
                  <ArrowLeftIcon size={17} />
                </button>
              </div>

              <div className="hero-note">
                <span className="status-dot" aria-hidden="true" />
                {reportMeta.status}
                <span className="hero-note-sep" aria-hidden="true" />
                {toArabicDigits(topics.length, 1)} محاور
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="cover-card">
                <span className="cover-badge">
                  <strong>{toArabicDigits(topics.length, 1)}</strong>
                  <span>محاور</span>
                </span>

                <div className="cover-brand">
                  <img
                    src={assetPath("/logos/riyadh-bw.svg")}
                    alt=""
                    width={215}
                    height={96}
                  />
                </div>

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

      {topicsOpen ? (
        <section
          className="home-topics"
          id="home-topics"
          ref={topicsRef}
          aria-labelledby="home-topics-title"
        >
          <div className="container">
            <div className="home-topics-head">
              <div>
                <p className="eyebrow">
                  <span className="eyebrow-rule" />
                  فهرس التقرير
                </p>
                <h2 id="home-topics-title">المحاور</h2>
              </div>
              <button
                type="button"
                className="btn btn-line btn-sm"
                onClick={handleTopicsToggle}
              >
                إغلاق
              </button>
            </div>

            <div className="topic-list topic-list-home">
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
          </div>
        </section>
      ) : null}
    </>
  );
}
