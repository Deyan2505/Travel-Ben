"use client";

import { FormEvent, useEffect, useState } from "react";

export type Language = "he" | "bg" | "en";
type Theme = "light" | "dark";
type Service = "tour" | "transfer";
type TransferType = "sofia" | "city";
type Trip = "oneway" | "roundtrip";

const PHONE = "359897932889";
const TOUR_PHOTOS = [
  "/tour-sofia-vitosha.webp",
  "/tour-plovdiv-old-town.webp",
  "/tour-seven-rila-lakes.webp",
  "/spa-pool-panorama.webp",
];

const TOUR_PHOTOS_SMALL = [
  "/tour-sofia-vitosha-640.webp",
  "/tour-plovdiv-old-town-640.webp",
  "/tour-seven-rila-lakes-640.webp",
  "/spa-pool-panorama-640.webp",
];

const GALLERY_PHOTOS = [
  { src: "/sofia-synagogue-hero-v2.webp", smallSrc: "/sofia-synagogue-hero-960.webp", smallWidth: 960, width: 1920, height: 1080 },
  { src: "/tour-sofia-vitosha.webp", smallSrc: "/tour-sofia-vitosha-640.webp", smallWidth: 640, width: 1200, height: 816 },
  { src: "/tour-plovdiv-old-town.webp", smallSrc: "/tour-plovdiv-old-town-640.webp", smallWidth: 640, width: 1200, height: 900 },
  { src: "/tour-seven-rila-lakes.webp", smallSrc: "/tour-seven-rila-lakes-640.webp", smallWidth: 640, width: 1200, height: 901 },
  { src: "/spa-pool-panorama.webp", smallSrc: "/spa-pool-panorama-640.webp", smallWidth: 640, width: 1600, height: 1200 },
];

const LANGUAGE_ROUTES: Record<Language, string> = { he: "/", bg: "/bg/", en: "/en/" };

const uiText = {
  he: {
    home: "דף הבית של Travel Ben",
    nav: "ניווט ראשי",
    languages: "בחירת שפה",
    dark: "מעבר למצב כהה",
    light: "מעבר למצב בהיר",
    skip: "דלגו לתוכן הראשי",
    whatsapp: "פתחו שיחת WhatsApp עם בויאן",
    contactLabel: "טלפון או אימייל",
    contactPlaceholder: "כדי שאוכל לחזור אליכם",
    formHint: "בלחיצה על הכפתור תיפתח שיחה עם בויאן ב-WhatsApp.",
    opened: "WhatsApp נפתח עם פרטי הבקשה שלכם.",
    blocked: "לא הצלחנו לפתוח את WhatsApp. אפשר להתקשר או לשלוח אימייל דרך הקישורים שמשמאל.",
  },
  bg: {
    home: "Начало на Travel Ben",
    nav: "Основна навигация",
    languages: "Избор на език",
    dark: "Включване на тъмен режим",
    light: "Включване на светъл режим",
    skip: "Към основното съдържание",
    whatsapp: "Отворете WhatsApp разговор с Боян",
    contactLabel: "Телефон или имейл",
    contactPlaceholder: "За да мога да се свържа с вас",
    formHint: "Бутонът ще отвори WhatsApp с попълнените от вас данни.",
    opened: "WhatsApp беше отворен с данните от запитването.",
    blocked: "WhatsApp не се отвори. Можете да използвате телефона или имейла вляво.",
  },
  en: {
    home: "Travel Ben home",
    nav: "Main navigation",
    languages: "Language selector",
    dark: "Switch to dark mode",
    light: "Switch to light mode",
    skip: "Skip to main content",
    whatsapp: "Open a WhatsApp chat with Boyan",
    contactLabel: "Phone or email",
    contactPlaceholder: "So I can get back to you",
    formHint: "The button will open WhatsApp with the details you entered.",
    opened: "WhatsApp opened with your enquiry details.",
    blocked: "WhatsApp did not open. Please use the phone or email links on the left.",
  },
};

