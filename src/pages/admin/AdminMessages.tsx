import { useState } from 'react';
import { toast } from 'sonner';
import { Trash2, Mail, MailOpen } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useMessages } from '../../context/MessagesContext';
import { formatDate } from '../../lib/utils';
import { cn } from '../../lib/utils';

export function AdminMessages() {
  const { messages, toggleRead, deleteMessage } = useMessages();
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const selected = selectedMessage ? messages.find((m) => m.id === selectedMessage) : null;

  const handleDelete = (id: string) => {
    deleteMessage(id);
    setDeleteConfirm(null);
    if (selectedMessage === id) setSelectedMessage(null);
    toast.success('Message deleted');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className={`${selectedMessage ? 'hidden lg:block' : ''} lg:col-span-1`}>
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-5 py-4">
            <p className="text-sm text-gray-500">
              {messages.length} {messages.length === 1 ? 'message' : 'messages'}
            </p>
          </div>
          {messages.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-400">No messages yet</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg.id)}
                  className={cn(
                    'w-full px-5 py-4 text-left transition-colors hover:bg-gray-50',
                    selectedMessage === msg.id && 'bg-forest-50',
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {msg.read ? (
                        <MailOpen className="h-4 w-4 text-gray-300" />
                      ) : (
                        <Mail className="h-4 w-4 text-brass" />
                      )}
                      <span className={cn('text-sm', !msg.read && 'font-semibold text-charcoal')}>
                        {msg.name}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {formatDate(msg.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 truncate pl-6 text-xs text-gray-500">{msg.subject}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`${!selectedMessage ? 'hidden lg:block' : ''} lg:col-span-2`}>
        {selected ? (
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-charcoal">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.email} · {selected.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRead(selected.id)}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-forest-800"
                  title={selected.read ? 'Mark as unread' : 'Mark as read'}
                >
                  {selected.read ? <Mail className="h-4 w-4" /> : <MailOpen className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setDeleteConfirm(selected.id)}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <div className="mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Subject</span>
                <p className="text-sm text-charcoal">{selected.subject}</p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">Message</span>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{selected.message}</p>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-400">Received {formatDate(selected.createdAt)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center rounded-xl border border-gray-200 bg-white py-20">
            <div className="text-center text-gray-400">
              <Mail className="mx-auto h-12 w-12" />
              <p className="mt-3 text-sm">Select a message to view</p>
            </div>
          </div>
        )}
      </div>

      <Modal isOpen={deleteConfirm !== null} onClose={() => setDeleteConfirm(null)} title="Delete Message">
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete this message?</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" size="md" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
