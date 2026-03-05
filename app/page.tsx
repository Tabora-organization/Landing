"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/animated-section";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { useTranslation } from "@/lib/i18n";
import {
  Shield, Smartphone, TrendingUp, ArrowRight, CheckCircle2,
  Users, Bell, Store, CreditCard, BarChart3, Globe,
  Plus, Minus, ArrowUpRight, ArrowDownLeft,
  Building2, Zap, Trophy, Check,
  MessageSquare, Clock, Star, Sparkles,
} from "lucide-react";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tabora.uz";

/* ── Animated counter ── */
function Counter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);
  const id = `ctr-${value}${suffix}`;

  useEffect(() => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [id, started]);

  useEffect(() => {
    if (!started) return;
    const n = parseInt(value);
    if (isNaN(n)) { setDisplay(value); return; }
    let cur = 0;
    const step = Math.max(1, Math.ceil(n / 28));
    const iv = setInterval(() => {
      cur = Math.min(cur + step, n);
      setDisplay(String(cur));
      if (cur >= n) clearInterval(iv);
    }, 32);
    return () => clearInterval(iv);
  }, [started, value]);

  return <span id={id}>{display}{suffix}</span>;
}

/* ── FAQ item ── */
function FAQItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection delay={i * 55}>
      <div
        className={`border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer ${
          open ? "border-primary/40 shadow-sm" : "border-border hover:border-primary/30"
        } bg-card`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start justify-between p-5 gap-4">
          <div className="flex items-start gap-3">
            <span className="text-[11px] font-mono font-bold text-primary/60 mt-0.5 shrink-0 w-6">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-semibold text-[15px] leading-snug">{q}</span>
          </div>
          <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            open ? "bg-primary border-primary text-white" : "border-border text-muted-foreground"
          }`}>
            {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </div>
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-64" : "max-h-0"}`}>
          <p className="px-5 pb-5 pl-[3.25rem] text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ════════════════════════════════════════════ */
