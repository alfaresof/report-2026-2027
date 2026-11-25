import Link from "next/link";
import { LogoMark } from "@/components/icons";
import { reportMeta } from "@/lib/topics";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <LogoMark className="footer-mark" />
          <div>
            <p className="footer-title">{reportMeta.title}</p>
            <p className="footer-note">
              وثيقة عمل داخلية · {reportMeta.date}
            </p>
          </div>
        </div>

        <div className="footer-links" aria-label="روابط التذييل">
          <Link href="/">الرئيسية</Link>
          <Link href="/topics/">فهرس المحاور</Link>
          <Link href="/print/">نسخة PDF</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>أُعدّ للمراجعة والاعتماد قبل التوزيع.</p>
        <p className="footer-count">{reportMeta.topicCount} محاور · ٢٠٢٦ → ٢٠٢٧</p>
      </div>
    </footer>
  );
}
