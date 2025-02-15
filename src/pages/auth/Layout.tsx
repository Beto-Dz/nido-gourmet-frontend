import { FC, ReactNode } from "react";
import { MarkLogo } from "../../components";
import { Link } from "react-router";
import Particles from "../../components/reactbites/Particles/Particles";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <header className="min-h-dvh w-full relative bg-[url(/assets/hojas.svg)] bg-cover backdrop-blur-2xl">
      <Particles
          className="min-h-dvh"
          particleColors={['#000000', '#000000']}
          particleCount={500}
          particleSpread={20}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      <Link to="/" className="fixed top-2 left-2 px-2 w-fit rounded-lg bg-white drop-shadow-sm">
        <MarkLogo />
      </Link>
      <section className="w-fit h-fit absolute top-0 left-0 right-0 bottom-0 m-auto px-4 py-2 min-w-80 sm:min-w-96 md:w-[400px] bg-stone-50 rounded-lg drop-shadow-xl">
        {children}
      </section>
    </header>
  );
};
