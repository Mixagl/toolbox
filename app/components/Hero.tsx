import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 pt-16 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-800/50 blur-3xl" />
        <div className="absolute left-1/4 top-1/4 h-75 w-75 rounded-full bg-neutral-700/30 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Простые инструменты для{" "}
          <span className="bg-linear-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            everyday-задач
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl">
          Быстрые утилиты для работы с текстом, цветом, паролями и данными.
          Ничего лишнего, без регистрации.
        </p>

        <div className="mt-10">
          <Link
            href="#tools"
            scroll={true}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-200 hover:gap-3 active:scale-95"
          >
            К инструментам
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
