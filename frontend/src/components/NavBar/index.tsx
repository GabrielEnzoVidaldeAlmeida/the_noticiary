import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-black flex justify-between items-center p-4 sm:p-6 md:p-8">
      <Link href="/">
        <h1 className="text-slate-100 text-xl font-extrabold sm:text-2xl md:text-3xl hover:brightness-75 transition">
          The Noticiary
        </h1>
      </Link>

      <Link
        href="#"
        className="text-slate-100 font-extrabold flex items-center gap-1 hover:brightness-75 transition"
      >
        <PlusIcon className="stroke-3 w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
        <span className="text-sm sm:text-base md:text-xl">
          Adicionar notícia
        </span>
      </Link>
    </nav>
  );
}
