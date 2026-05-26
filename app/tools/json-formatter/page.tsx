import { Metadata } from "next";
import JsonFormatter from "./JsonFormatter";

export const metadata: Metadata = {
  title: "Форматировщик JSON",
  description: "Преврати сжатый JSON в читаемый вид.",
};

export default function Page() {
  return <JsonFormatter />;
}
