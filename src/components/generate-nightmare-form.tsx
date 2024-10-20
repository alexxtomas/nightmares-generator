'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useState } from 'react';
import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';
import { generateManifest } from '@lib/utils';

const FormSchema = z.object({
  fearsDescriptionPrompt: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(160, {
      message: 'Description must not be longer than 30 characters.',
    }),
});

export function GenerateNightmareForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [publicId, setPublicId] = useState('');

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setStatus('loading');
    fetch('/api/generate-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.fearsDescriptionPrompt,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data: JSON.stringify(data) });
        fetch('https://api.cloudinary.com/v1_1/videoapi-demo/video/create_video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            manifest_json: JSON.stringify(
              generateManifest({
                videoUrls: data.images,
              }),
            ),
            upload_preset: 'wl4anppv',
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            console.log({ result });

            return new Response(
              JSON.stringify({
                public_id: result.public_id,
              }),
              {
                status: 200,
              },
            );
          });
      })
      .catch(() => {
        setStatus('error');
      });
  }

  return (
    <section className="flex flex-col gap-4">
      {publicId && <CldVideoPlayer width="500" height="500" src={publicId} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="fearsDescriptionPrompt"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg"> Describe your fears</FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="bg-zinc-900 mb-10"
                    placeholder="Describe your worst nightmare... Is it the dark, creeping shadows? A deep fear of drowning? Or maybe you're haunted by eerie whispers in an abandoned house? Let your imagination run wild—what scares you the most? 😈"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={status === 'loading'} type="submit">
            Generate
          </Button>
        </form>
      </Form>
    </section>
  );
}
