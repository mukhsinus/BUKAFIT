import type { LocalizedString } from "@/lib/content-types";

export type ServiceSlug =
  | "gym"
  | "pool"
  | "group"
  | "spa"
  | "massage"
  | "kids"
  | "personal";

export type Service = {
  slug: ServiceSlug;
  title: LocalizedString;
  short: LocalizedString;
  /** Для шаблона страницы услуги (Фаза 4) */
  body: LocalizedString;
  forWhom: LocalizedString;
  mediaSlot: string;
};

export const services: Service[] = [
  {
    slug: "gym",
    title: {
      ru: "Тренажёрный зал",
      uz: "Trenajyor zali",
      en: "Gym floor",
    },
    short: {
      ru: "Силовая и кардио-зона на 2000 м² — открыта круглосуточно.",
      uz: "2000 m² kuch va kardio zonasi — kunu tun ochiq.",
      en: "Strength and cardio across 2000 m² — open around the clock.",
    },
    body: {
      ru: "Просторный зал с отдельными зонами под силу, функционал и кардио. Приходите в любое время суток — клуб не закрывается.",
      uz: "Kuch, funksional va kardio uchun alohida zonali keng zal. Kunning istalgan vaqtida keling — klub yopilmaydi.",
      en: "A spacious floor with dedicated strength, functional and cardio zones. Come any hour — the club never closes.",
    },
    forWhom: {
      ru: "Тем, кто тренируется по своему графику, днём или ночью.",
      uz: "O‘z jadvali bo‘yicha, kunduzi yoki tunda mashq qiladiganlar uchun.",
      en: "Anyone who trains on their own schedule — day or night.",
    },
    mediaSlot: "gym",
  },
  {
    slug: "pool",
    title: {
      ru: "Бассейн",
      uz: "Basseyn",
      en: "Pool",
    },
    short: {
      ru: "16 м, 3 дорожки: подогрев, аквааэробика, детское плавание.",
      uz: "16 m, 3 yo‘lak: isitish, akvaaerobika, bolalar suzishi.",
      en: "16 m, 3 lanes: heated water, aqua aerobics, kids’ swimming.",
    },
    body: {
      ru: "Компактный бассейн для плавания и групповых водных занятий. Вода подогревается — комфортно в любой сезон.",
      uz: "Suzish va guruh suv mashqlari uchun ixcham basseyn. Suv isitiladi — har faslda qulay.",
      en: "A compact pool for laps and group water sessions. Heated water — comfortable year-round.",
    },
    forWhom: {
      ru: "Для восстановления, техники плавания и семейных визитов.",
      uz: "Tiklash, suzish texnikasi va oilaviy tashriflar uchun.",
      en: "Recovery, swim technique, and family visits.",
    },
    mediaSlot: "pool",
  },
  {
    slug: "group",
    title: {
      ru: "Групповые программы",
      uz: "Guruh dasturlari",
      en: "Group classes",
    },
    short: {
      ru: "STEP PRO, DANCE, йога, пилатес, стретчинг, TRX, шейпинг.",
      uz: "STEP PRO, DANCE, yoga, pilates, stretching, TRX, shaping.",
      en: "STEP PRO, DANCE, yoga, pilates, stretching, TRX, shaping.",
    },
    body: {
      ru: "Зал групповых программ с направлениями на силу, пластику и выносливость. Актуальную сетку смотрите в расписании и Telegram.",
      uz: "Kuch, plastika va chidamlilik yo‘nalishlari bilan guruh dasturlari zali. Dolzarb jadvalni schedule va Telegramda ko‘ring.",
      en: "A group studio for strength, mobility and endurance. Check the schedule and Telegram for the live grid.",
    },
    forWhom: {
      ru: "Кто любит ритм зала и тренера в реальном времени.",
      uz: "Zal ritmi va jonli murabbiyni yoqtiradiganlar uchun.",
      en: "Anyone who likes a live coach and studio energy.",
    },
    mediaSlot: "group",
  },
  {
    slug: "spa",
    title: {
      ru: "Сауна и хаммам",
      uz: "Sauna va hammom",
      en: "Sauna & hammam",
    },
    short: {
      ru: "Финская сауна и хаммам — в каждой раздевалке.",
      uz: "Fin saunasi va hammom — har bir kiyinish xonasida.",
      en: "Finnish sauna and hammam — in every locker room.",
    },
    body: {
      ru: "После нагрузки — тепло сауны или мягкий пар хаммама. Зоны SPA доступны из раздевалок, без отдельного крыла.",
      uz: "Yuklamadan so‘ng — sauna issiqligi yoki hammomning yumshoq bug‘i. SPA zonalari alohida qanotsiz, kiyinish xonalaridan ochiq.",
      en: "After training — sauna heat or soft hammam steam. SPA zones open from the locker rooms, no separate wing required.",
    },
    forWhom: {
      ru: "Для восстановления в том же визите, что и тренировка.",
      uz: "Mashq bilan bir tashrifda tiklanish uchun.",
      en: "Recovery in the same visit as your workout.",
    },
    mediaSlot: "spa",
  },
  {
    slug: "massage",
    title: {
      ru: "Массаж",
      uz: "Massaj",
      en: "Massage",
    },
    short: {
      ru: "Массажный кабинет на территории клуба.",
      uz: "Klub hududidagi massaj xonasi.",
      en: "An on-site massage room.",
    },
    body: {
      ru: "Кабинет для спортивного и восстановительного массажа. Запись — через менеджера или заявку на сайте.",
      uz: "Sport va tiklovchi massaj uchun xona. Yozilish — menejer yoki saytdagi ariza orqali.",
      en: "A room for sports and recovery massage. Book via a manager or the site request form.",
    },
    forWhom: {
      ru: "После силовых циклов и для снятия мышечного напряжения.",
      uz: "Kuch sikllaridan keyin va mushak zo‘riqishini yechish uchun.",
      en: "After strength blocks and for muscle tension relief.",
    },
    mediaSlot: "massage",
  },
  {
    slug: "kids",
    title: {
      ru: "Детям",
      uz: "Bolalar uchun",
      en: "Kids",
    },
    short: {
      ru: "Детская раздевалка и детское плавание.",
      uz: "Bolalar kiyinish xonasi va bolalar suzishi.",
      en: "Kids’ locker room and children’s swimming.",
    },
    body: {
      ru: "Отдельная детская раздевалка и занятия плаванием для детей. Условия возраста и записи — уточняйте у менеджера.",
      uz: "Alohida bolalar kiyinish xonasi va bolalar uchun suzish mashg‘ulotlari. Yosh va yozilish shartlari — menejerdan so‘rang.",
      en: "A dedicated kids’ locker room and children’s swim sessions. Age rules and booking — confirm with a manager.",
    },
    forWhom: {
      ru: "Семьям, которые приходят в клуб вместе.",
      uz: "Klubga birga keladigan oilalar uchun.",
      en: "Families who visit the club together.",
    },
    mediaSlot: "kids",
  },
  {
    slug: "personal",
    title: {
      ru: "Персональные тренировки",
      uz: "Shaxsiy mashg‘ulotlar",
      en: "Personal training",
    },
    short: {
      ru: "Работа один на один с тренером под вашу цель.",
      uz: "Maqsadingiz bo‘yicha murabbiy bilan yakka ish.",
      en: "One-to-one coaching built around your goal.",
    },
    body: {
      ru: "Персональный формат для техники, силы или снижения веса. Подбор тренера — после короткой заявки.",
      uz: "Texnika, kuch yoki vazn maqsadi uchun shaxsiy format. Murabbiy tanlash — qisqa arizadan keyin.",
      en: "A personal format for technique, strength or fat loss. Trainer matching starts with a short request.",
    },
    forWhom: {
      ru: "Кто хочет план и контроль формы, а не только доступ в зал.",
      uz: "Faqat zalga kirish emas, reja va nazoratni xohlovchilar uchun.",
      en: "Anyone who wants a plan and form coaching — not just floor access.",
    },
    mediaSlot: "personal",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceSlugs: ServiceSlug[] = services.map((s) => s.slug);
