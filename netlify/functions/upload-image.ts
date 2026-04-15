import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { password?: string; fileName?: string; contentType?: string; data?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  if (!body.data || !body.fileName) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];
  const contentType = body.contentType || "image/jpeg";
  if (!allowed.includes(contentType)) {
    return Response.json({ error: "Only JPG, PNG, and WEBP allowed" }, { status: 400 });
  }

  const buffer = Buffer.from(body.data, "base64");
  const store = getStore({ name: "gallery", consistency: "strong" });
  const key = `${Date.now()}-${body.fileName}`;

  await store.set(key, buffer, {
    metadata: { contentType, originalName: body.fileName },
  });

  return Response.json({
    success: true,
    key,
    src: `/.netlify/functions/serve-image?key=${encodeURIComponent(key)}`,
  });
};
