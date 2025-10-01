import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, useLocation, Link, NavLink, useNavigate, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView, Variants } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

// types.ts
const ChatRole = {
    USER: 'user',
    MODEL: 'model',
};

// constants.tsx
const SalesAgentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2"/><path d="M12 14a4 4 0 0 0-4 4v2"/><path d="M12 14a4 4 0 0 1 4 4v2"/><path d="M16 14a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1c0-.55.45-1 1-1Z"/><path d="M12 2a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"/></svg>
);
const GenerativeVideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><path d="M16 16H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h13v10Z"/><path d="M18 8.471c.423-.243.93-.377 1.469-.377a2.623 2.623 0 0 1 2.623 2.623c0 .538-.134 1.046-.377 1.469"/><path d="m11.23 6.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/><path d="m8.23 11.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/><path d="m6.23 15.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/></svg>
);
const CookielessTrackingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m8.5 12.5 2 2 4-4"/></svg>
);
const PersonalizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
const AutonomousCampaignsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.1 2.1a2 2 0 0 1 2.8 2.8l-1.3 1.3L19 9l-4 4-2.4-2.4-1.3 1.3a2 2 0 0 1-2.8-2.8Z"/><path d="M9.4 12.2 2 19.6l1.4 1.4 1.4-1.4 4.2 4.2 1.4-1.4 1.4-1.4-7.4-7.4Z"/><path d="m18 11 1-11-11 1"/></svg>
);
const ShoppableVideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h10"/><path d="m14 6 7.55-4.24a1 1 0 0 1 1.28.83L22 18.2a1 1 0 0 1-1.28.83L14 14"/><path d="M12 12H2l4-10"/><path d="m6 12 1.5-6.5"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M10 18h4"/></svg>
);
const InnovationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.63 3.66a9 9 0 0 1 2.25 10.74L13 21.74a2 2 0 0 1-3.99-.02L4.12 14.4a9 9 0 0 1 2.25-10.74 9 9 0 0 1 9.26 0Z"/><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>;
const PartnershipIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const TransparencyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/><path d="m14 12-3 3 3 3"/></svg>;
const ResultsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>;
const SERVICES_DATA = [
    {
        icon: <SalesAgentIcon />,
        title: "Tekoälyagentit myyntiin & tukeen",
        description: "24/7-chat/voice-agentit, jotka vastaavat liideille sekunneissa, karsivat toistuvat kysymykset ja synkkaavat CRM:ään.",
        caseStudyLink: "#"
    },
    {
        icon: <AutonomousCampaignsIcon />,
        title: "Autonomiset kampanjat (Outbound/Inbound)",
        description: "Monikanavainen orkestrointi (sähköposti, LinkedIn, mainosalustat) + budjetin ja viestien automaattinen A/B/bandit-optimointi.",
        caseStudyLink: "#"
    },
    {
        icon: <ShoppableVideoIcon />,
        title: "Shoppable-video & live-commerce",
        description: "Ostopolku suoraan videosta; interaktiiviset tuotekortit, reaaliaikaiset tarjoukset ja maksut integroituna.",
        caseStudyLink: "#"
    },
    {
        icon: <CookielessTrackingIcon />,
        title: "Evästeetön mittaus & 1st-party data",
        description: "Server-side tagging, Consent Mode, data clean room ja kevyt MMM – luotettava markkinoinnin mittaus ilman kolmannen osapuolen evästeitä.",
        caseStudyLink: "#"
    },
    {
        icon: <PersonalizationIcon />,
        title: "Reaaliaikainen personointi & suositukset",
        description: "Verkkosivun, uutiskirjeiden ja viestien sisältö elää käyttäjän intentin mukaan; AI optimoi konversioon.",
        caseStudyLink: "#"
    },
    {
        icon: <GenerativeVideoIcon />,
        title: "Generatiivinen video & avatar-studio",
        description: "Tuote- ja selitevideot, monikieliset ääniraidat ja brändiavataret automaatiolla – nopea tuotanto ilman kuvausryhmää.",
        caseStudyLink: "#"
    }
];
const PORTFOLIO_DATA = [
    { 
        id: 1, 
        title: "longeviq.voon.fi", 
        category: "Terveysteknologia", 
        imageUrl: "https://picsum.photos/seed/ai-health-viz/600/400", 
        excerpt: "AI-pohjainen “longevity”-alusta: biologisen iän arvio, rutiinivalmentaja ja personoidut lisäravinnesuositukset.", 
        metrics: [
            { label: "Biologinen ikä", value: "-3.5v" }, 
            { label: "Käyttäjäpysyvyys", value: "+78%" }
        ] 
    },
    { 
        id: 2, 
        title: "finnai.voon.fi", 
        category: "Tekoälypalvelu", 
        imageUrl: "https://picsum.photos/seed/ai-language-wave/600/400", 
        excerpt: "Suomea ymmärtävä yritys- ja asiointiapuri, joka vastaa kysymyksiin, tuottaa tekstiä ja automatisoi arkisia prosesseja.", 
        metrics: [
            { label: "Vastaustarkkuus", value: "99.2%" }, 
            { label: "Tukipyyntöjen vähennys", value: "-60%" }
        ] 
    },
    { 
        id: 3, 
        title: "foodai.fi", 
        category: "Ravintola-ala", 
        imageUrl: "https://picsum.photos/seed/ai-food-data/600/400", 
        excerpt: "AI-vetoinen pikaruoka-/ravintola-demo: dynaamiset menut, kampanjat ja personoidut suositukset reaaliajassa.", 
        metrics: [
            { label: "Konversio", value: "+25%" }, 
            { label: "Keskiostos", value: "+15%" }
        ] 
    },
    { 
        id: 4, 
        title: "vooniq.voon.fi", 
        category: "HR-Tech", 
        imageUrl: "https://picsum.photos/seed/ai-career-path/600/400", 
        excerpt: "Ura- ja työnhaku-alusta: ATS-optimoitu CV-työkalu, työpaikkahaku ja AI-pohjaiset harjoitushaastattelut.", 
        metrics: [
            { label: "Haastattelukutsut", value: "+400%" }, 
            { label: "Hakuprosessin nopeus", value: "2x" }
        ] 
    },
];
const BLOG_POSTS_DATA = [
    { 
        id: 1, 
        title: "Miten tekoäly muuttaa markkinointia vuonna 2024?", 
        category: "Strategia", 
        imageUrl: "https://picsum.photos/500/300?random=21", 
        excerpt: "Syväsukellus tekoälyn hyödyntämiseen modernissa markkinoinnissa...", 
        publishDate: "15. heinäkuuta 2024",
        content: `
Tekoäly (AI) ei ole enää tulevaisuuden visio, vaan markkinoinnin nykypäivää. Vuonna 2024 tekoälytyökalut ovat välttämättömiä kilpailukyvyn säilyttämiseksi. Ne eivät ainoastaan automatisoi rutiinitehtäviä, vaan avaavat täysin uusia mahdollisuuksia personointiin, data-analyysiin ja luovaan tuotantoon.

### Personointi uudelle tasolle

Tekoäly mahdollistaa hyper-personoinnin, jossa markkinointiviestit räätälöidään yksilötasolla. Algoritmit analysoivat käyttäjien selaushistoriaa, ostokäyttäytymistä ja demografisia tietoja reaaliaikaisesti, ja tarjoavat juuri oikeanlaista sisältöä oikeaan aikaan. Tämä johtaa parempaan asiakaskokemukseen ja korkeampiin konversioihin.

### Ennustava analytiikka

Sen sijaan, että reagoisimme menneeseen dataan, tekoäly antaa meille kyvyn ennustaa tulevaisuutta. Ennustava analytiikka auttaa tunnistamaan potentiaalisimmat asiakkaat, ennakoimaan trendejä ja optimoimaan markkinointibudjetin käyttöä sinne, missä se tuottaa parhaiten.

### Luovan työn tehostaminen

Tekoäly on myös luovan työn kumppani. Se voi generoida mainostekstejä, kuvia ja jopa videoita annettujen ohjeiden perusteella. Tämä vapauttaa markkinoijien aikaa strategiseen suunnitteluun ja suurten linjojen ideointiin, kun tekoäly hoitaa osan raskaasta tuotantotyöstä.
        `
    },
    { 
        id: 2, 
        title: "Voittavan TikTok-kampanjan anatomia", 
        category: "Some", 
        imageUrl: "https://picsum.photos/500/300?random=22", 
        excerpt: "Analysoimme menestyneimmät viraalikampanjat ja paljastamme niiden salaisuudet...", 
        publishDate: "5. heinäkuuta 2024",
        content: `
TikTok ei ole enää vain nuorten tanssivideoiden alusta. Siitä on tullut yksi tehokkaimmista markkinointikanavista, jolla tavoitetaan sitoutunut ja laaja yleisö. Mutta mikä tekee TikTok-kampanjasta menestyksen?

1.  **Autenttisuus:** Kiillotetut mainokset eivät toimi TikTokissa. Käyttäjät arvostavat aitoa, rehellistä ja usein huumoripitoista sisältöä. Brändien on uskallettava heittäytyä ja näyttää inhimillinen puolensa.

2.  **Trendien hyödyntäminen:** TikTok elää trendeistä – olipa kyseessä tietty ääniraita, haaste tai meemi. Onnistuneet kampanjat osaavat hypätä mukaan trendeihin nopeasti ja soveltaa niitä omalla luovalla tavallaan.

3.  **Yhteistyö vaikuttajien kanssa:** TikTok-vaikuttajat tuntevat alustan ja yleisönsä läpikotaisin. Yhteistyö oikeiden vaikuttajien kanssa voi tuoda brändillesi uskottavuutta ja näkyvyyttä, jota on vaikea saavuttaa muilla keinoin.

4.  **Käyttäjien osallistaminen:** Parhaat kampanjat eivät ole yksisuuntaisia, vaan ne kutsuvat käyttäjät mukaan luomaan sisältöä. Haasteet, duetot ja brändätyt efektit ovat tehokkaita tapoja aktivoida yhteisöä.
        `
    },
    { 
        id: 3, 
        title: "Markkinoinnin automaatio: Säästä aikaa, tehosta tuloksia", 
        category: "Kampanjat", 
        imageUrl: "https://picsum.photos/500/300?random=23", 
        excerpt: "Käytännön vinkit automaatiotyökalujen valintaan ja käyttöönottoon...", 
        publishDate: "28. kesäkuuta 2024",
        content: `
Markkinoinnin automaatio on prosessien ja työkalujen järjestelmä, joka on suunniteltu tehostamaan ja automatisoimaan toistuvia markkinointitehtäviä. Se ei ole vain sähköpostien ajastamista, vaan kokonaisvaltainen lähestymistapa liidien hoivaamiseen ja asiakaspolkujen hallintaan.

**Miksi automaatio kannattaa?**

*   **Ajansäästö:** Automatisoi manuaaliset tehtävät, kuten sähköpostien lähettäminen, somesisältöjen julkaisu ja liidien segmentointi.
*   **Parempi kohdennus:** Lähetä oikea viesti oikealle henkilölle oikeaan aikaan perustuen heidän käyttäytymiseensä.
*   **Tehokkaampi liidien hoivaus:** Rakenna automaattisia "hoivapolkuja", jotka ohjaavat potentiaalisia asiakkaita ostoprosessin läpi personoidulla sisällöllä.
*   **Mittaavat tulokset:** Seuraa tarkasti, mitkä toimenpiteet tuottavat tulosta ja optimoi kampanjoitasi datan perusteella.

**Käyttöönoton vaiheet:**

1.  **Määrittele tavoitteet:** Mitä haluat saavuttaa automaatiolla? (Esim. enemmän liidejä, parempi asiakaspysyvyys).
2.  **Valitse oikea työkalu:** Vertaile alustoja (kuten HubSpot, Marketo, ActiveCampaign) budjettisi ja tarpeidesi mukaan.
3.  **Aloita pienestä:** Älä yritä automatisoida kaikkea kerralla. Aloita yhdestä prosessista, kuten tervetulo-sähköpostisarjasta, ja laajenna siitä.
        `
    },
];
const PROCESS_DATA = [
    { step: 1, title: "Tutkimus & Strategia", description: "Syvennymme liiketoimintaasi, yleisöösi ja kilpailukenttääsi. Määrittelemme yhdessä selkeät tavoitteet ja luomme datalähtöisen strategian." },
    { step: 2, title: "Luova Suunnittelu", description: "Ideoidemme ja suunnittelemme vaikuttavat konseptit ja sisällöt, jotka herättävät brändisi eloon ja puhuttelevat kohderyhmääsi." },
    { step: 3, title: "Toteutus & Aktivointi", description: "Toteutamme kampanjat monikanavaisesti, optimoiden jatkuvasti parhaiden tulosten saavuttamiseksi. Tekninen osaamisemme takaa sujuvan toteutuksen." },
    { step: 4, title: "Analyysi & Optimointi", description: "Mittaamme kampanjoiden tehokkuutta reaaliaikaisesti ja raportoimme tuloksista läpinäkyvästi. Hyödynnämme dataa jatkuvaan optimointiin ja kasvuun." }
];
const VALUES_DATA = [
    {
        icon: <InnovationIcon />,
        title: "Innovaatio Edellä",
        description: "Emme tyydy vanhaan, vaan etsimme jatkuvasti uusia, tehokkaampia tapoja markkinoida tekoälyä ja dataa hyödyntäen."
    },
    {
        icon: <PartnershipIcon />,
        title: "Aito Kumppanuus",
        description: "Olemme enemmän kuin toimisto; olemme osa tiimiäsi. Menestyksesi on meidän menestyksemme."
    },
    {
        icon: <TransparencyIcon />,
        title: "Läpinäkyvyys",
        description: "Raportoimme tuloksista rehellisesti ja selkeästi. Tiedät aina, mihin markkinointibudjettisi käytetään."
    },
    {
        icon: <ResultsIcon />,
        title: "Tuloshakuisuus",
        description: "Luovuus on tärkeää, mutta mitattavat tulokset ovat tärkeämpiä. Keskitymme toimenpiteisiin, jotka tuottavat todellista kasvua."
    }
];
const TEAM_DATA = [
    {
        id: 1,
        name: "Anna Laaksonen",
        title: "Toimitusjohtaja & Strategi",
        bio: "Annan intohimona on yhdistää data ja luovuus brändien kasvattamiseksi. Hänellä on yli 15 vuoden kokemus digitaalisesta markkinoinnista.",
        imageUrl: "https://picsum.photos/seed/anna-laaksonen/400/400",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        id: 2,
        name: "Matti Virtanen",
        title: "Teknologiajohtaja (CTO)",
        bio: "Matti on Voonin tekninen aivot. Hän varmistaa, että käytössämme ovat aina alan parhaat tekoälytyökalut ja automaatioratkaisut.",
        imageUrl: "https://picsum.photos/seed/matti-virtanen/400/400",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
    {
        id: 3,
        name: "Liisa Järvinen",
        title: "Luova johtaja",
        bio: "Liisa vastaa kampanjoidemme visuaalisesta ilmeestä ja tarinankerronnasta. Hänen käsissään ideat muuttuvat vaikuttaviksi kokemuksiksi.",
        imageUrl: "https://picsum.photos/seed/liisa-jarvinen/400/400",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    },
     {
        id: 4,
        name: "Pekka Nieminen",
        title: "AI & Data-analyytikko",
        bio: "Pekka sukeltaa syvälle dataan ja löytää sieltä oivalluksia, jotka ohjaavat strategioitamme ja optimoivat kampanjoiden tehokkuutta.",
        imageUrl: "https://picsum.photos/seed/pekka-nieminen/400/400",
        socials: {
            linkedin: "#",
            twitter: "#"
        }
    }
];

// hooks/useAnimatedCounter.ts
const useAnimatedCounter = (targetValue, duration = 2000) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const end = targetValue;
                    if (start === end) return;

                    const incrementTime = (duration / end);
                    const timer = setInterval(() => {
                        start += 1;
                        setCount(start);
                        if (start === end) {
                            clearInterval(timer);
                        }
                    }, incrementTime);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(ref.current);
            }
        };
    }, [targetValue, duration, ref]);

    return [ref, count];
};

