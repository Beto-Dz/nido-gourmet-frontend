import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface DialogVisitsProps {
  floodgateNumber: number;
  visits: Date[];
}

const DialogVisits: FC<DialogVisitsProps> = ({ visits, floodgateNumber }) => {
  // Ordenar de más reciente a más antigua
  const sortedVisits = [...visits].sort((a, b) => b.getTime() - a.getTime());

  // Formateadores para fecha y hora estilo "19 de mayo de 2025 a las 3:00am"
  const formatVisit = (date: Date) => {
    const dateFormatter = new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const timeFormatter = new Intl.DateTimeFormat("es-ES", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const dateStr = dateFormatter.format(date);
    const timeStr = timeFormatter.format(date).replace("a. m.", "am").replace("p. m.", "pm");

    return `${dateStr} a las ${timeStr}`;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-twine-300 border border-twine-400 dark:bg-dark-light text-xs p-1">
          Ver visitas
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            Visitas del Comedero en la compuerta #{floodgateNumber}
          </DialogTitle>
          <DialogDescription>
            <span className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {sortedVisits.map((visit, index) => (
                <span
                  key={index}
                  className="p-2 border border-twine-400 rounded-lg text-sm"
                >
                  {formatVisit(visit)}
                </span>
              ))}
            </span>
            <span className="block text-sm text-gray-500 mt-2 text-center">
              Total de visitas: {visits.length}
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DialogVisits;
