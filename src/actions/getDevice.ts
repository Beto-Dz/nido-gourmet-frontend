import backendAPI from "../api/backendAPI"
import { Datum, DevicesByUser } from "../interfaces/";

export const getDevice = async() => {
  const { data } = await backendAPI.get<DevicesByUser>('/device/feeders');

  return data;
}


export const getDeviceByID = async (id: string) => {
  const { data } = await backendAPI.get<Datum>(`/device/feeder/${id}`);

  return data;
}