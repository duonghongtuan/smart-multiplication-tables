/**
 * Vercel Edge Middleware — auto-detect language on "/".
 * Respects cookie preferred_lang set by the EN/VI switcher.
 */
export const config = {
  matcher: ["/", "/index.html"],
};

function getCookie(request, name) {
  const raw = request.headers.get("cookie") || "";
  const parts = raw.split(";");
  for (const part of parts) {
    const [k, ...rest] = part.trim().split("=");
    if (k === name) return decodeURIComponent(rest.join("=") || "");
  }
  return null;
}

function prefersVietnamese(acceptLanguage) {
  if (!acceptLanguage) return false;
  const tags = acceptLanguage
    .toLowerCase()
    .split(",")
    .map((part) => {
      const [tag, qPart] = part.trim().split(";");
      const q = qPart && qPart.includes("q=")
        ? Number(qPart.split("q=")[1]) || 0
        : 1;
      return { tag: (tag || "").trim(), q };
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.q - a.q);

  for (const item of tags) {
    if (item.tag === "*" ) continue;
    if (item.tag === "vi" || item.tag.startsWith("vi-")) return true;
    // First real preference wins for non-vi languages.
    return false;
  }
  return false;
}

export default function middleware(request) {
  const preferred = getCookie(request, "preferred_lang");

  if (preferred === "en") {
    return; // stay on English
  }

  if (preferred === "vi") {
    return Response.redirect(new URL("/vi/", request.url), 307);
  }

  const accept = request.headers.get("accept-language") || "";
  if (prefersVietnamese(accept)) {
    return Response.redirect(new URL("/vi/", request.url), 307);
  }
}
