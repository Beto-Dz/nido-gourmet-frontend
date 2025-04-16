import { FC } from "react";

interface props {
    info: string;
}

export const Rectangle:FC<props> = ({ info }) => {
  return (
    <div>{info}</div>
  )
}
