import Blogs from '@/components/landing/Blogs';
import Profile from '@/components/landing/Profile';
import Tags from '@/components/landing/Tags';
import { FiltersProvider } from '@/context/FiltersContext';

import PublicLayout from './(public)/layout';

export default async function Home() {
  return (
    <PublicLayout>
      <FiltersProvider>
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 w-11/12 max-w-6xl mx-auto mt-12">
          {/* Tags */}
          <div className="hidden md:block md:order-1 md:col-span-2 w-full">
            <Tags />
          </div>

          {/* Blogs */}
          <div className="order-3 md:order-2 md:col-span-7 w-full">
            <Blogs />
          </div>

          {/* Profile */}
          <div className="order-1 md:order-3 md:col-span-3 w-full">
            <Profile />
          </div>
        </section>
      </FiltersProvider>
    </PublicLayout>
  );
}
