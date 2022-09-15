export default function formatNumber(numString) {
  if (typeof numString !== 'string') {
    console.error('Parameter for function FormatNumber() must be string');
    return undefined;
  }

  return numString.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
