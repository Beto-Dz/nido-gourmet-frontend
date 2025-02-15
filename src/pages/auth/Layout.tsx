import { FC, ReactNode } from "react";
import { MarkLogo } from "../../components";
import { Link } from "react-router";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <header className="min-h-dvh w-full grid place-content-center bg-[url(/assets/hojas.svg)] bg-cover backdrop-blur-2xl">
      <Link to="/" className="fixed top-2 left-2 px-2 rounded-lg bg-white drop-shadow-sm">
        <MarkLogo />
      </Link>
      <section className="w-fit h-fit m-auto px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] bg-stone-50 rounded-lg drop-shadow-xl">
        {children}
      </section>
    </header>
  );
};
