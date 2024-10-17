import Env from "./env";

let socket: WebSocket;

export const getSocket = (roomId: string): WebSocket => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket(`${Env.BACKEND_URL}?room=${roomId}`);

        // Event listener for when the socket opens
        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            console.log('Received message:', messageData);
        };

        // Event listener for when the socket closes
        socket.onclose = () => {
            console.log('WebSocket connection closed');
        };

        // Event listener for errors
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
    return socket;
};

// Function to send messages through the WebSocket connection
export const sendMessage = (message: any) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("The message is : ", message);
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open. Unable to send message.');
    }
};
