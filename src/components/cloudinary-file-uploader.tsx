'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@components/ui/button';
import { useState } from 'react';

export function CloudinaryFileUploader() {
  const [originalImage, setOriginalImage] = useState('');
  return (
    <section>
      <CldUploadWidget
        onSuccess={(result) => {
          console.log(result);
          const { info = {} } = result as { info?: { public_id?: string } };

          if (info?.public_id) {
            fetch(`/api/get-cloudinary-image?imageId=${info.public_id}`, {
              method: 'GET',
            })
              .then((res) => res.json())
              .then((data) => {
                console.log({ data });
                setOriginalImage(data.imageUrl);
              });
          }
        }}
        uploadPreset="upload-unsigned-images"
        options={{
          maxFileSize: 10485760,
          multiple: false,
          maxFiles: 1,
          sources: ['local'],
          styles: {
            button: {
              backgroundColor: 'red !important',
            },
          },
        }}
      >
        {({ open }) => {
          return <Button onClick={() => open()}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
      {originalImage && <img src={originalImage} />}
    </section>
  );
}
