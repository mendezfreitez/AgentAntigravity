import React, { createContext, useState, useContext } from 'react';

export const ChatContext = createContext();

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [conversations, setConversations] = useState([
        {
            id: 1,
            name: 'Jane Doe',
            email: 'jane@company.com',
            avatar: 'JD',
            status: 'online',
            lastMessage: '¿Podemos revisar los diseños mañana?',
            time: '10:30 AM',
            unread: 2,
            messages: [
                { id: 1, sender: 'them', text: 'Hola, ¿cómo va el proyecto?', hora: '10:00', fecha: '01-02-2026' },
                { id: 2, sender: 'me', text: 'Todo bien, avanzando según lo planeado.', hora: '10:15', fecha: '01-02-2026' },
                { id: 3, sender: 'them', text: 'Genial. ¿Podemos revisar los diseños mañana?', hora: '10:30', fecha: '01-02-2026' },
            ]
        },
        {
            id: 2,
            name: 'John Smith',
            email: 'john@company.com',
            avatar: 'JS',
            status: 'offline',
            lastMessage: 'Archivo adjunto: Reporte Q3.pdf',
            time: 'Ayer',
            unread: 0,
            messages: [
                { id: 1, sender: 'me', text: 'John, ¿tienes el reporte?', hora: '14:00', fecha: '31-01-2026' },
                { id: 2, sender: 'them', text: 'Sí, aquí tienes.', hora: '14:30', fecha: '31-01-2026' },
                { id: 3, sender: 'them', text: 'Archivo adjunto: Reporte Q3.pdf', hora: '14:30', fecha: '31-01-2026' },
            ]
        },
        {
            id: 3,
            name: 'Sarah Wilson',
            email: 'sarah@company.com',
            avatar: 'SW',
            status: 'online',
            lastMessage: 'Gracias por la ayuda!',
            time: 'Lun',
            unread: 0,
            messages: [
                { id: 1, sender: 'them', text: 'Necesito ayuda con la campaña.', hora: '09:00', fecha: '27-01-2026' },
                { id: 2, sender: 'me', text: 'Claro, dime qué necesitas.', hora: '09:10', fecha: '27-01-2026' },
                { id: 3, sender: 'them', text: 'Gracias por la ayuda!', hora: '11:00', fecha: '27-01-2026' },
            ]
        },
    ]);

    const addConversation = (newConv) => {
        setConversations(prev => {
            if (prev.some(c => c.name === newConv.name)) return prev;
            return [newConv, ...prev];
        });
    };

    const addMessage = (conversationId, message) => {
        setConversations(prev => prev.map(chat => {
            if (chat.id === conversationId) {
                return {
                    ...chat,
                    lastMessage: message.text,
                    time: message.hora, // Usar hora para mostrar en la lista
                    messages: [...chat.messages, message]
                };
            }
            return chat;
        }));
    };

    return (
        <ChatContext.Provider value={{ conversations, addConversation, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
};
