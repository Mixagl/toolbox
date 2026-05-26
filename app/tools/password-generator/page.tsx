import { Metadata } from "next";
import PasswordGenerator from "./PasswordGenerator";

export const metadata: Metadata = {
  title: "Генератор паролей",
  description: "Создай надёжный пароль любой длины.",
};

export default function Page() {
  return <PasswordGenerator />;
}
