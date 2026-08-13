"use client";

import { FormEvent, useEffect, useState } from "react";

type Language = "he" | "bg" | "en";
type Theme = "light" | "dark";

const PHONE = "359897932889";

const content = {
  he: {
    dir: "rtl" as const,
    locale: "he",
    nav: ["טיולים", "למה איתי", "איך זה עובד", "שאלות"],
    navLinks: ["#tours", "#about", "#process", "#faq"],
    contact: "דברו איתי",
    eyebrow: "טיולים פרטיים מבולגריה · בעברית",
    title: "בולגריה בדרך שלכם",
    intro:
      "טיולים פרטיים מסופיה עם בויאן אריה — מדריך דובר עברית, רכב נוח ומסלול שמתאים בדיוק לקצב שלכם.",
    heroPrimary: "בואו נתכנן טיול",
    heroSecondary: "הטיולים שלנו",
    badges: ["מדריך דובר עברית", "איסוף מהמלון", "קבוצה פרטית", "מסלול גמיש"],
    scroll: "גלו את בולגריה",
    toursKicker: "מסלולים נבחרים",
    toursTitle: "יום אחד. הרבה יותר מבולגריה.",
    toursIntro:
      "כל טיול יוצא מסופיה ונבנה סביב האנשים שנוסעים — בלי קבוצה זרה, בלי לחץ ובלי מחסום שפה.",
    spaPhotoAlt: "בריכות ספא חיצוניות מול נוף הררי בבולגריה",
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
    priceFrom: "מחיר משוער",
    price: "€60–€75",
    priceNote: "לאדם · בהתאם למסלול",
    priceDetails: "אוכל, כרטיסי כניסה והוצאות אישיות אינם כלולים.",
    aboutKicker: "המדריך שלכם",
    aboutTitle: "מקומי בבולגריה. מרגיש בבית בעברית.",
    aboutText:
      "אני בויאן אריה. חייתי בישראל, אני דובר עברית ומכיר מקרוב את הראש, הקצב והצרכים של המטייל הישראלי. המטרה שלי פשוטה: שתראו את בולגריה בנוחות, בביטחון ובאווירה טובה.",
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
      "איסוף מהמלון או משדה התעופה, רכב ממוזג עם תא מטען גדול ועצירות כשאתם צריכים. התוכנית יכולה להשתנות גם במהלך היום.",
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
      ["המחיר הוא לאדם או לרכב?", "המחיר הוא לאדם ובדרך כלל נע בין 60 ל-75 אירו, בהתאם למסלול."],
      ["אפשר לשנות את המסלול?", "כן. אפשר לבנות מסלול אישי, לשלב רעיונות ולשנות את הקצב גם במהלך היום."],
      ["מה כלול במחיר?", "הדרכה בעברית ונסיעה ברכב הפרטי. אוכל, כרטיסים והוצאות אישיות משולמים בנפרד."],
      ["איך מאשרים הזמנה?", "לאחר בדיקת זמינות וסיכום המסלול, ההזמנה מאושרת עם פיקדון של 30%."],
      ["מה קורה במקרה של ביטול?", "ביטול עד יום לפני הטיול מאפשר החזר. בביטול ברגע האחרון הפיקדון אינו מוחזר. כרטיסים שכבר נרכשו אינם ניתנים להחזר."],
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
    nav: ["Турове", "За мен", "Как работи", "Въпроси"],
    navLinks: ["#tours", "#about", "#process", "#faq"],
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
    spaPhotoAlt: "Открити СПА басейни с планинска панорама в България",
    tours: [
      { no: "01", title: "София отблизо", desc: "Историческият център, местни пазари и градски истории с достатъчно време за почивки и снимки.", tags: ["Град и история", "Цял ден", "Гъвкаво"] },
      { no: "02", title: "Пловдив и Старият град", desc: "Цветни улици, пластове история и панорами от хълмовете на един от най-интересните градове на Балканите.", tags: ["Култура", "Архитектура", "Храна"] },
      { no: "03", title: "Природа и планини", desc: "Чист въздух, гледки и природни маршрути до 120 км от София според сезона и вашето темпо.", tags: ["Природа", "Средно ходене", "Снимки"] },
      { no: "04", title: "СПА и шопинг", desc: "Спокоен ден с минерални извори, свободно време и пазаруване, с личен транспорт и организация.", tags: ["Релакс", "Шопинг", "Частно"] },
    ],
    priceFrom: "Ориентировъчна цена",
    price: "€60–€75",
    priceNote: "на човек · според маршрута",
    priceDetails: "Храна, входни билети и лични разходи не са включени.",
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
    faqs: [["Цената за човек ли е?", "Да. Обикновено е между 60 и 75 евро на човек според маршрута."], ["Може ли маршрутът да се променя?", "Да. Може да се изгради личен маршрут и темпото да се променя по време на тура."], ["Какво е включено?", "Гид на иврит и транспорт с личния автомобил. Храната, билетите и личните разходи се плащат отделно."], ["Как се потвърждава?", "След проверка на датата и уточняване на маршрута резервацията се потвърждава с 30% депозит."], ["Какви са условията за анулиране?", "При отказ до един ден преди тура депозитът се възстановява. При отказ в последния момент не се възстановява. Закупените билети също не се възстановяват."]],
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
    nav: ["Tours", "Your guide", "How it works", "FAQ"],
    navLinks: ["#tours", "#about", "#process", "#faq"],
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
    spaPhotoAlt: "Outdoor spa pools overlooking the mountains in Bulgaria",
    tours: [
      { no: "01", title: "Sofia up close", desc: "The historic centre, local markets and city stories, with time for breaks, photos and spontaneous stops.", tags: ["City & history", "Full day", "Flexible"] },
      { no: "02", title: "Plovdiv Old Town", desc: "Colourful streets, layers of history and hilltop views in one of the Balkans’ most fascinating cities.", tags: ["Culture", "Architecture", "Food"] },
      { no: "03", title: "Nature & mountains", desc: "Fresh air, views and nature destinations within 120 km of Sofia, adapted to the season and your pace.", tags: ["Nature", "Moderate walking", "Photography"] },
      { no: "04", title: "Spa & shopping", desc: "A relaxed day combining mineral springs, free time and shopping with private transport and planning.", tags: ["Relax", "Shopping", "Private"] },
    ],
    priceFrom: "Estimated price",
    price: "€60–€75",
    priceNote: "per person · route dependent",
    priceDetails: "Meals, admission tickets and personal expenses are not included.",
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
    faqs: [["Is the price per person?", "Yes. It usually ranges from €60 to €75 per person, depending on the route."], ["Can the itinerary change?", "Yes. We can create a personal route and adapt the pace during the tour."], ["What is included?", "Hebrew guidance and transport in the private car. Meals, tickets and personal expenses are paid separately."], ["How do I confirm?", "After availability and the route are agreed, a 30% deposit confirms your booking."], ["What is the cancellation policy?", "The deposit is refundable until one day before the tour. It is non-refundable for last-minute cancellations, as are tickets already purchased."]],
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

export default function Home() {
  const [language, setLanguage] = useState<Language>("he");
  const [theme, setTheme] = useState<Theme>("light");
  const copy = content[language];

  useEffect(() => {
    document.documentElement.lang = copy.locale;
    document.documentElement.dir = copy.dir;
  }, [copy.dir, copy.locale]);

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
    const message = [
      copy.formMessage,
      `${copy.labels[0]}: ${data.get("name") || "-"}`,
      `${copy.labels[1]}: ${data.get("date") || "-"}`,
      `${copy.labels[2]}: ${data.get("people") || "-"}`,
      `${copy.labels[3]}: ${data.get("interests") || "-"}`,
    ].join("\n");
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="site-shell" dir={copy.dir}>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Travel Ben home">
          <img className="brand-logo" src="/travel-ben-logo.svg" width="330" height="96" alt="Travel Ben — Private Bulgaria" />
        </a>
        <nav aria-label="Main navigation">
          {copy.nav.map((item, index) => <a key={item} href={copy.navLinks[index]}>{item}</a>)}
        </nav>
        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            data-theme={theme}
            onClick={toggleTheme}
            aria-pressed={theme === "dark"}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            <span className="theme-glyph" aria-hidden="true" />
          </button>
          <div className="language-switch" aria-label="Language selector">
            {(["he", "bg", "en"] as Language[]).map((lang) => (
              <button key={lang} className={language === lang ? "active" : ""} onClick={() => setLanguage(lang)} aria-pressed={language === lang}>
                {lang === "he" ? "עב" : lang.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="small-cta" href="#contact">{copy.contact}</a>
        </div>
      </header>

      <section className="hero" id="top">
        <img
          className="hero-image"
          src="/sofia-synagogue-hero-v2.webp"
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
            {copy.badges.map((badge, index) => <span key={badge}><i>{["א", "⌂", "●", "↝"][index]}</i>{badge}</span>)}
          </div>
          <a className="scroll-cue" href="#tours"><span>{copy.scroll}</span><b>↓</b></a>
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
              <article className={`tour-card tour-${index + 1}${index === 3 ? " tour-photo-card" : ""}`} key={tour.title}>
                <div className="tour-number">{tour.no}</div>
                {index === 3 ? (
                  <img
                    className="tour-card-photo"
                    src="/spa-pool-panorama.webp"
                    alt={copy.spaPhotoAlt}
                    width="1600"
                    height="1200"
                    loading="lazy"
                  />
                ) : (
                  <div className="tour-icon" aria-hidden="true">{["⌂", "◫", "⌁", "✦"][index]}</div>
                )}
                <h3>{tour.title}</h3>
                <p>{tour.desc}</p>
                <div className="tag-row">{tour.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="price-strip">
            <div><span>{copy.priceFrom}</span><strong>{copy.price}</strong><small>{copy.priceNote}</small></div>
            <p>{copy.priceDetails}</p>
            <a href="#contact">{copy.heroPrimary}<span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="page-width about-grid">
          <div className="guide-visual">
            <img
              className="guide-photo"
              src="/boyan-arie.webp"
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
          <ul>{copy.carPoints.map((point) => <li key={point}><span>✓</span>{point}</li>)}</ul>
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
              <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
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
          <form className="inquiry-form" onSubmit={handleSubmit}>
            <label>{copy.labels[0]}<input name="name" placeholder={copy.placeholders[0]} required /></label>
            <div className="form-row">
              <label>{copy.labels[1]}<input name="date" placeholder={copy.placeholders[1]} /></label>
              <label>{copy.labels[2]}<input name="people" placeholder={copy.placeholders[2]} required /></label>
            </div>
            <label>{copy.labels[3]}<textarea name="interests" placeholder={copy.placeholders[3]} rows={3} /></label>
            <button className="button button-gold" type="submit">{copy.send}<span aria-hidden="true">↗</span></button>
          </form>
        </div>
      </section>

      <footer>
        <div className="page-width footer-inner">
          <a className="brand footer-brand" href="#top" aria-label="Travel Ben home">
            <img className="brand-logo" src="/travel-ben-logo.svg" width="330" height="96" alt="Travel Ben — Private Bulgaria" />
          </a>
          <p>{copy.footer}</p>
          <div><a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer">WhatsApp</a><a href="mailto:boianarie91@gmail.com">Email</a></div>
        </div>
      </footer>

      <a className="floating-whatsapp" href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">⌁</a>
    </main>
  );
}