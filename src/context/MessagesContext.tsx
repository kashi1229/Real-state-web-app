import { createContext, useContext, useCallback, useMemo, type ReactNode } from 'react';
import type { Message } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../lib/utils';

interface MessagesContextValue {
  messages: Message[];
  unreadCount: number;
  addMessage: (data: Omit<Message, 'id' | 'read' | 'createdAt'>) => void;
  toggleRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const MessagesContext = createContext<MessagesContextValue | undefined>(undefined);

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useLocalStorage<Message[]>('hr-messages', []);

  const addMessage = useCallback(
    (data: Omit<Message, 'id' | 'read' | 'createdAt'>) => {
      const newMessage: Message = {
        ...data,
        id: `msg-${generateId()}`,
        read: false,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [newMessage, ...prev]);
    },
    [setMessages],
  );

  const toggleRead = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m)),
      );
    },
    [setMessages],
  );

  const deleteMessage = useCallback(
    (id: string) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    },
    [setMessages],
  );

  const value = useMemo(() => {
    const unreadCount = messages.filter((m) => !m.read).length;
    return { messages, unreadCount, addMessage, toggleRead, deleteMessage };
  }, [messages, addMessage, toggleRead, deleteMessage]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages(): MessagesContextValue {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within MessagesProvider');
  }
  return context;
}
