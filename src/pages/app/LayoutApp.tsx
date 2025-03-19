import { Bars2Icon, Cog6ToothIcon, CubeIcon, HomeIcon, UserIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import { FC, ReactNode, useEffect, useState } from "react"
import { NavLink } from "react-router";
import { SwitchDarkMode } from "../../components";

interface Props {
    children: ReactNode;
}

export const LayoutApp:FC<Props> = ({ children }) => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [showUserConfig, setShowUserConfig] = useState<boolean>(false);

  const handleHidden = ():void => {
    if(window.innerWidth <= 640 && showSidebar) setShowSidebar(false);
  }

  const handleHiddenUserConfig = ():void => {
    if(window.innerWidth <= 640 || showUserConfig) setShowUserConfig(!showUserConfig);
  }

  useEffect(() => {
    if(window.innerWidth >= 768 && !showSidebar) return  setShowSidebar(true);
    if(window.innerWidth < 768 && showSidebar) return setShowSidebar(false);
    // TODO: debuggear la ejecucion del efecto
  },[]);

  return (
    <section className="w-full min-h-dvh p-1 py-2 md:p-2 grid grid-rows-auto-fr gap-2 bg-twine-50 text-twine-900 dark:bg-dark-light dark:text-twine-50">

        <header className="px-2 flex justify-between items-center">
          <button className="p-1 px-2 rounded-md btn hover:text-twine-50 hover:bg-twine-600 dark:hover:bg-dark" onClick={() => setShowSidebar(!showSidebar)} >
            <Bars2Icon className="size-5" />
          </button>
            <figure className="flex items-center gap-3">
              <img src="/assets/bird.svg" alt="imagen de ave, icono de la marca nido gourmet" className="size-8" />
              <figcaption className="font-bold text-xl font-buzz dark:text-twine-50">Nido Gourmet</figcaption>
            </figure>
          <div className="flex items-center gap-2">
            <SwitchDarkMode />
            <button className="p-1 px-2 rounded-md font-semibold relative group/user z-50 hover:bg-twine-600 dark:hover:text-inherit dark:hover:bg-dark" onClick={handleHiddenUserConfig}>
                <UserIcon className="size-5 group-hover/user:text-twine-50" />
                <ul className={`flex flex-col p-2 rounded-md absolute right-0 top-full transition-all invisible group-hover/user:visible bg-twine-600 dark:bg-dark ${showUserConfig && 'visible'}`}>
                  <li onClick={handleHiddenUserConfig}>
                    <NavLink to="/nido/perfil" 
                      className={({ isActive }) => 
                        (`p-1 px-2 rounded-md btn flex items-center gap-2 transition-all hover:bg-twine-400 dark:hover:bg-dark-light ${isActive && 'text-twine-50 dark:text-twine-300'}`) } >
                      <Cog6ToothIcon className="size-5" /> <span className="text-nowrap">Mi perfil</span>
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2 p-1 px-2 rounded-md btn transition-all hover:bg-twine-400 dark:hover:bg-dark-light" onClick={handleHiddenUserConfig}>
                      <ArrowRightStartOnRectangleIcon className="size-5" /> <span className="text-nowrap">Cerrar sesión</span>
                  </li>
                </ul>
            </button>          
          </div>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-2 *:rounded-lg relative">
            <aside className={`p-2 transition-all w-fit h-fit md:h-full md:px-4 absolute md:static bg-twine-600 dark:bg-dark ${!showSidebar && ' -left-full'}`}>
                <ul className="flex flex-col gap-2 font-semibold">
                  <li onClick={handleHidden}>
                    <NavLink to="/nido" end
                      className={({ isActive }) => 
                        (`p-1 px-2 rounded-md btn flex items-center gap-2 transition-all hover:bg-twine-400 dark:hover:bg-dark-light ${isActive && 'text-twine-50 dark:text-twine-300'}`) } >
                      <HomeIcon className="size-5" /> <span className={`${!showSidebar && 'hidden'}`}>Inicio</span>
                    </NavLink>
                  </li>
                  <li onClick={handleHidden}>
                    <NavLink to="/nido/dispositivos"
                      className={({ isActive }) => 
                        (`p-1 px-2 rounded-md btn flex items-center gap-2 transition-all hover:bg-twine-400 dark:hover:bg-dark-light ${isActive && 'text-twine-50 dark:text-twine-300'}`) } >
                      <CubeIcon className="size-5" /> <span className={`${!showSidebar && 'hidden'}`}>Dispositivo(s)</span>
                    </NavLink>
                  </li>
                </ul>
            </aside>
            <main className="p-2 ring ring-twine-300 dark:ring-gray-500">
                {children}
            </main>
        </section>

    </section>
  )
}
