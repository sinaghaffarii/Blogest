export default function CallToAction() {
  return (
    <section className="py-20 bg-blue-600 dark:bg-blue-500 text-white text-center rounded-2xl mx-6 md:mx-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        می‌خوای آخرین مقالات رو دریافت کنی؟
      </h2>
      <p className="mb-8 text-lg md:text-xl">
        در خبرنامه ما عضو شو و از آخرین مقالات و آموزش‌ها باخبر باش
      </p>
      <a
        href="#newsletter"
        className="px-8 py-4 rounded-xl bg-white text-blue-600 font-semibold hover:bg-gray-100 dark:text-blue-500 dark:bg-blue-100 dark:hover:bg-blue-200 transition"
      >
        ثبت نام در خبرنامه
      </a>
    </section>
  );
}