// hooks/useCookieConsent.ts
const COOKIE_CONSENT_KEY = 'voon_cookie_consent';
const useCookieConsent = () => {
    const [consentStatus, setConsentStatus] = React.useState('pending');

    React.useEffect(() => {
        const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (storedConsent === 'accepted' || storedConsent === 'rejected') {
            setConsentStatus(storedConsent);
        }
    }, []);

    const acceptConsent = React.useCallback(() => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
        setConsentStatus('accepted');
        // Placeholder for initializing analytics scripts
        console.log("Analytics and marketing cookies accepted.");
    }, []);

    const rejectConsent = React.useCallback(() => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
        setConsentStatus('rejected');
        // Placeholder for ensuring non-essential scripts are not loaded
        console.log("Analytics and marketing cookies rejected.");
    }, []);

    return { consentStatus, acceptConsent, rejectConsent };
};

// hooks/useScrollAnimation.ts
const useScrollAnimation = (options) => {
    const ref = React.useRef(null);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

// contexts/ThemeContext.tsx
const ThemeContext = React.createContext(undefined);
const useTheme = () => {
    const context = React.useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = React.useState(() => {
        const savedTheme = localStorage.getItem('theme');
        const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        return savedTheme || (userPrefersDark ? 'dark' : 'light');
    });

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// contexts/AuthContext.tsx
const AuthContext = React.createContext(undefined);
const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        try {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                setUser(JSON.parse(savedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, pass) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === 'user@example.com' && pass === 'password123') {
                    const userData = { email };
                    localStorage.setItem('user', JSON.stringify(userData));
                    setUser(userData);
                    resolve();
                } else {
                    reject(new Error('Sähköposti tai salasana on virheellinen.'));
                }
            }, 1000);
        });
    };

    const register = async (email, pass) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && pass) {
                    console.log(`Mock registration for: ${email}`);
                    resolve();
                } else {
                    reject(new Error('Sähköposti ja salasana vaaditaan.'));
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// services/geminiService.ts
let ai = null;
const model = 'gemini-2.5-flash';
const getAiInstance = () => {
    if (ai) {
        return ai;
    }

    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        console.error("CRITICAL: Gemini API key not found. The application will not be able to connect to the AI service. Ensure the API_KEY environment variable is set.");
        throw new Error("API-avainta ei ole määritetty. Ota yhteyttä sivuston ylläpitoon.");
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
    return ai;
};
const getGeminiResponse = async (history, newMessage) => {
    try {
        const aiInstance = getAiInstance();
        const chat = aiInstance.chats.create({
          model,
          history: history.map(msg => ({
              role: msg.role === ChatRole.USER ? 'user' : 'model',
              parts: [{ text: msg.text }]
          })),
          config: {
            systemInstruction: `Olet Voon Assist, ystävällinen ja avulias tekoälyassistentti markkinointitoimisto Voonille. Vastaa lyhyesti ja ytimekkäästi suomeksi. Auta käyttäjiä ymmärtämään Voonin palveluita (Sosiaalinen media, Outbound/Inbound-kampanjat, Kokonaisvaltaiset markkinointiratkaisut) ja ehdota heille yhteydenottoa lisätietoja varten. Älä vastaa kysymyksiin, jotka eivät liity markkinointiin tai Vooniin.`,
          },
        });

        const response = await chat.sendMessage({ message: newMessage });
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
         if (error instanceof Error && error.message.includes("API-avainta")) {
            ai = null; 
            return error.message;
        }
        return "Pahoittelut, mutta tekoälyavustajassa on tällä hetkellä tekninen ongelma. Yritä hetken päästä uudelleen.";
    }
};

// components/SEO.tsx
const SITE_URL = 'https://voon.fi';
const DEFAULT_IMAGE_URL = `https://picsum.photos/seed/voon-og-image/1200/630`;
const SITE_NAME = 'Voon Marketing Agency';
const SEO = ({ 
    title, 
    description, 
    imageUrl = DEFAULT_IMAGE_URL,
    type = 'website'
}) => {
    const location = useLocation();
    const canonicalUrl = `${SITE_URL}/#${location.pathname}`;

    React.useEffect(() => {
        document.title = title;

        const setMetaTag = (attr, value, content) => {
            const selector = `meta[${attr}='${value}']`;
            let element = document.querySelector(selector);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attr, value);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        setMetaTag('name', 'description', description);
        setMetaTag('property', 'og:title', title);
        setMetaTag('property', 'og:description', description);
        setMetaTag('property', 'og:type', type);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:site_name', SITE_NAME);
        setMetaTag('property', 'og:image', imageUrl);
        setMetaTag('name', 'twitter:card', 'summary_large_image');
        setMetaTag('name', 'twitter:title', title);
        setMetaTag('name', 'twitter:description', description);
        setMetaTag('name', 'twitter:image', imageUrl);

    }, [title, description, imageUrl, type, canonicalUrl]);

    return null;
};

// components/SocialShareButtons.tsx
const TwitterIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085a4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" fill="currentColor"/></svg>
);
const LinkedInIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" fill="currentColor"/></svg>
);
const FacebookIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5"><title>Facebook</title><path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.351C0 23.41.59 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.735 0 1.325-.59 1.325-1.325V1.325C24 .59 23.41 0 22.675 0z" fill="currentColor"/></svg>
);
const SocialShareButtons = ({ url, title }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const shareLinks = [
        { name: 'Twitter', icon: <TwitterIcon />, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, className: 'hover:text-[#1DA1F2]' },
        { name: 'LinkedIn', icon: <LinkedInIcon />, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, className: 'hover:text-[#0A66C2]' },
        { name: 'Facebook', icon: <FacebookIcon />, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, className: 'hover:text-[#1877F2]' }
    ];
    return (
        <div className="flex items-center gap-6">
            <p className="font-bold text-lg text-light-text dark:text-gray-300">Jaa tämä artikkeli:</p>
            <div className="flex items-center gap-4">
                {shareLinks.map(link => (
                    <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Jaa ${link.name}:ssa`} className={`p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 transition-colors duration-300 ${link.className}`}>
                        {link.icon}
                    </a>
                ))}
            </div>
        </div>
    );
};

// components/TeamMemberCard.tsx
const TeamMemberCard = ({ member }) => {
    return (
        <div className="group relative bg-light-card dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 text-center p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="relative mb-4">
                <img src={member.imageUrl} alt={member.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-200 dark:border-gray-700" />
                <div className="absolute inset-0 w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-teal"><LinkedInIcon /></a>
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-teal"><TwitterIcon /></a>
                    </div>
                </div>
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-brand-teal font-semibold mb-3">{member.title}</p>
            <p className="text-sm text-light-text/70 dark:text-gray-400">{member.bio}</p>
        </div>
    );
};

// components/CookieConsentBanner.tsx
const CookieConsentBanner = ({ onAccept, onReject }) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="fixed bottom-0 left-0 right-0 z-50 p-6 bg-dark-card/90 backdrop-blur-md border-t border-gray-800"
                aria-live="polite"
                role="dialog"
                aria-modal="true"
                aria-label="Evästeiden suostumusbanneri"
            >
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-lg font-bold text-white">Evästekäytäntömme</h3>
                        <p className="text-sm text-gray-300 max-w-2xl">
                            Käytämme evästeitä parantaaksemme sivustomme käyttökokemusta ja analysoidaksemme liikennettä. Hyväksymällä sallit ei-välttämättömien evästeiden käytön.
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex items-center gap-4">
                        <button onClick={onReject} className="bg-gray-700 text-white font-semibold py-2 px-6 rounded-full transition-colors hover:bg-gray-600">
                            Vain välttämättömät
                        </button>
                        <button onClick={onAccept} className="bg-brand-teal text-white font-bold py-2 px-6 rounded-full transition-colors hover:bg-opacity-80">
                            Hyväksy kaikki
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// components/AIChatWidget.tsx
const initialHistory = [
    { role: ChatRole.MODEL, text: "Hei! Olen Voon Assist. Miten voin auttaa sinua tänään markkinointiin liittyen?" }
];
const AIChatWidget = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [input, setInput] = React.useState('');
    const [history, setHistory] = React.useState(initialHistory);
    const [isLoading, setIsLoading] = React.useState(false);
    const chatEndRef = React.useRef(null);

    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;
        
        const userMessage = { role: ChatRole.USER, text: input };
        setHistory(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const response = await getGeminiResponse(history, input);
        
        const modelMessage = { role: ChatRole.MODEL, text: response };
        setHistory(prev => [...prev, modelMessage]);
        setIsLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleClearChat = () => {
        setHistory(initialHistory);
        setInput('');
        setIsLoading(false);
    };
    
    return (
        <>
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="bg-gradient-to-r from-brand-purple to-brand-teal text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                    aria-label="Avaa chat-avustaja"
                >
                    {isOpen ? (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    ) : (
                         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                    )}
                </button>
            </div>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-dark-card border border-gray-700 rounded-2xl shadow-2xl flex flex-col z-50 animate-fade-in-up">
                    <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg text-white">Voon Assist</h3>
                            <p className="text-sm text-gray-400">Tekoälyavustajasi</p>
                        </div>
                        {history.length > 1 && (
                             <button onClick={handleClearChat} className="text-gray-400 hover:text-white transition-colors" aria-label="Tyhjennä chat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </button>
                        )}
                    </div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        {history.map((message, index) => (
                            <div key={index} className={`flex ${message.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${message.role === ChatRole.USER ? 'bg-brand-purple text-white' : 'bg-gray-700 text-gray-200'}`}>
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                             <div className="flex justify-start">
                                <div className="bg-gray-700 text-gray-200 px-4 py-2 rounded-2xl flex items-center space-x-2">
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></span>
                                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-400"></span>
                                </div>
                             </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="p-4 border-t border-gray-700">
                        <p className="text-xs text-center text-gray-500 mb-2">
                           Voon Assist on avoin kaikille! Kokeile kysyä: "Mitä palveluita tarjoatte?"
                        </p>
                        <div className="flex space-x-2">
                            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Kysy jotain..." className="flex-grow bg-dark-bg border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal" />
                            <button onClick={handleSendMessage} disabled={isLoading || !input.trim()} className="bg-brand-teal text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 disabled:bg-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

// components/ContactForm.tsx
const sendContactEmail = async (formData) => {
    console.warn("SECURITY WARNING: Simulating email sending. In a real app, this MUST be a backend API call.");
    console.log("Form data that would be sent to the backend:", formData);
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (formData.name && formData.email && formData.message) {
         return { success: true, message: "Email sent successfully!" };
    } else {
         return { success: false, message: "Required fields are missing." };
    }
};
const ContactForm = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    const [status, setStatus] = React.useState('idle');
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');
        setErrorMessage('');
        const form = e.currentTarget;
        const formData = {
            name: form.elements.namedItem('name').value,
            email: form.elements.namedItem('email').value,
            company: form.elements.namedItem('company').value,
            message: form.elements.namedItem('message').value,
        };
        try {
            const response = await sendContactEmail(formData);
            if (response.success) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMessage(response.message || 'Lähetys epäonnistui. Tarkista tiedot.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Odottamaton virhe tapahtui. Yritä uudelleen myöhemmin.');
        }
    };

    return (
        <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Valmiina <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">kasvuun?</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 mb-8">Kerro meille projektistasi. Otamme sinuun yhteyttä mahdollisimman pian.</p>
                    </div>
                     <div className="max-w-lg mx-auto">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="text-center p-8 bg-brand-teal/10 border border-brand-teal rounded-2xl">
                                    <h3 className="text-2xl font-bold text-brand-teal">Kiitos viestistäsi!</h3>
                                    <p className="text-light-text/90 dark:text-gray-300 mt-2">Olemme sinuun yhteydessä pian.</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Nimi</label>
                                        <input type="text" name="name" id="name" required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Sähköposti</label>
                                        <input type="email" name="email" id="email" required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="company" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Yritys (vapaaehtoinen)</label>
                                        <input type="text" name="company" id="company" className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Viesti</label>
                                        <textarea name="message" id="message" rows={5} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple"></textarea>
                                    </div>
                                    {status === 'error' && (<p className="text-red-500 text-sm text-center">{errorMessage}</p>)}
                                    <button type="submit" disabled={status === 'submitting'} className="w-full bg-brand-purple text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:bg-brand-teal disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105">
                                        {status === 'submitting' ? 'Lähetetään...' : 'Lähetä viesti'}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

// components/VideoDemos.tsx
const VideoDemos = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
                    <motion.div variants={itemVariants} className="text-center mb-12">
                         <h2 className="text-4xl md:text-5xl font-black mb-4">
                            Tekoälyllä <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">Toteutetut Videot</span>
                        </h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto">
                            Näytämme, miten muunnamme staattiset kuvat dynaamisiksi, huomiota herättäviksi videomainoksiksi tekoälyn avulla.
                        </p>
                    </motion.div>
                    <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                            <video src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" aria-label="Esimerkki tekoälyllä luodusta videomainoksesta 1" />
                        </motion.div>
                        <motion.div variants={itemVariants} className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-lg transform hover:scale-105 transition-transform duration-300">
                             <video src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" aria-label="Esimerkki tekoälyllä luodusta videomainoksesta 2" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

// components/BlogTeaser.tsx
const getCategoryColor = (category) => {
    switch(category) {
        case 'Some': return 'bg-brand-teal text-white';
        case 'Kampanjat': return 'bg-brand-coral text-white';
        case 'Strategia': return 'bg-brand-purple text-white';
        default: return 'bg-gray-500 text-white';
    }
}
const BlogTeaser = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const posts = fullPage ? BLOG_POSTS_DATA : BLOG_POSTS_DATA.slice(0, 3);
    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                 {!fullPage && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Uusimmat <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">näkemykset</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-2xl mx-auto">Pysy kärryillä markkinoinnin uusimmista tuulista asiantuntijoidemme blogista.</p>
                    </div>
                 )}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => (
                        <div key={post.id} className={`bg-light-card dark:bg-dark-card rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-500 hover:border-brand-purple hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{transitionDelay: `${index * 150}ms`}}>
                            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-4">
                                    <span className={`text-sm font-bold px-3 py-1 rounded-full self-start ${getCategoryColor(post.category)}`}>{post.category}</span>
                                    <span className="text-sm text-gray-500">{post.publishDate}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 flex-grow">
                                    <Link to={`/blogi/${post.id}`} className="hover:text-brand-purple transition-colors">{post.title}</Link>
                                </h3>
                                <p className="text-light-text/70 dark:text-gray-400 mb-4">{post.excerpt}</p>
                                <div className="mt-auto">
                                    <Link to={`/blogi/${post.id}`} className="font-bold text-brand-teal hover:underline">Lue lisää &rarr;</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 {!fullPage && (
                    <div className="text-center mt-16">
                        <Link to="/blogi" className="inline-block bg-brand-purple text-white font-bold text-lg py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-brand-purple/50">Kaikki artikkelit</Link>
                    </div>
                 )}
            </div>
        </section>
    );
};

// components/Portfolio.tsx
const Portfolio = ({ fullPage = false }) => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
    const [activeFilter, setActiveFilter] = React.useState('Kaikki');
    const categories = ['Kaikki', ...Array.from(new Set(PORTFOLIO_DATA.map(item => item.category)))];
    const filteredItems = fullPage ? PORTFOLIO_DATA.filter(item => activeFilter === 'Kaikki' || item.category === activeFilter) : PORTFOLIO_DATA.slice(0, 4);
    const gridVariants = { visible: { transition: { staggerChildren: 0.1 } }, hidden: {} };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20, transition: { duration: 0.2 } } };
    return (
        <section ref={ref} className="py-20 bg-light-card dark:bg-dark-card">
            <div className="container mx-auto px-6">
                {!fullPage && (
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-black mb-4">Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">töitämme</span></h2>
                        <p className="text-lg text-light-text/80 dark:text-gray-400 max-w-2xl mx-auto">Emme vain puhu tuloksista – me luomme niitä. Katso, miten olemme auttaneet asiakkaitamme menestymään.</p>
                    </div>
                )}
                {fullPage && (
                    <div className="flex justify-center flex-wrap gap-4 mb-12">
                        {categories.map(category => (
                            <button key={category} onClick={() => setActiveFilter(category)} className={`px-6 py-2 font-semibold rounded-full transition-all duration-300 ease-in-out ${activeFilter === category ? 'bg-brand-teal text-white shadow-lg' : 'bg-light-bg dark:bg-dark-bg text-light-text/80 dark:text-dark-text/80 hover:bg-gray-200 dark:hover:bg-gray-800'}`}>
                                {category}
                            </button>
                        ))}
                    </div>
                )}
                <motion.div layout variants={gridVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <AnimatePresence>
                        {filteredItems.map(item => (
                            <motion.div key={item.id} layout variants={itemVariants} exit="exit" className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
                                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-sm font-semibold bg-brand-teal text-white px-3 py-1 rounded-full self-start mb-2">{item.category}</span>
                                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-white/90 mb-4">{item.excerpt}</p>
                                    <div className="flex space-x-6">
                                        {item.metrics.map(metric => (
                                            <div key={metric.label}>
                                                <p className="text-2xl font-bold text-white">{metric.value}</p>
                                                <p className="text-sm text-white/70">{metric.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

// components/Testimonials.tsx
const PilotIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);
const RiskFreeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg>
);
const Testimonials = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Aloita kanssamme, <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">riskittä</span></h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                        <div className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col transition-transform duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `0ms`}}>
                            <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 text-brand-teal bg-brand-teal/10 p-3 rounded-lg"><PilotIcon /></div>
                                <div><h3 className="font-bold text-2xl">Pilottikumppaneita haussa</h3></div>
                            </div>
                            <p className="text-light-text/80 dark:text-gray-400 mb-6 flex-grow">“Etsimme kahta pilottikumppania testaamaan tekoälypohjaisia markkinointiratkaisuja. Tavoite: mitattava vaikutus 30 päivässä (liidit, konversio tai sisältönopeus).”</p>
                            <div className="mt-auto">
                                <p className="text-sm text-light-text/80 dark:text-gray-400 mb-4">Anna mahdollisuus: Varaa 20 min sparraus &darr;</p>
                                <Link to="/yhteys" className="w-full text-center block bg-brand-purple text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">Pyydä pilotti</Link>
                            </div>
                        </div>
                        <div className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 flex flex-col transition-transform duration-500 transform hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: `200ms`}}>
                             <div className="flex items-start gap-4 mb-4">
                                <div className="flex-shrink-0 text-brand-coral bg-brand-coral/10 p-3 rounded-lg"><RiskFreeIcon /></div>
                                <div><h3 className="font-bold text-2xl">Nopean kokeilun lupaus</h3></div>
                            </div>
                            <p className="text-light-text/80 dark:text-gray-400 mb-6 flex-grow">“Aloitamme viikossa. Jos ensimmäisen sprintin (7–10 pv) jälkeen emme tuota sovittua hyötyä, et maksa sprintistä.”</p>
                            <div className="mt-auto">
                                <p className="text-sm text-light-text/80 dark:text-gray-400 mb-4">Toimitus: min. 1 AI-agentti + 1 automaatio + raportti &darr;</p>
                                <Link to="/yhteys" className="w-full text-center block bg-brand-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">Aloita riskittä</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// components/ProcessTimeline.tsx
const ProcessTimeline = () => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const timelineVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.4, } } };
    const lineVariants = { hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: 1, ease: 'easeOut' } } };
    const stepVariants = { hidden: (index) => ({ opacity: 0, x: index % 2 === 0 ? -50 : 50 }), visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } } };
    const circleVariants = { hidden: { scale: 0 }, visible: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } } };
    return (
        <section className="py-20 bg-light-card dark:bg-dark-card">
            <div ref={ref} className="container mx-auto px-6">
                <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-16">Meidän <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">prosessimme</span></h2>
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-800 hidden md:block">
                            <motion.div className="w-full h-full bg-gradient-to-b from-brand-purple to-brand-teal" style={{ originY: 0 }} variants={lineVariants} />
                        </div>
                        <motion.div variants={timelineVariants}>
                            {PROCESS_DATA.map((item, index) => (
                                <motion.div key={item.step} custom={index} variants={stepVariants} className={`mb-8 flex justify-between items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-5/12">
                                        <div className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-light-bg dark:bg-dark-bg transition-all duration-300 hover:border-brand-teal hover:shadow-lg hover:shadow-brand-teal/10">
                                            <h3 className="font-bold text-2xl mb-2 text-brand-teal">{item.title}</h3>
                                            <p className="text-light-text/80 dark:text-gray-400">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="z-10 hidden md:flex items-center">
                                        <motion.div variants={circleVariants} className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center text-dark-text">
                                            <span className="font-bold">{item.step}</span>
                                        </motion.div>
                                    </div>
                                    <div className="hidden md:block w-5/12"></div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// components/Services.tsx
const Services = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });
    return (
        <section ref={ref} className="py-20 bg-light-bg dark:bg-dark-bg">
            <div className="container mx-auto px-6">
                <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-4xl md:text-5xl font-black text-center mb-4">Miten me <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">autamme?</span></h2>
                    <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-12">Yhdistämme strategian, luovuuden ja teknologian tuottaaksemme mitattavia tuloksia.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SERVICES_DATA.map((service, index) => (
                            <div key={index} className={`bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center transform transition-all duration-500 hover:scale-105 hover:border-brand-teal hover:shadow-2xl hover:shadow-brand-teal/20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: `${index * 200}ms` }}>
                                <div className="inline-block text-brand-teal bg-brand-teal/10 p-4 rounded-full mb-6">{service.icon}</div>
                                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                <p className="text-light-text/80 dark:text-gray-400">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

// components/Hero.tsx
const Hero = () => {
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.3 });
    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-dark-bg dark:via-brand-purple/20 dark:to-dark-bg dark:animate-background-pan dark:bg-[length:400%_400%] z-0"></div>
            <div className="absolute inset-0 bg-light-bg/80 dark:bg-dark-bg/70 z-10"></div>
            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-teal to-brand-coral">Kasvatamme</span>
                        <br />
                        Brändejä. Tuloksia.
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-light-text/80 dark:text-gray-300 mb-10">Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia.</p>
                    <Link to="/yhteys" className="inline-block bg-brand-purple text-white font-bold text-lg py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-brand-purple/50 animate-pulse-glow">Aloita Kasvu</Link>
                </div>
            </div>
        </section>
    );
};

