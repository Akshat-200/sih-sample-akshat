import type { Faq } from "./types";

/** Class 8 · Mathematics — curated doubts with 40–50 word explanations. */
export const MATH_8: Faq[] = [
  // ---------------------------------------------------------------- Ch 1
  {
    ch: 1,
    q: "What are the properties of rational numbers?",
    a: "Rational numbers are closed under addition, subtraction and multiplication; commutative and associative under addition and multiplication; and 0 and 1 act as additive and multiplicative identities. Every nonzero rational has an additive inverse and a multiplicative inverse, and multiplication distributes over addition. Division by zero stays undefined.",
    k: ["properties rational", "closure commutative associative", "identity inverse", "distributive"],
  },
  {
    ch: 1,
    q: "How do we represent rational numbers on the number line?",
    a: "Positive rationals sit right of zero, negatives left. To plot three-fourths, divide the gap between 0 and 1 into four equal parts and mark the third point. For minus five-thirds, move left of zero one whole and two-thirds more. Equal denominators make marking the divisions simple and accurate.",
    k: ["number line", "represent rational", "plot rational number"],
  },
  // ---------------------------------------------------------------- Ch 2
  {
    ch: 2,
    q: "How do we solve a linear equation with variables and numbers on both sides?",
    a: "Transpose so variable terms gather on the left and constants on the right, changing signs while moving. Combine like terms, then divide by the coefficient. For 5x minus 7 equals 2x plus 8, we get 3x equals 15, so x equals 5. Substitute back to always verify.",
    k: ["linear equation", "both sides", "transpose solve"],
  },
  {
    ch: 2,
    q: "How do we solve word problems using linear equations?",
    a: "Read carefully, choose a letter for the unknown, and translate each sentence into an equation. Solve it by transposing and dividing, then interpret the answer in the story's context. Always check whether the value is sensible, like ages being positive, before writing the final answer statement.",
    k: ["word problem", "linear equation problem", "application"],
  },
  // ---------------------------------------------------------------- Ch 3
  {
    ch: 3,
    q: "What is the angle sum property of quadrilaterals and polygons?",
    a: "A quadrilateral's interior angles always total 360 degrees, because a diagonal splits it into two triangles of 180 degrees each. For any polygon, the sum equals number of sides minus two, times 180 degrees. A pentagon totals 540 degrees, which a regular pentagon divides equally among angles.",
    k: ["angle sum", "quadrilateral 360", "polygon angles", "interior angles"],
  },
  {
    ch: 3,
    q: "What are the properties of a parallelogram?",
    a: "In a parallelogram, opposite sides are equal and parallel, opposite angles are equal, and adjacent angles are supplementary, totalling 180 degrees. Diagonals bisect each other at their intersection. Special cases inherit these: rectangles add equal diagonals, rhombuses add perpendicular bisecting diagonals, and squares combine all properties.",
    k: ["parallelogram properties", "opposite sides angles", "diagonals parallelogram", "rhombus rectangle"],
  },
  // ---------------------------------------------------------------- Ch 4
  {
    ch: 4,
    q: "How do we draw a pie chart from given data?",
    a: "First find each category's fraction of the total. Multiply that fraction by 360 degrees to get the central angle for its slice. For example, a quarter becomes 90 degrees. Use a protractor to mark these angles from one radius, label each sector, and the pie chart is ready.",
    k: ["pie chart", "circle graph", "central angle", "draw pie chart"],
  },
  {
    ch: 4,
    q: "What is a histogram and how is it different from a bar graph?",
    a: "A histogram displays grouped, continuous data using touching bars whose widths show class intervals and heights show frequency; there are no gaps since the data is continuous. A bar graph compares separate categories with equal-width bars drawn apart. Reading a histogram means matching a value into its interval first.",
    k: ["histogram", "bar graph difference", "grouped data", "frequency"],
  },
  // ---------------------------------------------------------------- Ch 5
  {
    ch: 5,
    q: "What are the properties of perfect square numbers?",
    a: "Perfect squares end only in 0, 1, 4, 5, 6 or 9 at units place, never 2, 3, 7 or 8. They carry an even number of trailing zeros, and in prime factorisation every prime appears an even number of times. So 64 is a perfect square, 32 is not.",
    k: ["perfect square", "square number properties", "end digits square"],
  },
  {
    ch: 5,
    q: "How do we find a square root by prime factorisation and division methods?",
    a: "In prime factorisation, factorise the number, pair identical primes and take one from each pair; their product is the square root. For long division, group digits in pairs from the right, divide, double the divisor each step and bring down pairs. Both methods give identical roots.",
    k: ["square root", "prime factorisation", "long division method", "find root"],
  },
  // ---------------------------------------------------------------- Ch 6
  {
    ch: 6,
    q: "What is a perfect cube and how do we find a cube root?",
    a: "A perfect cube results from multiplying an integer by itself twice, like 27 equals 3 times 3 times 3. To find its cube root, prime factorise the number and group identical primes in triples; one factor from each triple forms the cube root. So 216 gives 6.",
    k: ["perfect cube", "cube root", "prime factorisation cube"],
  },
  {
    ch: 6,
    q: "How can we tell whether a number is a perfect cube?",
    a: "Prime factorise the number. If every prime factor occurs in groups of exactly three, the number is a perfect cube. If any prime is left ungrouped, it is not. For instance, 128 equals two to the power seven, which leaves one 2 ungrouped, so 128 is not a perfect cube.",
    k: ["check perfect cube", "cube number test"],
  },
  // ---------------------------------------------------------------- Ch 7
  {
    ch: 7,
    q: "What is the difference between simple interest and compound interest?",
    a: "Simple interest is charged only on the original principal every year, calculated as P times R times T upon 100. Compound interest is added to the principal each period, so interest earns further interest. Over time compound interest grows faster, which is why loans and investments usually quote it.",
    k: ["simple interest", "compound interest", "interest difference", "si ci"],
  },
  {
    ch: 7,
    q: "How do we calculate discounts and GST on an item?",
    a: "Discount is a reduction on the marked price: discount per cent times marked price gives the discount, and subtracting it gives the selling price. GST is then added as a per cent of this selling price. The final amount equals selling price plus GST, as receipts in shops show.",
    k: ["discount", "gst", "marked price", "selling price", "tax"],
  },
  // ---------------------------------------------------------------- Ch 8
  {
    ch: 8,
    q: "What are the standard algebraic identities?",
    a: "Identities are equalities true for every variable value. Key ones are: a plus b whole squared equals a squared plus 2ab plus b squared; a minus b whole squared equals a squared minus 2ab plus b squared; a plus b times a minus b equals a squared minus b squared.",
    k: ["identities", "a+b whole square", "a-b whole square", "algebraic identities"],
  },
  {
    ch: 8,
    q: "How do we multiply a monomial by a polynomial?",
    a: "Use the distributive law: multiply the single term with every term inside the bracket separately, then add the products. Multiply numerical coefficients, add powers of the same variables, and keep signs careful. For example, 3x times 2x plus 5 equals 6x squared plus 15x after distributing 3x across both terms.",
    k: ["multiply monomial", "polynomial multiplication", "distributive law"],
  },
  // ---------------------------------------------------------------- Ch 9
  {
    ch: 9,
    q: "How do we construct a quadrilateral when four sides and a diagonal are given?",
    a: "Draw the given diagonal first. It splits the quadrilateral into two triangles. Construct one triangle on it using SSS with two given sides, then the second triangle on the same diagonal with the remaining two sides. Joining the outer vertices completes the required quadrilateral accurately.",
    k: ["construct quadrilateral", "four sides diagonal", "practical geometry"],
  },
  {
    ch: 9,
    q: "How do we construct a rhombus when a side and a diagonal are known?",
    a: "All rhombus sides are equal. Draw the given diagonal. With radius equal to the side, cut arcs from both endpoints of the diagonal, on the same side if the diagonal is the longer one, opposite sides if shorter. Join the intersection point to both endpoints to finish the rhombus.",
    k: ["construct rhombus", "rhombus construction", "side diagonal"],
  },
  // ---------------------------------------------------------------- Ch 10
  {
    ch: 10,
    q: "How do we find the area of a trapezium?",
    a: "A trapezium has exactly one pair of parallel sides. Its area equals half the sum of the parallel sides multiplied by the perpendicular distance between them. For parallel sides 10 and 6 centimetres with height 4, the area becomes half of 16 times 4, giving 32 square centimetres.",
    k: ["area trapezium", "trapezoid area", "parallel sides"],
  },
  {
    ch: 10,
    q: "How do we find the surface area and volume of a cube, cuboid and cylinder?",
    a: "A cuboid has surface area twice of lb plus bh plus hl and volume length times breadth times height. A cube of edge a has surface area 6a squared and volume a cubed. A cylinder has curved surface 2πrh and volume πr squared h.",
    k: ["surface area", "volume", "cube cuboid cylinder", "mensuration formulas"],
  },
  // ---------------------------------------------------------------- Ch 11
  {
    ch: 11,
    q: "What are the laws of exponents?",
    a: "Key laws: multiplying powers with the same base adds exponents; division subtracts them; a power of a power multiplies exponents; any nonzero number to the power zero is one; negative exponents mean reciprocal. So a to the m times a to the n equals a to the m plus n.",
    k: ["laws exponents", "power rules", "exponent laws", "index laws"],
  },
  {
    ch: 11,
    q: "What are negative exponents and standard form of numbers?",
    a: "A negative exponent gives a reciprocal: 2 to the power minus 3 equals one upon 2 cubed, that is one-eighth. Standard form writes very large or tiny numbers as a decimal between 1 and 10 times a power of ten. So 5,600,000 becomes 5.6 times 10 to the power 6.",
    k: ["negative exponent", "standard form", "scientific notation", "power ten"],
  },
  // ---------------------------------------------------------------- Ch 12
  {
    ch: 12,
    q: "What are direct and inverse proportions? Give examples.",
    a: "Two quantities are in direct proportion when they rise or fall together, keeping a constant ratio, like cost and number of notebooks. They are in inverse proportion when one increases exactly as the other decreases, keeping a constant product, like speed and time for a fixed journey.",
    k: ["direct proportion", "inverse proportion", "variation", "direct inverse"],
  },
  {
    ch: 12,
    q: "How do we solve problems on direct and inverse proportion?",
    a: "Identify whether both quantities move together, direct, or oppositely, inverse. For direct proportion, keep ratios equal and cross-multiply. For inverse proportion, keep products equal. For example, if 4 taps fill a tank in 60 minutes, 6 taps take 40 minutes because taps times time stays 240.",
    k: ["solve proportion", "proportion problems", "unitary method"],
  },
  // ---------------------------------------------------------------- Ch 13
  {
    ch: 13,
    q: "How do we factorise an algebraic expression?",
    a: "Factorising rewrites an expression as a product of factors. Pull out common factors first, try regrouping, use identities like a squared minus b squared, or split the middle term whose product equals the last term. For x squared plus 5x plus 6, split as plus 2 and plus 3.",
    k: ["factorise", "factorisation", "split middle term", "common factors"],
  },
  {
    ch: 13,
    q: "How do we divide a polynomial by a monomial or binomial?",
    a: "To divide by a monomial, divide every term separately and subtract exponents of matching variables. For binomial divisors, cancel common factors after factorisation, or use long division: divide the leading term, multiply back, subtract, and repeat until the remainder is zero or of lower degree.",
    k: ["divide polynomial", "division algebraic", "polynomial division"],
  },
  // ---------------------------------------------------------------- Ch 14
  {
    ch: 14,
    q: "What is a polyhedron and what is Euler's formula?",
    a: "A polyhedron is a solid whose faces are flat polygons, like cubes, prisms and pyramids; spheres and cylinders are not polyhedra. Euler's formula links the parts: vertices plus faces minus edges always equals 2. A cube checks it: 8 vertices plus 6 faces minus 12 edges equals 2.",
    k: ["polyhedron", "euler formula", "prism pyramid", "regular polyhedra"],
  },
  {
    ch: 14,
    q: "What are nets and different views of 3D shapes?",
    a: "A net is a flat pattern that folds up into a solid; a cube has eleven different nets. Views are what a solid looks like from the front, side or top, which engineers sketch before building. Visualising nets and views helps us understand how solid objects occupy space.",
    k: ["net", "views solid", "front view top view", "visualising solids"],
  },
  // ---------------------------------------------------------------- Ch 15
  {
    ch: 15,
    q: "How do we organise data into a grouped frequency distribution?",
    a: "Find the range, choose a convenient class size like 5 or 10, and form continuous class intervals. Count values falling in each interval using tally marks to get frequencies. The table now shows how data spreads across groups, ready for a histogram or further statistical analysis.",
    k: ["grouped data", "frequency distribution", "class interval", "statistics"],
  },
  {
    ch: 15,
    q: "What is probability and how do we find it for simple events?",
    a: "Probability measures how likely an event is, from 0 for impossible to 1 for certain. For equally likely outcomes, it equals favourable outcomes divided by total outcomes. Getting an even number on a die has probability 3 upon 6, that is half. Experiments repeated many times confirm this fraction.",
    k: ["probability", "simple event", "favourable outcomes", "dice card probability"],
  },
];
