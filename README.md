# تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧

موقع تقرير ثابت مبني بـ Next.js، يعرض عشرة محاور في صفحة فهرس، ولكل محور صفحة تفاصيل مستقلة، مع نسخة كاملة قابلة للطباعة أو الحفظ كملف PDF.

## التشغيل محليًا

```bash
npm install
npm run dev
```

ثم افتح `http://localhost:3000`.

## بناء نسخة الإنتاج

```bash
npm run build
```

يُولّد Next.js ملفات ثابتة في مجلد `out` (بسبب `output: "export"` في `next.config.ts`).

لمعاينة النسخة المبنية محليًا:

```bash
npm run preview
```

## تعديل المحتوى

كل نصوص التقرير موجودة في ملف واحد:

```
lib/topics.ts
```

لكل محور:

- `title` و`short` و`category`
- `lead`: المقدمة في صفحة المحور
- `sections`: الأقسام الثلاثة، لكل قسم عنوان وملخص
- `questions`: أسئلة المحور

بعد تعديل الملف تتحدث الصفحة الرئيسية وصفحات المحاور ونسخة PDF تلقائيًا.

## التحميل كـ PDF

افتح `/print/` ثم اضغط **طباعة / حفظ PDF**، واختر **حفظ كملف PDF** من نافذة الطباعة. النسخة مضبوطة على مقاس A4، وكل محور يبدأ في صفحة مستقلة.

## النشر على GitHub Pages

1. أنشئ مستودعًا جديدًا على GitHub وادفع المشروع إلى فرع `main`:

```bash
git init
git add .
git commit -m "Initial report site"
git branch -M main
git remote add origin https://github.com/<USERNAME>/<REPO>.git
git push -u origin main
```

2. من صفحة المستودع: **Settings → Pages → Build and deployment → Source** واختر **GitHub Actions**.
3. سيعمل ملف `.github/workflows/deploy.yml` تلقائيًا عند كل دفع إلى `main`، وينشر الموقع على:

```
https://<USERNAME>.github.io/<REPO>/
```

المسار الأساسي (`basePath`) يُضبط تلقائيًا من اسم المستودع. أما إذا كان المستودع من نوع `<USERNAME>.github.io` فيُترك فارغًا تلقائيًا أيضًا.

## ملاحظات

- المحتوى الحالي هيكل أولي (مسودة) بانتظار التفاصيل.
- الخطوط تُحمَّل وقت البناء وتُستضاف مع الموقع، فلا حاجة لاتصال خارجي عند العرض.