const content = {
  he: {
    dir: "rtl" as const,
    locale: "he",
    nav: ["טיולים", "הסעות", "גלריה", "למה איתי", "איך זה עובד", "שאלות"],
    navLinks: ["#tours", "#transfers", "#gallery", "#about", "#process", "#faq"],
    contact: "דברו איתי",
    eyebrow: "טיולים פרטיים מבולגריה · בעברית",
    title: "בולגריה בדרך שלכם",
    intro:
      "טיולים פרטיים עם בויאן אריה — מדריך דובר עברית, רכב נוח ומסלול שמתאים בדיוק לקצב שלכם.",
    heroPrimary: "בואו נתכנן טיול",
    heroSecondary: "הטיולים שלנו",
    badges: ["מדריך דובר עברית", "איסוף מהמלון", "קבוצה פרטית", "מסלול גמיש"],
    scroll: "גלו את בולגריה",
    toursKicker: "מסלולים נבחרים",
    toursTitle: "יום אחד. עולם שלם של חוויות בבולגריה.",
    toursIntro:
      "כל טיול יוצא מסופיה ונבנה סביב האנשים שנוסעים — בלי קבוצה זרה, בלי לחץ ובלי מחסום שפה.",
    galleryKicker: "רגעים מבולגריה",
    galleryTitle: "גלריה",
    galleryIntro: "מקומות, נופים ורגעים שמחכים לכם בדרך.",
    galleryLabels: ["בית הכנסת של סופיה", "סופיה מהר ויטושה", "העיר העתיקה של פלובדיב", "שבעת אגמי רילה", "ספא מול ההרים"],
    galleryPhotoAlts: [
      "חזית בית הכנסת של סופיה",
      "תצפית על סופיה מהר ויטושה",
      "רחוב מרוצף בעיר העתיקה של פלובדיב",
      "נוף אווירי של שבעת אגמי רילה",
      "בריכות ספא חיצוניות מול הרי בולגריה",
    ],
    tourPhotoAlts: [
      "נוף של סופיה מהר ויטושה",
      "רחוב עתיק בעיר העתיקה של פלובדיב",
      "נוף של שבעת אגמי רילה",
      "בריכות ספא חיצוניות מול נוף הררי בבולגריה",
    ],
    tours: [
      {
        no: "01",
        title: "סופיה מקרוב",
        desc: "עיר עתיקה וצעירה באותו יום — מרכז היסטורי, שווקים, סיפורים מקומיים והפסקות בקצב שלכם.",
        tags: ["עיר והיסטוריה", "יום מלא", "גמיש"],
      },
      {
        no: "02",
        title: "פלובדיב והעיר העתיקה",
        desc: "רחובות צבעוניים, שכבות של היסטוריה ונוף מהגבעות באחת הערים המרתקות בבלקן.",
        tags: ["תרבות", "אדריכלות", "אוכל"],
      },
      {
        no: "03",
        title: "טבע והרים",
        desc: "יום של אוויר צלול, תצפיות ויעדים בטבע עד 120 ק״מ מסופיה, לפי העונה והכושר שלכם.",
        tags: ["טבע", "הליכה בינונית", "צילום"],
      },
      {
        no: "04",
        title: "ספא וקניות",
        desc: "יום רגוע שמשלב מעיינות, זמן חופשי וקניות — עם הסעה פרטית ותכנון אישי.",
        tags: ["רוגע", "קניות", "פרטי"],
      },
    ],
    priceTitle: "טיולי יום פרטיים",
    priceSubtitle: "מחיר לאדם בהתאם למספר הנוסעים",
    priceTiers: [
      ["2 נוסעים", "€80 לאדם"],
      ["3 נוסעים", "€70 לאדם"],
      ["4 נוסעים", "€65 לאדם"],
      ["5–6 נוסעים", "€60 לאדם"],
      ["7 נוסעים ומעלה", "מחיר לפי בקשה"],
    ],
    priceDetails: "אוכל, כרטיסי כניסה והוצאות אישיות אינם כלולים.",
    transfers: {
      kicker: "הסעות",
      title: "משדה התעופה ועד הכתובת שלכם.",
      intro: "הסעות פרטיות ברכב נוח — משדה התעופה בסופיה אל הכתובת שלכם, ומסופיה אל יעדים נבחרים ברחבי בולגריה.",
      sofia: {
        kicker: "סופיה",
        title: "הסעה משדה התעופה בסופיה",
        desc: "נוחתים בסופיה ונוסעים ישר אל הכתובת שלכם, עם קבלת פנים שתואמה מראש.",
        tiersTitle: "מחיר לפי מספר נוסעים",
        tiers: [
          ["עד 2 נוסעים", "€25 לאדם"],
          ["עד 3 נוסעים", "€30 לאדם"],
          ["עד 4 נוסעים", "€40 לאדם"],
          ["מעל 4 נוסעים", "מחיר בתיאום"],
        ],
        includesTitle: "כלול בשירות",
        includes: ["איסוף משדה התעופה", "קבלת פנים מתואמת מראש", "רכב נוח", "הסעה עד הכתובת שצוינה"],
        cta: "בקשו הסעה",
      },
      city: {
        kicker: "בין־עירוני",
        title: "הסעות בין־עירוניות מסופיה",
        desc: "נקודת יציאה: סופיה. הסעה פרטית ליעד לפי בחירתכם.",
        rateLabel: "תעריף",
        rate: "€1.50",
        rateUnit: "לכל ק״מ",
        destinationsTitle: "יעדים",
        destinations: ["פלובדיב", "בורובץ", "בנסקו", "סאפארבה באניה"],
        note: "המחיר הסופי מאושר באופן אישי לפני ההזמנה.",
        oneWay: "התעריף חל על ק״מ המסלול עם הלקוחות בלבד, בלי חיוב על נסיעת החזרה של הרכב. כל הסעה היא נפרדת: מסופיה לבנסקו, ובהמשך מבנסקו לשדה התעופה בסופיה, הן שתי הסעות.",
        cta: "בקשו הצעת מחיר",
      },
      deposit: "פיקדון של 10% מהמחיר הסופי שאושר שומר את ההסעה.",
    },
    form: {
      service: "סוג השירות",
      serviceOptions: ["טיול יום", "הסעה"],
      transferType: "סוג ההסעה",
      transferTypes: ["משדה התעופה בסופיה לכתובת בסופיה", "בין־עירונית מסופיה"],
      destination: "יעד",
      destinationPlaceholder: "בחרו יעד",
      tripType: "סוג הנסיעה",
      tripTypes: ["כיוון אחד", "הגעה ויציאה (שתי הסעות נפרדות)"],
      returnDate: "תאריך ההסעה בחזרה",
      notes: {
        sofia: ["כתובת בסופיה ופרטי טיסה", "כתובת, מספר טיסה, שעת נחיתה..."],
        city: ["הערות", "שעה מועדפת, בקשות מיוחדות..."],
      },
      message: "שלום בויאן, אשמח לברר לגבי הסעה.",
    },
    aboutKicker: "המדריך שלכם",
    aboutTitle: "מקומי בבולגריה. מרגיש בבית בעברית.",
    aboutText:
      "שמי בויאן אריה. חייתי בישראל, אני דובר עברית שוטפת ומכיר היטב את הראש הישראלי ואת מה שחשוב למטיילים מישראל. המטרה שלי פשוטה: שתגלו את בולגריה בנוחות, בביטחון ובאווירה טובה — ובקצב שמתאים בדיוק לכם.",
    guidePhotoAlt: "בויאן אריה, המדריך שלכם בבולגריה",
    aboutQuote: "לא עוד טיול לפי שעון — יום שנבנה סביבכם.",
    facts: [
      ["עברית", "תקשורת טבעית וברורה"],
      ["עד 7 מקומות", "Citroën C4 Picasso"],
      ["עד 120 ק״מ", "מסלולים מסופיה"],
      ["100% פרטי", "רק אתם והאנשים שלכם"],
    ],
    carTitle: "הדרך היא חלק מהחוויה",
    carText:
      "אני אאסוף אתכם מהמלון או משדה התעופה, וברכב מרווח וממוזג נצא לדרך בקצב שלכם. אפשר לעצור מתי שרוצים ולשנות את המסלול גם תוך כדי הטיול.",
    carPoints: ["מיזוג אוויר", "תא מטען גדול", "ביטוח בתוקף", "איסוף מסופיה"],
    processKicker: "פשוט להזמין",
    processTitle: "מהודעה ראשונה ועד ליום הטיול",
    steps: [
      ["כותבים לי", "תאריך, מספר אנשים ומה מעניין אתכם."],
      ["בונים מסלול", "מקבלים הצעה אישית ומחיר סופי בעברית."],
      ["מאשרים", "פיקדון של 30% שומר את התאריך שלכם."],
      ["יוצאים לדרך", "איסוף, טיול פרטי וגמישות לאורך היום."],
    ],
    faqKicker: "טוב לדעת",
    faqTitle: "שאלות לפני שיוצאים",
    faqs: [
      ["המחיר הוא לאדם או לרכב?", "המחיר הוא לאדם ותלוי במספר הנוסעים — בין €60 ל-€80 לאדם."],
      ["אפשר לשנות את המסלול?", "כן. אפשר לבנות מסלול אישי, לשלב רעיונות ולשנות את הקצב גם במהלך היום."],
      ["מה כלול במחיר?", "הדרכה בעברית ונסיעה ברכב הפרטי. אוכל, כרטיסים והוצאות אישיות משולמים בנפרד."],
      ["איך מאשרים הזמנה?", "לאחר בדיקת זמינות וסיכום המסלול, ההזמנה מאושרת עם פיקדון של 30%."],
      ["מה קורה במקרה של ביטול?", "ביטול עד יום לפני הטיול מאפשר החזר. בביטול ברגע האחרון הפיקדון אינו מוחזר. כרטיסים שכבר נרכשו אינם ניתנים להחזר."],
      ["איך עובדות ההסעות וההזמנה שלהן?", "בהסעה משדה התעופה בסופיה המחיר נקבע לפי מספר הנוסעים. בהסעות בין־עירוניות מסופיה התעריף הוא €1.50 לכל ק״מ של המסלול עם הלקוחות (בלי חיוב על נסיעת החזרה של הרכב), והמחיר הסופי מאושר באופן אישי לפני ההזמנה. ההזמנה מאושרת בפיקדון של 10% מהמחיר הסופי שאושר."],
    ],
    ctaKicker: "הטיול מתחיל כאן",
    ctaTitle: "ספרו לי איזו בולגריה תרצו לפגוש",
    ctaText: "שלחו כמה פרטים ואחזור אליכם בעברית בתוך 1–2 ימים.",
    labels: ["שם", "תאריך משוער", "מספר מטיילים", "מה תרצו לראות?"],
    placeholders: ["השם שלכם", "לדוגמה: 18 בספטמבר", "2 מבוגרים", "עיר, טבע, ספא, קניות..."],
    send: "שלחו ב-WhatsApp",
    direct: "או התקשרו ישירות",
    formMessage: "שלום בויאן, אשמח לתכנן טיול פרטי בבולגריה.",
    footer: "טיולים פרטיים מבולגריה עם מדריך דובר עברית",
    photo: "צילום: karel291 / Wikimedia Commons · CC BY 3.0",
  },
  bg: {
    dir: "ltr" as const,
    locale: "bg",
    nav: ["Турове", "Трансфери", "Галерия", "За мен", "Как работи", "Въпроси"],
    navLinks: ["#tours", "#transfers", "#gallery", "#about", "#process", "#faq"],
    contact: "Свържете се",
    eyebrow: "Частни турове от София · на иврит",
    title: "България по вашия начин",
    intro:
      "Частни турове от София с Боян Арие — гид с отличен иврит, комфортен автомобил и маршрут изцяло по вашия ритъм.",
    heroPrimary: "Да планираме тур",
    heroSecondary: "Вижте туровете",
    badges: ["Гид на иврит", "Вземане от хотела", "Частна група", "Гъвкав маршрут"],
    scroll: "Открийте България",
    toursKicker: "Подбрани маршрути",
    toursTitle: "Един ден. Много повече България.",
    toursIntro:
      "Всеки тур започва от София и се съобразява с хората в автомобила — без непозната група, без бързане и без езикова бариера.",
    galleryKicker: "Моменти от България",
    galleryTitle: "Галерия",
    galleryIntro: "Места, гледки и моменти, които ви очакват по пътя.",
    galleryLabels: ["Софийската синагога", "София от Витоша", "Старият Пловдив", "Седемте рилски езера", "СПА с планинска панорама"],
    galleryPhotoAlts: [
      "Фасадата на Софийската синагога",
      "Панорама към София от Витоша",
      "Калдъръмена улица в Стария град на Пловдив",
      "Панорама към Седемте рилски езера",
      "Открити СПА басейни с планинска панорама",
    ],
    tourPhotoAlts: [
      "Панорама към София от Витоша",
      "Калдъръмена улица в Стария град на Пловдив",
      "Панорама към Седемте рилски езера",
      "Открити СПА басейни с планинска панорама в България",
    ],
    tours: [
      { no: "01", title: "София отблизо", desc: "Историческият център, местни пазари и градски истории с достатъчно време за почивки и снимки.", tags: ["Град и история", "Цял ден", "Гъвкаво"] },
      { no: "02", title: "Пловдив и Старият град", desc: "Цветни улици, пластове история и панорами от хълмовете на един от най-интересните градове на Балканите.", tags: ["Култура", "Архитектура", "Храна"] },
      { no: "03", title: "Природа и планини", desc: "Чист въздух, гледки и природни маршрути до 120 км от София според сезона и вашето темпо.", tags: ["Природа", "Средно ходене", "Снимки"] },
      { no: "04", title: "СПА и шопинг", desc: "Спокоен ден с минерални извори, свободно време и пазаруване, с личен транспорт и организация.", tags: ["Релакс", "Шопинг", "Частно"] },
    ],
    priceTitle: "Частни еднодневни пътувания",
    priceSubtitle: "Цена на човек според броя пътници",
    priceTiers: [
      ["2 пътници", "80 € на човек"],
      ["3 пътници", "70 € на човек"],
      ["4 пътници", "65 € на човек"],
      ["5–6 пътници", "60 € на човек"],
      ["Над 6 пътници", "цена по договаряне"],
    ],
    priceDetails: "Храна, входни билети и лични разходи не са включени.",
    transfers: {
      kicker: "Трансфери",
      title: "От летището до вашия адрес.",
      intro: "Частни трансфери с комфортен автомобил — от летище София до адрес в града и от София до избрани дестинации в България.",
      sofia: {
        kicker: "София",
        title: "Трансфер от летище София",
        desc: "Кацате в София и пътувате директно до посочения от вас адрес, с предварително уговорено посрещане.",
        tiersTitle: "Цена според броя пътници",
        tiers: [
          ["До 2 пътници", "25 € на човек"],
          ["До 3 пътници", "30 € на човек"],
          ["До 4 пътници", "40 € на човек"],
          ["Над 4 пътници", "по договаряне"],
        ],
        includesTitle: "Включено",
        includes: ["Вземане от летището", "Предварително уговорено посрещане", "Комфортен автомобил", "Трансфер до посочен адрес"],
        cta: "Заявете трансфер",
      },
      city: {
        kicker: "Междуградски",
        title: "Междуградски трансфери от София",
        desc: "Начална точка: София. Частен трансфер до избраната от вас дестинация.",
        rateLabel: "Тарифа",
        rate: "1,50 €",
        rateUnit: "на километър",
        destinationsTitle: "Дестинации",
        destinations: ["Пловдив", "Боровец", "Банско", "Сапарева баня"],
        note: "Крайната цена се потвърждава индивидуално преди резервация.",
        oneWay: "Тарифата се начислява за километрите на маршрута с клиента — без обратния пробег на автомобила. Всеки трансфер е самостоятелен: София → Банско и по-късно Банско → летище София са два трансфера.",
        cta: "Поискайте оферта",
      },
      deposit: "Депозит от 10% от потвърдената крайна цена запазва трансфера.",
    },
    form: {
      service: "Вид услуга",
      serviceOptions: ["Еднодневна екскурзия", "Трансфер"],
      transferType: "Тип трансфер",
      transferTypes: ["От летище София до адрес в София", "Междуградски от София"],
      destination: "Дестинация",
      destinationPlaceholder: "Изберете дестинация",
      tripType: "Посока",
      tripTypes: ["В една посока", "Пристигане и заминаване (два отделни трансфера)"],
      returnDate: "Дата на обратния трансфер",
      notes: {
        sofia: ["Адрес в София и данни за полета", "Адрес, номер на полета, час на кацане..."],
        city: ["Бележки", "Предпочитан час, специални заявки..."],
      },
      message: "Здравейте, Боян. Искам да попитам за трансфер.",
    },
    aboutKicker: "Вашият гид",
    aboutTitle: "Местен в България. Естествено общуване на иврит.",
    aboutText:
      "Казвам се Боян Арие. Живял съм в Израел, говоря отличен иврит и познавам манталитета, ритъма и нуждите на израелския турист. Искам да видите България удобно, спокойно и в приятна атмосфера.",
    guidePhotoAlt: "Боян Арие, вашият гид в България",
    aboutQuote: "Не програма по часовник, а ден, създаден около вас.",
    facts: [["Иврит", "Естествено общуване"], ["До 7 места", "Citroën C4 Picasso"], ["До 120 км", "Маршрути от София"], ["100% частно", "Само вашата компания"]],
    carTitle: "Пътуването е част от преживяването",
    carText: "Вземане от хотел или летище, климатизиран автомобил с голям багажник и почивки, когато са ви нужни. Програмата може да се променя и в движение.",
    carPoints: ["Климатроник", "Голям багажник", "Валидна застраховка", "Вземане от София"],
    processKicker: "Лесна резервация",
    processTitle: "От първото съобщение до деня на тура",
    steps: [["Пишете ми", "Дата, брой хора и какво ви интересува."], ["Правим маршрут", "Получавате лична програма и крайна цена."], ["Потвърждавате", "Депозит от 30% запазва датата."], ["Тръгваме", "Вземане, частен тур и гъвкавост през целия ден."]],
    faqKicker: "Полезно",
    faqTitle: "Въпроси преди пътуването",
    faqs: [["Цената за човек ли е?", "Да. Цената е на човек и зависи от броя пътници — между 60 € и 80 € на човек."], ["Може ли маршрутът да се променя?", "Да. Може да се изгради личен маршрут и темпото да се променя по време на тура."], ["Какво е включено?", "Гид на иврит и транспорт с личния автомобил. Храната, билетите и личните разходи се плащат отделно."], ["Как се потвърждава?", "След проверка на датата и уточняване на маршрута резервацията се потвърждава с 30% депозит."], ["Какви са условията за анулиране?", "При отказ до един ден преди тура депозитът се възстановява. При отказ в последния момент не се възстановява. Закупените билети също не се възстановяват."], ["Как работят трансферите и резервацията им?", "При трансфер от летище София цената зависи от броя на пътниците. При междуградски трансфери от София тарифата е 1,50 € на километър от маршрута с клиента (без обратния пробег на автомобила), а крайната цена се потвърждава индивидуално преди резервация. Резервацията се потвърждава с депозит от 10% от потвърдената крайна цена."]],
    ctaKicker: "Турът започва тук",
    ctaTitle: "Разкажете ми каква България искате да видите",
    ctaText: "Изпратете няколко детайла и ще ви отговоря на иврит до 1–2 дни.",
    labels: ["Име", "Желана дата", "Брой туристи", "Какво искате да видите?"],
    placeholders: ["Вашето име", "Например: 18 септември", "2 възрастни", "Град, природа, СПА, шопинг..."],
    send: "Изпратете по WhatsApp",
    direct: "Или се обадете директно",
    formMessage: "Здравейте, Боян. Искам да планирам частен тур в България.",
    footer: "Частни турове в България с гид на иврит",
    photo: "Снимка: karel291 / Wikimedia Commons · CC BY 3.0",
  },
  en: {
    dir: "ltr" as const,
    locale: "en",
    nav: ["Tours", "Transfers", "Gallery", "Your guide", "How it works", "FAQ"],
    navLinks: ["#tours", "#transfers", "#gallery", "#about", "#process", "#faq"],
    contact: "Get in touch",
    eyebrow: "Private tours from Sofia · in Hebrew",
    title: "Bulgaria, your way",
    intro: "Private tours from Sofia with Boyan Arie — a Hebrew-speaking guide, a comfortable car and an itinerary made around your pace.",
    heroPrimary: "Plan my tour",
    heroSecondary: "Explore tours",
    badges: ["Hebrew-speaking guide", "Hotel pickup", "Private group", "Flexible itinerary"],
    scroll: "Discover Bulgaria",
    toursKicker: "Selected routes",
    toursTitle: "One day. Much more Bulgaria.",
    toursIntro: "Every tour starts in Sofia and is shaped around the people travelling — no unfamiliar group, no rush and no language barrier.",
    galleryKicker: "Moments from Bulgaria",
    galleryTitle: "Gallery",
    galleryIntro: "Places, views and moments waiting for you along the way.",
    galleryLabels: ["Sofia Synagogue", "Sofia from Vitosha", "Plovdiv Old Town", "Seven Rila Lakes", "Mountain-view spa"],
    galleryPhotoAlts: [
      "The façade of Sofia Synagogue",
      "Panoramic view of Sofia from Vitosha Mountain",
      "Cobblestone street in Plovdiv Old Town",
      "Panoramic view of the Seven Rila Lakes",
      "Outdoor spa pools overlooking the Bulgarian mountains",
    ],
    tourPhotoAlts: [
      "Panoramic view of Sofia from Vitosha Mountain",
      "Cobblestone street in Plovdiv Old Town",
      "Panoramic view of the Seven Rila Lakes",
      "Outdoor spa pools overlooking the mountains in Bulgaria",
    ],
    tours: [
      { no: "01", title: "Sofia up close", desc: "The historic centre, local markets and city stories, with time for breaks, photos and spontaneous stops.", tags: ["City & history", "Full day", "Flexible"] },
      { no: "02", title: "Plovdiv Old Town", desc: "Colourful streets, layers of history and hilltop views in one of the Balkans’ most fascinating cities.", tags: ["Culture", "Architecture", "Food"] },
      { no: "03", title: "Nature & mountains", desc: "Fresh air, views and nature destinations within 120 km of Sofia, adapted to the season and your pace.", tags: ["Nature", "Moderate walking", "Photography"] },
      { no: "04", title: "Spa & shopping", desc: "A relaxed day combining mineral springs, free time and shopping with private transport and planning.", tags: ["Relax", "Shopping", "Private"] },
    ],
    priceTitle: "Private day trips",
    priceSubtitle: "Price per person, based on group size",
    priceTiers: [
      ["2 passengers", "€80 per person"],
      ["3 passengers", "€70 per person"],
      ["4 passengers", "€65 per person"],
      ["5–6 passengers", "€60 per person"],
      ["7+ passengers", "Price on request"],
    ],
    priceDetails: "Meals, admission tickets and personal expenses are not included.",
    transfers: {
      kicker: "Transfers",
      title: "From the airport to your address.",
      intro: "Private transfers in a comfortable car — from Sofia Airport to an address in the city, and from Sofia to selected destinations across Bulgaria.",
      sofia: {
        kicker: "Sofia",
        title: "Sofia Airport transfer",
        desc: "Land in Sofia and travel straight to your address, with a pre-arranged meeting at arrival.",
        tiersTitle: "Price by group size",
        tiers: [
          ["Up to 2 passengers", "€25 per person"],
          ["Up to 3 passengers", "€30 per person"],
          ["Up to 4 passengers", "€40 per person"],
          ["Over 4 passengers", "By arrangement"],
        ],
        includesTitle: "Included",
        includes: ["Airport pickup", "Pre-arranged meeting", "Comfortable car", "Transfer to your address"],
        cta: "Request a transfer",
      },
      city: {
        kicker: "Intercity",
        title: "Intercity transfers from Sofia",
        desc: "Starting point: Sofia. A private transfer to the destination of your choice.",
        rateLabel: "Rate",
        rate: "€1.50",
        rateUnit: "per kilometre",
        destinationsTitle: "Destinations",
        destinations: ["Plovdiv", "Borovets", "Bansko", "Sapareva Banya"],
        note: "The final price is confirmed individually before booking.",
        oneWay: "The rate applies to the kilometres of the route driven with you — the car’s return trip is not charged. Each transfer stands alone: Sofia → Bansko and, later, Bansko → Sofia Airport are two transfers.",
        cta: "Request a quote",
      },
      deposit: "A 10% deposit on the confirmed final price secures the transfer.",
    },
    form: {
      service: "Service type",
      serviceOptions: ["Day trip", "Transfer"],
      transferType: "Transfer type",
      transferTypes: ["Sofia Airport to an address in Sofia", "Intercity from Sofia"],
      destination: "Destination",
      destinationPlaceholder: "Choose a destination",
      tripType: "Trip",
      tripTypes: ["One way", "Arrival and departure (two separate transfers)"],
      returnDate: "Return transfer date",
      notes: {
        sofia: ["Address in Sofia and flight details", "Address, flight number, landing time..."],
        city: ["Notes", "Preferred time, special requests..."],
      },
      message: "Hello Boyan, I would like to enquire about a transfer.",
    },
    aboutKicker: "Your guide",
    aboutTitle: "Local in Bulgaria. At home in Hebrew.",
    aboutText: "I’m Boyan Arie. I have lived in Israel, speak excellent Hebrew and understand the pace, mindset and needs of Israeli travellers. My goal is simple: help you experience Bulgaria comfortably and in good company.",
    guidePhotoAlt: "Boyan Arie, your private guide in Bulgaria",
    aboutQuote: "Not a tour ruled by the clock — a day designed around you.",
    facts: [["Hebrew", "Natural communication"], ["Up to 7 seats", "Citroën C4 Picasso"], ["Up to 120 km", "Routes from Sofia"], ["100% private", "Only your party"]],
    carTitle: "The journey is part of the experience",
    carText: "Pickup from your hotel or the airport, an air-conditioned car with a large boot and stops whenever you need them. The plan can change during the day.",
    carPoints: ["Air conditioning", "Large boot", "Valid insurance", "Pickup in Sofia"],
    processKicker: "Easy booking",
    processTitle: "From your first message to tour day",
    steps: [["Message me", "Share your date, group size and interests."], ["Build the route", "Receive a personal plan and final price."], ["Confirm", "A 30% deposit secures your date."], ["Set off", "Pickup, a private tour and flexibility all day."]],
    faqKicker: "Good to know",
    faqTitle: "Questions before you go",
    faqs: [["Is the price per person?", "Yes. The price is per person and depends on the group size — between €60 and €80 per person."], ["Can the itinerary change?", "Yes. We can create a personal route and adapt the pace during the tour."], ["What is included?", "Hebrew guidance and transport in the private car. Meals, tickets and personal expenses are paid separately."], ["How do I confirm?", "After availability and the route are agreed, a 30% deposit confirms your booking."], ["What is the cancellation policy?", "The deposit is refundable until one day before the tour. It is non-refundable for last-minute cancellations, as are tickets already purchased."], ["How do transfers and their booking work?", "For Sofia Airport transfers the price depends on the number of passengers. For intercity transfers from Sofia the rate is €1.50 per kilometre of the route with you (the car’s return trip is not charged), and the final price is confirmed individually before booking. A 10% deposit on the confirmed final price secures the booking."]],
    ctaKicker: "Your tour starts here",
    ctaTitle: "Tell me which Bulgaria you want to meet",
    ctaText: "Send a few details and I’ll reply in Hebrew within 1–2 days.",
    labels: ["Name", "Preferred date", "Number of travellers", "What would you like to see?"],
    placeholders: ["Your name", "For example: 18 September", "2 adults", "City, nature, spa, shopping..."],
    send: "Send via WhatsApp",
    direct: "Or call directly",
    formMessage: "Hello Boyan, I would like to plan a private tour in Bulgaria.",
    footer: "Private tours in Bulgaria with a Hebrew-speaking guide",
    photo: "Photo: karel291 / Wikimedia Commons · CC BY 3.0",
  },
};

