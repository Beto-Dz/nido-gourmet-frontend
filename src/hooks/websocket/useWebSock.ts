import { useEffect } from "react";
import useWebSocket from "react-use-websocket";

const token = window.localStorage.getItem("x-token");

export const useWebSock = (): { sendMessage: (message: string) => void; lastMessage: MessageEvent<string> | null;} => {
  const { sendMessage, lastMessage } = useWebSocket("ws://localhost:3000", {
    onOpen: () => console.log("Conectado al servidor WebSocket"),
  });

  useEffect(() => {
    sendMessage(JSON.stringify({ type: "user_connect", token }));
  }, []);

  return {
    sendMessage,
    lastMessage,
  };
};
