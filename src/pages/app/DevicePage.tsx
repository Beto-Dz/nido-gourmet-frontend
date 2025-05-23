import { useNavigate, useParams } from "react-router";
import { useDevice } from "../../hooks/devices/useDevice";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useWebSock } from "../../hooks";
import { Datum } from "../../interfaces";
import { DetailsDevice } from "../../components";
import DialogVisits from "@/components/device/DialogVisits";

export const DevicePage = () => {

  // obtener los datos del custom hook
  const { lastMessage, sendMessage  } = useWebSock();
  
  // obteniendo el id del dispositivo al que vamos a obtener su información
  const { feeder_id } = useParams<{ feeder_id: string }>();
  
  // peticion para obtener el dispositivo con useQuery
  const { GetSingleDevice } = useDevice();
  const { data: deviceQuery, isError, isLoading, isFetching } = GetSingleDevice(feeder_id!);

  // Estado inicial con datos de la query si existen
  const [device, setDevice] = useState<Datum | null>( deviceQuery ? deviceQuery : null );

  // funcion para definir el estado
  const defineDevice = () => {
    // Solo actualizar si tenemos datos nuevos del socket
    if (lastMessage) {
      try {
        // Parsear el mensaje del socket
        const data = JSON.parse(String(lastMessage.data));

        // Si el mensaje no es de abrir o cerrar compuertas, actualizar el estado
        if (data && data.type === 'update_status' &&  data.type !== "open_servos" && data.type !== "close_servos" && data.type !== "open_servo" && data.type !== "close_servo") {
          setDevice(data);
          console.log("Datos actualizados desde socket:", data);
        }
      } catch (error) {
        console.error("Error al parsear lastMessage", error);
      }
    }

    // Solo establecer datos iniciales de la query si no tenemos datos del socket
    // y si tenemos datos de la query
    if (deviceQuery && !device) {
      setDevice(deviceQuery);
      console.log("Datos establecidos desde query cacheada:", deviceQuery);
    }
  }

  // Efecto para manejar actualizaciones del socket y la query
  useEffect(defineDevice, [deviceQuery, lastMessage]);


  const navigate = useNavigate();
  
  //funcion de ayuda para volver a la ruta anterior de donde estamos actualmente
  const handleBackNavigate = () => {
    navigate(-1);
  };


  // funcion de ayuda para enviar una accion al websocket
  const handleSendMessage = (type: string, servo_number: number) => {
      const message = {type, servo_number}
      sendMessage(JSON.stringify(message));
  }


  if (isError) {
    return <h1>Algo salió mal...</h1>;
  }
  
    // Mostrar loading solo si no tenemos NINGÚN dato (ni cache ni socket)
  // y la query está cargando
  if ((isLoading || isFetching) || !device) {
    return <h1>cargando...</h1>;
  }

  const days = Object.entries(device.floodgates["1"])
  .filter(([key]) => key !== '_id' && key !== 'visits' && key !== 'foodLevel')
  .map(([key, value]) => ({ key, ...value }));
  
  const days2 = Object.entries(device.floodgates["2"])
  .filter(([key]) => key !== '_id' && key !== 'visits' && key !== 'foodLevel')
  .map(([key, value]) => ({ key, ...value }));
  
  return (
    <section className="flex flex-col">

      <button onClick={handleBackNavigate} className="p-1 px-2 btn bg-twine-600 text-white rounded-lg flex gap-2 items-center dark:bg-dark dark:text-twine-50" >
        <ArrowUturnLeftIcon className="size-5"/>
        Regresar
      </button>

      {/*  */}
      <section className="flex flex-col gap-3">
        <h1 className="text-center font-bold text-lg">{`Comedero: #${device?.id || device._id}`}</h1>
        <section className="grid grid-cols-2 gap-2 *:p-2 *:flex *:flex-col *:justify-center *:items-center font-semibold">
          <div className="rounded-2xl bg-twine-100 border border-twine-500 dark:bg-dark-light dark:border-twine-100">
            <label htmlFor="battery">Nivel de batería: {device?.batteryLevel}%</label>
            <meter id="battery" min={0} max={100} low={20} high={80} optimum={100} value={device?.batteryLevel}>{device?.batteryLevel}%</meter>
          </div>
          <div className="rounded-2xl bg-twine-100 border border-twine-500 dark:bg-dark-light dark:border-twine-100">
            <p className="flex items-center gap-2">
              Activo: <span className={`block size-2 rounded-full animate-ping ${device?.isActive ? 'bg-lime-300' : 'bg-red-300' }`}> </span> 
            </p>
          </div>
        </section>

        {/*  */}
        <section className="*:bg-twine-400 *:border *:border-twine-800 *:dark:bg-dark-light *:text-xs *:p-1 flex gap-2">
          <button onClick={() => handleSendMessage("open_servos", 0)}>Abrir compuertas</button>
          <button onClick={() => handleSendMessage("close_servos", 0)}>Cerrar compuertas</button>
        </section>

        <section className="bg-twine-200 dark:bg-dark-light p-1 rounded-2xl">
          <h2 className="font-bold text-lg flex items-center justify-center">Compuerta #1</h2>
          <div className="flex items-center justify-center">
            <DialogVisits visits={device.floodgates["1"].visits.map(visit => new Date(visit))} floodgateNumber={1} />
          </div>
          <div className="flex items-center gap-2 w-fit mx-auto py-4">
            <h3>Acciones:</h3>
            <section  className="*:bg-twine-300 *:border *:border-twine-400 *:dark:bg-dark-light *:text-xs *:p-1 flex gap-2">
              <button onClick={() => handleSendMessage("open_servo", 1)}>Abrir</button>
              <button onClick={() => handleSendMessage("close_servo", 1)}>Cerrar</button>
            </section>
          </div>
          <div className="flex flex-col items-center gap-2 w-fit mx-auto py-4">
            <h3>Nivel de alimento: {device.floodgates["1"].foodLevel}%</h3>
            <meter id="battery" min={0} max={100} low={20} high={80} optimum={100} value={device.floodgates["1"].foodLevel}>{device.floodgates["1"].foodLevel}%</meter>
          </div>
          <h3>Horarios de disponibilidad de alimentos.</h3>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {
                days.map(day => (
                  <DetailsDevice key={day.key} keyDay={day.key} feederId={device.id} floodgate={1} startTime={day.startTime} endTime={day.endTime} handleOnSend={sendMessage} />
                ))       
              }
          </section>
        </section>

        <section className="bg-twine-200 dark:bg-dark-light p-1 rounded-2xl">
          <h2 className="font-bold text-lg flex items-center justify-center">Compuerta #2</h2>
          <div className="flex items-center justify-center">
            <DialogVisits visits={device.floodgates["2"].visits.map(visit => new Date(visit))} floodgateNumber={2} />
          </div>
          <div className="flex items-center gap-2 w-fit mx-auto py-4">
            <h3>Acciones:</h3>
            <section  className="*:bg-twine-300 *:border *:border-twine-400 *:dark:bg-dark-light *:text-xs *:p-1 flex gap-2">
              <button onClick={() => handleSendMessage("open_servo", 2)}>Abrir</button>
              <button onClick={() => handleSendMessage("close_servo", 2)}>Cerrar</button>
            </section>
          </div>
          <div className="flex flex-col items-center gap-2 w-fit mx-auto py-4">
            <h3>Nivel de alimento: {device.floodgates["2"].foodLevel}%</h3>
            <meter id="battery" min={0} max={100} low={20} high={80} optimum={100} value={device.floodgates["2"].foodLevel}>{device.floodgates["2"].foodLevel}%</meter>
          </div>
          <h3>Horarios de disponibilidad de alimentos.</h3>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {
                days2.map(day => (
                  <DetailsDevice key={day.key} keyDay={day.key} feederId={device.id} floodgate={2} startTime={day.startTime} endTime={day.endTime} handleOnSend={sendMessage} />
                ))       
              }
          </section>
        </section>

      </section>
    </section>
  );
};