export default function TravelBenPage({ language }: { language: Language }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [formStatus, setFormStatus] = useState<"idle" | "opened" | "blocked">("idle");
  const [service, setService] = useState<Service>("tour");
  const [transferType, setTransferType] = useState<TransferType>("sofia");
  const [trip, setTrip] = useState<Trip>("oneway");
  const copy = content[language];
  const ui = uiText[language];
  const tr = copy.transfers;
  const fm = copy.form;
  const isTransfer = service === "transfer";
  const notes = fm.notes[transferType];
  const isRoundTrip = isTransfer && transferType === "city" && trip === "roundtrip";

  function pickTransfer(type: TransferType) {
    setService("transfer");
    setTransferType(type);
  }

  useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    setTheme(activeTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("travel-ben-theme", nextTheme);
    setTheme(nextTheme);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const transferLines = isTransfer
      ? [
          `${fm.service}: ${fm.serviceOptions[1]}`,
          `${fm.transferType}: ${fm.transferTypes[transferType === "sofia" ? 0 : 1]}`,
          ...(transferType === "city"
            ? [
                `${fm.destination}: ${data.get("destination") || "-"}`,
                `${fm.tripType}: ${fm.tripTypes[trip === "oneway" ? 0 : 1]}`,
                ...(isRoundTrip ? [`${fm.returnDate}: ${data.get("returnDate") || "-"}`] : []),
              ]
            : []),
        ]
      : [];
    const message = [
      isTransfer ? fm.message : copy.formMessage,
      ...transferLines,
      `${copy.labels[0]}: ${data.get("name") || "-"}`,
      `${copy.labels[1]}: ${data.get("date") || "-"}`,
      `${copy.labels[2]}: ${data.get("people") || "-"}`,
      `${ui.contactLabel}: ${data.get("contact") || "-"}`,
      `${isTransfer ? notes[0] : copy.labels[3]}: ${data.get("interests") || "-"}`,
    ].join("\n");
    const whatsappWindow = window.open("about:blank", "_blank");
    if (!whatsappWindow) {
      setFormStatus("blocked");
      return;
    }
    whatsappWindow.opener = null;
    whatsappWindow.location.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
    setFormStatus("opened");
  }

  return (
    <>
    <a className="skip-link" href="#main-content">{ui.skip}</a>
    <main className="site-shell" dir={copy.dir} id="main-content">
      <header className="topbar">
        <a className="brand" href="#top" aria-label={ui.home}>
          <img className="brand-logo" src="/travel-ben-logo.svg" width="330" height="96" alt="Travel Ben — Private Bulgaria" />
        </a>
        <nav className="main-nav" aria-label={ui.nav}>
          {copy.nav.map((item, index) => <a key={item} href={copy.navLinks[index]}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            data-theme={theme}
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? ui.light : ui.dark}
            title={theme === "dark" ? ui.light : ui.dark}
          >
            <span className="theme-glyph" aria-hidden="true" />
          </button>
          <nav className="language-switch" aria-label={ui.languages}>
            {(["he", "bg", "en"] as Language[]).map((lang) => (
              <a key={lang} href={LANGUAGE_ROUTES[lang]} hrefLang={lang} lang={lang} className={language === lang ? "active" : ""} aria-current={language === lang ? "page" : undefined}>
                {lang === "he" ? "עב" : lang.toUpperCase()}
              </a>
            ))}
          </nav>
          <a className="small-cta" href="#contact">{copy.contact}</a>
        </div>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/sofia-synagogue-hero-v2.webp"
          srcSet="/sofia-synagogue-hero-960.webp 960w, /sofia-synagogue-hero-v2.webp 1920w"
          sizes="100vw"
          alt=""
          width="1920"
          height="1080"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <p className="eyebrow light">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-intro">{copy.intro}</p>
          <div className="hero-buttons">
            <a className="button button-gold" href="#contact">{copy.heroPrimary}<span aria-hidden="true">↗</span></a>
            <a className="button button-ghost" href="#tours">{copy.heroSecondary}</a>
          </div>
        </div>
        <div className="hero-bottom page-width">
          <div className="trust-badges">
            {copy.badges.map((badge, index) => <span key={badge}><i aria-hidden="true">{["א", "⌂", "●", "↝"][index]}</i>{badge}</span>)}
          </div>
          <a className="scroll-cue" href="#tours"><span>{copy.scroll}</span><b aria-hidden="true">↓</b></a>
        </div>
        <a className="photo-credit" href="https://commons.wikimedia.org/wiki/File:Sofia_Center,_1000_Sofia,_Bulgaria_-_panoramio_(17).jpg" target="_blank" rel="noreferrer">{copy.photo}</a>
      </section>

      <section className="section tours-section" id="tours">
        <div className="page-width">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">{copy.toursKicker}</p><h2>{copy.toursTitle}</h2></div>
            <p>{copy.toursIntro}</p>
          </div>
          <div className="tour-grid">
            {copy.tours.map((tour, index) => (
              <article className={`tour-card tour-${index + 1} tour-photo-card`} key={tour.title}>
                <div className="tour-number">{tour.no}</div>
                <img
                  className="tour-card-photo"
                  src={TOUR_PHOTOS[index]}
                  srcSet={`${TOUR_PHOTOS_SMALL[index]} 640w, ${TOUR_PHOTOS[index]} 1200w`}
                  sizes="(max-width: 980px) calc(100vw - 48px), 280px"
                  alt={copy.tourPhotoAlts[index]}
                  width="1200"
                  height="900"
                  loading="lazy"
                />
                <h3>{tour.title}</h3>
                <p>{tour.desc}</p>
                <div className="tag-row">{tour.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="price-strip">
            <div className="price-strip-top">
              <div className="price-strip-heading">
                <h3>{copy.priceTitle}</h3>
                <p>{copy.priceSubtitle}</p>
              </div>
              <a className="price-strip-cta" href="#contact">{copy.heroPrimary}<span aria-hidden="true">↗</span></a>
            </div>
            <ul className="price-tiers">
              {copy.priceTiers.map(([label, value]) => (
                <li key={label}><span>{label}</span><strong>{value}</strong></li>
              ))}
            </ul>
            <p className="price-note">{copy.priceDetails}</p>
          </div>
        </div>
      </section>

      <section className="section transfers-section" id="transfers">
        <div className="page-width">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">{tr.kicker}</p><h2>{tr.title}</h2></div>
            <p>{tr.intro}</p>
          </div>
          <div className="transfer-grid">
            <article className="transfer-card transfer-sofia">
              <p className="eyebrow">{tr.sofia.kicker}</p>
              <h3>{tr.sofia.title}</h3>
              <p className="transfer-desc">{tr.sofia.desc}</p>
              <h4>{tr.sofia.tiersTitle}</h4>
              <ul className="transfer-tiers">
                {tr.sofia.tiers.map(([label, value]) => <li key={label}><span>{label}</span><strong>{value}</strong></li>)}
              </ul>
              <h4>{tr.sofia.includesTitle}</h4>
              <ul className="transfer-includes">
                {tr.sofia.includes.map((item) => <li key={item}><span aria-hidden="true">✓</span>{item}</li>)}
              </ul>
              <a className="button button-gold" href="#contact" onClick={() => pickTransfer("sofia")}>{tr.sofia.cta}<span aria-hidden="true">↗</span></a>
            </article>
            <article className="transfer-card transfer-city">
              <p className="eyebrow light">{tr.city.kicker}</p>
              <h3>{tr.city.title}</h3>
              <p className="transfer-desc">{tr.city.desc}</p>
              <div className="transfer-rate">
                <small>{tr.city.rateLabel}</small>
                <strong dir="ltr">{tr.city.rate}</strong>
                <span>{tr.city.rateUnit}</span>
              </div>
              <h4>{tr.city.destinationsTitle}</h4>
              <ul className="transfer-destinations">
                {tr.city.destinations.map((place) => <li key={place}>{place}</li>)}
              </ul>
              <p className="transfer-note">{tr.city.note}</p>
              <p className="transfer-note transfer-oneway">{tr.city.oneWay}</p>
              <a className="button button-gold" href="#contact" onClick={() => pickTransfer("city")}>{tr.city.cta}<span aria-hidden="true">↗</span></a>
            </article>
          </div>
          <p className="transfer-deposit">{tr.deposit}</p>
        </div>
      </section>

      <section className="section gallery-section" id="gallery">
        <div className="page-width">
          <div className="section-heading split-heading gallery-heading">
            <div><p className="eyebrow">{copy.galleryKicker}</p><h2>{copy.galleryTitle}</h2></div>
            <p>{copy.galleryIntro}</p>
          </div>
          <div className="gallery-grid">
            {GALLERY_PHOTOS.map((photo, index) => (
              <figure className={`gallery-item gallery-${index + 1}`} key={photo.src}>
                <img
                  src={photo.src}
                  srcSet={`${photo.smallSrc} ${photo.smallWidth}w, ${photo.src} ${photo.width}w`}
                  sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1180px) 50vw, 760px"
                  alt={copy.galleryPhotoAlts[index]}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                />
                <figcaption><span>0{index + 1}</span>{copy.galleryLabels[index]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="page-width about-grid">
          <div className="guide-visual">
            <img
              className="guide-photo"
              src="/boyan-arie.webp"
              srcSet="/boyan-arie-700.webp 700w, /boyan-arie.webp 1400w"
              sizes="(max-width: 980px) calc(100vw - 48px), 430px"
              alt={copy.guidePhotoAlt}
              width="1400"
              height="1400"
              loading="lazy"
            />
            <div className="route-line"><span>SOFIA</span><i /><span>120 KM</span></div>
          </div>
          <div className="guide-copy">
            <p className="eyebrow light">{copy.aboutKicker}</p>
            <h2>{copy.aboutTitle}</h2>
            <p className="large-copy">{copy.aboutText}</p>
            <blockquote>“{copy.aboutQuote}”</blockquote>
            <div className="fact-grid">
              {copy.facts.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="section car-section">
        <div className="page-width car-card">
          <div className="road-art" aria-hidden="true"><span>SOFIA</span><i /><b>→</b></div>
          <div className="car-copy"><h2>{copy.carTitle}</h2><p>{copy.carText}</p></div>
          <ul>{copy.carPoints.map((point) => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
        </div>
      </section>

      <section className="section process-section" id="process">
        <div className="page-width">
          <div className="section-heading centered"><p className="eyebrow">{copy.processKicker}</p><h2>{copy.processTitle}</h2></div>
          <div className="steps-grid">
            {copy.steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="page-width faq-grid">
          <div className="faq-title"><p className="eyebrow">{copy.faqKicker}</p><h2>{copy.faqTitle}</h2><div className="faq-compass">✣</div></div>
          <div className="faq-list">
            {copy.faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="page-width contact-grid">
          <div className="contact-copy">
            <p className="eyebrow light">{copy.ctaKicker}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaText}</p>
            <a className="phone-link" href={`tel:+${PHONE}`}><small>{copy.direct}</small><strong>+359 89 793 2889</strong></a>
            <a className="mail-link" href="mailto:boianarie91@gmail.com">boianarie91@gmail.com</a>
          </div>
          <form className="inquiry-form" onSubmit={handleSubmit} aria-describedby="form-note">
            <div className="form-field">
              <label htmlFor="service">{fm.service}</label>
              <select id="service" name="service" value={service} onChange={(event) => setService(event.target.value as Service)}>
                <option value="tour">{fm.serviceOptions[0]}</option>
                <option value="transfer">{fm.serviceOptions[1]}</option>
              </select>
            </div>
            {isTransfer && (
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="transferType">{fm.transferType}</label>
                  <select id="transferType" name="transferType" value={transferType} onChange={(event) => setTransferType(event.target.value as TransferType)}>
                    <option value="sofia">{fm.transferTypes[0]}</option>
                    <option value="city">{fm.transferTypes[1]}</option>
                  </select>
                </div>
                {transferType === "city" && (
                  <div className="form-field">
                    <label htmlFor="destination">{fm.destination}</label>
                    <select id="destination" name="destination" defaultValue="" required>
                      <option value="" disabled>{fm.destinationPlaceholder}</option>
                      {tr.city.destinations.map((place) => <option key={place} value={place}>{place}</option>)}
                    </select>
                  </div>
                )}
              </div>
            )}
            {isTransfer && transferType === "city" && (
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="tripType">{fm.tripType}</label>
                  <select id="tripType" name="tripType" value={trip} onChange={(event) => setTrip(event.target.value as Trip)}>
                    <option value="oneway">{fm.tripTypes[0]}</option>
                    <option value="roundtrip">{fm.tripTypes[1]}</option>
                  </select>
                </div>
                {isRoundTrip && (
                  <div className="form-field">
                    <label htmlFor="returnDate">{fm.returnDate}</label>
                    <input id="returnDate" name="returnDate" type="date" autoComplete="off" required />
                  </div>
                )}
              </div>
            )}
            <div className="form-field">
              <label htmlFor="name">{copy.labels[0]}</label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder={copy.placeholders[0]} required />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="date">{copy.labels[1]}</label>
                <input id="date" name="date" type="date" autoComplete="off" />
              </div>
              <div className="form-field">
                <label htmlFor="people">{copy.labels[2]}</label>
                <input id="people" name="people" type="number" min="1" max="7" inputMode="numeric" placeholder={copy.placeholders[2]} required />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact">{ui.contactLabel}</label>
              <input id="contact" name="contact" type="text" autoComplete="email" placeholder={ui.contactPlaceholder} required />
            </div>
            <div className="form-field">
              <label htmlFor="interests">{isTransfer ? notes[0] : copy.labels[3]}</label>
              <textarea id="interests" name="interests" autoComplete="off" placeholder={isTransfer ? notes[1] : copy.placeholders[3]} rows={3} />
            </div>
            <button className="button button-gold" type="submit">{copy.send}<span aria-hidden="true">↗</span></button>
            <p id="form-note" className={`form-note ${formStatus === "blocked" ? "is-error" : ""}`} role="status" aria-live="polite">
              {formStatus === "opened" ? ui.opened : formStatus === "blocked" ? ui.blocked : ui.formHint}
            </p>
          </form>
        </div>
      </section>

      <footer>
        <div className="page-width footer-inner">
          <a className="brand footer-brand" href="#top" aria-label={ui.home}>
            <img className="brand-logo" src="/travel-ben-logo.svg" width="330" height="96" alt="Travel Ben — Private Bulgaria" />
          </a>
          <p>{copy.footer}</p>
          <div><a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:boianarie91@gmail.com">Email</a></div>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${PHONE}`}
        target="_blank"
        rel="noreferrer"
        aria-label={ui.whatsapp}
        title="WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path className="whatsapp-bubble" d="M16 3.5A12.4 12.4 0 0 0 5.4 22.3L4 28l5.9-1.5A12.4 12.4 0 1 0 16 3.5Z" />
          <path className="whatsapp-phone" d="M10.8 8.8c.4-.5.9-.7 1.4-.4l2.3 1.2c.5.2.7.8.5 1.3l-1.1 2.2c-.2.4-.1.9.2 1.2l3.6 3.6c.3.3.8.4 1.2.2l2.2-1.1c.5-.2 1.1 0 1.3.5l1.2 2.3c.3.5.1 1.1-.4 1.4l-1.7 1c-1.2.7-2.7.8-3.9.2a18.6 18.6 0 0 1-8-8c-.6-1.3-.5-2.7.2-3.9l1-1.7Z" />
        </svg>
      </a>
    </main>
    </>
  );
}