export default function LandingPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Shield,     num: "01", title: t("feat_secure"),  desc: t("feat_secure_desc"),
      border: "border-t-emerald-500", shadow: "hover:shadow-emerald-100 dark:hover:shadow-emerald-900/20",
      iconBg: "bg-emerald-500/10", iconColor: "text-emerald-600 dark:text-emerald-400",
      cardBg: "from-emerald-50 dark:from-emerald-900/10", numCls: "text-emerald-500/20" },
    { icon: Smartphone, num: "02", title: t("feat_mobile"),  desc: t("feat_mobile_desc"),
      border: "border-t-blue-500",   shadow: "hover:shadow-blue-100 dark:hover:shadow-blue-900/20",
      iconBg: "bg-blue-500/10",    iconColor: "text-blue-600 dark:text-blue-400",
      cardBg: "from-blue-50 dark:from-blue-900/10",    numCls: "text-blue-500/20" },
    { icon: TrendingUp, num: "03", title: t("feat_control"), desc: t("feat_control_desc"),
      border: "border-t-violet-500", shadow: "hover:shadow-violet-100 dark:hover:shadow-violet-900/20",
      iconBg: "bg-violet-500/10",  iconColor: "text-violet-600 dark:text-violet-400",
      cardBg: "from-violet-50 dark:from-violet-900/10", numCls: "text-violet-500/20" },
    { icon: Bell,       num: "04", title: t("feat_sms"),     desc: t("feat_sms_desc"),
      border: "border-t-amber-500",  shadow: "hover:shadow-amber-100 dark:hover:shadow-amber-900/20",
      iconBg: "bg-amber-500/10",   iconColor: "text-amber-600 dark:text-amber-400",
      cardBg: "from-amber-50 dark:from-amber-900/10",  numCls: "text-amber-500/20" },
    { icon: Store,      num: "05", title: t("feat_shop"),    desc: t("feat_shop_desc"),
      border: "border-t-pink-500",   shadow: "hover:shadow-pink-100 dark:hover:shadow-pink-900/20",
      iconBg: "bg-pink-500/10",    iconColor: "text-pink-600 dark:text-pink-400",
      cardBg: "from-pink-50 dark:from-pink-900/10",    numCls: "text-pink-500/20" },
    { icon: CreditCard, num: "06", title: t("feat_payment"), desc: t("feat_payment_desc"),
      border: "border-t-cyan-500",   shadow: "hover:shadow-cyan-100 dark:hover:shadow-cyan-900/20",
      iconBg: "bg-cyan-500/10",    iconColor: "text-cyan-600 dark:text-cyan-400",
      cardBg: "from-cyan-50 dark:from-cyan-900/10",    numCls: "text-cyan-500/20" },
  ];

  const steps = [
    { n: "01", title: t("step1"), desc: t("step1_desc"),
      bg: "from-blue-500/10 to-blue-500/3 dark:from-blue-500/8 dark:to-transparent",
      numCls: "text-blue-500/25 dark:text-blue-500/12", badge: "bg-blue-600", titleColor: "text-blue-700 dark:text-blue-400" },
    { n: "02", title: t("step2"), desc: t("step2_desc"),
      bg: "from-violet-500/10 to-violet-500/3 dark:from-violet-500/8 dark:to-transparent",
      numCls: "text-violet-500/25 dark:text-violet-500/12", badge: "bg-violet-600", titleColor: "text-violet-700 dark:text-violet-400" },
    { n: "03", title: t("step3"), desc: t("step3_desc"),
      bg: "from-emerald-500/10 to-emerald-500/3 dark:from-emerald-500/8 dark:to-transparent",
      numCls: "text-emerald-500/25 dark:text-emerald-500/12", badge: "bg-emerald-600", titleColor: "text-emerald-700 dark:text-emerald-400" },
    { n: "04", title: t("step4"), desc: t("step4_desc"),
      bg: "from-amber-500/10 to-amber-500/3 dark:from-amber-500/8 dark:to-transparent",
      numCls: "text-amber-500/25 dark:text-amber-500/12", badge: "bg-amber-600", titleColor: "text-amber-700 dark:text-amber-400" },
  ];

  const faq = [
    { q: t("faq1_q"), a: t("faq1_a") },
    { q: t("faq2_q"), a: t("faq2_a") },
    { q: t("faq3_q"), a: t("faq3_a") },
    { q: t("faq4_q"), a: t("faq4_a") },
    { q: t("faq5_q"), a: t("faq5_a") },
  ];

  const biz = [
    { icon: Building2, title: t("biz_feat1"), desc: t("biz_feat1_desc") },
    { icon: Trophy,    title: t("biz_feat2"), desc: t("biz_feat2_desc") },
    { icon: BarChart3, title: t("biz_feat3"), desc: t("biz_feat3_desc") },
  ];

  const plans = [
    { name: t("plan_free"),     price: "0",      badge: null,                  highlight: false,
      feats: [t("feat_50_debts"), t("feat_50_sms"), t("feat_basic_analytics")],
      cta: t("plan_cta_free"),  variant: "outline" as const },
    { name: t("plan_standard"), price: "49 000", badge: t("plan_recommended"), highlight: true,
      feats: [t("feat_500_debts"), t("feat_200_sms"), t("feat_full_analytics")],
      cta: t("plan_cta_start"), variant: "default" as const },
    { name: t("plan_business"), price: "...",    badge: null,                  highlight: false,
      feats: [t("feat_unlimited_debts"), t("feat_unlimited_sms"), t("feat_priority")],
      cta: t("plan_cta_start"), variant: "outline" as const },
  ];

  const chips = [
    { icon: MessageSquare, label: t("chip_sms") },
    { icon: TrendingUp,    label: t("chip_currency") },
    { icon: Building2,     label: t("chip_branches") },
    { icon: Trophy,        label: t("chip_leaderboard") },
    { icon: Star,          label: t("chip_scoring") },
    { icon: BarChart3,     label: t("chip_analytics") },
    { icon: Clock,         label: t("chip_installment") },
    { icon: Zap,           label: t("chip_monitoring") },
  ];

  const benefits = [
    { text: t("ben1"), dot: "bg-blue-500" },
    { text: t("ben2"), dot: "bg-emerald-500" },
    { text: t("ben3"), dot: "bg-violet-500" },
    { text: t("ben4"), dot: "bg-amber-500" },
    { text: t("ben5"), dot: "bg-pink-500" },
    { text: t("ben6"), dot: "bg-cyan-500" },
    { text: t("ben7"), dot: "bg-orange-500" },
    { text: t("ben8"), dot: "bg-indigo-500" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Light mode: vivid blue-to-indigo gradient. Dark mode: subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50/80 to-background dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-background" />
        <div className="absolute -top-32 right-1/4 w-[480px] h-[480px] bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative container max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8"
                style={{ animation: "fade-in-up 0.5s 0.05s ease-out both" }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t("hero_badge")}
              </div>

              <h1
                className="text-3xl sm:text-[2.6rem] md:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.12]"
                style={{ animation: "fade-in-up 0.55s 0.12s ease-out both" }}
              >
                {t("hero_title")}{" "}
                <span className="text-primary relative inline-block">
                  {t("hero_highlight")}
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none" aria-hidden="true">
                    <path d="M2 7C50 1 100 1 198 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      className="text-primary/40" style={{ animation: "draw-line 1s 0.9s ease-out both" }} />
                  </svg>
                </span>
              </h1>

              <p
                className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
                style={{ animation: "fade-in-up 0.55s 0.22s ease-out both" }}
              >
                {t("hero_desc")}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mt-10"
                style={{ animation: "fade-in-up 0.55s 0.32s ease-out both" }}>
                <a href={`${APP_URL}/auth/register`}>
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/25 hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-300">
                    {t("start_free")} <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
                <a href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto hover:-translate-y-0.5 transition-all duration-300">
                    {t("how_it_works")}
                  </Button>
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t"
                style={{ animation: "fade-in-up 0.55s 0.42s ease-out both" }}>
                {[
                  { v: "100", s: "%",  l: t("stat_free") },
                  { v: "30",  s: "s",  l: t("stat_register") },
                  { v: "24",  s: "/7", l: t("stat_works") },
                  { v: "2",   s: "+",  l: t("stat_currency") },
                ].map((st) => (
                  <div key={st.l}>
                    <p className="text-2xl md:text-3xl font-bold text-primary tabular-nums">
                      <Counter value={st.v} suffix={st.s} />
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{st.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-[288px]">
                <div className="rounded-[2.5rem] border-[6px] border-foreground/10 bg-card shadow-2xl overflow-hidden animate-float">
                  <div className="p-4 pt-10">
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <Logo size={20} />
                        <span className="font-bold text-sm">Tabora</span>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 p-3">
                        <p className="text-[10px] text-muted-foreground">{t("mock_given")}</p>
                        <p className="text-base font-bold">5,200,000</p>
                        <p className="text-[9px] text-muted-foreground">{t("mock_currency")}</p>
                      </div>
                      <div className="rounded-xl bg-orange-50 dark:bg-orange-950/30 p-3">
                        <p className="text-[10px] text-muted-foreground">{t("mock_received")}</p>
                        <p className="text-base font-bold">1,800,000</p>
                        <p className="text-[9px] text-muted-foreground">{t("mock_currency")}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Jasur T.",   type: t("mock_you_gave"), amt: "2,000,000", Icon: ArrowUpRight,  ic: "text-blue-600",   ib: "bg-blue-100 dark:bg-blue-900/30" },
                        { name: "Nodira A.",  type: t("mock_you_got"),  amt: "$500",      Icon: ArrowDownLeft, ic: "text-orange-600", ib: "bg-orange-100 dark:bg-orange-900/30" },
                        { name: "Ali Market", type: t("mock_shop"),     amt: "350,000",   Icon: ArrowUpRight,  ic: "text-blue-600",   ib: "bg-blue-100 dark:bg-blue-900/30" },
                      ].map((item) => (
                        <div key={item.name} className="rounded-xl border p-2.5 flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full ${item.ib} flex items-center justify-center shrink-0`}>
                            <item.Icon className={`h-3 w-3 ${item.ic}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate">{item.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{item.type}</p>
                          </div>
                          <p className="text-xs font-bold shrink-0">{item.amt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute -right-14 top-14 bg-card border rounded-xl shadow-lg px-3.5 py-2 flex items-center gap-2 animate-float-badge-1">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-xs font-semibold whitespace-nowrap">{t("mock_confirmed")}</span>
                </div>
                <div className="absolute -left-12 bottom-36 bg-card border rounded-xl shadow-lg px-3.5 py-2 flex items-center gap-2 animate-float-badge-2">
                  <Bell className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold whitespace-nowrap">{t("mock_sms_sent")}</span>
                </div>
                <div className="absolute -right-10 bottom-20 bg-card border rounded-xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float-badge-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Shield className="h-2.5 w-2.5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[9px] text-muted-foreground">{t("mock_credit_score")}</p>
                    <p className="text-[11px] font-bold text-emerald-600">750 A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURE CHIPS STRIP
      ══════════════════════════════════════════ */}
      <div className="border-y bg-card py-5 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-3 gap-x-4">
            {chips.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 min-w-0">
                <Icon className="h-3.5 w-3.5 text-primary/60 shrink-0" />
                <span className="text-xs text-muted-foreground font-medium truncate">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          FEATURES  — colored top-border cards
      ══════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 px-4">
        <div className="container max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">{t("sect_features")}</p>
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("why_tabora")}</h2>
              <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">{t("why_desc")}</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.num} delay={i * 65}>
                <div className={`group relative overflow-hidden rounded-2xl border-t-[3px] ${f.border} border-x border-b border-border bg-gradient-to-br ${f.cardBg} to-transparent bg-card p-6 h-full shadow-sm hover:shadow-lg ${f.shadow} hover:-translate-y-1 transition-all duration-300`}>
                  {/* Watermark */}
                  <span className={`absolute -right-2 -bottom-4 text-[7rem] font-black leading-none select-none pointer-events-none ${f.numCls}`}>
                    {f.num}
                  </span>
                  {/* Icon */}
                  <div className={`${f.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <f.icon className={`h-6 w-6 ${f.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-base mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOR BUSINESS  — always dark
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-4 bg-gray-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_top_right,rgba(59,130,246,0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_bottom_left,rgba(139,92,246,0.08),transparent)]" />

        <div className="relative container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimatedSection>
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
                  <Building2 className="h-3.5 w-3.5" />
                  {t("sect_business")}
                </div>
                <h2 className="text-3xl md:text-[2.6rem] font-bold text-white leading-tight mb-5">
                  {t("biz_title")}
                </h2>
                <p className="text-white/55 text-lg mb-9 leading-relaxed">{t("biz_desc")}</p>
                <div className="space-y-5 mb-10">
                  {biz.map((b, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <b.icon className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-[15px] mb-0.5">{b.title}</p>
                        <p className="text-sm text-white/50 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <a href={`${APP_URL}/auth/register`}>
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300">
                    {t("biz_cta")} <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={110}>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Building2,  label: "Filiallar",     value: "15+",  c: { b: "border-blue-500/20",    t: "text-blue-400",    bg: "rgba(59,130,246,0.06)" } },
                  { icon: Users,      label: "Hodimlar",      value: "100+", c: { b: "border-violet-500/20",  t: "text-violet-400",  bg: "rgba(139,92,246,0.06)" } },
                  { icon: TrendingUp, label: "Analytics",     value: "∞",    c: { b: "border-emerald-500/20", t: "text-emerald-400", bg: "rgba(16,185,129,0.06)" } },
                  { icon: Zap,        label: "Avtomatik SMS", value: "24/7", c: { b: "border-amber-500/20",   t: "text-amber-400",   bg: "rgba(245,158,11,0.06)" } },
                ].map((tile, i) => (
                  <div key={i} className={`border ${tile.c.b} rounded-2xl p-5 hover:scale-[1.03] transition-transform duration-300`}
                    style={{ background: tile.c.bg }}>
                    <tile.icon className={`h-5 w-5 ${tile.c.t} mb-3`} />
                    <p className={`text-2xl font-bold ${tile.c.t} tabular-nums mb-0.5`}>{tile.value}</p>
                    <p className="text-sm text-white/50">{tile.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 md:py-32 px-4 relative overflow-hidden">
        {/* Light: sky-blue gradient bg. Dark: subtle */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/80 via-background to-indigo-50/40 dark:from-muted/30 dark:via-background dark:to-muted/20" />
        <div className="relative container max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">{t("sect_how")}</p>
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("how_subtitle")}</h2>
            </div>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-5">
            {steps.map((s, i) => (
              <AnimatedSection key={s.n} delay={i * 80}>
                <div className={`relative rounded-2xl border border-border bg-card bg-gradient-to-br ${s.bg} p-7 overflow-hidden group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300`}>
                  <span className={`absolute -right-3 -bottom-6 text-[8rem] font-black leading-none select-none pointer-events-none ${s.numCls}`}>
                    {s.n}
                  </span>
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full ${s.badge} text-white font-bold text-sm shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {s.n}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${s.titleColor}`}>{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING
      ══════════════════════════════════════════ */}
      <section id="pricing" className="py-24 md:py-32 px-4">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">{t("sect_pricing")}</p>
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("pricing_title")}</h2>
              <p className="mt-4 text-muted-foreground max-w-sm mx-auto leading-relaxed">{t("pricing_desc")}</p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {plans.map((plan, i) => (
              <AnimatedSection key={plan.name} delay={i * 80}>
                <div className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  plan.highlight
                    ? "shadow-xl shadow-primary/15 ring-2 ring-primary"
                    : "border border-border shadow-sm hover:border-primary/30"
                }`}>
                  {plan.highlight && (
                    <div className="h-1.5 bg-gradient-to-r from-blue-400 via-primary to-indigo-500" />
                  )}

                  <div className="p-7 bg-card">
                    {plan.badge && (
                      <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-[11px] font-bold px-3 py-1 rounded-full mb-4">
                        <Sparkles className="h-3 w-3" />
                        {plan.badge}
                      </div>
                    )}

                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>

                    <div className="flex items-baseline gap-1.5 mb-6 mt-3">
                      {plan.price === "0" ? (
                        <span className="text-3xl font-extrabold text-green-600 dark:text-green-400">BEPUL</span>
                      ) : plan.price === "..." ? (
                        <span className="text-3xl font-extrabold text-muted-foreground">—</span>
                      ) : (
                        <>
                          <span className="text-3xl font-extrabold">{plan.price}</span>
                          <span className="text-sm text-muted-foreground">so&apos;m/oy</span>
                        </>
                      )}
                    </div>

                    <ul className="space-y-3 mb-7">
                      {plan.feats.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="leading-relaxed">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <a href={`${APP_URL}/auth/register`} className="block">
                      <Button className="w-full" size="lg" variant={plan.variant}>
                        {plan.cta}
                      </Button>
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={260}>
            <div className="text-center mt-8">
              <a href={`${APP_URL}/auth/register`}>
                <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                  {t("see_all_plans")} <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHO IT'S FOR
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-4 bg-slate-50 dark:bg-muted/20">
        <div className="container max-w-5xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("who_for")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Users,  title: t("for_individual"), desc: t("for_individual_desc"),
                color: "text-blue-600 dark:text-blue-400",   bg: "bg-blue-500/10",   hborder: "hover:border-blue-300 dark:hover:border-blue-600" },
              { icon: Store,  title: t("for_shops"),      desc: t("for_shops_desc"),
                color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-500/10", hborder: "hover:border-purple-300 dark:hover:border-purple-600" },
              { icon: Globe,  title: t("for_corporate"),  desc: t("for_corporate_desc"),
                color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500/10", hborder: "hover:border-emerald-300 dark:hover:border-emerald-600" },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 90}>
                <div className={`group border border-border bg-card rounded-2xl p-8 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full ${item.hborder}`}>
                  <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`h-8 w-8 ${item.color}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2.5">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-4">
        <div className="container max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("all_features")}</h2>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 40}>
                <div className="flex items-center gap-3.5 rounded-xl border border-border bg-card px-5 py-4 shadow-sm hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                  <div className={`w-2.5 h-2.5 rounded-full ${b.dot} shrink-0 group-hover:scale-125 transition-transform duration-300`} />
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section id="faq" className="py-24 md:py-32 px-4 bg-slate-50 dark:bg-muted/20">
        <div className="container max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">{t("sect_faq")}</p>
              <h2 className="text-3xl md:text-[2.8rem] font-bold tracking-tight">{t("faq_title")}</h2>
            </div>
          </AnimatedSection>
          <div className="space-y-2.5">
            {faq.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA  — always dark
      ══════════════════════════════════════════ */}
      <section className="py-28 md:py-36 px-4 relative overflow-hidden bg-gray-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(59,130,246,0.22),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_110%,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-[0.04]"><Logo size={400} /></div>
        </div>

        <AnimatedSection className="relative">
          <div className="container max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              {t("hero_badge")}
            </div>
            <h2 className="text-4xl md:text-[3.2rem] font-bold tracking-tight leading-tight text-white">
              {t("cta_title")}
            </h2>
            <p className="mt-5 text-lg text-white/55 max-w-md mx-auto leading-relaxed">{t("cta_desc")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
              <a href={`${APP_URL}/auth/register`}>
                {/* White button: use !important to override Button variant's bg/text */}
                <Button size="lg"
                  className="!bg-white !text-gray-900 hover:!bg-gray-50 px-10 font-bold shadow-2xl hover:-translate-y-0.5 transition-all duration-300">
                  {t("cta_btn")} <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <a href={`${APP_URL}/auth/login`}>
                <Button size="lg" variant="outline" className="border-white/25 text-white hover:bg-white/10 px-8">
                  {t("nav_login")}
                </Button>
              </a>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer className="border-t bg-background px-4">
        <div className="container max-w-6xl mx-auto py-12">
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <Logo size={28} />
                <span className="font-bold text-lg">Tabora</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("footer_desc")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t("footer_pages")}</h4>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                {[
                  { href: "#features",     label: t("nav_features") },
                  { href: "#how-it-works", label: t("nav_how") },
                  { href: "#pricing",      label: t("nav_pricing") },
                  { href: "#faq",          label: t("nav_faq") },
                ].map((l) => (
                  <a key={l.href} href={l.href} className="block hover:text-foreground transition-colors duration-200">{l.label}</a>
                ))}
                <a href={`${APP_URL}/terms`}   className="block hover:text-foreground transition-colors">{t("footer_terms")}</a>
                <a href={`${APP_URL}/privacy`} className="block hover:text-foreground transition-colors">{t("footer_privacy")}</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm">{t("footer_contact")}</h4>
              <div className="space-y-2.5 text-sm text-muted-foreground">
                <p>Telegram: @tabora_uz</p>
                <p>Email: info@tabora.uz</p>
              </div>
            </div>
          </div>
          <div className="border-t pt-7 text-center text-xs text-muted-foreground">
            <p>&copy; 2026 {t("footer_copy")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
