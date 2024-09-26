import { useEffect, useRef } from 'react';
import { Manager, type Socket } from 'socket.io-client';

import { config } from '@/config';

export interface SocketMessageResponse {
  message: {
    to: string;
    message: string;
    from: string;
    pauseByUser: false;
    chatId: string;
    type: 'MESSAGE' | 'PAUSE' | 'RESUME';
    origin: 'FRONTEND' | 'TWILIO';
  };
}

const useSocket = (): Socket | null => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const manager = new Manager(config.socket.url, {
      extraHeaders: {
        authentication: String(localStorage.getItem('accessToken')),
      },
    });

    socket.current = manager.socket('/');

    socket.current.removeAllListeners();
    socket.current.on('connect', () => {
      console.log('Socket connected');
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return socket.current;
};

export default useSocket;
