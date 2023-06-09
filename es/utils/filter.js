export function filterPrices(string) {
  var prices = string.split(/\|\|/);

  var pricesFiltered = prices.slice(1);

  var floatPrices = pricesFiltered.map(function (precio) {
    return parseFloat(precio);
  });

  return floatPrices;
}

export function filterName(string) {
  var prices = string.split("||");

  var name = prices[0];

  return name;
}