import { Metadata } from "next";
import CharCounter from "./CharCounter";

export const metadata: Metadata = {
  title: "Счётчик символов",
  description: "Узнай длину текста, количество слов и предложений",
};

export default function Page() {
  return <CharCounter />;
}
