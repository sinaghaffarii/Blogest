import Blogs from '@/components/landing/Blogs';
import Profile from '@/components/landing/Profile';
import Tags from '@/components/landing/Tags';
import { FiltersProvider } from '@/context/FiltersContext';

export default async function Home() {
  return (
    <div>
      <FiltersProvider>
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 place-items-center w-full max-w-6xl mx-auto mt-12">
          <Tags />
          <Blogs />
          <Profile />
        </section>
      </FiltersProvider>
    </div>
  );
}