// components/Footer.tsx
const Footer = () => {
    return (
        <footer className="bg-light-card dark:bg-dark-card border-t border-gray-200 dark:border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Voon</h3>
                        <p className="mt-4 text-light-text/70 dark:text-dark-text/70">Kasvatamme brändejä digitaalisessa maailmassa.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Pikavalikko</h4>
                        <ul className="mt-4 space-y-2">
                            <li><Link to="/palvelut" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Palvelut</Link></li>
                            <li><Link to="/referenssit" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Referenssit</Link></li>
                            <li><Link to="/meista" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Meistä</Link></li>
                            <li><Link to="/blogi" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Blogi</Link></li>
                            <li><Link to="/yhteys" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-teal">Ota yhteyttä</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg">Seuraa meitä</h4>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-purple transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                            <a href="#" className="text-light-text/70 dark:text-dark-text/70 hover:text-brand-purple transition-colors"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.064c0 2.295 1.616 4.22 3.764 4.66-1.037.284-2.153.331-3.26.126.652 2.023 2.523 3.32 4.649 3.369-1.88 1.474-4.249 2.355-6.849 2.053 2.223 1.438 4.862 2.266 7.692 2.266 9.227 0 14.28-7.653 14.03-14.532.937-.677 1.75-1.523 2.4-2.493z"/></svg></a>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg">Uutiskirje</h4>
                        <p className="mt-4 text-light-text/70 dark:text-dark-text/70 text-sm">Saa uusimmat markkinointivinkit suoraan sähköpostiisi.</p>
                        <form className="mt-4 flex">
                            <input type="email" placeholder="Sähköpostisi" className="bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-brand-teal"/>
                            <button type="submit" className="bg-brand-teal text-white font-bold px-4 rounded-r-md hover:bg-opacity-80 transition-colors">Tilaa</button>
                        </form>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-light-text/50 dark:text-dark-text/50">
                    <p>&copy; {new Date().getFullYear()} Voon Marketing Agency. Kaikki oikeudet pidätetään.</p>
                </div>
            </div>
        </footer>
    );
};

