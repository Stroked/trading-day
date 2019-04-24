const defaultCount = (i, n) => {
  return Math.random() * (25 * (n - i));
};

const defaultBin = (i, n) => {
  return i * 150;
};

function genBin(n, bin = defaultBin, count = defaultCount) {
  return Array(n)
    .fill(1)
    .reduce((data, d, i) => {
      return data.concat([
        {
          bin: bin(i, n),
          count: count(i, n)
        }
      ]);
    }, []);
}

export default function genBins(x, y, bin, count) {
  return Array(x)
    .fill(1)
    .reduce((data, d, i) => {
      return data.concat([
        {
          bin: i,
          bins: genBin(y, bin, count)
        }
      ]);
    }, []);
}
