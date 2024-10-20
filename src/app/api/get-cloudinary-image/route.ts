import type { NextApiRequest } from 'next';
import { getCldImageUrl } from 'next-cloudinary';

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url as string);
  const imageId = searchParams.get('imageId');

  console.log('imageId', imageId);

  if (!imageId) {
    return new Response(JSON.stringify({ error: 'Missing imageId' }), {
      status: 400,
    });
  }

  if (typeof imageId !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid imageId, must be a string' }), {
      status: 400,
    });
  }

  try {
    const imageUrl = await getCldImageUrl({ src: imageId });
    return new Response(JSON.stringify({ imageUrl }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
    });
  }
}
