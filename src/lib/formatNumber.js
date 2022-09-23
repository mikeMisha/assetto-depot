export default function formatNumber(numString) {
  return numString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
