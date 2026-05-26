"use client";

import { useState, useCallback } from "react";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [indentSize, setIndentSize] = useState(2);

  const formatJson = useCallback(() => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Невалидный JSON");
      setOutput("");
    }
  }, [input, indentSize]);

  const minifyJson = useCallback(() => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Невалидный JSON");
      setOutput("");
    }
  }, [input]);

  const copyToClipboard = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  // Подсветка синтаксиса JSON
  const highlightJson = (json: string) => {
    if (!json) return null;

    return json.split("\n").map((line, i) => {
      const highlighted = line
        // Ключи
        .replace(
          /(^\s*)"([^"]+)":/g,
          '$1<span class="text-sky-400">"$2"</span>:',
        )
        // Строковые значения
        .replace(/: "([^"]*)"/g, ': <span class="text-emerald-400">"$1"</span>')
        // Числа
        .replace(/: (\d+\.?\d*)/g, ': <span class="text-amber-400">$1</span>')
        // Булевы и null
        .replace(
          /: (true|false|null)/g,
          ': <span class="text-purple-400">$1</span>',
        )
        // Скобки
        .replace(/([{}[\]])/g, '<span class="text-neutral-500">$1</span>');

      return (
        <div key={i} className="leading-6">
          <span className="select-none text-neutral-700 mr-4 inline-block w-8 text-right text-xs">
            {i + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
        </div>
      );
    });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 mb-4">
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
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Форматировщик JSON
          </h1>
          <p className="mt-3 text-neutral-400">
            Преврати сжатый JSON в читаемый вид с подсветкой синтаксиса
          </p>
        </div>

        {/* Поле ввода */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-1">
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Input
            </span>
            {input && (
              <button
                onClick={clearAll}
                className="text-xs text-neutral-600 transition-colors hover:text-red-400"
              >
                Очистить
              </button>
            )}
          </div>
          <textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            placeholder='{"name": "John", "age": 30}'
            rows={8}
            spellCheck={false}
            className="w-full resize-none bg-transparent px-4 py-2 font-mono text-sm text-white placeholder-neutral-600 outline-none leading-relaxed"
          />
        </div>

        {/* Кнопки и настройки */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex gap-3 flex-1">
            <button
              onClick={formatJson}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95"
            >
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
                <line x1="21" y1="10" x2="3" y2="10" />
                <line x1="21" y1="6" x2="3" y2="6" />
                <line x1="21" y1="14" x2="3" y2="14" />
                <line x1="21" y1="18" x2="3" y2="18" />
              </svg>
              Форматировать
            </button>
            <button
              onClick={minifyJson}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95"
            >
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
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <line x1="14" y1="10" x2="21" y2="3" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              Сжать
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-xs text-neutral-500">Отступ:</label>
            <div className="flex rounded-lg border border-neutral-700 bg-neutral-950 overflow-hidden">
              {[2, 4].map((size) => (
                <button
                  key={size}
                  onClick={() => setIndentSize(size)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors ${
                    indentSize === size
                      ? "bg-neutral-700 text-white"
                      : "text-neutral-500 hover:text-neutral-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Ошибка */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
            <div className="flex items-start gap-3">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400 mt-0.5 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          </div>
        )}

        {/* Результат */}
        {output && (
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
              <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Output
              </span>
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95"
              >
                {copied ? (
                  <>
                    <svg
                      width="14"
                      height="14"
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
                      width="14"
                      height="14"
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
            <div className="p-5 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap break-all">
                {highlightJson(output)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
