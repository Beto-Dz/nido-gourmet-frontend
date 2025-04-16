import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getDevice, getDeviceByID } from "../../actions/getDevice";
import { Datum } from "../../interfaces";

export const useDevice = () => {
  // obteniendo el cliente
  const queryClient = useQueryClient();

  const GetAllDevicesByUser = () => {
    return useQuery({
      queryKey: ["devices"],
      queryFn: getDevice,
      staleTime: 1000 * 60,
    });
  };

  const SetSingleDevice = (device: Datum) => {
    queryClient.setQueryData(["devices", device.id], device);
  };

  const GetSingleDevice = (id: string) => {
    return useQuery({
      queryKey: ['devices', id],
      queryFn: () => getDeviceByID(id),
      staleTime: 1000 * 60,
      enabled: !!id, // <- importante para evitar fetch con id vacío
    });
  };
  

  return {
    GetAllDevicesByUser,
    SetSingleDevice,
    GetSingleDevice
  };
};
