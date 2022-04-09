import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "about game": "About Game",
      annotation:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat",
      instruction: "Instruction",
      "instruction text": "nananananana",
      "idea and concept": "Concept authors",
      illustrator: "Illustrator:",
      developer: "Developer:",
      "il name": "Zizi Nishnianidze",
      "dev name": "Maria Tarielashvili",

      /// Buttons
      start: "Start",
      next: "Next",
    },
  },
  ka: {
    translation: {
      "about game": "თამაშის შესახებ",
      annotation:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat",
      instruction: "თამაშის წესები",
      "instruction text":
        "მედიაწიგნიერი სნეიკი 3 ნაწილისგან შედგება. I საფეხურზე მოთამაშე ბეჭდური მედიის ეპოქაში, II საფეხურზე - სამაუწყებლო, ხოლო III-ზე ციფრული მედიის  ეპოქაში ხვდება. თითოეულ ნაწილში მოთამაშემ 10 შეკითხვას უნდა უპასუხოს.  სწორი პასუხი 10 ქულას უდრის, გველის სიგრძე კი იზრდება. არასწორი პასუხისას 5 სიცოცხლიდან ერთი იკარგება.  მოთამაშე უნდა ეცადოს, მაქსიმალურად მეტი ქულა დააგროვოს, თამაშის ბოლოს შედეგის სახით ნახავს, თუ რამდენი ქულა მოიპოვა.",
      "idea and concept": "იდეისა და კონცეფციის ავტორები",
      illustrator: "ილუსტრატორი:",
      developer: "დეველოპერი:",
      "il name": "ზიზი ნიშნიანიძე",
      "dev name": "მარია ტარიელაშვილი",

      /// Buttons
      start: "დაწყება",
      next: "შემდეგი",
    },
  },
};

const options = {
  order: ["htmlTag", "querystring", "navigator"],
  lookupQuerystring: "lng",
};

i18n.use(LanguageDetector).init({
  detection: options,
  fallbackLng: "ka",
  resources,

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
