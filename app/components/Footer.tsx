import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Toolbox. Все инструменты бесплатны.
          </p>

          <div className="flex items-center gap-6">
            <a
              href="https://t.me/mixagl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              Telegram
            </a>
            <Link
              href="/"
              className="text-sm text-neutral-500 transition-colors hover:text-white"
            >
              Главная
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
