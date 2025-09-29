
import React from 'react';
import type { Service, Testimonial, CaseStudy, BlogPost, ProcessStep } from './types';

// Icons
export const SocialMediaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
export const CampaignIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
);
export const MarketingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);
export const AIAgentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5.5 14h13"/><path d="M5.5 18h13"/><path d="M12 2a2.5 2.5 0 0 1 2.5 2.5c0 1.66-1.34 3-3 3h-1a3 3 0 0 0-3 3v1.5a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1 0-5h1a2.5 2.5 0 0 1 2.5-2.5V5c0-1.55.93-2.83 2.19-3.32A2.5 2.5 0 0 1 12 2Z"/><path d="M12 2a2.5 2.5 0 0 0-2.5 2.5c0 1.66 1.34 3 3 3h1a3 3 0 0 1 3 3v1.5a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 0-5h-1a2.5 2.5 0 0 0-2.5-2.5V5c0-1.55-.93-2.83-2.19-3.32A2.5 2.5 0 0 0 12 2Z"/></svg>
);
export const GenerativeMediaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-2 2-2-2-3 3-2-2-3 3"/><path d="M3 15h4"/><path d="M11.5 3.5c-1 .5-2 1.5-2.5 2.5"/><path d="M15 3.5c-1 .5-2 1.5-2.5 2.5"/><path d="M20 9c.5-.5 1-1.5 1.5-2.5"/></svg>
);
export const ContentAutomationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-1.5"/><path d="M12 9V7.5"/><path d="m14.24 11.76-.35-.35"/><path d="M9.8 14.5l-.35-.35"/><path d="m14.6 14.2-.35.35"/><path d="m9.45 9.8.35-.35"/><circle cx="12" cy="12" r="6"/></svg>
);


// Data
export const SERVICES_DATA: Service[] = [
    {
        icon: <SocialMediaIcon />,
        title: "Sosiaalinen Media",
        description: "Luomme koukuttavia sisältöstrategioita ja kampanjoita, jotka sitouttavat yleisösi ja kasvattavat brändisi näkyvyyttä.",
        caseStudyLink: "#"
    },
    {
        icon: <CampaignIcon />,
        title: "Outbound & Inbound Kampanjat",
        description: "Suunnittelemme ja toteutamme tuloshakuisia kampanjoita, jotka tuottavat laadukkaita liidejä ja vauhdittavat myyntiäsi.",
        caseStudyLink: "#"
    },
    {
        icon: <MarketingIcon />,
        title: "Kokonaisvaltaiset Ratkaisut",
        description: "Strategiasta toteutukseen ja analytiikkaan – tarjoamme kaikki markkinoinnin palvelut yhden katon alta.",
        caseStudyLink: "#"
    },
    {
        icon: <AIAgentIcon />,
        title: "Tekoälyagentit yrityskäyttöön",
        description: "Räätälöidyt AI-ratkaisut markkinointiin, asiakaspalveluun ja analytiikkaan. Automatisoi rutiinit ja vapauta aikaa luovaan työhön.",
        caseStudyLink: "#"
    },
    {
        icon: <GenerativeMediaIcon />,
        title: "Generatiiviset mediatyökalut",
        description: "Tuota korkealaatuista kuvaa, videota, ääntä ja tekstiä tekoälyn avulla. Nopeuta sisällöntuotantoa ja erotu kilpailijoista.",
        caseStudyLink: "#"
    },
    {
        icon: <ContentAutomationIcon />,
        title: "Sisällöntuotannon automaatio",
        description: "Automatisoi sisällöntuotanto ja julkaisu eri kanaviin. Säästä aikaa ja resursseja tekoälyn avulla.",
        caseStudyLink: "#"
    }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
    {
        quote: "Voonin tiimi mullisti digitaalisen läsnäolomme. Heidän luovuutensa ja strateginen näkemyksensä ylittivät kaikki odotuksemme.",
        author: "Anna Lahtinen",
        role: "Toimitusjohtaja, TechFin Oy",
        avatarUrl: "https://picsum.photos/100/100?random=1",
        kpi: {
            value: 320,
            label: "Liidien kasvu",
            suffix: "%",
        }
    },
    {
        quote: "Yhteistyö Voonin kanssa on ollut saumatonta ja tuloksekasta. Kampanjamme tuottivat ennätysmäärän sitoutumista.",
        author: "Matti Virtanen",
        role: "Markkinointipäällikkö, UrbanStyle",
        avatarUrl: "https://picsum.photos/100/100?random=2",
        kpi: {
            value: 50,
            label: "Konversioprosentin nousu",
            suffix: "%",
        }
    }
];

export const PORTFOLIO_DATA: CaseStudy[] = [
    { id: 1, title: "TechFin Brändi-ilmeen Uudistus", category: "Brändäys", imageUrl: "https://picsum.photos/600/400?random=11", excerpt: "Loimme dynaamisen ja modernin brändi-identiteetin.", metrics: [{ label: "Brändin tunnettuus", value: "+80%" }, { label: "Verkkosivujen liikenne", value: "+120%" }] },
    { id: 2, title: "UrbanStyle Globaali Lanseeraus", category: "Sosiaalinen Media", imageUrl: "https://picsum.photos/600/400?random=12", excerpt: "Orkestroimme viraalin some-kampanjan.", metrics: [{ label: "Sitoutuminen", value: "+300%" }, { label: "Myynti", value: "+150%" }] },
    { id: 3, title: "EcoFood Vastuullisuuskampanja", category: "Sisältömarkkinointi", imageUrl: "https://picsum.photos/600/400?random=13", excerpt: "Kerroimme tarinan, joka kosketti ja aktivoi.", metrics: [{ label: "Media-arvo", value: "€500k+" }, { label: "PR-maininnat", value: "250+" }] },
    { id: 4, title: "NextGen SaaS Liidien Generointi", category: "Inbound", imageUrl: "https://picsum.photos/600/400?random=14", excerpt: "Rakensimme tehokkaan inbound-koneiston.", metrics: [{ label: "MQL-liidit", value: "+450%" }, { label: "Asiakashankintakustannus", value: "-30%" }] },
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