// components/Header.tsx
const SunIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>);
const MoonIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>);
const MenuIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const ChevronDownIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>);
const activeLinkStyle = { background: 'linear-gradient(to right, #6f42c1, #20c997)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };
const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
    const navigate = useNavigate();
    const coreServices = SERVICES_DATA.slice(0, 3);
    const aiServices = SERVICES_DATA.slice(3, 6);

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        document.body.classList.toggle('overflow-hidden', isMenuOpen);
        return () => document.body.classList.remove('overflow-hidden');
    }, [isMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };
    
    const mobileMenuVariants = { hidden: { opacity: 0, transition: { when: "afterChildren" } }, visible: { opacity: 1, transition: { when: "beforeChildren", staggerChildren: 0.08 } } };
    const mobileNavItemVariants = { hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } } };

    return (
        <header className={`sticky top-0 z-40 w-full backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'shadow-lg bg-light-bg/95 dark:bg-dark-bg/95 border-b border-gray-200 dark:border-gray-800' : 'bg-light-bg/80 dark:bg-dark-bg/80 border-b border-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Voon</Link>
                <nav className="hidden md:flex items-center space-x-8">
                     <div className="relative" onMouseEnter={() => setIsMegaMenuOpen(true)} onMouseLeave={() => setIsMegaMenuOpen(false)}>
                        <NavLink to="/palvelut" className="font-semibold transition-colors hover:text-brand-teal flex items-center gap-1" style={({isActive}) => isActive ? activeLinkStyle : {}}>Palvelut<ChevronDownIcon /></NavLink>
                        <AnimatePresence>
                            {isMegaMenuOpen && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-4xl z-50">
                                    <div className="overflow-hidden rounded-2xl shadow-2xl bg-light-card dark:bg-dark-card border border-gray-200 dark:border-gray-800">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 p-8">
                                            <div>
                                                <h3 className="text-sm font-semibold tracking-wider text-brand-purple uppercase mb-4">Asiakashankinta & Myynti</h3>
                                                <div className="space-y-1">
                                                    {coreServices.map(service => (
                                                        <Link key={service.title} to="/palvelut" className="group flex items-start p-3 -m-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMegaMenuOpen(false)}>
                                                            <div className="flex-shrink-0 text-brand-teal bg-brand-teal/10 p-3 rounded-lg group-hover:bg-brand-teal group-hover:text-white transition-colors duration-300">{service.icon}</div>
                                                            <div className="ml-4">
                                                                <p className="font-bold text-light-text dark:text-dark-text">{service.title}</p>
                                                                <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">{service.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                 <h3 className="text-sm font-semibold tracking-wider text-brand-coral uppercase mb-4">Konversio & Mittaus</h3>
                                                <div className="space-y-1">
                                                    {aiServices.map(service => (
                                                        <Link key={service.title} to="/palvelut" className="group flex items-start p-3 -m-3 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => setIsMegaMenuOpen(false)}>
                                                            <div className="flex-shrink-0 text-brand-coral bg-brand-coral/10 p-3 rounded-lg group-hover:bg-brand-coral group-hover:text-white transition-colors duration-300">{service.icon}</div>
                                                            <div className="ml-4">
                                                                <p className="font-bold text-light-text dark:text-dark-text">{service.title}</p>
                                                                <p className="text-sm text-light-text/70 dark:text-dark-text/70 mt-1">{service.description}</p>
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <NavLink to="/referenssit" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Referenssit</NavLink>
                    <NavLink to="/meista" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Meistä</NavLink>
                    <NavLink to="/blogi" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Blogi</NavLink>
                    {user && <NavLink to="/dashboard" className="font-semibold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink>}
                </nav>
                <div className="flex items-center space-x-4">
                     <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <button onClick={handleLogout} className="bg-brand-coral text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">Kirjaudu ulos</button>
                        ) : (
                            <>
                                <Link to="/login" className="font-semibold transition-colors hover:text-brand-teal">Kirjaudu sisään</Link>
                                <Link to="/yhteys" className="bg-brand-purple text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">Ota yhteyttä</Link>
                            </>
                        )}
                     </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full transition-colors hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Vaihda teemaa">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</button>
                    <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Avaa valikko" className="relative z-50">{isMenuOpen ? <CloseIcon /> : <MenuIcon />}</button></div>
                </div>
            </div>
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden" className="md:hidden fixed inset-0 bg-light-card dark:bg-dark-bg z-30 pt-24">
                        <div className="container mx-auto px-6 h-full flex flex-col">
                            <nav className="flex flex-col items-center space-y-6">
                                <motion.div variants={mobileNavItemVariants}><NavLink to="/palvelut" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Palvelut</NavLink></motion.div>
                                <motion.div variants={mobileNavItemVariants}><NavLink to="/referenssit" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Referenssit</NavLink></motion.div>
                                <motion.div variants={mobileNavItemVariants}><NavLink to="/meista" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Meistä</NavLink></motion.div>
                                <motion.div variants={mobileNavItemVariants}><NavLink to="/blogi" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Blogi</NavLink></motion.div>
                                {user && (<motion.div variants={mobileNavItemVariants}><NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-2xl font-bold transition-colors hover:text-brand-teal" style={({ isActive }) => isActive ? activeLinkStyle : {}}>Dashboard</NavLink></motion.div>)}
                            </nav>
                            <div className="mt-auto pb-8 space-y-4">
                                {user ? (
                                    <motion.div variants={mobileNavItemVariants}><button onClick={handleLogout} className="w-full text-center bg-brand-coral text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-opacity-80">Kirjaudu ulos</button></motion.div>
                                ) : (
                                    <>
                                        <motion.div variants={mobileNavItemVariants}><Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-gray-200 dark:bg-gray-800 font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700">Kirjaudu sisään</Link></motion.div>
                                        <motion.div variants={mobileNavItemVariants}><Link to="/yhteys" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-brand-purple text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:bg-brand-teal">Ota yhteyttä</Link></motion.div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

// components/ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if (loading) {
        return (<div className="flex justify-center items-center min-h-screen bg-light-bg dark:bg-dark-bg"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-purple"></div></div>);
    }
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

// pages/AboutUsPage.tsx
const AboutUsPage = () => {
    const [valuesRef, valuesInView] = useScrollAnimation({ threshold: 0.2 });
    const [teamRef, teamInView] = useScrollAnimation({ threshold: 0.1 });
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
    return (
        <>
            <SEO title="Meistä | Voon Marketing Agency" description="Opi tuntemaan Voonin tarina, tiimi ja arvot. Olemme dataohjattu ja luova markkinointitoimisto, joka on sitoutunut asiakkaidemme menestykseen." />
            <div className="bg-light-bg dark:bg-dark-bg">
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="py-24 text-center bg-light-card dark:bg-dark-card">
                    <div className="container mx-auto px-6">
                        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Keitä me olemme?</motion.h1>
                        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto">Olemme joukko intohimoisia markkinoinnin ammattilaisia, teknologia-asiantuntijoita ja luovia sieluja, jotka uskovat dataohjautuvan ja ihmisläheisen markkinoinnin voimaan.</motion.p>
                    </div>
                </motion.section>
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                                <h2 className="text-3xl font-bold mb-4 text-brand-purple">Missiomme</h2>
                                <p className="text-lg leading-relaxed text-light-text/90 dark:text-gray-300">Auttaa yrityksiä hyödyntämään uusinta teknologiaa ja tekoälyä markkinoinnissaan, luoden mitattavaa kasvua ja syvempiä asiakassuhteita.</p>
                            </motion.div>
                            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.7 }}>
                                <h2 className="text-3xl font-bold mb-4 text-brand-teal">Visiomme</h2>
                                <p className="text-lg leading-relaxed text-light-text/90 dark:text-gray-300">Olla Suomen johtava tekoälypohjaisen markkinoinnin strateginen kumppani, joka tunnetaan innovatiivisuudesta, tuloksellisuudesta ja läpinäkyvyydestä.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>
                <section ref={valuesRef} className="py-20 bg-light-card dark:bg-dark-card">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-black mb-12">Arvomme</h2>
                        <motion.div variants={containerVariants} initial="hidden" animate={valuesInView ? "visible" : "hidden"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {VALUES_DATA.map((value) => (
                                <motion.div key={value.title} variants={itemVariants} className="p-8 rounded-2xl bg-light-bg dark:bg-dark-bg border border-gray-200 dark:border-gray-800">
                                    <div className="inline-block text-brand-coral bg-brand-coral/10 p-4 rounded-full mb-6">{value.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                                    <p className="text-light-text/80 dark:text-gray-400">{value.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
                <section ref={teamRef} className="py-20">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-4xl font-black mb-12">Tapaa <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-coral">tiimimme</span></h2>
                        <motion.div variants={containerVariants} initial="hidden" animate={teamInView ? "visible" : "hidden"} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {TEAM_DATA.map((member) => (<motion.div key={member.id} variants={itemVariants}><TeamMemberCard member={member} /></motion.div>))}
                        </motion.div>
                    </div>
                </section>
            </div>
        </>
    );
};

// pages/BlogDetailPage.tsx
const BlogDetailPage = () => {
    const { postId } = useParams();
    const post = BLOG_POSTS_DATA.find(p => p.id === Number(postId));
    if (!post) { return <Navigate to="/blogi" replace />; }
    const pageUrl = window.location.href;
    const renderContent = (content) => {
        const paragraphs = content.trim().split('\n').filter(p => p.trim() !== '');
        const elements = [];
        let listItems = [];
        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 mb-6 text-lg leading-relaxed text-light-text/90 dark:text-gray-300">{listItems}</ul>);
                listItems = [];
            }
        };
        paragraphs.forEach((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
                flushList();
                elements.push(<h3 key={index} className="text-2xl font-bold mt-8 mb-4 text-brand-teal">{paragraph.substring(4)}</h3>);
            } else if (paragraph.match(/^(\d+\.|-|\*)\s/)) {
                listItems.push(<li key={index}>{paragraph.replace(/^(\d+\.|-|\*)\s/, '')}</li>);
            } else {
                flushList();
                elements.push(<p key={index} className="mb-6 text-lg leading-relaxed text-light-text/90 dark:text-gray-300">{paragraph}</p>);
            }
        });
        flushList();
        return elements;
    };
    return (
        <>
            <SEO title={`${post.title} | Voon Blogi`} description={post.excerpt} imageUrl={post.imageUrl} type="article" />
            <div className="bg-light-bg dark:bg-dark-bg py-20">
                <div className="container mx-auto px-6">
                    <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-4xl mx-auto bg-light-card dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg">
                        <img src={post.imageUrl} alt={post.title} className="w-full h-64 md:h-96 object-cover" />
                        <div className="p-6 md:p-12">
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className={`text-sm font-bold px-4 py-1.5 rounded-full ${getCategoryColor(post.category)}`}>{post.category}</span>
                                    <p className="text-sm text-gray-500">{post.publishDate}</p>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-black text-light-text dark:text-dark-text leading-tight">{post.title}</h1>
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none">{renderContent(post.content)}</div>
                            <hr className="my-12 border-gray-200 dark:border-gray-700" />
                            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                                <SocialShareButtons url={pageUrl} title={post.title} />
                                <Link to="/blogi" className="font-bold text-brand-purple hover:underline">&larr; Takaisin blogiin</Link>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </div>
        </>
    );
};

// pages/BlogPage.tsx
const BlogPage = () => {
  return (
    <>
      <SEO title="Blogi | Voon Marketing Agency" description="Pysy ajan tasalla digitaalisen markkinoinnin viimeisimmistä trendeistä, vinkeistä ja strategioista. Täältä löydät asiantuntijoidemme näkemyksiä." />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Blogi</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Pysy ajan tasalla digitaalisen markkinoinnin viimeisimmistä trendeistä, vinkeistä ja strategioista. Täältä löydät asiantuntijoidemme näkemyksiä.</p>
          <BlogTeaser fullPage={true} />
        </div>
      </div>
    </>
  );
};

// pages/ContactPage.tsx
const ContactPage = () => {
  return (
    <>
      <SEO title="Ota Yhteyttä | Voon Marketing Agency" description="Oletko valmis viemään markkinointisi seuraavalle tasolle? Olemme täällä auttamassa. Täytä alla oleva lomake tai ota meihin yhteyttä suoraan." />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Ota Yhteyttä</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Oletko valmis viemään markkinointisi seuraavalle tasolle? Olemme täällä auttamassa. Täytä alla oleva lomake tai ota meihin yhteyttä suoraan.</p>
          <ContactForm />
        </div>
      </div>
    </>
  );
};

// pages/DashboardPage.tsx
const DashboardPage = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => { logout(); navigate('/'); };
    if (!user) { return null; }
    return (
        <>
            <SEO title="Hallintapaneeli | Voon Marketing Agency" description="Tervetuloa henkilökohtaiseen hallintapaneeliisi." />
            <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
                <div className="container mx-auto px-6 py-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-3xl mx-auto text-center">
                        <h1 className="text-5xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Hallintapaneeli</h1>
                        <p className="text-xl text-light-text dark:text-gray-300 mb-8">Tervetuloa, <span className="font-bold text-brand-teal">{user.email}</span>!</p>
                        <p className="text-light-text/80 dark:text-gray-400 mb-12">Tämä on suojattu alue vain kirjautuneille käyttäjille. Tulevaisuudessa täällä voit hallinnoida kampanjoitasi, tarkastella analytiikkaa ja paljon muuta.</p>
                        <button onClick={handleLogout} className="bg-brand-coral text-white font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-opacity-80 transform hover:scale-105">Kirjaudu ulos</button>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

// pages/HomePage.tsx
const HomePage = () => {
    React.useEffect(() => {
        const structuredData = { "@context": "https://schema.org", "@graph": [ { "@type": "Organization", "name": "Voon Marketing Agency", "url": "https://voon.fi", "logo": "https://picsum.photos/seed/voon-logo/200/60", "description": "Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia.", "sameAs": [] }, { "@type": "WebSite", "url": "https://voon.fi", "potentialAction": { "@type": "SearchAction", "target": { "@type": "EntryPoint", "urlTemplate": "https://voon.fi/#/search?q={search_term_string}" }, "query-input": "required name=search_term_string" } } ] };
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(structuredData);
        document.head.appendChild(script);
        return () => { document.head.removeChild(script); };
    }, []);
    return (
        <>
            <SEO title="Voon | Digitaalisen Markkinoinnin Asiantuntijat" description="Olemme täyden palvelun markkinointitoimisto, joka yhdistää luovuuden, teknologian ja datan saavuttaakseen poikkeuksellisia tuloksia." />
            <Hero />
            <Services />
            <ProcessTimeline />
            <Testimonials />
            <Portfolio />
            <VideoDemos />
            <BlogTeaser />
            <ContactForm />
        </>
    );
};

// pages/LoginPage.tsx
const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Kirjautuminen epäonnistui.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <SEO title="Kirjaudu sisään | Voon Marketing Agency" description="Kirjaudu sisään Voon-tilillesi päästäksesi hallintapaneeliin." />
            <div className="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-brand-purple/20">
                        <h1 className="text-3xl font-black text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Tervetuloa takaisin</h1>
                        <p className="text-center text-light-text/80 dark:text-gray-400 mb-8">Kirjaudu sisään jatkaaksesi.</p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Sähköposti</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="user@example.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Salasana</label>
                                <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="••••••••" />
                            </div>
                            {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}
                            <button type="submit" disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-brand-teal disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105">{isLoading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}</button>
                            <p className="text-sm text-center text-gray-500">(Testitunnukset: user@example.com / password123)</p>
                        </form>
                        <p className="text-sm text-center text-gray-500 mt-6">Eikö sinulla ole vielä tiliä?{' '}<Link to="/rekisteroidy" className="font-semibold text-brand-teal hover:underline">Rekisteröidy</Link></p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

// pages/PortfolioPage.tsx
const PortfolioPage = () => {
  return (
    <>
      <SEO title="Referenssimme | Voon Marketing Agency" description="Olemme ylpeitä tekemistämme töistä ja saavuttamistamme tuloksista. Selaa portfolioamme nähdäksesi, miten olemme auttaneet asiakkaitamme menestymään." />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Referenssimme</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Olemme ylpeitä tekemistämme töistä ja saavuttamistamme tuloksista. Selaa portfolioamme nähdäksesi, miten olemme auttaneet asiakkaitamme menestymään.</p>
          <Portfolio fullPage={true} />
        </div>
      </div>
    </>
  );
};

// pages/RegistrationPage.tsx
const RegistrationPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (password !== confirmPassword) { setError('Salasanat eivät täsmää.'); return; }
        setIsLoading(true);
        try {
            await register(email, password);
            setSuccess('Rekisteröinti onnistui! Ohjataan kirjautumiseen...');
            setTimeout(() => { navigate('/login'); }, 2000);
        } catch (err) {
            setError(err.message || 'Rekisteröinti epäonnistui. Yritä uudelleen.');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <SEO title="Rekisteröidy | Voon Marketing Agency" description="Luo Voon-tili päästäksesi käsiksi eksklusiivisiin ominaisuuksiin." />
            <div className="bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
                <div className="container mx-auto px-6 py-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-md mx-auto bg-light-card dark:bg-dark-card p-8 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-2xl shadow-brand-purple/20">
                        <h1 className="text-3xl font-black text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Luo uusi tili</h1>
                        <p className="text-center text-light-text/80 dark:text-gray-400 mb-8">Aloita matkasi kanssamme.</p>
                        {success ? (<p className="text-green-400 text-center mb-4">{success}</p>) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Sähköposti</label>
                                    <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="sinun@email.com" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Salasana</label>
                                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="••••••••" />
                                </div>
                                 <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-light-text/80 dark:text-gray-400 mb-2">Vahvista salasana</label>
                                    <input type="password" name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-purple" placeholder="••••••••" />
                                </div>
                                {error && (<p className="text-red-500 text-sm text-center">{error}</p>)}
                                <button type="submit" disabled={isLoading} className="w-full bg-brand-purple text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:bg-brand-teal disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105">{isLoading ? 'Rekisteröidytään...' : 'Rekisteröidy'}</button>
                            </form>
                        )}
                        <p className="text-sm text-center text-gray-500 mt-6">Onko sinulla jo tili?{' '}<Link to="/login" className="font-semibold text-brand-teal hover:underline">Kirjaudu sisään</Link></p>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

// pages/ServicesPage.tsx
const ServicesPage = () => {
  return (
    <>
      <SEO title="Palvelumme | Voon Marketing Agency" description="Tarjoamme kattavan valikoiman digitaalisen markkinoinnin palveluita, jotka on suunniteltu kasvattamaan liiketoimintaasi. Tässä on tarkempi erittely siitä, mitä teemme." />
      <div className="bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container mx-auto px-6 py-20">
          <h1 className="text-5xl font-black text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-brand-teal">Palvelumme</h1>
          <p className="text-center text-lg text-light-text/80 dark:text-gray-400 max-w-3xl mx-auto mb-16">Tarjoamme kattavan valikoiman digitaalisen markkinoinnin palveluita, jotka on suunniteltu kasvattamaan liiketoimintaasi. Tässä on tarkempi erittely siitä, mitä teemme.</p>
          <Services />
        </div>
      </div>
    </>
  );
};

// App.tsx
const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
    return null;
};
function App() {
    const { consentStatus, acceptConsent, rejectConsent } = useCookieConsent();
    return (
        <ThemeProvider>
            <AuthProvider>
                <HashRouter>
                    <ScrollToTop />
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/palvelut" element={<ServicesPage />} />
                                <Route path="/referenssit" element={<PortfolioPage />} />
                                <Route path="/meista" element={<AboutUsPage />} />
                                <Route path="/blogi" element={<BlogPage />} />
                                <Route path="/blogi/:postId" element={<BlogDetailPage />} />
                                <Route path="/yhteys" element={<ContactPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/rekisteroidy" element={<RegistrationPage />} />
                                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                            </Routes>
                        </main>
                        <Footer />
                        <AIChatWidget />
                        {consentStatus === 'pending' && (<CookieConsentBanner onAccept={acceptConsent} onReject={rejectConsent} />)}
                    </div>
                </HashRouter>
            </AuthProvider>
        </ThemeProvider>
    );
}

// Corrected entry point logic
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);