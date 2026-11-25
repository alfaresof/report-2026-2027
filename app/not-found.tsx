import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container not-found-inner">
        <p className="eyebrow">
          <span className="eyebrow-rule" />
          خطأ ٤٠٤
        </p>
        <h1>هذا المحور غير موجود.</h1>
        <p>
          ربما تغيّر الرابط أو أن المحور لم يُضف بعد. العودة إلى الفهرس تعرض
          المحاور كاملة.
        </p>
        <Link href="/topics/" className="btn btn-ink">
          <ArrowRightIcon size={16} />
          العودة إلى الفهرس
        </Link>
      </div>
    </section>
  );
}
