import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "about game": "About the Game",
      annotation:
        "The online game “Cyber Snake” was developed by the Media Development Foundation’s team, while the idea to create an adapted version of the popular game belongs to the contestants of the “Most Media-literate School” competition from the 12th Public School of Gori. (Veriko Michitashvili, Mariam Gozalishvili, Keti Shugliashvili, Giorgi Michitashvili, Luka Shengelia).",
      instruction: "Instructions",
      "instruction text": "The game consists of three parts, each of them containing 10 questions. In order to advance to the digital age (III), first, you have to pass through the Gutenberg Era – the realm of print media (I) and the Era of the Broadcasting Media (II). Each correct answer will earn you 10 points and increase the length of the snake. You only have a total of 5 lives. Each incorrect answer will cost you one life. In order to end up in the Digital Era, you would need at least one life and as many points as possible.",
     questions: "Questions",
      q_authors: "Media Development Foundation (MDF)",
      illustrator: "Illustrator: ",
      developer: "Developer: ",
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
        "Cyber Snake-ის თამაში მედიის განვითარების ფონდის გუნდმა მოამზადა. პოპულარული თამაშის ადაპტირების იდეა კი “ყველაზე მედიაწიგნიერი სკოლის” კონკურსის მონაწილე გუნდს ეკუთვნის ქ.გორის მე-12 საჯარო სკოლიდან (ვერიკო მიჩიტაშვილი, მარიამ გოზალიშვილი, ქეთი შუღლიაშვილი, გიორგი მიჩიტაშვილი, ლუკა შენგელია).",
      instruction: "თამაშის წესები",
      "instruction text":
        "მედიაწიგნიერი სნეიკი 3 ნაწილისგან შედგება. I საფეხურზე მოთამაშე ბეჭდური მედიის ეპოქაში, II საფეხურზე - სამაუწყებლო, ხოლო III-ზე ციფრული მედიის  ეპოქაში ხვდება. თითოეულ ნაწილში მოთამაშემ 10 შეკითხვას უნდა უპასუხოს.  სწორი პასუხი 10 ქულას უდრის, გველის სიგრძე კი იზრდება. არასწორი პასუხისას 5 სიცოცხლიდან ერთი იკარგება.  მოთამაშე უნდა ეცადოს, მაქსიმალურად მეტი ქულა დააგროვოს, თამაშის ბოლოს შედეგის სახით ნახავს, თუ რამდენი ქულა მოიპოვა.",
      questions: "კითხვები",
      q_authors: "მედიის განვითარების ფონდი",
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
