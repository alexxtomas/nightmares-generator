import { generateManifest } from '@lib/utils';
import OpenAI from 'openai';
import { v2 as cloudinary } from 'cloudinary';
import crypto from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.uploader
//   .upload(image.data[0].url as string, {
//     resource_type: 'image',
//   })
//   .then((result) => console.log(result));

export async function POST(req: Request) {
  const body = await req.json();

  const { prompt } = body;

  if (!prompt || typeof prompt !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid prompt' }), {
      status: 400,
    });
  }

  try {
    const images = await openai.images.generate({
      model: 'dall-e-2',
      // quality: 'hd',
      prompt,
      n: 3,
      size: '512x512',
      // style: 'vivid',
      response_format: 'url',
    });

    const promises: Promise<any>[] = [];

    images.data.forEach((image) => {
      const dataURL = image.url as string;
      promises.push(
        cloudinary.uploader.upload(dataURL, {
          //optional things just if you want some storage optimization
          overwrite: true,
          invalidate: true,
          width: 512,
          height: 512,
          crop: 'fill',
        }),
      );
    });

    const results = await Promise.all(promises);

    const timestamp = Math.round(new Date().getTime() / 1000);
    const manifest_json = JSON.stringify(
      generateManifest({
        videoUrls: results.map((result) => {
          return result.public_id;
        }),
      }),
    );

    const cloudinaryParams = {
      manifest_json,
      timestamp: timestamp,
    };

    // Ordena los parámetros por clave alfabéticamente
    const paramsToSign = Object.keys(cloudinaryParams)
      .sort()
      .map((key) => `${key}=${cloudinaryParams[key]}`)
      .join('&');

    // Firma usando SHA-1
    const signature = crypto
      .createHash('sha1')
      .update(paramsToSign + process.env.CLOUDINARY_API_SECRET)
      .digest('hex');

    const result = await fetch('https://api.cloudinary.com/v1_1/dv3z6ozcj/video/create_video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        manifest_json,
        signature,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
        timestamp,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log({ res });
        return res;
      });

    console.log({ result });

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.error('ERROR', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
    });
  }
}
