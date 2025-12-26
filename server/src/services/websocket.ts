import { WebSocketServer, WebSocket } from 'ws';

export const broadcastRealTimeData = (wss: WebSocketServer, data: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'REALTIME_DATA',
        data
      }));
    }
  });
};

export const broadcastAlert = (wss: WebSocketServer, alert: any) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'ALERT',
        data: alert
      }));
    }
  });
};
