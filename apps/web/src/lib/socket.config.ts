import Env from "./env";

let socket: WebSocket | null = null;

export const getSocket = (roomId: string): WebSocket => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        if (socket) {
            socket.close();
        }

        // change this in production, use wss instead of ws
        socket = new WebSocket(`ws://localhost:7001/api?room=${roomId}`);

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            try {
                const messageData = JSON.parse(event.data);
                console.log('Received message:', messageData);
            } catch (error) {
                console.error('Failed to parse message:', error);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            socket = null; // Reset socket on close
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
    return socket;
};

// Function to send messages through the WebSocket connection
export const sendMessage = (message: Record<string, any>) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("The message is: ", message);
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open. Unable to send message.');
    }
};
