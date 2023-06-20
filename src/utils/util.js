const colorGenerator = () => {
  let x = Math.floor(Math.random() < 0.5 ? 256 : 0);
  let y = Math.floor(256);
  let z = Math.floor(Math.random() * 256);
  let bgColor = `rgb(${x}, ${y}, ${x})`;
  return bgColor;
};

const safeParseFloat = (num) => parseFloat(Number.isNaN(num) ? 0 : num);

const calculateAmount = (percentage, total) => Math.round(total * percentage);

const generateBenchs = (benches) =>
  benches.reduce((acc, current, index) => {
    return { ...acc, [`C${index + 1}`]: current };
  }, {});

export { colorGenerator, safeParseFloat, calculateAmount, generateBenchs };
