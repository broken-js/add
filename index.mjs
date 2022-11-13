/**
 * @param {boolean} x
 * @param {boolean} y
 * @yields {boolean[]} c, s
 */
function* halfAdder(x, y) {
  yield x & y;
  yield x ^ y;
}

/**
 * @param {boolean} x
 * @param {boolean} y
 * @param {boolean} c
 * @yields {boolean[]} c, s
 */
function* fullAdder(x, y, c = false) {
  const [c_1, s_1] = halfAdder(x, y);
  const [c_2, s_2] = halfAdder(s_1, c);
  yield c_1 | c_2;
  yield s_2;
}

/**
 *
 * @param {boolean[]} a
 * @param {boolean[]} b
 * @yields {boolean[]} ...s, c
 */
function* nBitAdder(a, b) {
  let c, s;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    [c, s] = fullAdder(a[i], b[i], c);
    yield s;
  }
  if (c) yield c;
}

function reverse(array) {
  return array.reduceRight((a, c) => (a.push(c), a), []);
}

/**
 *
 * @param {number} num
 * @returns {boolean[]}
 */
function toBits_LSB(num) {
  return reverse(
    Math.floor(num)
      .toString(2)
      .split('')
      .map((v) => parseInt(v, 2)),
  );
}

/**
 *
 * @param {number} num
 * @returns {boolean[]}
 */
function fromBits_LSB(...bits) {
  return parseInt(reverse(bits).map(Number).join(''), 2);
}

export function add(a, b) {
  return fromBits_LSB(...nBitAdder(toBits_LSB(a), toBits_LSB(b)));
}
