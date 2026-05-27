"use client";

import { useState } from "react";

type Unit = "px" | "rem" | "em" | "pt";

export default function UnitConverter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState<Unit>("px");

  const conversions: Record<Unit, number> = {
    px: 1,
    rem: 16,
    em: 16,
    pt: 1.333,
  };

  const convert = (to: Unit): string => {
    if (!value || isNaN(Number(value))) return "";
    const pxValue = Number(value) * conversions[fromUnit];
    const result = pxValue / conversions[to];
    return result % 1 === 0 ? result.toString() : result.toFixed(2);
  };

  const units: Unit[] = ["px", "rem", "em", "pt"];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 mb-4">
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
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
              <line x1="10" y1="3" x2="8" y2="21" />
              <line x1="16" y1="3" x2="14" y2="21" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Конвертер единиц
          </h1>
          <p className="mt-3 text-neutral-400">
            Мгновенный перевод между px, rem, em и pt
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <div className="flex gap-3 mb-6 flex-col sm:flex-row">
            <input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Введите значение"
              className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-white placeholder-neutral-600 outline-none transition-colors focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value as Unit)}
              className="rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-white outline-none transition-colors focus:border-amber-500/50 cursor-pointer"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {units
              .filter((unit) => unit !== fromUnit)
              .map((unit) => (
                <div
                  key={unit}
                  className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/50 px-4 py-3"
                >
                  <span className="text-sm text-neutral-400">{unit}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-white text-lg tabular-nums">
                      {convert(unit) || "—"}
                    </span>
                    <button
                      onClick={() => {
                        const result = convert(unit);
                        if (result) navigator.clipboard.writeText(result);
                      }}
                      className="text-neutral-600 hover:text-white transition-colors"
                    >
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
                        <rect
                          x="9"
                          y="9"
                          width="13"
                          height="13"
                          rx="2"
                          ry="2"
                        />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
