import { Request } from "express";

export default function sanitizeText(text: string) {
  let sanitizedText = "";
  for (let index = 0; index < text.length; index++) {
    const element = text[index];
    sanitizedText += element === "\n" ? " " : element;
  }
  return sanitizedText.trim();
}

export function searchAndPage(req: Request): { search: string; page: number } {
  const search: string =
    typeof req.query.query === "string" ? req.query.query : "";
  const page: number =
    typeof req.query.page === "string" &&
    !isNaN(Number(req.query.page)) &&
    Number(req.query.page) < 1
      ? 1
      : Number(req.query.page);
  return {
    search,
    page,
  };
}
