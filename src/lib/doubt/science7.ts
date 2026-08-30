import type { Faq } from "./types";

/** Class 7 · Science — curated doubts with 40–50 word explanations. */
export const SCIENCE_7: Faq[] = [
  // ---------------------------------------------------------------- Ch 1
  {
    ch: 1,
    q: "What is photosynthesis?",
    a: "Photosynthesis is the process by which green plants prepare their own food using sunlight, water from the soil and carbon dioxide from air. Chlorophyll, the green pigment in leaves, traps sunlight energy. The plant converts it into chemical energy stored as starch, and releases oxygen as a by-product.",
    k: ["photosynthesis", "how plants make food", "chlorophyll"],
  },
  {
    ch: 1,
    q: "What are the different modes of nutrition in plants?",
    a: "Green plants show autotrophic nutrition because they make food themselves. Non-green plants are heterotrophs and depend on others. Saprophytes, like mushrooms, feed on dead matter; parasites, like Cuscuta, steal food from host plants; and insectivorous plants, like the pitcher plant, trap insects for nitrogen.",
    k: ["modes of nutrition", "autotrophic", "heterotrophic", "saprophytic", "parasitic"],
  },
  {
    ch: 1,
    q: "How do insectivorous plants like the pitcher plant feed?",
    a: "Insectivorous plants grow in soil lacking nitrogen, so they trap insects to fill that gap. In the pitcher plant, the leaf forms a deep pitcher with slippery walls. An insect slipping inside gets digested by enzymes, and its digested body supplies nitrogen and minerals to the plant.",
    k: ["pitcher plant", "insectivorous", "carnivorous plant", "venus flytrap"],
  },
  // ---------------------------------------------------------------- Ch 2
  {
    ch: 2,
    q: "How is wool obtained from sheep?",
    a: "Wool comes from the fleece, the thick hair coat of sheep. In shearing, the fleece is removed in one layer, then washed in scouring to remove grease and dirt. After sorting and cleaning, fibres are combed, spun and rolled into yarn for knitting warm clothes.",
    k: ["wool", "shearing", "scouring", "fleece"],
  },
  {
    ch: 2,
    q: "What is sericulture?",
    a: "Sericulture is the rearing of silkworms for silk production. Female moths lay eggs; hatched larvae eat mulberry leaves and spin cocoons of silk fibre around themselves. The cocoons are heated to loosen the fibre, which is then reeled and woven into shiny silk cloth.",
    k: ["sericulture", "silk", "silkworm", "cocoon", "mulberry"],
  },
  {
    ch: 2,
    q: "Why do sheep and other woolly animals not need winter clothes?",
    a: "Animals like sheep, yaks and angora rabbits grow a thick coat called fleece. Air trapped between the hairy fibres acts as an insulating blanket and stops body heat from escaping. That is why these animals stay warm in freezing hills while we need woollen sweaters.",
    k: ["fleece", "why animals are warm", "insulation wool"],
  },
  // ---------------------------------------------------------------- Ch 3
  {
    ch: 3,
    q: "What is a fuel? Give examples.",
    a: "A fuel is any substance that releases heat energy on burning. Wood, cow dung cakes, coal, charcoal, petrol, diesel, kerosene, LPG and natural gas are common fuels. A good fuel is cheap, easily available, burns cleanly, produces large heat and leaves very little ash or smoke behind.",
    k: ["fuel", "examples of fuels", "good fuel"],
  },
  {
    ch: 3,
    q: "What are the types of combustion?",
    a: "Combustion is of three main types. Rapid combustion burns quickly with a flame, like LPG or matchsticks. Spontaneous combustion starts by itself without a flame, as forest fires from heat. Explosion is extremely fast combustion producing heat, light and sound, like fireworks or crackers bursting suddenly.",
    k: ["types of combustion", "rapid", "spontaneous", "explosion"],
  },
  {
    ch: 3,
    q: "Which zone of a candle flame is the hottest and why?",
    a: "A candle flame has three zones. The outer non-luminous zone is hottest because complete combustion happens there with plenty of oxygen. The middle luminous zone is moderately hot and glows yellow from unburnt carbon particles. The innermost dark zone near the wick is coolest and unburnt.",
    k: ["flame zones", "hottest zone", "candle flame", "luminous", "non-luminous"],
  },
  // ---------------------------------------------------------------- Ch 4
  {
    ch: 4,
    q: "What are indicators and why are they used?",
    a: "Indicators are substances that change colour or smell when mixed with an acid or a base, helping us identify them safely. Litmus turns red in acids and blue in bases. Turmeric, china rose petals and phenolphthalein are other indicators used for testing everyday liquids.",
    k: ["indicator", "litmus", "turmeric", "phenolphthalein", "china rose"],
  },
  {
    ch: 4,
    q: "What is neutralisation? Give a daily-life example.",
    a: "In neutralisation, an acid and a base react to form salt and water, cancelling each other's effects. Farmers add quicklime to acidic soil; we take antacids like milk of magnesia for indigestion caused by excess acid. Toothpaste also neutralises acid produced by mouth bacteria.",
    k: ["neutralisation", "neutralization", "antacid", "indigestion", "salt water"],
  },
  {
    ch: 4,
    q: "How is litmus paper used to test acids and bases?",
    a: "Litmus paper is the most common indicator. Acidic solutions turn blue litmus red, while basic solutions turn red litmus blue. For an unknown liquid, test it with both papers. If neither changes colour, the liquid is neutral like pure water. Litmus comes from lichens.",
    k: ["litmus paper", "blue litmus", "red litmus", "test acid base"],
  },
  // ---------------------------------------------------------------- Ch 5
  {
    ch: 5,
    q: "What is the difference between a physical change and a chemical change?",
    a: "In a physical change only shape, size or state alters and no new substance forms; the change is usually reversible, like melting ice or dissolving sugar. In a chemical change a new substance with new properties forms, like burning magnesium or curdling milk, and it is mostly irreversible.",
    k: ["physical change", "chemical change", "difference between physical and chemical"],
  },
  {
    ch: 5,
    q: "What is rusting of iron and how can it be prevented?",
    a: "When iron stays in contact with both oxygen and moisture, a brown flaky layer of iron oxide called rust forms slowly. Painting, oiling, greasing, galvanising with zinc and making stainless steel prevent rusting by blocking air and water from reaching the iron surface underneath.",
    k: ["rusting", "rust", "galvanisation", "prevent rust"],
  },
  {
    ch: 5,
    q: "What is crystallisation?",
    a: "Crystallisation is a method of purifying solids by forming pure crystals. A hot saturated solution of impure copper sulphate or alum cools slowly, and pure crystals settle while impurities stay dissolved. It is a physical change used to obtain pure salt, alum and large transparent crystals.",
    k: ["crystallisation", "crystallization", "copper sulphate crystals", "purification"],
  },
  // ---------------------------------------------------------------- Ch 6
  {
    ch: 6,
    q: "What is the difference between weather and climate?",
    a: "Weather describes the atmospheric condition of a place at a particular time, like today being hot, humid or windy; it changes daily. Climate is the average weather pattern recorded over many years. Mawsynram is wet due to climate, while a sudden rain is just weather.",
    k: ["weather", "climate", "difference weather climate", "meteorology"],
  },
  {
    ch: 6,
    q: "How are polar animals adapted to the cold?",
    a: "Polar animals survive extreme cold through special adaptations. Polar bears have thick fur and a layer of fat called blubber beneath the skin for insulation, plus white fur for camouflage while hunting. Penguins huddle together to share warmth and have streamlined bodies for swimming in icy water.",
    k: ["polar bear", "penguin", "adaptation", "blubber", "arctic", "antarctic"],
  },
  {
    ch: 6,
    q: "How do desert animals survive heat and water scarcity?",
    a: "Desert animals avoid the harsh day by staying in cool burrows and being active at night. Camels drink huge amounts when water is available, tolerate losing body water, excrete little urine and dung, and long eyelashes keep sand out. These adaptations save every drop of water.",
    k: ["desert", "camel", "adaptation desert animals", "water scarcity"],
  },
  // ---------------------------------------------------------------- Ch 7
  {
    ch: 7,
    q: "What is speed and how is it calculated?",
    a: "Speed tells how fast an object moves, meaning the distance covered in a unit time. It is calculated by dividing total distance by total time taken, so speed equals distance upon time. A car covering 100 kilometres in 2 hours has an average speed of 50 km/h.",
    k: ["speed", "average speed", "km/h", "distance time"],
  },
  {
    ch: 7,
    q: "What is a simple pendulum and what is its time period?",
    a: "A simple pendulum is a small metallic bob hung by a thread from a fixed support. One complete to-and-fro swing is an oscillation. The time period is the time for one oscillation, and it stays nearly constant for small swings, which is why pendulum clocks keep time.",
    k: ["pendulum", "time period", "oscillation", "bob"],
  },
  {
    ch: 7,
    q: "How do we read a distance–time graph?",
    a: "On a distance–time graph, distance is plotted on the vertical axis and time on the horizontal axis. A straight slanting line means uniform speed, a steeper line means higher speed, and a horizontal line means the object is at rest. Curved lines show changing speed.",
    k: ["distance time graph", "distance-time", "graph motion"],
  },
  // ---------------------------------------------------------------- Ch 8
  {
    ch: 8,
    q: "What is an electric circuit?",
    a: "An electric circuit is a complete closed path through which current flows from one terminal of a cell, through wires and devices like a bulb, back to the other terminal. In a closed circuit the bulb glows; any gap makes it an open circuit and current stops.",
    k: ["electric circuit", "closed circuit", "open circuit", "circuit diagram"],
  },
  {
    ch: 8,
    q: "What is the difference between conductors and insulators?",
    a: "Conductors allow electricity to pass through them easily; examples are copper, aluminium, iron and human bodies, which is why we get shocks. Insulators block current; examples are rubber, plastic, wood, glass and dry cloth. Wires carry current inside copper but are covered safely with plastic insulation.",
    k: ["conductor", "insulator", "conduct electricity"],
  },
  {
    ch: 8,
    q: "What is the heating effect of electric current?",
    a: "When current passes through a wire of high resistance, the wire becomes hot; this is the heating effect. It is useful in electric heaters, irons, geysers and in bulbs where the filament glows. A fuse uses this effect, melting to break the circuit during overloading.",
    k: ["heating effect", "fuse", "filament", "electric heater"],
  },
  // ---------------------------------------------------------------- Ch 9
  {
    ch: 9,
    q: "What is the difference between conduction, convection and radiation?",
    a: "Conduction transfers heat in solids when particles vibrate and pass heat along, like a hot metal spoon. Convection moves heat by actual flow of liquid or gas particles, like boiling water. Radiation needs no medium; heat travels in straight infrared rays, like sunlight warming the Earth.",
    k: ["conduction", "convection", "radiation", "heat transfer"],
  },
  {
    ch: 9,
    q: "Why do we wear light-coloured clothes in summer?",
    a: "Light colours reflect most heat radiation, while dark colours absorb it. Wearing white or light clothes in summer keeps us cooler because they reflect sunlight away from the body. Conversely, dark clothes absorb more heat, which is why we prefer them in cold winters.",
    k: ["light clothes", "dark clothes", "absorb reflect heat", "summer"],
  },
  {
    ch: 9,
    q: "What are land breeze and sea breeze?",
    a: "During the day, land heats faster than sea; hot air over land rises and cool sea air moves in as a sea breeze. At night, land cools quickly while sea stays warmer, so air blows from land towards the sea as a land breeze. Convection causes both.",
    k: ["land breeze", "sea breeze", "coastal winds"],
  },
  // ---------------------------------------------------------------- Ch 10
  {
    ch: 10,
    q: "What is the difference between breathing and respiration?",
    a: "Breathing is the physical process of taking in air rich in oxygen and giving out carbon dioxide, using ribs and diaphragm muscles. Respiration is the chemical process inside cells where oxygen breaks down food to release energy. Breathing supplies air; respiration produces the energy we need.",
    k: ["breathing", "respiration", "difference breathing respiration"],
  },
  {
    ch: 10,
    q: "What is the difference between aerobic and anaerobic respiration?",
    a: "Aerobic respiration uses oxygen to break glucose completely into carbon dioxide and water, releasing lots of energy; it happens in most organisms. Anaerobic respiration works without oxygen, breaking glucose partly into alcohol, as in yeast, or lactic acid in our muscles during running, releasing less energy.",
    k: ["aerobic", "anaerobic", "lactic acid", "yeast fermentation"],
  },
  {
    ch: 10,
    q: "Why do we get muscle cramps after heavy running?",
    a: "During fast running, muscles need extra energy but oxygen supply falls short. Muscle cells then switch to anaerobic respiration, converting glucose into lactic acid, which accumulates and causes cramps. Resting lets the blood carry oxygen back, break down the lactic acid, and relieve the pain.",
    k: ["cramps", "muscle cramp", "lactic acid running"],
  },
  // ---------------------------------------------------------------- Ch 11
  {
    ch: 11,
    q: "What is pollination and what are its types?",
    a: "Pollination is the transfer of pollen grains from the anther to the stigma of a flower. Self-pollination happens when pollen lands on the same flower's stigma. Cross-pollination carries pollen to another flower of the same kind using agents like wind, water or insects such as bees.",
    k: ["pollination", "self pollination", "cross pollination", "anther", "stigma"],
  },
  {
    ch: 11,
    q: "How does fertilisation occur in a flower?",
    a: "After pollination, a pollen grain on the stigma grows a thin pollen tube down the style into the ovary. The male gamete travels through this tube and fuses with the female gamete, or egg, inside the ovule. This fusion is fertilisation and forms a zygote.",
    k: ["fertilisation", "fertilization", "pollen tube", "zygote", "ovule"],
  },
  {
    ch: 11,
    q: "What is vegetative propagation? Give examples.",
    a: "Vegetative propagation is asexual reproduction where new plants grow from vegetative parts like stems, roots or leaves without seeds. Potato grows from stem eyes, sweet potato from roots, and Bryophyllum from leaf buds. Sugarcane, rose and jasmine are grown by cuttings or layering for identical plants.",
    k: ["vegetative propagation", "asexual reproduction", "budding potato cutting layering"],
  },
  // ---------------------------------------------------------------- Ch 12
  {
    ch: 12,
    q: "What are the conditions needed for seed germination?",
    a: "A seed germinates when it gets air, moisture and a suitable warm temperature. Water softens the seed coat and activates stored food; oxygen is needed for respiration that releases energy for growth. Some seeds also need light or darkness, but every seed first needs these three conditions.",
    k: ["germination", "seed germinate", "sprouting"],
  },
  {
    ch: 12,
    q: "What is the difference between growth and development?",
    a: "Growth means an increase in size, height or weight, like a seedling becoming taller and heavier. Development is the wider change towards maturity, including new abilities such as new leaves, flowering or fruiting. Growth is one part of development; together they turn a seed into a plant.",
    k: ["growth", "development", "difference growth development"],
  },
  {
    ch: 12,
    q: "What are the main stages in the life cycle of a plant?",
    a: "A plant life cycle has four main stages. It starts from a seed, which germinates into a seedling; the seedling grows into a mature plant; the mature plant flowers, gets pollinated and fertilised; and finally fruits form with new seeds, which disperse and continue the cycle again.",
    k: ["life cycle", "stages plant", "seedling", "mature plant"],
  },
  // ---------------------------------------------------------------- Ch 13
  {
    ch: 13,
    q: "What kind of image is formed by a plane mirror?",
    a: "A plane mirror forms an image that is virtual, because it cannot be caught on a screen, and erect. The image is the same size as the object and appears left-right reversed, called lateral inversion. That is why the word AMBULANCE is written reversed on vehicles.",
    k: ["plane mirror", "image", "lateral inversion", "virtual erect"],
  },
  {
    ch: 13,
    q: "What is the difference between a concave and a convex mirror?",
    a: "A concave mirror curves inward like a spoon's inner face and can form real, inverted or magnified images; dentists and torch reflectors use it. A convex mirror curves outward and always forms small, erect, virtual images with a wide view, so vehicles use it as rear-view mirrors.",
    k: ["concave", "convex", "mirror", "rear view"],
  },
  {
    ch: 13,
    q: "How is a rainbow formed?",
    a: "A rainbow forms when sunlight passes through tiny raindrops after rain. Each drop splits, or disperses, white light into seven colours because different colours bend by different amounts. Red bends least and violet most, painting the arc red, orange, yellow, green, blue, indigo and violet across the sky.",
    k: ["rainbow", "dispersion", "prism", "seven colours", "spectrum"],
  },
];
