export default function formatNumber(numString: string | number) {
  return numString.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
