import { Metadata } from "next";
import ColorConverter from "./ColorConverter";

export const metadata: Metadata = {
  title: "Конвертер цветов",
  description:
    "Мгновенный перевод HEX в RGB и обратно. Выбери цвет и скопируй код.",
};

export default function Page() {
  return <ColorConverter />;
}
