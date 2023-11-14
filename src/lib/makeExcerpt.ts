export default function makeExcerpt(text: string, numOfChar: number = 50) {
  if (typeof text !== 'string') {
    return undefined;
  }
  return text.slice(0, numOfChar) + (text.length > numOfChar ? '...' : '');
}
