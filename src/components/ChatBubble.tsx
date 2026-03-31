import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { THEME } from '@constants/theme';

interface ChatBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ role, content, timestamp }) => {
  const isUser = role === 'user';

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.assistantBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isUser ? styles.userText : styles.assistantText,
          ]}
        >
          {content}
        </Text>

        {timestamp && (
          <Text
            style={[
              styles.timestamp,
              isUser ? styles.userTimestamp : styles.assistantTimestamp,
            ]}
          >
            {formatTime(timestamp)}
          </Text>
        )}
      </View>
    </View>
  );
};

const formatTime = (date: Date): string => {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const styles = StyleSheet.create({
  container: {
    marginVertical: THEME.spacing.sm,
    paddingHorizontal: THEME.spacing.lg,
    alignItems: 'flex-start',
  },
  userContainer: {
    alignItems: 'flex-end',
  },
  bubble: {
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    maxWidth: '85%',
    minHeight: THEME.touchTarget.min * 0.75,
    justifyContent: 'center',
  },
  assistantBubble: {
    backgroundColor: THEME.colors.laniMessageBg,
  },
  userBubble: {
    backgroundColor: THEME.colors.primary,
  },
  text: {
    ...THEME.fonts.body,
    lineHeight: 26,
  },
  assistantText: {
    color: THEME.colors.text,
  },
  userText: {
    color: THEME.colors.userMessageText,
  },
  timestamp: {
    ...THEME.fonts.tiny,
    marginTop: THEME.spacing.sm,
  },
  assistantTimestamp: {
    color: THEME.colors.lightText,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
