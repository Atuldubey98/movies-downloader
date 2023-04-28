export default function sanitizeText(text: string) {
  let sanitizedText = "";
  for (let index = 0; index < text.length; index++) {
    const element = text[index];
    sanitizedText += element === "\n" ? " " : element;
  }
  return sanitizedText.trim();
}
