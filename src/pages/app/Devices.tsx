import { Link } from "react-router";
import { useDevice } from "../../hooks/devices/useDevice";
import feederImage from '/assets/feeder.svg';
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const Devices = () => {

  // obteniendo el cliente
  const queryClient = useQueryClient();

  const { GetAllDevicesByUser } = useDevice();

  const queryData = GetAllDevicesByUser();

  // obteniendo los
  const { data, isError } = queryData;

  useEffect(() => {
    if(data?.data){
      data.data.forEach(device => {
        queryClient.setQueryData(["devices", device.id], device);
        // Esto adicionalmente hace el prefetch "oficial"
        queryClient.prefetchQuery({
          queryKey: ["devices", device.id],
          queryFn: () => Promise.resolve(device)
        });
      });
    }
  }, [data?.data, queryClient]);
  

  if (isError){
    return <h1>Algo salió mal...</h1>
  }

  if (queryData.isFetching){
    return <h1>Cargando...</h1>
  }


  return (
    <section className="grid grid-cols-auto">
    
    {
      data?.data.map(feeder => (
        <Link to={`/nido/dispositivos/${feeder.id}`} className="rounded-xl border-solid border-twine-200 border grid p-2" key={feeder.id}>
          <figure>
            <img src={feederImage} alt="imagen de casa de pajaro" />
            <figcaption>{feeder.id.substring(0, 8)} - {feeder.batteryLevel}%</figcaption>
          </figure>
          <footer>
            <p>Nivel de batería: {feeder.batteryLevel}%</p>
            <p className="flex items-center gap-2">
              Activo: <span className={`block size-2 rounded-full animate-ping ${feeder.isActive ? 'bg-lime-300' : 'bg-red-300' }`}> </span> 
            </p>
          </footer>
        </Link>
      ))
    }

    </section>
  )
};
