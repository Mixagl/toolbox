"use client";

import { useState, useCallback } from "react";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [copied, setCopied] = useState(false);

  const [generatedWith, setGeneratedWith] = useState<{
    length: number;
    options: typeof options;
  } | null>(null);

  const generatePassword = useCallback(() => {
    const chars = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
    };

    const activeTypes = Object.entries(options)
      .filter(([, value]) => value)
      .map(([key]) => key as keyof typeof options);

    if (activeTypes.length === 0) return;

    // Сначала кладём по одному символу каждого выбранного типа
    let result: string[] = [];
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    activeTypes.forEach((type, index) => {
      const charset = chars[type];
      result.push(charset[array[index] % charset.length]);
    });

    // Собираем общий charset для оставшихся символов
    let fullCharset = "";
    activeTypes.forEach((type) => {
      fullCharset += chars[type];
    });

    // Добиваем случайными символами
    for (let i = activeTypes.length; i < length; i++) {
      result.push(fullCharset[array[i] % fullCharset.length]);
    }

    // Перемешиваем Фишером-Йетсом
    const shuffleArray = new Uint32Array(result.length);
    crypto.getRandomValues(shuffleArray);

    for (let i = result.length - 1; i > 0; i--) {
      const j = shuffleArray[i] % (i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }

    const finalPassword = result.join("");
    setPassword(finalPassword);
    setGeneratedWith({
      length,
      options: { ...options },
    });
  }, [length, options]);

  const toggleOption = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] };
    if (Object.values(newOptions).some(Boolean)) {
      setOptions(newOptions);
    }
  };

  const copyToClipboard = async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getPasswordStrength = () => {
    if (!password || !generatedWith)
      return { label: "—", color: "bg-neutral-700", width: "0%" };

    let score = 0;
    if (generatedWith.length >= 8) score++;
    if (generatedWith.length >= 12) score++;
    if (generatedWith.length >= 16) score++;
    if (generatedWith.options.uppercase) score++;
    if (generatedWith.options.lowercase) score++;
    if (generatedWith.options.numbers) score++;
    if (generatedWith.options.symbols) score++;

    if (score <= 2)
      return { label: "Слабый", color: "bg-red-500", width: "25%" };
    if (score <= 4)
      return { label: "Средний", color: "bg-yellow-500", width: "50%" };
    if (score <= 6)
      return { label: "Хороший", color: "bg-emerald-400", width: "75%" };
    return { label: "Надёжный", color: "bg-emerald-500", width: "100%" };
  };

  const strength = getPasswordStrength();

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
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
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Генератор паролей
          </h1>
          <p className="mt-3 text-neutral-400">
            Создай надёжный пароль любой длины
          </p>
        </div>

        {/* Поле с паролем */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-lg text-white min-h-13 break-all">
              {password || (
                <span className="text-neutral-600 text-base font-sans">
                  Нажмите «Сгенерировать»
                </span>
              )}
            </div>
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {copied ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Скопировано
                </>
              ) : (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Копировать
                </>
              )}
            </button>
          </div>

          {/* Индикатор надёжности */}
          {password && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-500">Надёжность</span>
                <span className="text-xs font-medium text-white">
                  {strength.label}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${strength.color}`}
                  style={{ width: strength.width }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Длина пароля */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-neutral-300">
              Длина пароля
            </label>
            <span className="text-sm font-mono text-white tabular-nums">
              {length}
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 rounded-full bg-neutral-800 appearance-none cursor-pointer accent-emerald-500 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-neutral-600">4</span>
            <span className="text-xs text-neutral-600">64</span>
          </div>
        </div>

        {/* Опции */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <label className="block text-sm font-medium text-neutral-300 mb-4">
            Набор символов
          </label>
          <div className="space-y-3">
            {[
              {
                key: "uppercase" as const,
                label: "Заглавные буквы",
                example: "ABC",
              },
              {
                key: "lowercase" as const,
                label: "Строчные буквы",
                example: "abc",
              },
              { key: "numbers" as const, label: "Цифры", example: "123" },
              { key: "symbols" as const, label: "Спецсимволы", example: "!@#" },
            ].map(({ key, label, example }) => (
              <button
                key={key}
                onClick={() => toggleOption(key)}
                className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
                  options[key]
                    ? "border-emerald-500/30 bg-emerald-500/5 text-white"
                    : "border-neutral-800 text-neutral-500 hover:border-neutral-700"
                }`}
              >
                <span className="text-sm">{label}</span>
                <span className="text-xs font-mono opacity-60">{example}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Кнопка генерации */}
        <button
          onClick={generatePassword}
          className="w-full rounded-full bg-white px-8 py-3.5 text-base font-semibold text-neutral-900 transition-all hover:bg-neutral-200 active:scale-95"
        >
          Сгенерировать
        </button>
      </div>
    </section>
  );
}
