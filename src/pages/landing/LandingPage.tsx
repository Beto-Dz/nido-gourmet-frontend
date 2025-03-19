import Particles from "../../components/reactbites/Particles/Particles"

export const LandingPage = () => {
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
        <section className="absolute top-0 right-0 bottom-0 left-0 backdrop-opacity-10">
          Hola amigos
        </section>
    </header>
  )
}
