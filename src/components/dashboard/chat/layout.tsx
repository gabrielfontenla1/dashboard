import * as React from 'react';

import { chatClient, type ChatsResponse } from '@/lib/chat/client';
import { dayjs } from '@/lib/dayjs';
import { ChatProvider } from '@/components/dashboard/chat/chat-context';
import { ChatView } from '@/components/dashboard/chat/chat-view';
import type { Contact, Message, Thread } from '@/components/dashboard/chat/types';

// const contacts = [
//   {
//     id: 'USR-010',
//     name: 'Alcides Antonio',
//     avatar: '/assets/avatar-10.png',
//     isActive: false,
//     lastActivity: dayjs().subtract(1, 'hour').toDate(),
//   },
//   {
//     id: 'USR-003',
//     name: 'Carson Darrin',
//     avatar: '/assets/avatar-3.png',
//     isActive: false,
//     lastActivity: dayjs().subtract(15, 'minute').toDate(),
//   },
//   { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png', isActive: true, lastActivity: dayjs().toDate() },
//   { id: 'USR-006', name: 'Iulia Albu', avatar: '/assets/avatar-6.png', isActive: true, lastActivity: dayjs().toDate() },
//   { id: 'USR-008', name: 'Jie Yan', avatar: '/assets/avatar-8.png', isActive: true, lastActivity: dayjs().toDate() },
//   {
//     id: 'USR-009',
//     name: 'Marcus Finn',
//     avatar: '/assets/avatar-9.png',
//     isActive: false,
//     lastActivity: dayjs().subtract(2, 'hour').toDate(),
//   },
//   {
//     id: 'USR-001',
//     name: 'Miron Vitold',
//     avatar: '/assets/avatar-1.png',
//     isActive: true,
//     lastActivity: dayjs().toDate(),
//   },
//   {
//     id: 'USR-007',
//     name: 'Nasimiyu Danai',
//     avatar: '/assets/avatar-7.png',
//     isActive: true,
//     lastActivity: dayjs().toDate(),
//   },
//   {
//     id: 'USR-011',
//     name: 'Omar Darobe',
//     avatar: '/assets/avatar-11.png',
//     isActive: true,
//     lastActivity: dayjs().toDate(),
//   },
//   {
//     id: 'USR-004',
//     name: 'Penjani Inyene',
//     avatar: '/assets/avatar-4.png',
//     isActive: false,
//     lastActivity: dayjs().subtract(6, 'hour').toDate(),
//   },
//   {
//     id: 'USR-002',
//     name: 'Siegbert Gottfried',
//     avatar: '/assets/avatar-2.png',
//     isActive: true,
//     lastActivity: dayjs().toDate(),
//   },
// ] satisfies Contact[];

