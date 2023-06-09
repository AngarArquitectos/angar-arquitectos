"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = formatNumber;
function formatNumber(number) {
  if (Number.isInteger(number)) {
    number = number.toFixed(2);
  }
  return number.toLocaleString();
}