import { getStore } from "@netlify/blobs";

export default async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return Response.json({ error: "Invalid form data" }, { status: 400 });
  }

  const password = formData.get("password") as string;
  const file = formData.get("file") as File | null;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return Response.json({ error: "Incorrect password" }, { status: 401 });
  }

  if (!file || !file.size) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return Response.json({ error: "Only JPG, PNG, and WEBP files are allowed" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const store = getStore("gallery");
  const key = `${Date.now()}-${file.name}`;

  await store.set(key, buffer, {
    metadata: { contentType: file.type, originalName: file.name },
  });

  return Response.json({
    success: true,
    key,
    src: `/.netlify/functions/serve-image?key=${encodeURIComponent(key)}`,
  });
};
