import Link from "next/link";
import { ReactNode } from "react";

export default function Tools() {
  interface ToolCard {
    title: string;
    description: string;
    icon: ReactNode;
    href: string;
    gradient: string;
    iconBg: string;
    iconColor: string;
  }

  const tools: ToolCard[] = [
    {
      title: "Конвертер цветов",
      description:
        "Мгновенный перевод HEX в RGB и обратно. Выбери цвет и скопируй код.",
      href: "/tools/color-converter",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      ),
      gradient: "from-purple-500/20 to-pink-500/20",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      title: "Счётчик символов",
      description:
        "Узнай длину текста, количество слов и предложений. Для постов, эссе и ТЗ.",
      href: "/tools/char-counter",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
    },
    {
      title: "Генератор паролей",
      description:
        "Создай надёжный пароль любой длины. С цифрами, спецсимволами и заглавными буквами.",
      href: "/tools/password-generator",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          <circle cx="12" cy="16" r="1" />
        </svg>
      ),
      gradient: "from-emerald-500/20 to-green-500/20",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
    },
    {
      title: "Форматировщик JSON",
      description:
        "Преврати сжатый JSON в читаемый вид. С подсветкой синтаксиса и копированием в один клик.",
      href: "/tools/json-formatter",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="12" y1="2" x2="12" y2="22" />
        </svg>
      ),
      gradient: "from-orange-500/20 to-yellow-500/20",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
    },
  ];

  return (
    <section id="tools" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tools.map((tool) => (
            <Link
              href={tool.href}
              key={tool.title}
              className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${tool.gradient} opacity-0 transition-opacity group-hover:opacity-100`}
              />

              <div className="relative">
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${tool.iconBg} ${tool.iconColor} mb-4 transition-transform group-hover:scale-110`}
                >
                  {tool.icon}
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {tool.title}
                </h3>

                <p className="text-sm leading-relaxed text-neutral-400">
                  {tool.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
