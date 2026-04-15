import { getStore } from "@netlify/blobs";

export default async (_req: Request) => {
  try {
    const store = getStore({ name: "gallery", consistency: "strong" });
    const { blobs } = await store.list();

    const images = blobs.map(({ key }) => ({
      key,
      src: `/.netlify/functions/serve-image?key=${encodeURIComponent(key)}`,
    }));

    return Response.json(images, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    return Response.json({ error: "Failed to list images" }, { status: 500 });
  }
};
