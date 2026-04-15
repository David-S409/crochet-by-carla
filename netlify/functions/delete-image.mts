import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let body: { password?: string; key?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.password || body.password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  if (!body.key) {
    return Response.json({ error: "No key provided" }, { status: 400 });
  }

  const store = getStore("gallery");
  await store.delete(body.key);

  return Response.json({ success: true });
};
