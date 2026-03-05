import { create } from "zustand";

export type Locale = "uz" | "ru" | "en";

interface I18nState {
  locale: Locale;
  setLocale: (l: Locale) => void;
}

export const useI18n = create<I18nState>((set) => ({
  locale: "uz",
  setLocale: (locale) => {
    if (typeof window !== "undefined") localStorage.setItem("landing_locale", locale);
    set({ locale });
  },
}));

// ── Initialize from localStorage on first client render ──
if (typeof window !== "undefined") {
  const saved = localStorage.getItem("landing_locale") as Locale | null;
  if (saved && ["uz", "ru", "en"].includes(saved)) {
    useI18n.setState({ locale: saved });
  }
}

// ── Translation dictionaries ──
const T: Record<Locale, Record<string, string>> = {
  uz: {
    // Header
    nav_features: "Imkoniyatlar",
    nav_how: "Qanday ishlaydi",
    nav_pricing: "Narxlar",
    nav_faq: "Savol-javob",
    nav_login: "Kirish",

    // Hero
    hero_badge: "O'zbekiston uchun yaratilgan",
    hero_title: "Qarzingizni",
    hero_highlight: "nazorat qiling",
    hero_desc: "Shaxsiy va biznes qarzlarni bir joyda kuzating. SMS eslatmalar, kredit skoring, filiallar — barchasi bepul boshlanadi.",
    start_free: "Bepul boshlash",
    how_it_works: "Qanday ishlaydi",

    // Stats
    stat_free: "Bepul boshlash",
    stat_register: "Ro'yxatdan o'tish",
    stat_works: "Ishlaydi",
    stat_currency: "Valyuta",

    // Phone mockup
    mock_given: "Berilgan",
    mock_received: "Olingan",
    mock_currency: "so'm",
    mock_you_gave: "Siz berdingiz",
    mock_you_got: "Siz oldingiz",
    mock_shop: "Do'kon nasiya",
    mock_confirmed: "Tasdiqlandi!",
    mock_sms_sent: "SMS yuborildi",
    mock_credit_score: "Kredit skor",

    // Feature chips
    chip_sms: "SMS Eslatmalar",
    chip_currency: "UZS / USD",
    chip_branches: "Filiallar",
    chip_leaderboard: "Hodimlar reytingi",
    chip_scoring: "Kredit ball",
    chip_analytics: "Analytics",
    chip_installment: "Bo'lib to'lash",
    chip_monitoring: "24/7 monitoring",

    // Features section
    sect_features: "Imkoniyatlar",
    why_tabora: "Nega Tabora?",
    why_desc: "Qarz berish va olishni kuzatishning eng qulay usuli. Xavfsiz, tez va ishonchli.",

    feat_secure: "Xavfsiz saqlash",
    feat_secure_desc: "Barcha ma'lumotlar shifrlangan holda saqlanadi. Faqat siz ko'ra olasiz.",
    feat_mobile: "Mobil qurilmadan",
    feat_mobile_desc: "Telegram orqali yoki brauzerda ishlang. Alohida ilova yuklab olish shart emas.",
    feat_control: "To'liq nazorat",
    feat_control_desc: "Qarz tarixi, to'lov grafiki, eslatmalar — barchasi bir joyda.",
    feat_sms: "Avtomatik SMS",
    feat_sms_desc: "To'lov muddati yaqinlashganda qarzdorga avtomatik SMS yuboriladi.",
    feat_shop: "Do'kon nasiyasi",
    feat_shop_desc: "Har bir mijozning nasiya tarixini alohida kuzating.",
    feat_payment: "Bo'lib to'lash",
    feat_payment_desc: "Qarzni bo'lib to'lash grafigini belgilang va kuzating.",

    // For business
    sect_business: "Biznes uchun",
    biz_title: "Kompaniyangizni o'stiring",
    biz_desc: "Filiallar, hodimlar va sotuvlarni bir platformada boshqaring. Real vaqtda analytics va hisobotlar.",
    biz_feat1: "Filiallar tizimi",
    biz_feat1_desc: "Bir nechta filiallarni markazlashgan holda boshqaring.",
    biz_feat2: "Hodimlar reytingi",
    biz_feat2_desc: "Eng ko'p sotuv qilgan hodimingizni aniqlang.",
    biz_feat3: "Real vaqt analytics",
    biz_feat3_desc: "Bugungi va oylik sotuvlar, top tovarlar — barchasi live.",
    biz_cta: "Biznes uchun sinab ko'ring",

    // How it works
    sect_how: "Qanday ishlaydi",
    how_subtitle: "4 ta qadamda boshlang",
    step1: "Ro'yxatdan o'ting",
    step1_desc: "Telefon raqamingiz va ismingizni kiriting. 30 soniyada tayyor.",
    step2: "Qarz kiriting",
    step2_desc: "Kim ga, qancha, qachon — barchasini belgilang.",
    step3: "Eslatma sozlang",
    step3_desc: "Avtomatik SMS eslatmalar to'lov muddatida yuboriladi.",
    step4: "Nazorat qiling",
    step4_desc: "Qarz holati, to'lov tarixi va statistikani kuzating.",

    // Pricing
    sect_pricing: "Narxlar",
    pricing_title: "Siz uchun mos tarif",
    pricing_desc: "Bepul boshlang, o'sgan sari kengaytiring.",
    plan_free: "Bepul",
    plan_standard: "Standart",
    plan_business: "Biznes",
    plan_recommended: "Tavsiya etiladi",
    feat_50_debts: "50 ta qarz",
    feat_50_sms: "50 ta SMS",
    feat_basic_analytics: "Asosiy analytics",
    feat_500_debts: "500 ta qarz",
    feat_200_sms: "200 ta SMS",
    feat_full_analytics: "To'liq analytics",
    feat_unlimited_debts: "Cheksiz qarzlar",
    feat_unlimited_sms: "Cheksiz SMS",
    feat_priority: "Prioritet qo'llab-quvvatlash",
    plan_cta_free: "Bepul boshlash",
    plan_cta_start: "Boshlash",
    see_all_plans: "Barcha tariflarni ko'rish",

    // Who for
    who_for: "Kim uchun?",
    for_individual: "Jismoniy shaxslar",
    for_individual_desc: "Do'st, qarindosh yoki tanishga qarz bergansiz? Unuting deb qo'ymay, kuzating.",
    for_shops: "Do'kon va bizneslar",
    for_shops_desc: "Mijozlarga nasiya berasizmi? Har birini alohida kuzating.",
    for_corporate: "Korporativ mijozlar",
    for_corporate_desc: "Filiallar, hodimlar va massiv sotuvlarni boshqaring.",

    // Benefits
    all_features: "Nima bor?",
    ben1: "Telegram bot orqali boshqarish",
    ben2: "UZS va USD qo'llab-quvvatlash",
    ben3: "Kredit skoringni tekshirish",
    ben4: "Qarz to'lov eslatmalari",
    ben5: "Do'kon nasiyasi (bo'lib to'lash)",
    ben6: "Hodimlar va filiallar tizimi",
    ben7: "CSV/Excel export",
    ben8: "Xavfsiz 2FA autentifikatsiya",

    // FAQ
    sect_faq: "Savol-javob",
    faq_title: "Ko'p so'raladigan savollar",
    faq1_q: "Tabora bepulmi?",
    faq1_a: "Ha, asosiy funksiyalar to'liq bepul. 50 ta qarz va 50 ta SMS bepul. Ko'proq kerak bo'lsa — premium tariflar mavjud.",
    faq2_q: "Ma'lumotlarim xavfsizmi?",
    faq2_a: "Barcha ma'lumotlar shifrlangan. Sizning ruxsatingizsiz hech kim ko'ra olmaydi.",
    faq3_q: "Qanday qilib boshlayman?",
    faq3_a: "Telefon raqamingizni kiriting, SMS kodni tasdiqlang — 30 soniyada tayyor. Hech qanday to'lov talab qilinmaydi.",
    faq4_q: "SMS eslatmalar qanday ishlaydi?",
    faq4_a: "To'lov muddati yaqinlashganda (1 kun, 3 kun oldin) qarzdorga avtomatik SMS yuboriladi. Siz hech narsa qilishingiz shart emas.",
    faq5_q: "Bir nechta qarzni kuzata olamanmi?",
    faq5_a: "Ha, cheksiz odamga qarz bering va oling. Har biri alohida kuzatiladi.",

    // CTA
    cta_title: "Bugun boshlang",
    cta_desc: "Minglab foydalanuvchilar allaqachon Tabora orqali qarzlarini nazorat qilmoqda.",
    cta_btn: "Bepul boshlash",

    // Footer
    footer_desc: "O'zbekistonning birinchi P2P qarz tracking platformasi.",
    footer_pages: "Sahifalar",
    footer_contact: "Aloqa",
    footer_terms: "Foydalanish shartlari",
    footer_privacy: "Maxfiylik siyosati",
    footer_copy: "Tabora. Barcha huquqlar himoyalangan.",
  },

  ru: {
    nav_features: "Возможности",
    nav_how: "Как работает",
    nav_pricing: "Цены",
    nav_faq: "Вопросы",
    nav_login: "Войти",

    hero_badge: "Создано для Узбекистана",
    hero_title: "Контролируйте",
    hero_highlight: "свои долги",
    hero_desc: "Отслеживайте личные и бизнес-долги в одном месте. SMS-напоминания, кредитный скоринг, филиалы — всё бесплатно.",
    start_free: "Начать бесплатно",
    how_it_works: "Как работает",

    stat_free: "Бесплатно",
    stat_register: "Регистрация",
    stat_works: "Работает",
    stat_currency: "Валюты",

    // Phone mockup
    mock_given: "Выдано",
    mock_received: "Получено",
    mock_currency: "сум",
    mock_you_gave: "Вы дали",
    mock_you_got: "Вы взяли",
    mock_shop: "Магазин рассрочка",
    mock_confirmed: "Подтверждено!",
    mock_sms_sent: "SMS отправлено",
    mock_credit_score: "Кредит скор",

    chip_sms: "SMS Напоминания",
    chip_currency: "UZS / USD",
    chip_branches: "Филиалы",
    chip_leaderboard: "Рейтинг сотрудников",
    chip_scoring: "Кредит скор",
    chip_analytics: "Аналитика",
    chip_installment: "Рассрочка",
    chip_monitoring: "24/7 мониторинг",

    sect_features: "Возможности",
    why_tabora: "Почему Tabora?",
    why_desc: "Самый удобный способ отслеживать долги. Безопасно, быстро и надёжно.",

    feat_secure: "Безопасное хранение",
    feat_secure_desc: "Все данные хранятся в зашифрованном виде. Только вы можете видеть их.",
    feat_mobile: "С мобильного",
    feat_mobile_desc: "Работайте через Telegram или браузер. Не нужно скачивать отдельное приложение.",
    feat_control: "Полный контроль",
    feat_control_desc: "История долгов, график платежей, напоминания — всё в одном месте.",
    feat_sms: "Автоматические SMS",
    feat_sms_desc: "Когда приближается срок оплаты, должнику автоматически отправляется SMS.",
    feat_shop: "Магазинная рассрочка",
    feat_shop_desc: "Отслеживайте историю задолженностей каждого клиента отдельно.",
    feat_payment: "Рассрочка",
    feat_payment_desc: "Установите и отслеживайте график выплаты долга частями.",

    sect_business: "Для бизнеса",
    biz_title: "Развивайте свою компанию",
    biz_desc: "Управляйте филиалами, сотрудниками и продажами на одной платформе.",
    biz_feat1: "Система филиалов",
    biz_feat1_desc: "Управляйте несколькими филиалами централизованно.",
    biz_feat2: "Рейтинг сотрудников",
    biz_feat2_desc: "Определите сотрудника с наибольшим объёмом продаж.",
    biz_feat3: "Аналитика в реальном времени",
    biz_feat3_desc: "Продажи за день и месяц, топ-товары — всё в режиме live.",
    biz_cta: "Попробовать для бизнеса",

    sect_how: "Как работает",
    how_subtitle: "Начните за 4 шага",
    step1: "Зарегистрируйтесь",
    step1_desc: "Введите номер телефона и имя. Готово за 30 секунд.",
    step2: "Добавьте долг",
    step2_desc: "Кому, сколько, когда — укажите всё.",
    step3: "Настройте напоминания",
    step3_desc: "Автоматические SMS-напоминания отправляются в срок платежа.",
    step4: "Контролируйте",
    step4_desc: "Отслеживайте статус долга, историю платежей и статистику.",

    sect_pricing: "Цены",
    pricing_title: "Тариф для вас",
    pricing_desc: "Начните бесплатно, расширяйте по мере роста.",
    plan_free: "Бесплатно",
    plan_standard: "Стандарт",
    plan_business: "Бизнес",
    plan_recommended: "Рекомендуется",
    feat_50_debts: "50 долгов",
    feat_50_sms: "50 SMS",
    feat_basic_analytics: "Базовая аналитика",
    feat_500_debts: "500 долгов",
    feat_200_sms: "200 SMS",
    feat_full_analytics: "Полная аналитика",
    feat_unlimited_debts: "Безлимитные долги",
    feat_unlimited_sms: "Безлимитные SMS",
    feat_priority: "Приоритетная поддержка",
    plan_cta_free: "Начать бесплатно",
    plan_cta_start: "Начать",
    see_all_plans: "Все тарифы",

    who_for: "Для кого?",
    for_individual: "Физические лица",
    for_individual_desc: "Дали деньги другу или родственнику? Не забудьте — отслеживайте.",
    for_shops: "Магазины и бизнес",
    for_shops_desc: "Даёте рассрочку клиентам? Отслеживайте каждого отдельно.",
    for_corporate: "Корпоративные клиенты",
    for_corporate_desc: "Управляйте филиалами, сотрудниками и массовыми продажами.",

    all_features: "Что есть?",
    ben1: "Управление через Telegram-бот",
    ben2: "Поддержка UZS и USD",
    ben3: "Проверка кредитного скоринга",
    ben4: "Напоминания об оплате долга",
    ben5: "Магазинная рассрочка",
    ben6: "Система сотрудников и филиалов",
    ben7: "Экспорт CSV/Excel",
    ben8: "Безопасная 2FA аутентификация",

    sect_faq: "Вопросы",
    faq_title: "Часто задаваемые вопросы",
    faq1_q: "Tabora бесплатна?",
    faq1_a: "Да, основные функции полностью бесплатны. 50 долгов и 50 SMS — бесплатно. Нужно больше — доступны премиум-тарифы.",
    faq2_q: "Мои данные в безопасности?",
    faq2_a: "Все данные зашифрованы. Без вашего разрешения никто не может их увидеть.",
    faq3_q: "Как начать?",
    faq3_a: "Введите номер телефона, подтвердите SMS-код — готово за 30 секунд. Оплата не требуется.",
    faq4_q: "Как работают SMS-напоминания?",
    faq4_a: "Когда приближается срок оплаты (за 1 и 3 дня), должнику автоматически отправляется SMS. Вам ничего не нужно делать.",
    faq5_q: "Могу ли я отслеживать несколько долгов?",
    faq5_a: "Да, давайте и берите долги у любого количества людей. Каждый отслеживается отдельно.",

    cta_title: "Начните сегодня",
    cta_desc: "Тысячи пользователей уже контролируют свои долги через Tabora.",
    cta_btn: "Начать бесплатно",

    footer_desc: "Первая P2P платформа для отслеживания долгов в Узбекистане.",
    footer_pages: "Страницы",
    footer_contact: "Контакты",
    footer_terms: "Условия использования",
    footer_privacy: "Политика конфиденциальности",
    footer_copy: "Tabora. Все права защищены.",
  },

  en: {
    nav_features: "Features",
    nav_how: "How it works",
    nav_pricing: "Pricing",
    nav_faq: "FAQ",
    nav_login: "Sign in",

    hero_badge: "Built for Uzbekistan",
    hero_title: "Take control of",
    hero_highlight: "your debts",
    hero_desc: "Track personal and business debts in one place. SMS reminders, credit scoring, branches — everything starts free.",
    start_free: "Start for free",
    how_it_works: "How it works",

    stat_free: "Free to start",
    stat_register: "Registration",
    stat_works: "Always on",
    stat_currency: "Currencies",

    // Phone mockup
    mock_given: "Given",
    mock_received: "Received",
    mock_currency: "sum",
    mock_you_gave: "You lent",
    mock_you_got: "You borrowed",
    mock_shop: "Shop credit",
    mock_confirmed: "Confirmed!",
    mock_sms_sent: "SMS sent",
    mock_credit_score: "Credit score",

    chip_sms: "SMS Reminders",
    chip_currency: "UZS / USD",
    chip_branches: "Branches",
    chip_leaderboard: "Employee ranking",
    chip_scoring: "Credit score",
    chip_analytics: "Analytics",
    chip_installment: "Installment",
    chip_monitoring: "24/7 monitoring",

    sect_features: "Features",
    why_tabora: "Why Tabora?",
    why_desc: "The most convenient way to track debts. Secure, fast and reliable.",

    feat_secure: "Secure storage",
    feat_secure_desc: "All data is stored encrypted. Only you can see it.",
    feat_mobile: "Mobile-first",
    feat_mobile_desc: "Work via Telegram or browser. No separate app to download.",
    feat_control: "Full control",
    feat_control_desc: "Debt history, payment schedule, reminders — all in one place.",
    feat_sms: "Automatic SMS",
    feat_sms_desc: "When the payment deadline approaches, an SMS is automatically sent to the debtor.",
    feat_shop: "Shop credit",
    feat_shop_desc: "Track the credit history of each customer separately.",
    feat_payment: "Installment plan",
    feat_payment_desc: "Set up and track an installment payment schedule.",

    sect_business: "For business",
    biz_title: "Grow your company",
    biz_desc: "Manage branches, employees and sales on one platform. Real-time analytics and reports.",
    biz_feat1: "Branch system",
    biz_feat1_desc: "Manage multiple branches centrally.",
    biz_feat2: "Employee leaderboard",
    biz_feat2_desc: "Identify your top-performing employee.",
    biz_feat3: "Real-time analytics",
    biz_feat3_desc: "Today's and monthly sales, top products — all live.",
    biz_cta: "Try for business",

    sect_how: "How it works",
    how_subtitle: "Get started in 4 steps",
    step1: "Sign up",
    step1_desc: "Enter your phone number and name. Done in 30 seconds.",
    step2: "Add a debt",
    step2_desc: "To whom, how much, when — specify everything.",
    step3: "Set reminders",
    step3_desc: "Automatic SMS reminders are sent on payment due dates.",
    step4: "Monitor",
    step4_desc: "Track debt status, payment history and statistics.",

    sect_pricing: "Pricing",
    pricing_title: "Plans that fit",
    pricing_desc: "Start free, scale as you grow.",
    plan_free: "Free",
    plan_standard: "Standard",
    plan_business: "Business",
    plan_recommended: "Recommended",
    feat_50_debts: "50 debts",
    feat_50_sms: "50 SMS",
    feat_basic_analytics: "Basic analytics",
    feat_500_debts: "500 debts",
    feat_200_sms: "200 SMS",
    feat_full_analytics: "Full analytics",
    feat_unlimited_debts: "Unlimited debts",
    feat_unlimited_sms: "Unlimited SMS",
    feat_priority: "Priority support",
    plan_cta_free: "Start free",
    plan_cta_start: "Get started",
    see_all_plans: "See all plans",

    who_for: "Who is it for?",
    for_individual: "Individuals",
    for_individual_desc: "Lent money to a friend or relative? Don't forget — track it.",
    for_shops: "Shops & businesses",
    for_shops_desc: "Offering credit to customers? Track each one separately.",
    for_corporate: "Corporate clients",
    for_corporate_desc: "Manage branches, employees and bulk sales.",

    all_features: "What's included?",
    ben1: "Telegram bot management",
    ben2: "UZS and USD support",
    ben3: "Credit scoring check",
    ben4: "Debt payment reminders",
    ben5: "Shop installment plan",
    ben6: "Employee and branch system",
    ben7: "CSV/Excel export",
    ben8: "Secure 2FA authentication",

    sect_faq: "FAQ",
    faq_title: "Frequently asked questions",
    faq1_q: "Is Tabora free?",
    faq1_a: "Yes, core features are completely free. 50 debts and 50 SMS — free. Need more? Premium plans are available.",
    faq2_q: "Is my data secure?",
    faq2_a: "All data is encrypted. No one can see it without your permission.",
    faq3_q: "How do I get started?",
    faq3_a: "Enter your phone number, confirm the SMS code — done in 30 seconds. No payment required.",
    faq4_q: "How do SMS reminders work?",
    faq4_a: "When the payment deadline approaches (1 and 3 days before), an SMS is automatically sent to the debtor. You don't need to do anything.",
    faq5_q: "Can I track multiple debts?",
    faq5_a: "Yes, lend and borrow from any number of people. Each is tracked separately.",

    cta_title: "Start today",
    cta_desc: "Thousands of users already manage their debts with Tabora.",
    cta_btn: "Start for free",

    footer_desc: "Uzbekistan's first P2P debt tracking platform.",
    footer_pages: "Pages",
    footer_contact: "Contact",
    footer_terms: "Terms of service",
    footer_privacy: "Privacy policy",
    footer_copy: "Tabora. All rights reserved.",
  },
};

export function useTranslation() {
  const locale = useI18n((s) => s.locale);
  const t = (key: string): string => T[locale][key] ?? T["uz"][key] ?? key;
  return { t, locale };
}
