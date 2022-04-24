import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      // title page

      "about game": "About the Game",
      annotation:
        "The online game “Cyber Snake” was developed by the Media Development Foundation’s team, while the idea to create an adapted version of the popular game belongs to the contestants of the “Most Media-literate School” competition from the 12th Public School of Gori. (Veriko Michitashvili, Mariam Gozalishvili, Keti Shugliashvili, Giorgi Michitashvili, Luka Shengelia).",
      instruction: "Instructions",
      "instruction text":
        "The game consists of three parts, each of them containing 10 questions. In order to advance to the digital age (III), first, you have to pass through the Gutenberg Era – the realm of print media (I) and the Era of the Broadcasting Media (II). Each correct answer will earn you 10 points and increase the length of the snake. You only have a total of 5 lives. Each incorrect answer will cost you one life. In order to end up in the Digital Era, you would need at least one life and as many points as possible.",
      questions: "Questions by: ",
      q_authors: "Media Development Foundation (MDF)",
      illustrator: "Illustrator: ",
      developer: "Developer: ",
      "il name": "Zizi Nishnianidze",
      "dev name": "Maria Tarielashvili",

      cyber_snake: "Cyber Snake",

      //rules page

      rules:
        "Are you ready to travel in the depths of time and overcome the different stages of media development together with the Cyber Snake? Remember, you have to pass through two initial stages to advance to the Digital Age. Be cautious and look after your lives!",

      //guttenberg era

      first_xokera: "Gutenberg Era",
      first_instr:
        "Are you ready to travel in the depths of time and overcome the different stages of media development together with the Cyber Snake? Remember, you have to pass through two initial stages to advance to the Digital Age. Be cautious and look after your lives!",

      //history questions
      gh1: "Johannes Gutenberg was the first printer and publisher.",
      gh2: "“Acta Diurna” was the prototype of a newspaper read by the people in crowded places in Rome.",
      gh3: "The first-ever printed Bible is associated with the name of Gutenberg. ",
      gh4: "The word “newspaper” derives from the Russian word газета. ",
      gh5: "“Gazette” [Newspaper] is derived from the name of the Italian coin (Gazzetta).",
      gh6: "The oldest daily newspaper still in circulation today is the Wiener Zeitung. ",
      gh7: "In 1766, Sweden became the first country to lift censorship in the press. ",
      gh8: "The presidency of Richard Nixon was brought down by an investigation by journalists of the Washington Post. ",
      gh9: "The Oscar-winning film “All the President’s Men” depicts the true story behind the Watergate scandal.",
      gh10: "After high school, Ernest Hemingway worked as a reporter for The Kansas City Star.",
      gh11: "Harper Lee was awarded with the Pulitzer Prize in 1961 for “To Kill a Mockingbird.” ",
      gh12: "The so-called Pentagon papers were published by the Soviet newspaper Pravda. ",
      gh13: "Spielberg’s film “The Post” deals with the New York Times investigation into the Pentagon papers. ",
      gh14: "Foreigner Policy journalist Glenn Greenwald received the Pulitzer Prize for exposing Edward Snowden’s secret documents.",
      gh15: "The Soviet press covered the Chernobyl disaster only 10 days later. ",

      //content questions

      gc1: "News is information that has happened in the past. ",
      gc2: "When a dog bites a person, it is “news”.",
      gc3: "The “inverted pyramid” method was used to produce papyrus in ancient Egypt.",
      gc4: "The “inverted pyramid” is a news writing method in which the most important information is given in the introduction.",
      gc5: "“Lede” is the opening paragraph of the article.",
      gc6: "A newspaper is a periodical publication aimed at informing the reader.",
      gc7: "An interview is a one-person monologue.",
      gc8: "A primary source is newspaper information related to hydro resources.",
      gc9: "Op-ed is the opposite page of the editorial page, where mainly the opinions of external authors are published.",
      gc10: "“Opinion” is something that can be verified.",
      gc11: "The primary source is an eyewitness to the story who has direct contact with what happened.",
      gc12: "A paparazzi is a photojournalist who secretly takes photos of the personal lives of celebrities.",
      gc13: "The Pulitzer Prize is awarded only to newspaper journalists.",
      gc14: "When a person bites a dog, it is “news”.",
      gc15: "Media has a “watchdogging” function.",

      win1: "Good job! The era of print media is over. The era of broadcast media awaits you!",

      //Broadcasting Era

      second_xokera: "Broadcasting Era",
      second_instr:
        "After the broadcast of moving black-and-white sound images became possible over long distances, revolutionary changes have taken place in the field of communication. Remember what changed in the age of television and radio and be cautious of lives to advance to the digital age.",

      //history questions

      bh1: "The word “Radio” is derived from the Latin radius and translates to beam.",
      bh2: "The word “Television” derives from the Greek “tele” (τηλε - far) and the Latin “visio” (see).",
      bh3: "Harry Truman was the first president whose inauguration was broadcasted by television.",
      bh4: "Radio hooligans were people who destroyed radio lines during the Soviet era.",
      bh5: "The frequency of radio waves is measured in hertz and is associated with the name Heinrich Hertz.",
      bh6: "Al Pacino plays the producer of the CBS show “60 Minutes” in the movie “Insider”.",
      bh7: "In 1938, CBS radio has broadcasted credible information about the Martian invasion.",
      bh8: "The play, based on “The War of the Worlds”, was performed and broadcasted life on CBS Radio, which caused panic.",
      bh9: "In 1969, Moon Landing was broadcast live on television",
      bh10: "The first American TV show was called “The Queen’s Messenger”.",
      bh11: " The BBC license fee varies according to the color and black-and-white TV.",
      bh12: "In 1910, the Eiffel Tower survived destruction as the military began using it as a radio tower.",
      bh13: "The first color cartoon was released by Walt Disney in 1932.",
      bh14: "Maurice Leblanc's article, published in La Lumiere Electrique in 1880, formed the basis of television.",
      bh15: "The guerrilla “Solidarity Movement” in Poland could not have been successful without video.",

      //content questions

      bc1: "Video sequence is a short story consisting of the anchor’s text, cover footage and the respondent(s) comment.",
      bc2: "Primetime is the time of day when the least people watch TV.",
      bc3: "Vox Pop is a public opinion poll named in honor of the Pope.",
      bc4: "Vox Pop is derived from the Latin Vox Populi (“People’s Voice”) and was a popular interactive radio program in the 1930s.",
      bc5: "The broadcast network entails catching the audience in a trap.",
      bc6: "Loop - Short commercial break.",
      bc7: "Hard Talk is a short, critical interview consisting of blitz questions.",
      bc8: "Teleprompter - a device used to project a speaker’s script on to a transparent panel in front of a television.",
      bc9: "Montage - A short sequence of different shots to convey a unified opinion.",
      bc10: "Subtitle - Written translation of the original language displayed at the bottom of the frame.",
      bc11: "Freeze-frame - A shot that is frozen in one position.",
      bc12: "Zooming entails online participation in broadcasting.",
      bc13: "Zooming – The use of variable focus lenses to capture close-up and distant views from a fixed position.",
      bc14: "Voice over - The voice of a journalist attached to the visual.",
      bc15: "The story is a sequence of facts and events captured in a few minutes, which is only published on social networks.",

      win2: "Congratulations! You have successfully overcome the broadcasting era and reached the cyber snake. In order to secure your victory, you have to adapt to the digital world as well!",

      //digital media era
      third_xokera: "The Era of Digital Media",
      third_instr:
        "Finally! You are in the Digital Age; however, navigating into the new media ecosystem is not that easy. In addition to knowledge of various online formats and platforms, the test is also in terms of cyber security.",

      //history questions

      dh1: "The Internet is a network that connects relatives around the world.",
      dh2: "The Internet is a network that connects computers around the world.",
      dh3: "“web” is an acronym for World Wide Web.",
      dh4: "An information bubble is a collection of abundant information in one space.",
      dh5: "The information bubble is a closed space where the algorithm determines the user’s information choice according to their interests.",
      dh6: "The term cyberspace was first coined by the American writer William Gibson in 1982.",
      dh7: "Cookies found on the internet are Bill Gates’s favourite snacks.",
      dh8: "Cookie is a temporary file that is automatically created while accessing a website, which stores personal information.",
      dh9: "Is “love12” a safe password for an email address?",
      dh10: "Should one use combinations of inconsistent numbers, different characters and words in the password?",
      dh11: "The extortionist virus seeks to steal Covid-19 statistics.",
      dh12: "The extortionist virus completely blocks the computer or individual files stored in it, and in exchange for access, requires payment in bitcoins.",
      dh13: " Phishing means hunting for goldfish.",
      dh14: "Phishing is a form of internet fraud.",
      dh15: " Bill Gates and Paul Allen are the creators of Microsoft.",

      //content history
      dc1: "Vlog is a blog containing video content.",
      dc2: "Multimedia means concentrated media in the hands of a multimillionaire.",
      dc3: "Multimedia is a form of communication that combines various contents (text, audio, visual, etc.).",
      dc4: "A podcast is a thematic series of digital audio/video recordings that can be downloaded or listened to online.",
      dc5: " Blurb is a brief annotation of the story on the news website.",
      dc6: "RSS is a web format for publishing frequently updated information in a chronological order.",
      dc7: "Coordinated unauthorized behaviour is a joint covert action of several accounts on Facebook in order to mislead the public.",
      dc8: "Video game company Nintendo originally produced card games.",
      dc9: "Is it possible to identify the vaccinated people via Bluetooth?",
      dc10: "Is it possible to steal personal data from a mobile phone via Bluetooth?",
      dc11: "The first-ever website info.cern.ch is still accessible.",
      dc12: "In case of no internet connection, you can entertain yourself by playing the game of running T-Rex in the Chrome browser.",
      dc13: "TikTok Duet is a famous music band.",
      dc14: "The newcomers to Google are called Nooglers.",
      dc15: "The New Media Ecosystem is a collaborative information environment for print, broadcast, digital and social media.",

      win3: "Great Work! You are equally familiar with traditional and contemporary media and have found the ability to safely navigate into the digital world!",

      lose: "You are out of lives! But instead of giving up, you can try again!",

      victory: "Victory!",
      you_lost: "You lost!",
      give_up_text:
        "It is sad that you gave up after all! However, you can always start again!",

      /// Buttons
      start: "start",
      next: "next",
      continue: "continue",
      stop: "stop",
      try_again: "try again",
      give_up: "give up",
    },
  },
  ka: {
    translation: {
      // title page
      "about game": "თამაშის შესახებ",
      annotation:
        "Cyber Snake-ის თამაში მედიის განვითარების ფონდის გუნდმა მოამზადა. პოპულარული თამაშის ადაპტირების იდეა კი “ყველაზე მედიაწიგნიერი სკოლის” კონკურსის მონაწილე გუნდს ეკუთვნის ქ.გორის მე-12 საჯარო სკოლიდან (ვერიკო მიჩიტაშვილი, მარიამ გოზალიშვილი, ქეთი შუღლიაშვილი, გიორგი მიჩიტაშვილი, ლუკა შენგელია).",
      instruction: "თამაშის წესები",
      "instruction text":
        "მედიაწიგნიერი სნეიკი 3 ნაწილისგან შედგება. I საფეხურზე მოთამაშე ბეჭდური მედიის ეპოქაში, II საფეხურზე - სამაუწყებლო, ხოლო III-ზე ციფრული მედიის  ეპოქაში ხვდება. თითოეულ ნაწილში მოთამაშემ 10 შეკითხვას უნდა უპასუხოს.  სწორი პასუხი 10 ქულას უდრის, გველის სიგრძე კი იზრდება. არასწორი პასუხისას 5 სიცოცხლიდან ერთი იკარგება.  მოთამაშე უნდა ეცადოს, მაქსიმალურად მეტი ქულა დააგროვოს, თამაშის ბოლოს შედეგის სახით ნახავს, თუ რამდენი ქულა მოიპოვა.",
      questions: "კითხვების ავტორები: ",
      q_authors: "მედიის განვითარების ფონდი",
      illustrator: "ილუსტრატორი: ",
      developer: "დეველოპერი: ",
      "il name": "ზიზი ნიშნიანიძე",
      "dev name": "მარია ტარიელაშვილი",

      cyber_snake: "კიბერ ხოკერა",


      //rules page
      rules:
        "მზად ხარ, დროში იმოგზაურო და მედიის განვითარების სხვადასხვა ფაზა კიბერ ხოკერასთან ერთად  გადალახო? გახსოვდეს, ციფრულ ეპოქამდე მოსასვლელად 2 ეტაპი უნდა გაიარო. ყურადღებით იყავი და გაუფრთხილდი სიცოცხლეებს!",

      //guttenberg era

      first_xokera: "გუტენბერგის ეპოქა",
      first_instr:
        "კეთილი იყოს შენი მობრძანება გუტენბერგის ეპოქაში. გაიხსენე, როგორი ევოლუცია განიცადა ბეჭდვითმა სიტყვამ და რა უნდა ვიცოდეთ მედია შინაარსის შესახებ.",

      //history questions
      gh1: "პირველი მესტამბე იოჰან გუტენბერგი იყო.",
      gh2: "Acta Diurna გაზეთის პროტოტიპი იყო, რომელსაც ხალხი რომში ხალხმრავალ ადგილებში ეცნობოდა.",
      gh3: "პირველი ნაბეჭდი ბიბლია გუტენბერგის სახელს უკავშირდება.",
      gh4: "სიტყვა “გაზეთი” რუსული газета-დან მომდინარეობს.",
      gh5: "„გაზეთი“ იტალიური მონეტის სახელწოდებიდან (gazzetta) მომდინარეობს.",
      gh6: "დღეს მოქმედი ყოველდღიური გაზეთებიდან ყველაზე ძველი ავსტრიული Wiener Zeitung-ია.",
      gh7: "1766 წელს შვედეთი გახდა პირველი ქვეყანა, რომელმაც პრესაში ცენზურა გააუქმა.",
      gh8: "პრეზიდენტ ნიქსონის გადაყენება გაზეთ “ვაშინგტონ პოსტის” ჟურნალისტების  გამოძიების შედეგია.",
      gh9: 'ოსკაროსანი ფილმი "პრეზიდენტის მთელი ამალა" უოტერგეიტის სკანდალის რეალურ ისტორიას ასახავს.',
      gh10: "სკოლის შემდეგ ერნესტ ჰემინგუეი გაზეთ The Kansas City Star–ში რეპორტიორად მუშაობდა.",
      gh11: "ჰარპერ ლის პულიცერის პრემია 1961 წელს „ნუ მოკლავ ჯაფარას“-თვის გადაეცა.",
      gh12: "ე.წ. პენტაგონის ქაღალდები საბჭოთა გაზეთმა Правда-მ გამოააშკარავა.",
      gh13: "სპილბერგის ფილმი The Post-ი პენტაგონის ქაღალდებზე ნიუ იორკ თაიმსის გამოძიებას ეხება.",
      gh14: "Foreigner Policy-ის ჟურნალისტმა გლენ გრინვოლდმა პულიცერის პრიზი ედვარდ სნოუდენის საიდუმლო დოკუმენტების გამჟღავნების გამო მიიღო.",
      gh15: "ჩერნობილის კატასტროფას საბჭოთა პრესა მხოლოდ 10 დღის შემდეგ გამოეხმაურა.",

      //content questions

      gc1: "ახალი ამბავი არის ინფორმაცია, რომელიც წარსულში მოხდა.",
      gc2: 'როცა ძაღლი კბენს ადამიანს, ეს "ნიუსია".',
      gc3: '"გადაბრუნებული პირამიდის" მეთოდი ძველ ეგვიპტეში პაპირუსის წარმოებისთვის გამოიყენებოდა.',
      gc4: '"გადაბრუნებული პირამიდა" ახალი ამბის წერის სტრუქტურაა, რომელშიც ყველაზე მნიშვნელოვანი ინფორმაცია შესავალშია მოცემული.',
      gc5: "ლიდი არის სტატიის გამხსნელი პარაგრაფი.",
      gc6: "გაზეთი არის პერიოდული გამოცემა, რომელიც მკითხველის ინფორმირებას ახდენს.",
      gc7: "ინტერვიუ არის ერთი ადამიანის მონოლოგი.",
      gc8: "პირველწყარო არის საგაზეთო ინფორმაცია, რომელიც ჰიდრორესურსებს შეეხება.",
      gc9: "ოპედი (op-ed) სარედაქციო გვერდის მოპირდაპირე გვერდია, სადაც ძირითადად გარე ავტორების მოსაზრებები იბეჭდება.",
      gc10: "მოსაზრება არის ის, რისი გადამოწმებაც შეიძლება.",
      gc11: "პირველწყარო არის ამბის თვითმხილველი, ვისაც უშუალო შეხება აქვს მომხდართან.",
      gc12: "პაპარაცი ფოტორეპორტიორია, რომელიც ცნობილი ადამიანების პირადი ცხოვრების ფოტოებს ფარულად იღებს.",
      gc13: "პულიცერის პრიზი მხოლოდ საგაზეთო მედიის ჟურნალისტებს გადაეცემათ.",
      gc14: 'როცა ადამიანი კბენს ძაღლს, ეს "ნიუსია".',
      gc15: "მედიას “მოდარაჯე ძაღლის” ფუნქცია აქვს.",

      win1: "ყოჩაღ! ბეჭდვითი მედიის ეტაპი დაძლეულია, წინ სამაუწყებლო მედიის პერიოდი გელის!",

      //Broadcasting Era

      second_xokera: "მაუწყებლობის  ეპოქა",
      second_instr:
        "მას შემდეგ, რაც მოძრავი შავ-თეთრი ხმოვანი გამოსახულების შორ მანძილზე ტრანსლირება გახდა შესაძლებელი, კომუნიკაციის სფეროში რევოლუციური ცვლილებები მოხდა. გაიხსენე, რა შეიცვალა ტელევიზიისა და რადიოს ეპოქაში და გაუფრთხილდი სიცოცხლეებს, ციფრულ ეპოქაში მოსახვედრად.",

      //history questions

      bh1: "რადიო ლათინური radius -სგან მომდინარეობს და  სხივს ნიშნავს.",
      bh2: "სიტყვა ტელევიზია ბერძნული ტელე (τηλε - შორს) და ლათინური visio (ვხედავ)-სგან მომდინარეობს.",
      bh3: "ჰარი ტრუმანი პირველი პრეზიდენტი იყო, რომლის ინაუგურაციაც ტელევიზიით გადაიცა.",
      bh4: "რადიოხულიგნები ერქვათ ადამიანებს, ვინც საბჭოთა პერიოდში რადიო ხაზებს ანადგურებდნენ.",
      bh5: "რადიოტალღების სიხშირე ჰერცებში იზომება და ჰაინრიხ ჰერცის სახელს უკავშირდება.",
      bh6: "ალ პაჩინო ფილმში “ინსაიდერი” ტელეკომპანია CBS-ის გადაცემა “60 წუთის” პროდიუსერის როლს თამაშობს.",
      bh7: "1938 წელს CBS-ის რადიო ეთერში მარსელთა შემოსევის შესახებ სარწმუნო ინფორმაცია გავიდა.",
      bh8: "“სამყაროთა ომის” მიხედვით დაწერილი პიესა CBS-ის რადიოში ახალ ამბად გავიდა და პანიკა გამოიწვია.",
      bh9: "1969 წელს ასტრონავტების მთვარეზე დაჯდომა ტელევიზიით პირდაპირ ეთერში გადაიცა.",
      bh10: "პირველ ამერიკულ სატელევიზიო შოუს “დედოფლის შიკრიკი” ერქვა.",
      bh11: "BBC-ის სალიცენზიო გადასახადი ფერადი და შავ-თეთრი ტელევიზორის მიხედვით განსხვავდება.",
      bh12: "1910 წელს ეიფელის კოშკი დანგრევას გადაურჩა, რადგან სამხედროებმა მისი რადიო კოშკად გამოყენება დაიწყეს.",
      bh13: "პირველი ფერადი მულტფილმი 1932 წელს უოლტ დისნეიმ გამოუშვა.",
      bh14: "14. 1880 წელს “ლა ლუმიერ ელექტრიკში” გამოქვეყნებული მორის ლებლანკის სტატია საფუძვლად დაედო ტელევიზიის შექმნას.",
      bh15: "პოლონეთში პარტიზანული სოლიდარობის მოძრაობა რადიოს გარეშე  წარმატებული ვერ იქნებოდა.",

      //content questions

      bc1: "კადრ-სინქრონი  მოკლე ამბავია, რომელიც წამყვანის ტექსტის, გადასაფარი კადრებისა და რესპონდენტ(ებ)ის კომენტარისგან შედგება.",
      bc2: "პრაიმტაიმი დღის მონაკვეთია, როცა ტელევიზორს ყველაზე ცოტა ადამიანი უყურებს.",
      bc3: "ვოქს პოპი საზოგადოების გამოკითხვაა, რომელსაც სახელი რომის პაპის საპატივცემულოდ დაერქვა.",
      bc4: "ვოქს პოპი ლათინური Vox Populi-დან (“ხალხის ხმა”) მომდინარეობს და 1930-იან წლებში პოპულარი ინტერაქციული რადიო გადაცემა იყო.",
      bc5: "საეთერო ბადე მაყურებლის მახეში გაბმას გულისხმობს.",
      bc6: "ტიხარი მოკლე სარეკლამო ჭრაა.",
      bc7: "ჰარდ თოქი მოკლე, კრიტიკული ბლიც კითხვებისგან შემდგარი ინტერვიუა.",
      bc8: "სუფლიორი - მოწყობილობა, საიდანაც წამყვანები პირდაპირ ეთერში ტექსტს კითხულობენ.",
      bc9: "მონტაჟი - სხვადასხვა კადრის მოკლე მწკრივი ერთიანი აზრის გადმოსაცემად.",
      bc10: "სუბტიტრი – კადრის ქვედა ნაწილში პირველადი წარმოების ენიდან სხვა ენაზე წერილობითი თარგმანის განთავსებაა.",
      bc11: "სტოპკადრი - კადრი, რომელიც ერთ მდგომარეობაშია გაყინული.",
      bc12: "ზუმირება ტელევიზიაში ონლაინ ჩართვაა.",
      bc13: "ზუმირება - ცვალებადი ფოკუსის ლინზების გამოყენება ახლო და შორი ხედების უძრავი პოზიციიდან გადასაღებად.",
      bc14: "Voice over - გამოსახულებაზე დადებული ჟურნალისტის ხმა.",
      bc15: "სიუჟეტი რამდენიმე წუთში ჩატეული ფაქტების და მოვლენების თანმიმდევრობაა, რომელიც მხოლოდ სოციალურ ქსელებში ქვეყნდება.",

      win2: "გილოცავ! მაუწყებლის ეპოქაც წარმატებით გადალახე და კიბერ ხოკერამდეც მოხვედი, საბოლოო გამარჯვებისთვის ციფრულ სამყაროშიც უნდა ადაპტირდე!",

      //digital media era
      third_xokera: "ციფრული მედიის ეპოქა",
      third_instr:
        "და ბოლოს, ციფრული მედიის ეპოქაში მოხვდი, მაგრამ ახალ მედია ეკოსისტემაში ნავიგაცია არც ისე მარტივია. სხვადასხვა ონლაინ ფორმატების და პლატფორმების ცოდნასთან ერთად, გამოცდა კიბერ უსაფრთხოების მხრივაც გელის.",

      //history questions

      dh1: "ინტერნეტი არის ქსელი, რომელიც მსოფლიოს გარშემო ნათესავებს ერთმანეთთან აკავშირებს.",
      dh2: "ინტერნეტი არის ქსელი, რომელიც მსოფლიოს გარშემო კომპიუტერებს ერთმანეთთან აკავშირებს.",
      dh3: "Web მსოფლიო აბლაბუდას World Wide Web-ის შემოკლებული სახელია.",
      dh4: "საინფორმაციო ბუშტი არის ჭარბი ინფორმაციის ერთ სივრცეში თავმოყრა.",
      dh5: "საინფორმაციო ბუშტი დახშული სივრცეა, სადაც მომხმარებლის საინფორმაციო არჩევანს ალგორითმი მისი ინტერესების მიხედვით განსაზღვრავს.",
      dh6: "ტერმინი კიბერსივრცე პირველად ამერიკელმა მწერალმა უილიამ გიბსონმა 1982 წელს გამოიყენა.",
      dh7: "ინტერნეტში შემხვედრი Cookie-ები ბილ გეითსის საყვარელი ნამცხვრებია.",
      dh8: "Cookie დროებითი ფაილია, რომელიც ვებ-გვერდზე შესვლისას ავტომატურად იქმნება და პირად ინფორმაციას ინახავს.",
      dh9: "უსაფრთხოა თუ არა პაროლი love12 ელექტრონული ფოსტისთვის?",
      dh10: "პაროლში არათანმიმდევრული ციფრების, განსხვავებული სიმბოლოების და სიტყვების კომბინაციები უნდა გამოვიყენოთ?",
      dh11: "გამომძალველი ვირუსი კოვიდ სტატისტიკის მოპარვას ცდილობს.",
      dh12: "გამომძალველი ვირუსი მთლიანად კომპიუტერს ან მასში დაცულ ცალკეულ ფაილებს ბლოკავს, დაშვების სანაცვლოდ კი ბიტკოინებში თანხის გადახდას ითხოვს.",
      dh13: "ფიშინგი ოქროს თევზზე ნადირობას ნიშნავს.",
      dh14: "ფიშინგი ინტერნეტ თაღლითობის ფორმაა.",
      dh15: "მაიკროსოფტის შემქმნელები ბილ გეიტსი და პოლ ალენი არიან.",

      //content history
      dc6: "RSS ხშირად განახლებული ინფორმაციის ქრონოლოგიური უკუთანმიმდევრობით გამოქვეყნების ვებ ფორმატია.",
      dc7: "კოორდინირებული არაავთენტური ქმედება საზოგადოების შეცდომაში შეყვანის მიზნით, ფეისბუქზე რამდენიმე ანგარიშის ერთობლივი ფარული მოქმედებაა.",
      dc8: "ვიდეოთამაშების კომპანია Nintendo თავდაპირველად ბანქოს აწარმოებდა.",
      dc9: "შესაძლებელია თუ არა Bluetooth-ით ვაქცინირებულების ამოცნობა?",
      dc10: "შესაძლებელია თუ არა Bluetooth-ით მობილურიდან პირადი მონაცემების მოპარვა?",
      dc11: "პირველი ვებ-გვერდი info.cern.ch დღემდე ხელმისაწვდომია.",
      dc12: "უინტერნეტობის შემთხვევაში Chrome-ის ბრაუზერში მორბენალი T-Rex-ის თამაშით შეგიძლია თავის შექცევა.",
      dc13: "TikTok დუეტი ცნობილი მუსიკალური ბენდია.",
      dc14: "Google-ში ახალდასაქმებულ ადამიანს Noogler-ს ეძახიან.",
      dc15: "ახალი მედია ეკოსისტემა - ბეჭდვითი, სამაუწყებლო, ციფრული და სოციალური მედიის ერთობლივი საინფორმაციო გარემოა.",

      win3: "ყოჩაღ! ტრადიციულ და ახალ მედიას, თანაბრად კარგად იცნობ და ციფრულ სამყაროში უსაფრთხო ნავიგაციის უნარიც აღმოგაჩნდა!",

      lose: "სიცოცხლეები ამოგეწურა, მაგრამ შეგიძლია, არ დანებდე და კიდევ სცადო!",

      victory: "გამარჯვება",
      give_up_text:
        "სამწუხაროა, რომ დანებება გადაწყვიტე! თუმცა თავიდან ცდა ყოველთვის შეგიძლია!",
      /// Buttons
      start: "დაწყება",
      next: "შემდეგი",
      continue: "გაგრძელება",
      stop: "შეწყვეტა",
      try_again: "კიდევ ცდა",
      give_up: "დანებება",
      dc1: "ვლოგი ვიდეომასალის შემცველი ბლოგია.",
      dc2: "მულტიმედია მულტიმილიონერის ხელში კონცენტრირებულ მედიას ნიშნავს.",
      dc3: "მულტიმედია კომუნიკაციის ფორმაა, რომელიც სხვადასხვა შინაარსს (ტექსტი, აუდიო, ვიზუალი და ა.შ.) აერთიანებს.",
      dc4: "პოდკასტი ციფრული აუდიო/ვიდეო ჩანაწერების თემატური სერიაა, რომლის გადმოწერა ან ონლაინ მოსმენაა შესაძლებელი.",
      dc5: "blurb საინფორმაციო ვებ-გვერდზე ამბის მოკლე ანოტაციაა.",
      dc6: "RSS ხშირად განახლებული ინფორმაციის ქრონოლოგიური უკუთანმიმდევრობით გამოქვეყნების ვებ ფორმატია.",
      dc7: "კოორდინირებული არაავთენტური ქმედება საზოგადოების შეცდომაში შეყვანის მიზნით, ფეისბუქზე რამდენიმე ანგარიშის ერთობლივი ფარული მოქმედებაა.",
      dc8: "ვიდეოთამაშების კომპანია Nintendo თავდაპირველად ბანქოს აწარმოებდა.",
      dc9: "შესაძლებელია თუ არა Bluetooth-ით ვაქცინირებულების ამოცნობა?",
      dc10: "შესაძლებელია თუ არა Bluetooth-ით მობილურიდან პირადი მონაცემების მოპარვა?",
      dc11: "პირველი ვებ-გვერდი info.cern.ch დღემდე ხელმისაწვდომია.",
      dc12: "უინტერნეტობის შემთხვევაში Chrome-ის ბრაუზერში მორბენალი T-Rex-ის თამაშით შეგიძლია თავის შექცევა.",
      dc13: "TikTok დუეტი ცნობილი მუსიკალური ბენდია.",
      dc14: "Google-ში ახალდასაქმებულ ადამიანს Noogler-ს ეძახიან.",
      dc15: "ახალი მედია ეკოსისტემა - ბეჭდვითი, სამაუწყებლო, ციფრული და სოციალური მედიის ერთობლივი საინფორმაციო გარემოა.",

      win3: "ყოჩაღ! ტრადიციულ და ახალ მედიას, თანაბრად კარგად იცნობ და ციფრულ სამყაროში უსაფრთხო ნავიგაციის უნარიც აღმოგაჩნდა!",

      lose: "სიცოცხლეები ამოგეწურა, მაგრამ შეგიძლია, არ დანებდე და კიდევ სცადო!",

      victory: "გამარჯვება!",
      you_lost: "დამარცხება",
      give_up_text:
        "სამწუხაროა, რომ დანებება გადაწყვიტე! თუმცა თავიდან ცდა ყოველთვის შეგიძლია!",
      /// Buttons
      start: "დაწყება",
      next: "შემდეგი",

      continue: "გაგრძელება",
      stop: "შეწყვეტა",
      try_again: "კიდევ ცდა",
      give_up: "დანებება",
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
