import { useState, useCallback } from 'react';
import { supabase } from '@lib/supabase';
import { Message, Conversation } from '@types/index';
import { useAuth } from '@lib/auth';

export const useConversation = () => {
  const { user } = useAuth();
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrGetConversation = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      // For now, create a new conversation each session
      // In production, you might want to fetch the latest conversation
      const { data, error: createError } = await supabase
        .from('conversations')
        .insert({
          user_id: user.id,
        })
        .select()
        .single();

      if (createError) throw createError;

      setConversation(data as any);
    } catch (err) {
      console.error('Error creating conversation:', err);
      setError(err instanceof Error ? err.message : 'Failed to create conversation');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const addMessage = useCallback(
    async (role: 'user' | 'assistant', content: string) => {
      if (!conversation) return;

      try {
        const { data, error: insertError } = await supabase
          .from('messages')
          .insert({
            conversation_id: conversation.id,
            role,
            content,
          })
          .select()
          .single();

        if (insertError) throw insertError;

        const newMessage: Message = data as any;
        setMessages((prev) => [...prev, newMessage]);

        return newMessage;
      } catch (err) {
        console.error('Error adding message:', err);
        setError(err instanceof Error ? err.message : 'Failed to save message');
      }
    },
    [conversation]
  );

  return {
    conversation,
    messages,
    loading,
    error,
    createOrGetConversation,
    addMessage,
  };
};
