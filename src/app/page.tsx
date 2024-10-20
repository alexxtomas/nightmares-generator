import { GenerateNightmareForm } from '@components/generate-nightmare-form';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';

export default function Home() {
  return (
    <main className="max-w-2xl flex flex-col justify-center mx-auto">
      <article className="px-4 py-12 space-y-8">
        <header>
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4 relative">
            Create Your Worst Nightmare
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary rounded-full"></span>
          </h2>
        </header>
        <section className="prose prose-lg prose-invert">
          <p>
            Ever wondered what your deepest fears would look like if they came to life? Welcome to
            the ultimate fear experience. With our cutting-edge AI-driven app, you can describe the
            things that terrify you the most, and we’ll transform your words into a personalized
            video of your worst nightmare. Whether it’s haunted houses, lurking shadows, or eerie
            creatures, our app brings your fears to life in terrifyingly vivid detail. It’s not just
            about facing your fears—it's about seeing them unfold right before your eyes.
          </p>
          <h3 className='text-xl font-semibold mt-6 "'>How It Works: </h3>
          <ul className="space-y-4 list-none pl-0 mt-4">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-white bg-primary rounded-full">
                1
              </span>
              Describe Your Fears: Tell us what scares you the most in your own words.
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-white bg-primary rounded-full">
                2
              </span>
              Let AI Do the Magic: Our powerful AI processes your description and generates a
              spine-chilling video based on your worst fears.
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm font-semibold text-white bg-primary rounded-full">
                3
              </span>
              Experience the Horror: Watch your personalized nightmare come to life.
            </li>
          </ul>
        </section>

        <footer className="mt-8 pt-8 text-cl text-muted-foreground flex items-center justify-between">
          Dare to step into your own fears? Create your nightmare now—if you’re brave enough!
        </footer>
      </article>
      <GenerateNightmareForm />
    </main>
  );
}
