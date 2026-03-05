'use client'
import { useState } from "react";
import { postJSON } from "@/lib/api";
import SectionHeading from "@/components/SectionHeading";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
  company?: string; // honeypot
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: ContactPayload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      company: String(formData.get("company") || ""),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (payload.company) {
      setStatus("success");
      form.reset();
      return;
    }

    try {
      await postJSON<ContactPayload, { ok: boolean }>("/api/contact", payload);
      setStatus("success");
      form.reset();
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message ?? "Something went wrong.");
    }
  }

  const inputCls =
    "mt-1 w-full bg-zinc-900 border border-zinc-700 px-4 py-3 text-zinc-200 font-mono text-sm placeholder:text-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors";

  return (
    <section id="contact" className="min-h-[80vh] px-6 py-24 bg-zinc-900">
      <div className="mx-auto max-w-xl">
        <SectionHeading title="Contact" subtitle="Let's build something together." />

        <div aria-live="polite" className="min-h-6 mt-2">
          {status === "success" && (
            <p className="font-mono text-xs text-cyan-400 tracking-widest">✓ Message sent — I'll get back to you shortly.</p>
          )}
          {status === "error" && (
            <p className="font-mono text-xs text-red-400">{errorMsg || "There was an error sending your message."}</p>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          {/* Honeypot */}
          <label className="sr-only" htmlFor="company">Company</label>
          <input id="company" name="company" autoComplete="off" tabIndex={-1} className="hidden" />

          <div>
            <label htmlFor="name" className="block font-mono text-xs text-zinc-500 tracking-widest uppercase">Name</label>
            <input id="name" name="name" type="text" required placeholder="Your name" className={inputCls} />
          </div>

          <div>
            <label htmlFor="email" className="block font-mono text-xs text-zinc-500 tracking-widest uppercase">Email</label>
            <input id="email" name="email" type="email" required placeholder="you@example.com" className={inputCls} />
          </div>

          <div>
            <label htmlFor="message" className="block font-mono text-xs text-zinc-500 tracking-widest uppercase">Message</label>
            <textarea id="message" name="message" required rows={5} placeholder="What are you working on?" className={inputCls} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-cyan-400 text-zinc-950 font-mono font-bold text-xs tracking-widest uppercase hover:bg-cyan-300 disabled:opacity-50 transition-colors"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>

            <a
              href="#top"
              className="px-6 py-3 border border-zinc-700 font-mono text-xs tracking-widest uppercase text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors"
            >
              Back to Top
            </a>
          </div>
        </form>

        <p className="mt-8 font-mono text-xs text-zinc-600">
          Prefer email?{" "}
          <a className="text-zinc-400 hover:text-cyan-400 transition-colors underline underline-offset-4" href="mailto:alecfitzgerald90@gmail.com">
            alecfitzgerald90@gmail.com
          </a>
        </p>
      </div>
    </section>
  );
}