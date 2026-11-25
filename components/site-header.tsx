import Link from "next/link";
import { DownloadIcon, LogoMark } from "@/components/icons";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="العودة إلى فهرس التقرير">
          <LogoMark className="brand-mark" />
          <span className="brand-text">
            <span className="brand-title">تقرير ٢٠٢٦–٢٠٢٧</span>
            <span className="brand-sub">ختام العام وخطة القادم</span>
          </span>
        </Link>

        <nav className="header-nav" aria-label="التنقل الرئيسي">
          <Link href="/topics/" className="nav-link">
            المحاور
          </Link>
          <Link href="/print/" className="btn btn-ink btn-sm header-cta">
            <DownloadIcon size={16} />
            <span>تحميل PDF</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
