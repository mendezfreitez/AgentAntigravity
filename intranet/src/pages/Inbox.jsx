import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { ThemeContext } from '../context/ThemeContext';
import clsx from 'clsx';

const Inbox = () => {
    const location = useLocation();
    const [selectedChat, setSelectedChat] = useState(1);
    const [newMessage, setNewMessage] = useState('');
    const { conversations, addMessage } = useChat();
    const { theme } = useContext(ThemeContext);

    // Removed local conversations state and useEffect for location.state
    // because data is now persisted in ChatContext

    const currentChat = conversations.find(c => c.id === selectedChat);

    if (!currentChat && conversations.length > 0) {
        // Fallback if selected chat doesn't exist (e.g. initial load logic could be better)
        // For now, if current selection is invalid, we might want to select the first one or handle it.
        // But typically useEffect below handles setting selection from navigation.
    }

    // Set selected chat if navigating from directory
    useEffect(() => {
        if (location.state?.selectedChatId) {
            setSelectedChat(location.state.selectedChatId);
        }
    }, [location.state]);

    if (!currentChat) return <div className={`p-8 text-center ${theme.textSubmain}`}>Cargando...</div>;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const currentChatData = conversations.find(c => c.id === selectedChat);
        const lastMessageId = currentChatData?.messages.length > 0
            ? Math.max(...currentChatData.messages.map(m => m.id))
            : 0;

        // Obtener fecha y hora actuales
        const now = new Date();
        const hora = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        const fecha = now.getDate().toString().padStart(2, '0') + '-' +
            (now.getMonth() + 1).toString().padStart(2, '0') + '-' +
            now.getFullYear();

        const messageObject = {
            id: lastMessageId + 1,
            sender: 'me',
            text: newMessage,
            hora: hora,
            fecha: fecha,
            conversation_id: selectedChat
        };

        // Update context state immediately
        addMessage(selectedChat, messageObject);

        try {
            await axios.post('http://localhost:3001/mensaje_directo', messageObject);
            console.log('Direct message sent successfully');
        } catch (error) {
            console.error('Error sending direct message:', error);
        }

        setNewMessage('');
    };

    return (
        <div className="h-[calc(100vh-8rem)] rounded-xl shadow-sm overflow-hidden flex transition-colors duration-200 border border-text-primary/10">
            {/* Sidebar List */}
            <div className={`w-80 border-r flex flex-col bg-primary border-text-primary/10`}>
                <div className={`p-4 border-b bg-primary border-text-primary/10`}>
                    <h2 className={`text-xl font-bold mb-4 text-text-primary`}>Bandeja de Entrada</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                        <input
                            type="text"
                            placeholder="Buscar mensajes..."
                            className={`w-full pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:ring-0 transition-colors bg-tertiary border border-text-primary/10 text-text-tertiary`}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat.id)}
                            className={clsx(
                                `p-4 border-b border-text-primary/10 cursor-pointer transition-colors  hover:bg-tertiary/50`,
                                selectedChat === chat.id && "bg-tertiary border-l-4 border-l-primary-green"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold relative border ${theme.main} ${theme.textSubmain} ${theme.border}`}>
                                        {chat.avatar}
                                        {chat.status === 'online' && (
                                            <span className={`absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 rounded-full ${theme.subMain}`}></span>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <h4 className={clsx("text-sm font-bold text-text-primary")}>
                                            {chat.name}
                                        </h4>
                                        <p className={`text-xs opacity-80 text-text-primary`}>{chat.email}</p>
                                    </div>
                                </div>
                                <span className={`text-xs text-text-secondary`}>{chat.time}</span>
                            </div>
                            <div className="flex justify-between items-center mt-2 pl-12">
                                <p className={clsx("text-sm truncate w-48", chat.unread > 0 ? `font-bold text-text-primary` : 'text-text-tertiary')}>
                                    {chat.lastMessage}
                                </p>
                                {chat.unread > 0 && (
                                    <span className="w-5 h-5 bg-primary-green text-white text-xs font-bold flex items-center justify-center rounded-full">
                                        {chat.unread}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col bg-secondary`}>
                {/* Chat Header */}
                <div className="p-4 border-b border-text-primary/10 flex justify-between items-center bg-primary">
                    <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold mr-3 ${theme.main} ${theme.textSubmain} ${theme.border}`}>
                            {currentChat.avatar}
                        </div>
                        <div>
                            <h3 className={`font-bold text-text-primary`}>{currentChat.name}</h3>
                            <p className={`text-xs text-text-tertiary`}>{currentChat.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className={`p-2 rounded-full transition-colors hover:bg-button-primary/50`}>
                            <Phone className="w-5 h-5 text-text-tertiary" />
                        </button>
                        <button className={`p-2 rounded-full transition-colors hover:bg-button-primary/50`}>
                            <Video className="w-5 h-5 text-text-tertiary" />
                        </button>
                        <button className={`p-2 rounded-full transition-colors hover:bg-button-primary/50`}>
                            <MoreVertical className="w-5 h-5 text-text-tertiary" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {currentChat.messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={clsx(
                                "flex flex-col max-w-[70%]",
                                msg.sender === 'me' ? "ml-auto items-end" : "items-start"
                            )}
                        >
                            <div
                                className={clsx(
                                    "p-3 rounded-2xl text-sm shadow-sm border border-text-primary/10 bg-tertiary text-text-tertiary",
                                    msg.sender === 'me'
                                        ? "rounded-br-none"
                                        : "rounded-bl-none"
                                )}
                            >
                                {msg.text}
                            </div>
                            <span className={`text-[9px] mt-1 text-text-tertiary`}>
                                {msg.fecha} \ {msg.hora}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-text-primary/10 bg-primary">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <button type="button" className={`p-2 rounded-full cursor-pointer transition-colors ${theme.hover} ${theme.textSubmain}`}>
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            placeholder="Escribe un mensaje..."
                            className="flex-1 px-4 py-2 border border-text-primary/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-green/50 transition-colors bg-tertiary text-text-tertiary"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={clsx(
                                "p-2 rounded-full transition-colors",
                                newMessage.trim()
                                    ? "bg-button-primary text-text-primary hover:bg-button-primary/60 shadow-sm"
                                    : `cursor-not-allowed border ${theme.main} ${theme.textSubmain} ${theme.border}`
                            )}
                            disabled={!newMessage.trim()}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
