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
  let page = 1;
  if (typeof req.query.page === "string") {
    page = isNaN(Number(req.query.page)) ? page : Number(req.query.page);
  }
  return {
    search,
    page,
  };
}

export function getMagnetAndVideoUrl(req: Request): {
  videoPath: string;
  magnetUrl: string;
} {
  const videoPath =
    typeof req.query.videoPath === "string" ? req.query.videoPath : "";

  const magnetUrl =
    typeof req.query.magnetUrl === "string" ? req.query.magnetUrl : "";
  return {
    videoPath,
    magnetUrl,
  };
}
