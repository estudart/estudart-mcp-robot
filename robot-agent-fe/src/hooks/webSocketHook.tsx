import { useCallback, useEffect, useRef } from "react";

export type WebSocketOptions = {
    onMessage: CallableFunction | void;
    onOpen: CallableFunction | undefined;
    onClose: CallableFunction | undefined;
    reconnect: Boolean;
}

export function useWebSocket(url: string, options: WebSocketOptions) {
    const { onMessage, onOpen, onClose, reconnect = true } = options;
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimer = useRef<number | undefined>(undefined);
    const attemptRef = useRef(0);

    const connect = useCallback(() => {
        const socket = new WebSocket(url);
        wsRef.current = socket;

        socket.onopen = () => {
            attemptRef.current = 0;
            onOpen?.();
        }

        socket.onmessage = (event) => {
            onMessage?.(JSON.parse(event.data));
        };

        socket.onclose = (event) => {
            onClose?.(event);
            if (reconnect && event.code !== 1000) {
                scheduleReconnect();
            }
        };
    }, [url, onMessage, onOpen, onClose, reconnect]);

    const scheduleReconnect = useCallback(() => {
        const attempt = attemptRef.current;
        if (attempt >= 10) return;

        const baseDelay = Math.min(1000 * 2 ** attempt, 30000);
        const jitter = Math.random() * 1000;
        const delay = baseDelay + jitter;

        reconnectTimer.current = setTimeout(() => {
            attemptRef.current += 1;
            connect()
        }, delay);
    }, [connect]);

    useEffect(() => {
        connect();
        return () => {
            clearTimeout(reconnectTimer.current);
            wsRef.current?.close(1000, "hook cleanup");
        };
    }, [connect]);

    const send = useCallback((data: Record<any, any>) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify(data));
        }
    }, []);

    return { send, wsRef }
}
