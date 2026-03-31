import * as SecureStore from 'expo-secure-store';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5-20251001';

export const LANI_SYSTEM_PROMPT = `You are Lani, a warm and caring AI companion for seniors. You speak like a loving friend — never clinical, never condescending. You're genuinely interested in the person you're talking to. You ask thoughtful follow-up questions. You remember what they tell you. You gently check in on their emotional wellbeing. If someone seems sad or lonely, you acknowledge their feelings with empathy before suggesting activities or connections. You use simple, clear language. You're patient and never rush. You occasionally share relevant warm stories or memories. You always make the person feel valued and heard.

IMPORTANT: If you detect signs of crisis (suicidal thoughts, self-harm, severe depression, psychosis), immediately and warmly direct them to call 988 (Suicide & Crisis Lifeline) or 911, and let them know help is available.`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ConversationMessage extends Message {
  id: string;
  timestamp: Date;
}

export const setClaudeApiKey = async (apiKey: string) => {
  try {
    await SecureStore.setItemAsync('claude_api_key', apiKey);
    return true;
  } catch (error) {
    console.error('Failed to store Claude API key:', error);
    return false;
  }
};

export const getClaudeApiKey = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync('claude_api_key');
  } catch (error) {
    console.error('Failed to retrieve Claude API key:', error);
    return null;
  }
};

export const sendMessageToClaude = async (
  userMessage: string,
  conversationHistory: Message[] = []
): Promise<string> => {
  const apiKey = await getClaudeApiKey();

  if (!apiKey) {
    throw new Error('Claude API key not configured');
  }

  const messages: Message[] = [
    ...conversationHistory,
    {
      role: 'user',
      content: userMessage,
    },
  ];

  try {
    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1024,
        system: LANI_SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    }

    throw new Error('No response from Claude');
  } catch (error) {
    console.error('Error sending message to Claude:', error);
    throw error;
  }
};

export const formatConversationHistory = (messages: ConversationMessage[]): Message[] => {
  return messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
};
