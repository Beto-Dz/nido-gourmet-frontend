import { Link } from "react-router";
import Particles from "../../components/reactbites/Particles/Particles"
import { useAuthSlice } from "../../hooks"

export const LandingPage = () => {

  const { status } = useAuthSlice();

  return (
    <header className="w-full min-h-dvh bg-[url(/assets/hojas.svg)] bg-cover">
       <Particles
          className="min-h-dvh left-0 right-0 backdrop-blur-[1.2px]"
          particleColors={['#000000', '#000000']}
          particleCount={600}
          particleSpread={25}
          speed={0.05}
          particleBaseSize={120}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
        <section className="absolute top-0 right-0 bottom-0 left-0 backdrop-opacity-10 grid place-items-center">
          <Link to={status === "authenticated" ? "/nido/dispositivos" : "/auth"}
                className="bg-red-400 p-1 px-2 rounded-2xl font-semibold text-white">
            { status === "authenticated" ? "Ingresar" : "Iniciar sesión" }
          </Link>
        </section>
    </header>
  )
}
