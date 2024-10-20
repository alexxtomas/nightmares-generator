import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const { image } = await req.json();

  if (!image) {
    return new Response(JSON.stringify({ error: 'Missing image' }), {
      status: 400,
    });
  }

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'WorstNightmare/images',
    });

    return new Response(
      JSON.stringify({
        image: result.secure_url,
      }),
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
    });
  }
}
