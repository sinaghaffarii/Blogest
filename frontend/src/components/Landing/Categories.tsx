export default function Categories({ categories }: { categories: string[] }) {
  return (
    <section className="relative p-6 md:p-10 bg-gradient-to-br from-white via-gray-50 to-gray-100 flex justify-center border rounded-lg">
      <div className="relative w-full max-w-5xl backdrop-blur-xl bg-white/70 border border-gray-200 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-sky-500 tracking-tight">
          دسته‌بندی‌ها
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-5 py-2 rounded-full text-sm md:text-base font-medium
              text-sky-600
              bg-white/80
              border border-sky-200
              backdrop-blur-sm
              shadow-[inset_0_1px_3px_rgba(0,0,0,0.05)]
              cursor-pointer
              transition-all duration-200
              hover:bg-sky-50 hover:border-sky-400 hover:text-sky-500 hover:shadow-[0_0_10px_rgba(56,189,248,0.25)]"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
