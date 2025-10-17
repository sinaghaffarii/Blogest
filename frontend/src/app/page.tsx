import Blogs from '@/components/landing/Blogs';
import Navbar from '@/components/landing/Navbar';
import Profile from '@/components/landing/Profile';
import Tags from '@/components/landing/Tags';
import { FiltersProvider } from '@/context/FiltersContext';

// async function fetchBlogs(): Promise<{
//   blogs: Blog[];
//   pagination: {
//     current: number;
//     hasNext: boolean;
//     hasPrev: boolean;
//     items: number;
//     total: number;
//   };
// }> {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/getList`);
//   if (!res.ok) {
//     throw new Error('Received Articles encountered by error');
//   }
//   return res.json();
// }

export default async function Home() {
  return (
    <div>
      <Navbar />
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
