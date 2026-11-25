"use client";

import { useEffect, useId, useRef, useState } from "react";
import { LogoMark } from "@/components/icons";
import styles from "./password-gate.module.css";

const PASSWORD_HASH =
  "cbf55f283d0856b7cb292793746d970d5fdc54e5a9e2aa1dd10e83f708122c20";
const STORAGE_KEY = "report-2026-2027-access";

async function hashValue(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

type GateState = "locked" | "unlocked";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GateState>("locked");
  const [ready, setReady] = useState(false);
  const [checking, setChecking] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "true") {
        setState("unlocked");
      }
    } catch {
      // Keep the gate locked when storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || state === "unlocked") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [ready, state]);

  useEffect(() => {
    if (state !== "unlocked") {
      return;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById("main")?.focus({ preventScroll: true });
    });

    return () => cancelAnimationFrame(frame);
  }, [state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checking) {
      return;
    }

    setChecking(true);

    try {
      const digest = await hashValue(value);

      if (digest === PASSWORD_HASH) {
        try {
          sessionStorage.setItem(STORAGE_KEY, "true");
        } catch {
          // The site still opens for this visit if storage is blocked.
        }
        setError(false);
        setState("unlocked");
        return;
      }
    } catch {
      // Fall through to the error state when the browser cannot hash.
    }

    setChecking(false);
    setError(true);
    inputRef.current?.select();
  };

  if (state === "unlocked") {
    return <>{children}</>;
  }

  return (
    <div className={styles.gate}>
      <div className={styles.glow} aria-hidden="true" />
      <section className={styles.card} aria-labelledby="gate-title">
        <div className={styles.brand}>
          <LogoMark className={styles.mark} />
          <span className={styles.brandText}>
            <span className={styles.brandTitle}>تقرير ٢٠٢٦–٢٠٢٧</span>
            <span className={styles.brandSub}>وثيقة عمل داخلية</span>
          </span>
        </div>

        <div className={styles.lock} aria-hidden="true">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4.5" y="10" width="15" height="10.5" rx="2.6" />
            <path d="M8 10V7.6a4 4 0 0 1 8 0V10" />
            <path d="M12 14.2v2.2" />
          </svg>
        </div>

        <p className={styles.kicker}>الوصول محمي</p>
        <h1 id="gate-title" className={styles.title}>
          هذه النسخة محمية
        </h1>
        <p className={styles.note}>
          أدخل كلمة المرور للاطلاع على تقرير ختام ٢٠٢٦ وخطة ٢٠٢٧.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value="report-access"
            readOnly
            hidden
          />
          <label className={styles.label} htmlFor={inputId}>
            كلمة المرور
          </label>
          <div className={styles.field}>
            <input
              ref={inputRef}
              id={inputId}
              className={styles.input}
              type="password"
              dir="ltr"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                if (error) {
                  setError(false);
                }
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              spellCheck={false}
              readOnly={!ready || checking}
              aria-invalid={error}
              aria-describedby={error ? errorId : undefined}
            />
            <button
              className={styles.button}
              type="submit"
              disabled={!ready || checking}
              aria-busy={checking}
            >
              {checking ? "جارٍ التحقق…" : "دخول"}
            </button>
          </div>
          {error ? (
            <p id={errorId} className={styles.error} role="alert">
              كلمة المرور غير صحيحة، حاول مرة أخرى.
            </p>
          ) : (
            <p className={styles.hint}>كلمة المرور مطلوبة لفتح الموقع.</p>
          )}
        </form>

        <div className={styles.footer}>
          <span>الوصول مخصص لمن يملك كلمة المرور.</span>
          <span className={styles.year}>٢٠٢٧</span>
        </div>
      </section>
      <noscript>
        <p className={styles.noscript}>يتطلب فتح هذه النسخة تفعيل JavaScript.</p>
      </noscript>
    </div>
  );
}
