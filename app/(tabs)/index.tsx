import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '@constants/theme';
import { ChatBubble } from '@components/ChatBubble';
import { QuickReplies } from '@components/QuickReplies';
import { sendMessageToClaude, formatConversationHistory, ConversationMessage } from '@lib/claude';

const QUICK_REPLIES = [
  "I'm doing great!",
  "A little lonely today",
  "Tell me about yourself",
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hi there! I'm Lani, and I'm so happy to meet you. How are you feeling today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ConversationMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      // Get conversation history excluding the current message
      const history = formatConversationHistory(messages);

      const assistantResponse = await sendMessageToClaude(text, history);

      const assistantMessage: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: assistantResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const renderMessage = ({ item }: { item: ConversationMessage }) => (
    <ChatBubble
      role={item.role}
      content={item.content}
      timestamp={item.timestamp}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          scrollEnabled={true}
          onContentSizeChange={() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }}
        />

        <QuickReplies replies={QUICK_REPLIES} onReplySelect={handleQuickReply} />

        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.micButton}
            activeOpacity={0.7}
            onPress={() => {
              // TODO: Implement voice input
              console.log('Voice input not yet implemented');
            }}
          >
            <MaterialCommunityIcons
              name="microphone"
              size={THEME.icon.large}
              color={THEME.colors.primary}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            placeholderTextColor={THEME.colors.lightText}
            value={inputValue}
            onChangeText={setInputValue}
            multiline
            maxLength={500}
            editable={!loading}
          />

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!inputValue.trim() || loading) && styles.sendButtonDisabled,
            ]}
            onPress={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || loading}
            activeOpacity={0.7}
          >
            {loading ? (
              <ActivityIndicator color={THEME.colors.warmWhite} size="large" />
            ) : (
              <MaterialCommunityIcons
                name="send"
                size={THEME.icon.large}
                color={
                  inputValue.trim()
                    ? THEME.colors.warmWhite
                    : THEME.colors.lightText
                }
              />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.warmWhite,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesList: {
    paddingVertical: THEME.spacing.lg,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.lg,
    backgroundColor: THEME.colors.warmWhite,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.lightGray,
    gap: THEME.spacing.md,
  },
  micButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: THEME.button.smallHeight,
    height: THEME.button.smallHeight,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.lightGray,
  },
  input: {
    flex: 1,
    ...THEME.fonts.body,
    color: THEME.colors.text,
    backgroundColor: THEME.colors.lightGray,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
    maxHeight: 120,
    minHeight: THEME.button.smallHeight,
    lineHeight: 24,
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: THEME.button.smallHeight,
    height: THEME.button.smallHeight,
    borderRadius: THEME.borderRadius.md,
    backgroundColor: THEME.colors.primary,
  },
  sendButtonDisabled: {
    backgroundColor: THEME.colors.lightGray,
  },
});
