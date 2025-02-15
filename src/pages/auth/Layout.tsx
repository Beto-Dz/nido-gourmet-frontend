import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <header className="min-h-dvh w-full grid grid-rows-2 relative">
      <section className="bg-[url(/assets/fondo_hojas.jpg)] bg-cover"></section>
      <section></section>
      <section className="absolute top-0 left-0 bottom-0 right-0 w-fit h-fit m-auto px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] rounded-lg bg-white drop-shadow-2xl">
        {children}
      </section>
    </header>
  );
};
