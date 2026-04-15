import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) return new Response("Missing key", { status: 400 });

  try {
    const store = getStore({ name: "gallery", consistency: "strong" });
    const entry = await store.getWithMetadata(key, { type: "arrayBuffer" });

    if (!entry?.data) return new Response("Not found", { status: 404 });

    return new Response(entry.data as ArrayBuffer, {
      headers: {
        "Content-Type": (entry.metadata?.contentType as string) || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};
