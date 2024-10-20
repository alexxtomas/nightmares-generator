import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateManifest({ videoUrls }: { videoUrls: string[] }) {
  return {
    type: 'video',
    width: 500,
    height: 500,
    duration: 8,
    fps: 30,
    tracks: [
      {
        width: 500,
        height: 500,
        x: 0,
        y: 0,
        clipDefaults: {
          clipDuration: 1000,
          transitionDuration: 2000,
          transition: 'morph',
        },
        clips: videoUrls.map((url) => {
          return {
            media: [url, 'image', 'upload'],
            type: 'image',
            transformation: 'c_fill',
          };
        }),
      },
    ],
  };
}
