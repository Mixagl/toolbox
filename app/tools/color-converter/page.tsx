"use client";

import { useState, useCallback } from "react";

export default function ColorConverter() {
  const [hex, setHex] = useState("#6366f1");
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [copied, setCopied] = useState<"hex" | "rgb" | null>(null);

  const hexToRgb = useCallback((hexValue: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }
    return null;
  }, []);

  const rgbToHex = useCallback((r: number, g: number, b: number) => {
    const toHex = (n: number) => {
      const clamped = Math.max(0, Math.min(255, n));
      const hex = clamped.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }, []);

  const handleHexChange = (value: string) => {
    const formattedValue = value.startsWith("#") ? value : `#${value}`;
    setHex(formattedValue);

    const rgbValue = hexToRgb(formattedValue);
    if (rgbValue) {
      setRgb(rgbValue);
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    const numValue = parseInt(value) || 0;
    const newRgb = { ...rgb, [channel]: numValue };
    setRgb(newRgb);
    setHex(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
  };

  const copyToClipboard = async (text: string, type: "hex" | "rgb") => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <div className="mb-12 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4">
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
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Конвертер цветов
          </h1>
          <p className="mt-3 text-neutral-400">
            Мгновенный перевод HEX в RGB и обратно
          </p>
        </div>

        {/* Предпросмотр цвета */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-neutral-800">
          <div
            className="h-40 transition-colors duration-300"
            style={{ backgroundColor: hex }}
          />
        </div>

        {/* HEX Input */}
        <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <label className="mb-2 block text-sm font-medium text-neutral-400">
            HEX
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={hex}
              onChange={(e) => handleHexChange(e.target.value)}
              placeholder="#000000"
              className="flex-1 rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-white placeholder-neutral-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
            />
            <button
              onClick={() => copyToClipboard(hex, "hex")}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95"
            >
              {copied === "hex" ? (
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
        </div>

        {/* RGB Inputs */}
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
          <label className="mb-2 block text-sm font-medium text-neutral-400">
            RGB
          </label>
          <div className="grid grid-cols-3 gap-4">
            {(["r", "g", "b"] as const).map((channel) => (
              <div key={channel}>
                <label className="mb-1.5 block text-xs font-medium uppercase text-neutral-500">
                  {channel}
                </label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={rgb[channel]}
                  onChange={(e) => handleRgbChange(channel, e.target.value)}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 font-mono text-white placeholder-neutral-600 outline-none transition-colors focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20"
                />
              </div>
            ))}
          </div>
          <button
            onClick={() =>
              copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, "rgb")
            }
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-300 transition-all hover:border-neutral-600 hover:bg-neutral-700 hover:text-white active:scale-95"
          >
            {copied === "rgb" ? (
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
                Копировать RGB
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
