

import React from 'react';
import type { Service, CaseStudy, BlogPost, ProcessStep } from './types';

// Icons
export const SalesAgentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 18a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2"/><path d="M12 14a4 4 0 0 0-4 4v2"/><path d="M12 14a4 4 0 0 1 4 4v2"/><path d="M16 14a1 1 0 0 1 1 1v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1c0-.55.45-1 1-1Z"/><path d="M12 2a5 5 0 0 0-5 5v4a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z"/></svg>
);
export const GenerativeVideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><path d="M16 16H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h13v10Z"/><path d="M18 8.471c.423-.243.93-.377 1.469-.377a2.623 2.623 0 0 1 2.623 2.623c0 .538-.134 1.046-.377 1.469"/><path d="m11.23 6.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/><path d="m8.23 11.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/><path d="m6.23 15.014.25-.433a.5.5 0 0 1 .866 0l.25.433"/></svg>
);
export const CookielessTrackingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m8.5 12.5 2 2 4-4"/></svg>
);
export const PersonalizationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
);
export const AutonomousCampaignsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.1 2.1a2 2 0 0 1 2.8 2.8l-1.3 1.3L19 9l-4 4-2.4-2.4-1.3 1.3a2 2 0 0 1-2.8-2.8Z"/><path d="M9.4 12.2 2 19.6l1.4 1.4 1.4-1.4 4.2 4.2 1.4-1.4 1.4-1.4-7.4-7.4Z"/><path d="m18 11 1-11-11 1"/></svg>
);
export const ShoppableVideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 6h10"/><path d="m14 6 7.55-4.24a1 1 0 0 1 1.28.83L22 18.2a1 1 0 0 1-1.28.83L14 14"/><path d="M12 12H2l4-10"/><path d="m6 12 1.5-6.5"/><circle cx="8" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><path d="M10 18h4"/></svg>
);


// Data
export const SERVICES_DATA: Service[] = [
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

export const PORTFOLIO_DATA: CaseStudy[] = [
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

export const BLOG_POSTS_DATA: BlogPost[] = [
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

export const PROCESS_DATA: ProcessStep[] = [
    { step: 1, title: "Tutkimus & Strategia", description: "Syvennymme liiketoimintaasi, yleisöösi ja kilpailukenttääsi. Määrittelemme yhdessä selkeät tavoitteet ja luomme datalähtöisen strategian." },
    { step: 2, title: "Luova Suunnittelu", description: "Ideoidemme ja suunnittelemme vaikuttavat konseptit ja sisällöt, jotka herättävät brändisi eloon ja puhuttelevat kohderyhmääsi." },
    { step: 3, title: "Toteutus & Aktivointi", description: "Toteutamme kampanjat monikanavaisesti, optimoiden jatkuvasti parhaiden tulosten saavuttamiseksi. Tekninen osaamisemme takaa sujuvan toteutuksen." },
    { step: 4, title: "Analyysi & Optimointi", description: "Mittaamme kampanjoiden tehokkuutta reaaliaikaisesti ja raportoimme tuloksista läpinäkyvästi. Hyödynnämme dataa jatkuvaan optimointiin ja kasvuun." }
];