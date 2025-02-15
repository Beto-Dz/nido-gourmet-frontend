import Particles from "../../components/reactbites/Particles/Particles"

export const LandingPage = () => {
  return (
    <header className="w-full min-h-dvh bg-[url(/assets/hojas.svg)] bg-cover">
       <Particles
          className="min-h-dvh left-0 right-0"
          particleColors={['#000000', '#000000']}
          particleCount={500}
          particleSpread={20}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
        <section className="absolute top-0 right-0 bottom-0 left-0">
          Hola amigos
        </section>
    </header>
  )
}
