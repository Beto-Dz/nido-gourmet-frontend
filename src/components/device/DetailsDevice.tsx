import React, { FC, useMemo } from "react";
import { useForm } from "../../hooks";

interface props {
  feederId: string;
  floodgate: number;
  keyDay: string;
  startTime: string;
  endTime: string;
  handleOnSend: (arg: string) => void,
}

export const DetailsDevice: FC<props> = ({ feederId, floodgate, keyDay, startTime, endTime, handleOnSend }) => {


  const initialForm = useMemo(() => ({ startTime, endTime }), []);

  const { startTime: startTimeHook, endTime: endTimeHook, handleOnInputChange } = useForm(initialForm);


  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevenir recarga
      e.preventDefault();

      // validacion de que la hora a iniciar no sea mayor a la final (ej: inicio 4am | fin: 3am. no pasa).
      if(startTimeHook < endTime){
        handleOnSend(JSON.stringify({type: "update_floodgate", feederId, floodgate, day: keyDay, startTime: startTimeHook, endTime: endTimeHook}));
      }
  }

  const daysWeek = {
    monday: "lunes",
    tuesday: "martes",
    wednesday: "miércoles",
    thursday: "jueves",
    friday: "viernes",
    saturday: "sábado",
    sunday: "domingo",
  }
    

  return (
    <details
      className="rounded-2xl p-2 bg-twine-100 border border-twine-500 dark:bg-dark dark:border-twine-100 font-semibold"
    >
      <summary className="capitalize text-center" lang="en">
        {daysWeek[keyDay]}
      </summary>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="startTime">Hora de inicio</label>
          <input
            className="p-1 rounded-md border border-twine-300 cursor-pointer"
            type="time"
            name="startTime"
            id="startTime"
            value={startTimeHook}
            onChange={handleOnInputChange}
          />
        </div>

        <div className="flex flex-col gap-1 items-center">
          <label htmlFor="endTime">Hora fin</label>
          <input
            className="p-1 rounded-md border border-twine-300 cursor-pointer"
            type="time"
            name="endTime"
            id="endTime"
            value={endTimeHook}
            min={startTimeHook}
            onChange={handleOnInputChange}
          />
        </div>

        <button type="submit" className="bg-sky-300 dark:bg-dark-light border border-white text-xs p-1 flex gap-2 mx-auto mt-1">Aceptar</button>
      </form>
    </details>
  );
};
