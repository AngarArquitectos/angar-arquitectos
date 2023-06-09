export function filterPrices(string) {
  const prices = string.split(/\|\|/);

  const pricesFiltered = prices.slice(1);

  const floatPrices = pricesFiltered.map((precio) => parseFloat(precio));

  return floatPrices;
}

export function filterName(string) {
  const prices = string.split("||");

  const name = prices[0];

  return name;
}
