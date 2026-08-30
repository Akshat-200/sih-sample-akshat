import type { Faq } from "./types";

/** Class 7 · Mathematics — curated doubts with 40–50 word explanations. */
export const MATH_7: Faq[] = [
  // ---------------------------------------------------------------- Ch 1
  {
    ch: 1,
    q: "What are the rules for multiplying and dividing integers?",
    a: "Multiply or divide the values ignoring signs, then fix the sign. Two same signs give a positive answer; two different signs give a negative answer. So minus three times minus four equals twelve, and minus twelve divided by three equals minus four. This pattern always works.",
    k: ["integer multiplication", "integers signs", "multiply divide integers", "negative numbers"],
  },
  {
    ch: 1,
    q: "What are the properties of integers: closure, commutativity and associativity?",
    a: "Integers are closed under addition, subtraction and multiplication, meaning results stay integers. Addition and multiplication are commutative, so order never matters, like a plus b equalling b plus a. They are also associative, so grouping does not change the result. Subtraction and division follow none of these rules.",
    k: ["closure", "commutative", "associative", "properties integers"],
  },
  // ---------------------------------------------------------------- Ch 2
  {
    ch: 2,
    q: "How do we multiply a fraction by a whole number or another fraction?",
    a: "To multiply a fraction by a whole number, multiply only the numerator by that number and keep the denominator. To multiply two fractions, multiply numerators together and denominators together, then simplify. For example, two-thirds times one-fourth equals two-twelfths, which simplifies to one-sixth after cancelling common factors.",
    k: ["multiply fraction", "fraction multiplication", "whole number fraction"],
  },
  {
    ch: 2,
    q: "How do we divide a decimal number by 10, 100 or 1000?",
    a: "When dividing a decimal by ten, hundred or thousand, shift the decimal point one, two or three places to the left respectively, because the number becomes smaller. For example, 235.4 divided by 100 becomes 2.354. Multiplying works the same way, but the point shifts right instead.",
    k: ["decimal divide", "decimal point shift", "divide by 100"],
  },
  // ---------------------------------------------------------------- Ch 3
  {
    ch: 3,
    q: "How do we find the mean, median and mode of data?",
    a: "The mean is the sum of all values divided by their count. The median is the middle value when data is arranged in order. The mode is the value occurring most often. For example, in 2, 3, 3, 7 the mean is 3.75, median 3 and mode 3.",
    k: ["mean median mode", "average", "central tendency", "data handling"],
  },
  {
    ch: 3,
    q: "What is the probability of getting a head when a coin is tossed?",
    a: "A fair coin has two equally likely outcomes, head or tail. Probability equals favourable outcomes divided by total outcomes, so a head has probability one out of two, written as half or 0.5. Tossing many times shows heads roughly half the times, matching this probability.",
    k: ["probability", "coin toss", "chance", "favourable outcomes"],
  },
  // ---------------------------------------------------------------- Ch 4
  {
    ch: 4,
    q: "What is a simple equation and how do we solve one?",
    a: "A simple equation is a statement that two expressions are equal, containing an unknown, like x plus 3 equals 8. To solve it, keep the equation balanced: subtract 3 from both sides to get x equals 5. Always verify the answer by substituting it back.",
    k: ["simple equation", "solve equation", "unknown variable", "balance equation"],
  },
  {
    ch: 4,
    q: "How do we form an equation from a word statement?",
    a: "Read the statement carefully and choose a letter for the unknown. Convert each phrase into maths: 'added to' means plus, 'times' means multiply, and 'is' becomes equals. For instance, 'a number multiplied by 5 gives 20' becomes 5x equals 20, and solving gives x equals 4.",
    k: ["form equation", "word statement equation", "statement to equation"],
  },
  // ---------------------------------------------------------------- Ch 5
  {
    ch: 5,
    q: "What are complementary and supplementary angles?",
    a: "Two angles are complementary when their sum is exactly 90 degrees, like 35 and 55 degrees. Two angles are supplementary when their sum is 180 degrees, like 70 and 110 degrees forming a straight line. Remember: complementary corners at ninety, supplementary straight at one hundred eighty.",
    k: ["complementary", "supplementary", "angle sum", "90 degrees", "180 degrees"],
  },
  {
    ch: 5,
    q: "What are parallel lines and transversals?",
    a: "Parallel lines run in the same direction and never meet, keeping equal distance between them. A transversal crosses two or more lines. A transversal cutting parallel lines creates equal corresponding angles, equal alternate angles, and interior angles on one side that together measure 180 degrees.",
    k: ["parallel lines", "transversal", "corresponding angles", "alternate angles"],
  },
  // ---------------------------------------------------------------- Ch 6
  {
    ch: 6,
    q: "What is the triangle inequality property?",
    a: "The triangle inequality says the sum of any two sides of a triangle must be greater than the third side. That is why sticks of 3, 4 and 8 units form no triangle, since 3 plus 4 is less than 8. Every valid triangle satisfies this for all side pairs.",
    k: ["triangle inequality", "sum of two sides", "sides triangle"],
  },
  {
    ch: 6,
    q: "How are triangles classified by sides and angles?",
    a: "By sides, a triangle is scalene when all sides differ, isosceles when two sides are equal, and equilateral when all three are equal. By angles, it is acute-angled when all angles are under 90 degrees, right-angled with one 90 degrees, and obtuse-angled with one angle above 90 degrees.",
    k: ["types of triangles", "scalene", "isosceles", "equilateral", "right angled"],
  },
  // ---------------------------------------------------------------- Ch 7
  {
    ch: 7,
    q: "What is congruence and how do we write congruent triangles?",
    a: "Two figures are congruent when they have the same shape and size, like two identical stamps. For triangles, congruence means matching sides and angles are equal. We write it in matching order, so triangle ABC congruent to triangle PQR means A matches P, B matches Q and C matches R.",
    k: ["congruence", "congruent", "same shape size"],
  },
  {
    ch: 7,
    q: "What are the conditions (criteria) for congruence of triangles?",
    a: "Two triangles are congruent if they satisfy any one criterion. SSS needs all three sides equal; SAS needs two sides and the included angle equal; ASA needs two angles and the included side equal; and RHS applies to right triangles with equal hypotenuse and side. AAA alone never guarantees congruence.",
    k: ["sss", "sas", "asa", "rhs", "congruence criteria"],
  },
  // ---------------------------------------------------------------- Ch 8
  {
    ch: 8,
    q: "How do we convert a fraction or decimal into a percentage?",
    a: "Percentage means 'per hundred'. To change a fraction, multiply it by 100 and add the percent sign; one-fourth becomes 25 percent. For a decimal, shift the decimal point two places right: 0.36 becomes 36 percent. To reverse it, divide the percentage by 100 again.",
    k: ["percentage", "fraction percent", "decimal percent", "convert percentage"],
  },
  {
    ch: 8,
    q: "How do we calculate profit or loss per cent?",
    a: "Profit or loss is found from cost price, the buying price, and selling price. If selling price exceeds cost price there is profit; otherwise loss. Profit per cent equals profit divided by cost price multiplied by 100. The same formula with loss gives loss per cent.",
    k: ["profit loss", "cost price", "selling price", "profit percent"],
  },
  // ---------------------------------------------------------------- Ch 9
  {
    ch: 9,
    q: "What is a rational number?",
    a: "A rational number is any number expressible as p divided by q, where p and q are integers and q is not zero. It includes all integers, fractions and terminating or repeating decimals. Examples are minus 3, one-half, 0.75 and two-fifths. Zero is rational since it equals 0 upon 1.",
    k: ["rational number", "p by q", "definition rational"],
  },
  {
    ch: 9,
    q: "How do we compare two rational numbers?",
    a: "To compare rational numbers, first make their denominators positive and equal. With the same positive denominator, the larger numerator gives the larger number. Alternatively, convert both to decimals and compare place by place. This shows, for example, that minus one-half is greater than minus three-fourths on the number line.",
    k: ["compare rational", "comparing fractions", "number line rational"],
  },
  // ---------------------------------------------------------------- Ch 10
  {
    ch: 10,
    q: "How do we find the perimeter and area of common shapes?",
    a: "Perimeter is the total boundary length: add all sides for polygons, and use 2πr for a circle's circumference. Area measures the enclosed region: base times height for rectangles and parallelograms, half base times height for triangles, and πr squared for circles. Always keep units consistent while calculating.",
    k: ["perimeter", "area", "formulas", "circle circumference"],
  },
  {
    ch: 10,
    q: "How do we find the area of a parallelogram and a triangle?",
    a: "A parallelogram's area is base times perpendicular height, where height is the perpendicular distance to the opposite side, not the slant edge. A triangle is exactly half of a parallelogram on the same base, so its area is half times base times height. Convert units before substituting values.",
    k: ["area parallelogram", "area triangle", "base height"],
  },
  // ---------------------------------------------------------------- Ch 11
  {
    ch: 11,
    q: "What are terms, like terms and coefficients in algebraic expressions?",
    a: "An algebraic expression is built from terms added or subtracted, like 3x plus 5y minus 2. Each term has a numerical coefficient and variables. Terms with exactly the same variables and powers, like 3x and 7x, are like terms and can be combined; 3x and 3x squared are unlike.",
    k: ["algebraic expression", "terms", "like terms", "coefficient", "variables"],
  },
  {
    ch: 11,
    q: "How do we add and subtract algebraic expressions?",
    a: "To add or subtract algebraic expressions, group the like terms together and combine only their coefficients, keeping the variable part unchanged. Unlike terms stay as they are. For example, 5x plus 3y minus 2x equals 3x plus 3y. Always write the sign before each term carefully.",
    k: ["add expression", "subtract expression", "combine like terms"],
  },
  // ---------------------------------------------------------------- Ch 12
  {
    ch: 12,
    q: "How do we construct a triangle when its three sides are given (SSS)?",
    a: "Draw the longest given side as the base using a ruler. With the compass, take the second length, place the tip on one endpoint and cut an arc. Repeat with the third length from the other endpoint. Where the arcs meet is the third vertex; join it to both endpoints.",
    k: ["construct triangle", "sss construction", "compass", "practical geometry"],
  },
  {
    ch: 12,
    q: "How do we construct a line parallel to a given line through a point?",
    a: "Take a point P outside the given line AB. Draw any line through P meeting AB at Q. Using Q as vertex, copy the angle made with AB at P on the other side with a compass. The new arm through P gives the required parallel line.",
    k: ["parallel line construction", "construct parallel", "copy angle"],
  },
  // ---------------------------------------------------------------- Ch 13
  {
    ch: 13,
    q: "How do we solve a linear equation in one variable?",
    a: "Keep the variable terms on one side and numbers on the other by transposing, changing sign while moving terms. Then divide by the coefficient. For 2x plus 3 equals 11, transpose 3 to get 2x equals 8, so x equals 4. Check by substituting back into the original equation.",
    k: ["linear equation", "solve linear", "one variable", "transpose"],
  },
  {
    ch: 13,
    q: "How do we solve a linear equation with variables on both sides?",
    a: "Bring every variable term to the left and every constant to the right by transposition, flipping signs as terms move. Combine like terms on each side, then divide by the coefficient. For 3x minus 4 equals x plus 6, we get 2x equals 10, so x equals 5.",
    k: ["variables both sides", "solve equation", "transpose linear"],
  },
  // ---------------------------------------------------------------- Ch 14
  {
    ch: 14,
    q: "What is line symmetry? Give examples.",
    a: "A figure has line symmetry if a line can divide it into two identical mirror halves. A square has four such lines, a rectangle two, an isosceles triangle one, and a circle has infinitely many diameters as symmetry lines. The human face, butterflies and letters like M show symmetry too.",
    k: ["line symmetry", "mirror line", "symmetrical figures", "axis symmetry"],
  },
  {
    ch: 14,
    q: "What is rotational symmetry and order of rotation?",
    a: "Rotational symmetry exists when a shape looks unchanged after a turn of less than a full circle. The order of rotation counts how many times it matches in one full 360-degree turn. A square has order four, an equilateral triangle order three, and a circle has infinite rotational symmetry.",
    k: ["rotational symmetry", "order rotation", "turn symmetry", "angle rotation"],
  },
  // ---------------------------------------------------------------- Ch 15
  {
    ch: 15,
    q: "What are faces, edges and vertices of a solid shape?",
    a: "Faces are the flat surfaces of a solid, edges are line segments where two faces meet, and vertices are corner points where edges meet. A cube has 6 faces, 12 edges and 8 vertices. For polyhedra, Euler's formula connects them: faces plus vertices minus edges equals 2.",
    k: ["faces edges vertices", "solid shape", "cube", "euler"],
  },
  {
    ch: 15,
    q: "What is the difference between 2D and 3D shapes?",
    a: "Two-dimensional shapes have only length and breadth, lying flat on paper, like squares, circles and triangles; they have area but no volume. Three-dimensional solids have length, breadth and height, occupying space, like cubes, cylinders and cones; they have surface area and volume, and cast real shadows.",
    k: ["2d 3d", "two dimensional", "three dimensional", "solid"],
  },
];
