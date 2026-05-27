import { Metadata } from "next";
import UnitConverter from "./UnitConverter";

export const metadata: Metadata = {
  title: "Конвертер единиц",
  description: "Мгновенный перевод между px, rem, em и pt",
};

export default function Page() {
  return <UnitConverter />;
}
