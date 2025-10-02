export default function Categories({ categories }: { categories: string[] }) {
  return (
    <section className="px-6 md:px-20 py-12 bg-gray-50 dark:bg-gray-900 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        دسته‌بندی‌ها
      </h2>
      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <span
            key={cat}
            className="px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition"
          >
            {cat}
          </span>
        ))}
      </div>
    </section>
  );
}
