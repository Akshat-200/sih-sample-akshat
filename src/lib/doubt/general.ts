import type { GeneralFaq } from "./types";

/**
 * Chapter-agnostic FAQs (Social Science, English, हिन्दी, Arts + study help).
 * Hindi entries have Hindi answers so the bot replies in the question's spirit.
 */
export const GENERAL_FAQS: GeneralFaq[] = [
  // ------------------------------------------------------------ Social Science
  {
    subject: "social-science",
    q: "What is democracy and why is it important?",
    a: "Democracy is a form of government in which people choose their rulers through free and fair elections. Everyone adult gets one equal vote, and leaders remain answerable to citizens. It protects freedoms, allows criticism of the government, and resolves differences peacefully, which is why India follows it.",
    k: ["democracy", "democratic government", "why democracy", "election government"],
  },
  {
    subject: "social-science",
    q: "What does the judiciary do in India?",
    a: "The judiciary is the system of courts, from district courts up to the Supreme Court. It interprets laws, settles disputes, punishes lawbreakers and protects the Fundamental Rights of citizens. Courts can also review government actions, keeping every branch within the limits set by the Constitution.",
    k: ["judiciary", "courts", "supreme court", "judge", "justice"],
  },
  {
    subject: "social-science",
    q: "Why do we need a constitution?",
    a: "The Constitution is the supreme rulebook of the nation. It defines how governments are formed, divides powers among organs, guarantees Fundamental Rights to citizens, and sets duties too. It ensures no leader or majority becomes all-powerful, keeping India sovereign, socialist, secular, democratic and republic.",
    k: ["constitution", "constitutional", "fundamental rights", "preamble"],
  },
  {
    subject: "social-science",
    q: "What is the difference between renewable and non-renewable resources?",
    a: "Renewable resources refill or regrow within human lifetimes, like sunlight, wind, water, forests and soil when cared for. Non-renewable resources took millions of years to form and finish once used, like coal, petroleum and natural gas. That is why we must use fossil fuels sparingly and switch to renewables.",
    k: ["renewable", "non-renewable", "resources types", "exhaustible"],
  },
  {
    subject: "social-science",
    q: "What are the main types of farming in India?",
    a: "Indian farming is mainly of two types. Subsistence farming feeds the farmer's own family on small holdings, using simple tools and monsoon rains. Commercial farming grows crops or raises animals for sale at profit on larger farms, using machines, fertilisers and irrigation, like tea, coffee and wheat plantations.",
    k: ["types farming", "subsistence", "commercial farming", "agriculture india"],
  },
  {
    subject: "social-science",
    q: "What was the Indian National Movement?",
    a: "The National Movement was the long struggle by which Indians ended British rule. From the 1857 revolt through the Indian National Congress, Gandhi's non-violent Satyagraha, Salt March and Quit India, millions joined. After countless sacrifices, India finally won independence on 15 August 1947 and became a republic in 1950.",
    k: ["national movement", "freedom struggle", "independence", "gandhi quit india"],
  },
  {
    subject: "social-science",
    q: "What is urbanisation and what problems does it cause?",
    a: "Urbanisation is the shifting of people from villages to towns and cities for jobs and services, making cities grow. It brings opportunities but also overcrowding, slums, traffic, pollution, pressure on water and electricity, and rising waste. Planned housing, public transport and clean industries make urbanisation manageable.",
    k: ["urbanisation", "urbanization", "cities growth", "migration towns"],
  },
  // ------------------------------------------------------------ English
  {
    subject: "english",
    q: "What are the parts of speech in English grammar?",
    a: "English words fall into eight parts of speech. Nouns name things, pronouns replace nouns, verbs show action, adjectives describe nouns, adverbs modify verbs, prepositions show relationships, conjunctions join words, and interjections express feelings. Identifying them makes sentence-building and error-correction much easier in exams.",
    k: ["parts of speech", "grammar basics", "noun verb adjective"],
  },
  {
    subject: "english",
    q: "What is the difference between a simile and a metaphor?",
    a: "Both compare two things, but differently. A simile compares using 'like' or 'as', saying 'brave as a lion'. A metaphor directly calls one thing another, saying 'the lion of the class', without like or as. Poets use both to create vivid pictures in the reader's mind.",
    k: ["simile", "metaphor", "figure of speech", "comparison poetic"],
  },
  {
    subject: "english",
    q: "How do I find the theme of a story or poem?",
    a: "The theme is the central idea the writer wants to convey. Ask what the characters learn, what conflict they face, and how it ends. Note repeated images or words. Summarise the message in one sentence, like honesty wins or nature heals, and support it with events from the text.",
    k: ["theme", "central idea", "story meaning", "poem theme"],
  },
  {
    subject: "english",
    q: "What is the difference between active and passive voice?",
    a: "In active voice the subject does the action: 'Riya wrote a letter.' In passive voice the subject receives the action: 'A letter was written by Riya.' Passive uses a form of 'be' plus the past participle. Active sentences feel direct and strong, so writers usually prefer them.",
    k: ["active passive", "voice grammar", "passive voice"],
  },
  {
    subject: "english",
    q: "How do I write a good summary of a chapter?",
    a: "Read the chapter twice, first for enjoyment, then with a pencil. Note main events in order, key characters and the ending. Now write these points in your own words, keeping only what moves the story forward. A good summary is short, follows the original order and mentions no personal opinions.",
    k: ["summary", "summarise", "how to write summary", "precis"],
  },
  // ------------------------------------------------------------ हिन्दी
  {
    subject: "hindi",
    q: "संज्ञा किसे कहते हैं? इसके भेद बताइए।",
    a: "किसी व्यक्ति, वस्तु, स्थान, जाति या भाव के नाम को संज्ञा कहते हैं, जैसे राम, दिल्ली, पुस्तक, सुंदरता। इसके पाँच भेद हैं — व्यक्तिवाचक, जातिवाचक, भाववाचक, समूहवाचक और द्रव्यवाचक संज्ञा। वाक्य में संज्ञा को पहचानने से उसका सही प्रयोग आसान हो जाता है।",
    k: ["संज्ञा", "sangya", "भेद संज्ञा"],
  },
  {
    subject: "hindi",
    q: "रस किसे कहते हैं? उदाहरण समझाइए।",
    a: "काव्य पढ़ने या सुनने से जो आनंदमय भाव पैदा होता है, उसे रस कहते हैं। रस के नौ प्रमुख भेद हैं, जैसे श्रृंगार, हास्य, करुण, वीर, रौद्र और शांत। उदाहरणस्वरूप, राम-रावण युद्ध में वीर रस है, जबकि प्रकृति-वर्णन में प्रायः शांत रस दिखता है।",
    k: ["रस", "ras", "श्रृंगार", "करुण रस"],
  },
  {
    subject: "hindi",
    q: "अलंकार किसे कहते हैं? प्रमुख अलंकार बताइए।",
    a: "भाषा को सुंदर और प्रभावशाली बनाने वाले व्याकरणिक चमत्कार को अलंकार कहते हैं। प्रमुख अलंकार हैं — अनुप्रास, उपमा, रूपक, यमक और श्लेष। जैसे 'चाँद सा मुख' में उपमा है। इनसे कविता का भाव और चित्र स्पष्ट रूप से हृदय को छू जाता है।",
    k: ["अलंकार", "alankar", "उपमा रूपक अनुप्रास"],
  },
  {
    subject: "hindi",
    q: "कविता का भावार्थ या सारांश कैसे लिखें?",
    a: "पहले कविता को शांत मन से दो-तीन बार पढ़िए। कठिन शब्दों का अर्थ निकालिए और हर कंद का मुख्य भाव एक-एक पंक्ति में लिखिए। फिर इन्हें मिलाकर सरल भाषा में क्रम से लिखिए। अंत में कवि का संदेश अवश्य जोड़िए, यह अंक दिलाता है।",
    k: ["भावार्थ", "सारांश कविता", "कविता का सार"],
  },
  {
    subject: "hindi",
    q: "पत्र लेखन का सही प्रारूप क्या है?",
    a: "पत्र के दो भेद हैं — औपचारिक और अनौपचारिक। दोनों में सबसे ऊपर पते की तीन पंक्तियाँ, दिनांक, संबोधन, विषय केवल औपचारिक में, फिर विषय-वस्तु और अंत में 'भवदीय' या 'सादर' जैसा समापन आता है। स्पष्ट शब्दों में संक्षिप्त पत्र सर्वोत्तम माना जाता है।",
    k: ["पत्र लेखन", "औपचारिक पत्र", "अनौपचारिक पत्र", "प्रारूप"],
  },
  {
    subject: "hindi",
    q: "मुहावरे किसे कहते हैं? उदाहरण दीजिए।",
    a: "मुहावरे वे छोटे वाक्यांश हैं जिनका अर्थ शब्दों के अक्षरशः अर्थ से भिन्न होता है। ये भाषा को रोचक और प्रभावी बनाते हैं। जैसे 'आँखों का तारा' का अर्थ है बहुत प्रिय, और 'नौ दो ग्यारह होना' का अर्थ है भाग जाना। बोलचाल में इनका प्रयोग सोच-समझकर करें।",
    k: ["मुहावरा", "मुहावरे", "muhavare"],
  },
  // ------------------------------------------------------------ Arts & Vocational
  {
    subject: "arts-vocational",
    q: "What is the colour wheel and what are primary colours?",
    a: "The colour wheel arranges colours in a circle showing relationships. Primary colours red, yellow and blue cannot be made by mixing others. Mixing two primaries gives secondary colours orange, green and violet; mixing secondary neighbours gives tertiary shades. Complementary colours sit opposite and make each other look brighter.",
    k: ["colour wheel", "primary colours", "secondary colours", "color theory"],
  },
  {
    subject: "arts-vocational",
    q: "What is perspective in drawing?",
    a: "Perspective is the technique of showing depth on flat paper so scenes look three-dimensional. Objects appear smaller as they recede, and parallel edges meet at vanishing points on the horizon line. One-point perspective suits roads, while two-point perspective suits buildings. Practising boxes trains the eye quickly.",
    k: ["perspective", "vanishing point", "depth drawing", "horizon"],
  },
  {
    subject: "arts-vocational",
    q: "What are the main classical dance forms of India?",
    a: "India has eight major classical dances, each from a region. Bharatanatyam from Tamil Nadu, Kathak from north India, Kathakali and Mohiniyattam from Kerala, Kuchipudi from Andhra Pradesh, Odissi from Odisha, Manipuri from Manipur and Sattriya from Assam. Every form blends precise steps, expressions and storytelling.",
    k: ["classical dance", "bharatanatyam", "kathak", "dance forms india"],
  },
  {
    subject: "arts-vocational",
    q: "What is rangoli and why is it made?",
    a: "Rangoli is the folk art of decorating floors with coloured powders, rice, flowers or petals, drawn at entrances during festivals like Diwali and Pongal. It welcomes guests and Goddess Lakshmi, and passes creativity between generations. Symmetric dots, loops and floral motifs are its common, beautiful patterns.",
    k: ["rangoli", "kolam", "festival art", "floor art"],
  },
  // ------------------------------------------------------------ Any subject
  {
    subject: "any",
    q: "How should I prepare for my exams?",
    a: "Make a timetable giving harder subjects more time and revise in short daily sessions. Read NCERT thoroughly, write answers by hand, and solve past years' questions under timed conditions. Sleep seven hours, take small breaks after every forty-five minutes, and stay calm; consistent effort beats last-minute cramming.",
    k: ["exam preparation", "study tips", "how to study", "revision plan", "time table"],
  },
  {
    subject: "any",
    q: "How can I improve my concentration while studying?",
    a: "Choose a quiet, fixed study corner and keep the phone away in another room. Set a small goal for each session, like finishing one exercise, and reward yourself after. Deep breathing before starting calms the mind. Regular sleep, exercise and water improve focus naturally within weeks.",
    k: ["concentration", "focus study", "distracted", "attention span"],
  },
  {
    subject: "any",
    q: "Why is it important to revise regularly?",
    a: "Our brain forgets newly learned material quickly unless it is revisited. Regular revision moves knowledge into long-term memory, so answers surface easily during exams. Spaced revision, reading today's topic tomorrow, after a week and after a month, saves study time and removes last-minute panic completely.",
    k: ["revision", "forgetting", "memory study", "why revise"],
  },
];
