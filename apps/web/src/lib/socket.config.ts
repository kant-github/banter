let socket: WebSocket | null = null;

interface TypingEvent {
    type: string;
    userId: string;
}

const handleTypingEvents = (event: MessageEvent) => {
    try {
        const typingData: TypingEvent = JSON.parse(event.data);
    } catch (error) {
        console.error('Failed to parse typing event:', error);
    }
};

export const getSocket = (roomId: string, userId: number): WebSocket => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        if (socket) {
            socket.close();
        }
        socket = new WebSocket(`ws://localhost:7001/api?userId=${userId}&room=${roomId}`);

        socket.onopen = () => {
            console.log('WebSocket connection opened');
        };

        socket.onmessage = (event) => {
            const messageData = JSON.parse(event.data);
            // Check if the message is a typing event
            if (messageData.type === 'typing-start' || messageData.type === 'typing-stop') {
                handleTypingEvents(event);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            socket = null;
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }
    return socket;
};


export const sendMessage = (message: Record<string, any>) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket is not open. Unable to send message.');
    }
};

export const sendTypingEvent = (userId: string, type: 'typing-start' | 'typing-stop') => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const typingData = { type, userId };
        socket.send(JSON.stringify(typingData));
    } else {
        console.error('WebSocket is not open. Unable to send typing event.');
    }
};

export const sendLikeEvent = (messageId: string, userId: Number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const likeData = {
            type: "like-event",
            messageId,
            userId
        }
        socket.send(JSON.stringify(likeData));
    }
    else {
        console.error('WebSocket is not open. Unable to send like event.');
    }
}

export const sendUnlikeEvent = (messageId: string, userId: number) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const unlikeData = {
            type: "unlike-event",
            messageId,
            userId,
        };
        socket.send(JSON.stringify(unlikeData));
    } else {
        console.error('WebSocket is not open. Unable to send unlike event.');
    }
};
