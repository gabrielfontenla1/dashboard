import * as React from 'react';

import { chatClient, type ChatsDataResponse } from '@/lib/chat/client';
import { dayjs } from '@/lib/dayjs';
import useSocket, { type SocketMessageResponse } from '@/hooks/use-socket';
import { ChatProvider } from '@/components/dashboard/chat/chat-context';
import { ChatView } from '@/components/dashboard/chat/chat-view';
import type { Contact, Message, Thread } from '@/components/dashboard/chat/types';

interface LayoutProps {
  children: React.ReactNode;
}
export function Layout({ children }: LayoutProps): React.JSX.Element {
  const [chatsResponse, setChatsResponse] = React.useState<ChatsDataResponse[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const [contacts, setContacts] = React.useState<Contact[]>([]);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [threads, setThreads] = React.useState<Thread[]>([]);

  const socket = useSocket();

  React.useEffect(() => {
    if (!socket) return;

    socket.on('message-from-server', ({ message }: SocketMessageResponse) => {
      const formatMessage = (): Message => {
        const isSended = { avatar: '/assets/avatar.png', id: 'USR-000', name: 'Sofia Rivers' };
        const isReceived = {
          id: message.from,
          name: message.from,
          avatar: '/assets/avatar-10.png',
        };
        const author = message.origin === 'TWILIO' ? isReceived : isSended;
        return {
          id: message.from,
          threadId: message.chatId,
          type: 'text',
          content: message.message,
          author,
          createdAt: dayjs().toDate(),
        };
      };

      const newMessage = formatMessage();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
  }, [socket]);

  React.useEffect(() => {
    const fetchChats = async (): Promise<void> => {
      try {
        const response = await chatClient.getChats();
        if (response.error) {
          setError(response.error);
        } else {
          setChatsResponse(response.data || null);
        }
      } catch (err) {
        setError('Error al obtener los chats.');
      }
    };

    void fetchChats();
  }, []);

  React.useEffect(() => {
    const fetchChatDetails = async (): Promise<void> => {
      if (chatsResponse) {
        try {
          const _contacts = chatsResponse.map((chat) => ({
            id: chat.to,
            name: chat.ProfileName,
            avatar: '/assets/avatar-10.png',
            isActive: true,
            lastActivity: dayjs(chat.updatedAt).toDate(),
          }));
          setContacts(_contacts);

          const _threads = chatsResponse
            .filter((chatDetail) => chatDetail.lastMessage && chatDetail.chatId)
            .map((chatDetail) => ({
              id: chatDetail.chatId,
              type: 'direct',
              participants: [{ id: chatDetail.to, name: chatDetail.ProfileName, avatar: '/assets/avatar-10.png' }],
              unreadCount: 0,
            })) as Thread[];

          setThreads(_threads);

          const chatDetailPromises = chatsResponse.map((chat) => chatClient.getChatDetail(chat.chatId));
          const detailsResponses = await Promise.all(chatDetailPromises);

          const _messages = detailsResponses
            .map((chatDetail) =>
              chatDetail.data?.map((chatMessage) => {
                const isSended = { avatar: '/assets/avatar.png', id: 'USR-000', name: 'Sofia Rivers' };
                const isReceived = {
                  id: chatMessage.from,
                  name: chatMessage.from,
                  avatar: '/assets/avatar-10.png',
                };
                const author = chatMessage.origin === 'TWILIO' ? isReceived : isSended;
                return {
                  id: chatMessage._id,
                  threadId: chatMessage.chatId,
                  type: 'text',
                  content: chatMessage.message,
                  author,
                  createdAt: dayjs(chatMessage.dateAdded).toDate(),
                };
              })
            )
            .flat() as Message[];

          setMessages(_messages);
        } catch (err) {
          setError('Error al obtener los detalles de los chats.');
        }
      }
    };

    void fetchChatDetails();
  }, [chatsResponse]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ChatProvider contacts={contacts} messages={messages} threads={threads}>
      <ChatView>{children}</ChatView>
    </ChatProvider>
  );
}
