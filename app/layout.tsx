import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const body = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧",
    template: "%s · تقرير ٢٠٢٦–٢٠٢٧",
  },
  description:
    "محاور لمراجعة ٢٠٢٦ والتخطيط لـ ٢٠٢٧: الشباب، خطة ٢٠٢٧ والعقود، هيكلة القسم التقني، الذكاء الاصطناعي، الجمعيات، والعهد التقنية، واجتماع أوقاف حسنى.",
  applicationName: "تقرير ٢٠٢٦–٢٠٢٧",
  authors: [{ name: "فريق العمل" }],
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧",
    description:
      "مراجعة لما تحقق، وقرارات لما يجب أن يتغير، وتصور واضح لما نبدأ به العام القادم.",
    locale: "ar_SA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#223341",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={body.variable}
    >
      <body>
        <a className="skip-link" href="#main">
          تخطَّ إلى المحتوى
        </a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
