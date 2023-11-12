export default function makeExcerpt(text: string, numOfChar: number = 50) {
  if (typeof text !== 'string') {
    console.error('Parameter 1 for function makeExcerpt() must be string');
    return undefined;
  }
  return text.slice(0, numOfChar) + (text.length > numOfChar ? '...' : '');
}