const threads = [
  {
    id: 'TRD-003',
    type: 'direct',
    participants: [
      { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      { id: 'USR-003', name: 'Carson Darrin', avatar: '/assets/avatar-3.png' },
    ],
    unreadCount: 1,
  },
  {
    id: 'TRD-002',
    type: 'direct',
    participants: [
      { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      { id: 'USR-005', name: 'Fran Perez', avatar: '/assets/avatar-5.png' },
    ],
    unreadCount: 2,
  },
  {
    id: 'TRD-001',
    type: 'direct',
    participants: [
      { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
      { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    ],
    unreadCount: 0,
  },
] satisfies Thread[];

const messages = [
  // =======================================
  // Thread 3
  // =======================================

  {
    id: 'MSG-008',
    threadId: 'TRD-003',
    type: 'text',
    content: 'Claro, te envío la información en un momento. ¡Gracias por elegirnos!.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-007',
    threadId: 'TRD-003',
    type: 'text',
    content: 'Perfecto, por favor envíame los detalles de la transferencia.',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'MSG-006',
    threadId: 'TRD-003',
    type: 'text',
    content:
      'Puedes realizar el pago por transferencia bancaria o tarjeta de crédito. Te puedo enviar los detalles por mensaje.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-005',
    threadId: 'TRD-003',
    type: 'text',
    content: 'Sí, por favor. Puedo hacer el pago ahora mismo. ¿Cómo lo realizo?',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'MSG-004',
    threadId: 'TRD-003',
    type: 'text',
    content: 'El costo sería de $120 por noche, así que en total serían $240. ¿Te gustaría proceder con la reserva?',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-003',
    threadId: 'TRD-003',
    type: 'text',
    content: 'Quiero quedarme dos noches, del 15 al 17 de octubre. ¿Cuánto costaría?',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-002',
    threadId: 'TRD-003',
    type: 'text',
    content: 'Hola! Sí, tenemos habitaciones disponibles para ese fin de semana. ¿Cuántas noches te gustaría quedarte?',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(4, 'day').toDate(),
  },
  {
    id: 'MSG-001',
    threadId: 'TRD-003',
    type: 'text',
    content:
      'Hola, estoy interesado en reservar una habitación para el fin de semana del 15 de octubre. ¿Tienes disponibilidad?',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(4, 'day').toDate(),
  },

  // =======================================
  // Thread 2
  // =======================================
  {
    id: 'MSG-007',
    threadId: 'TRD-002',
    type: 'text',
    content: 'Perfecto, lo tendré en cuenta. ¡Nos vemos pronto!',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-006',
    threadId: 'TRD-002',
    type: 'text',
    content: 'Genial, llegaremos alrededor del mediodía. ¡Gracias por la info!',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'MSG-005',
    threadId: 'TRD-002',
    type: 'text',
    content: 'El check-in es a partir de las 3:00 PM. Si llegas antes, puedes dejar tus maletas en recepción.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-004',
    threadId: 'TRD-002',
    type: 'text',
    content: 'Sí, todo perfecto. Gracias por la confirmación. ¿El check-in es a partir de qué hora?',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-003',
    threadId: 'TRD-002',
    type: 'text',
    content:
      'Sí, el pago ha sido recibido correctamente. Tu reserva para el 12 de octubre está confirmada. ¿Todo bien con las fechas?',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(4, 'day').toDate(),
  },
  {
    id: 'MSG-002',
    threadId: 'TRD-002',
    type: 'text',
    content: '¡Hola! Déjame revisar. Un momento, por favor.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(4, 'day').toDate(),
  },
  {
    id: 'MSG-001',
    threadId: 'TRD-002',
    type: 'text',
    content: 'Hola, quería confirmar si mi reserva para el 12 de octubre está todo en orden. ¿Te llegó el pago?',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(4, 'day').toDate(),
  },

  // =======================================
  // Thread 1
  // =======================================

  {
    id: 'MSG-006',
    threadId: 'TRD-001',
    type: 'image',
    content: '/assets/image-abstract-1.png',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(1, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'MSG-005',
    threadId: 'TRD-001',
    type: 'text',
    content:
      'Muchas gracias por tu ayuda, nos vemos. Por cierto, te paso unas fotos de mi última estancia en el hotel, la verdad la pasamos increíble. ¡Saludos!',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(2, 'day').toDate(),
  },
  {
    id: 'MSG-004',
    threadId: 'TRD-001',
    type: 'text',
    content:
      '¡Qué bueno escuchar eso! He revisado su comprobante y todo está en orden. Su reserva para el fin de semana está confirmada, será un placer tenerlos con nosotros.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(3, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-003',
    threadId: 'TRD-001',
    type: 'text',
    content:
      'Perfecto, muchas gracias. Es la primera vez que nos quedamos en su hotel, así que estamos emocionados por la estancia.',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(3, 'day').toDate(),
  },
  {
    id: 'MSG-002',
    threadId: 'TRD-001',
    type: 'text',
    content:
      '¡Buenos días! Gracias por contactarnos. Permítame revisar el comprobante que me ha enviado. En un momento le confirmo la reserva.',
    author: { id: 'USR-000', name: 'Sofia Rivers', avatar: '/assets/avatar.png' },
    createdAt: dayjs().subtract(2, 'hour').subtract(4, 'day').toDate(),
  },
  {
    id: 'MSG-001',
    threadId: 'TRD-001',
    type: 'text',
    content:
      'Hola, buenos días. Me gustaría confirmar la reserva que hice para el próximo fin de semana. Adjunto el comprobante de pago para asegurarme de que todo esté en orden.',
    author: { id: 'USR-010', name: 'Alcides Antonio', avatar: '/assets/avatar-10.png' },
    createdAt: dayjs().subtract(5, 'hour').subtract(4, 'day').toDate(),
  },
] satisfies Message[];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const [chatsResponse, setChatsResponse] = React.useState<ChatsResponse[] | null>(null);
  const [contacts, setContacts] = React.useState<Contact[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchChats = async () => {
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
    if (chatsResponse) {
      const _contacts = chatsResponse.map((chat) => {
        return {
          id: chat.chatId,
          name: chat.ProfileName,
          avatar: '/assets/avatar-10.png',
          isActive: true,
          lastActivity: dayjs(chat.dateAdded).toDate(),
        };
      });
      setContacts(_contacts);
    }
  }, [chatsResponse]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!contacts) {
    return <div>Cargando chats...</div>;
  }

  return (
    <ChatProvider contacts={contacts} messages={messages} threads={threads}>
      <ChatView>{children}</ChatView>
    </ChatProvider>
  );
}
