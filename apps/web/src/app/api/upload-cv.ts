import { writeClient } from '../../lib/sanity.write';

export async function action({ request }: { request: Request }) {
  if (!process.env.SANITY_WRITE_TOKEN) {
    return Response.json({ error: 'Upload service not configured' }, { status: 503 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file || file.size === 0) {
    return Response.json({ error: 'No file provided' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) {
    return Response.json({ error: 'File exceeds 10 MB limit' }, { status: 413 });
  }

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const asset = await writeClient.assets.upload('file', buffer, {
      filename: file.name,
      contentType: file.type || 'application/octet-stream',
    });
    return Response.json({ assetId: asset._id, filename: file.name });
  } catch (err) {
    console.error('[upload-cv] Sanity upload failed:', err);
    return Response.json({ error: 'Upload failed — check SANITY_WRITE_TOKEN' }, { status: 500 });
  }
}
