"use client";

import { useState } from "react";

export default function CharCounter() {
  const [text, setText] = useState("");

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(Boolean).length : 0,
  };

  const clearText = () => setText("");

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 mb-4">
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
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Счётчик символов
          </h1>
          <p className="mt-3 text-neutral-400">
            Узнай длину текста, количество слов и предложений
          </p>
        </div>

        {/* Поле ввода */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Вставьте или начните вводить текст..."
            rows={8}
            className="w-full resize-none rounded-xl bg-transparent px-5 py-4 text-white placeholder-neutral-600 outline-none"
          />
          <div className="flex items-center justify-between px-4 pb-3">
            <span className="text-xs text-neutral-600">{stats.characters}</span>
            {text && (
              <button
                onClick={clearText}
                className="text-xs text-neutral-500 transition-colors hover:text-red-400"
              >
                Очистить
              </button>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
            <div className="text-2xl font-bold text-white tabular-nums">
              {stats.characters}
            </div>
            <div className="mt-1 text-xs text-neutral-500">Символов</div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
            <div className="text-2xl font-bold text-white tabular-nums">
              {stats.charactersNoSpaces}
            </div>
            <div className="mt-1 text-xs text-neutral-500">Без пробелов</div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
            <div className="text-2xl font-bold text-white tabular-nums">
              {stats.words}
            </div>
            <div className="mt-1 text-xs text-neutral-500">Слов</div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center">
            <div className="text-2xl font-bold text-white tabular-nums">
              {stats.sentences}
            </div>
            <div className="mt-1 text-xs text-neutral-500">Предложений</div>
          </div>

          <div className="col-span-2 rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 text-center sm:col-span-1">
            <div className="text-2xl font-bold text-white tabular-nums">
              {stats.paragraphs}
            </div>
            <div className="mt-1 text-xs text-neutral-500">Абзацев</div>
          </div>
        </div>

        {/* Примерное время чтения */}
        <div className="mt-6 rounded-xl border border-neutral-800 bg-linear-to-r from-blue-500/10 to-cyan-500/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-400">
              Примерное время чтения
            </span>
            <span className="text-sm font-medium text-white">
              ~{Math.ceil(stats.words / 200)} мин.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
