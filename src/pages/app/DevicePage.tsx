import { useNavigate, useParams } from "react-router";
import { useDevice } from "../../hooks/devices/useDevice";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
// import { useDevice } from "../../hooks/devices/useDevice";
// import feederImage from '/assets/feeder.svg';

export const DevicePage = () => {
  // const { queryData } = useDevice();

  const { feeder_id } = useParams<{ feeder_id: string }>();
  
  // peticion para obtener el dispositivo
  const { GetSingleDevice } = useDevice();
  
  const { data, isFetching, isLoading, isError } = GetSingleDevice(feeder_id!);
  
  const navigate = useNavigate();
  
  //funcion de ayuda para volver a la ruta anterior de donde estamos actualmente
  const handleBackNavigate = () => {
    navigate(-1);
  };

  if (isError) {
    return <h1>Algo salió mal...</h1>;
  }

  return (
    <section className="flex flex-col">
      <button onClick={handleBackNavigate} className="p-1 px-2 btn bg-twine-600 text-white rounded-lg flex gap-2 items-center dark:bg-dark dark:text-twine-50" >
        <ArrowUturnLeftIcon className="size-5"/>
        Regresar
      </button>

    <footer>
      {
        isFetching || isLoading
        ? <h1>Cargando...</h1>
        : <code>{JSON.stringify(data, null, 2)}</code>
      }
    </footer>
      
      
    </section>
  );
};
