import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { THEME } from '@constants/theme';

interface QuickRepliesProps {
  replies: string[];
  onReplySelect: (reply: string) => void;
}

export const QuickReplies: React.FC<QuickRepliesProps> = ({
  replies,
  onReplySelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {replies.map((reply, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => onReplySelect(reply)}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>{reply}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: THEME.spacing.md,
    backgroundColor: THEME.colors.warmWhite,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.lightGray,
  },
  scrollContent: {
    paddingHorizontal: THEME.spacing.lg,
    gap: THEME.spacing.md,
  },
  button: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.full,
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    minHeight: THEME.touchTarget.min * 0.75,
    justifyContent: 'center',
    ...THEME.shadow.small,
  },
  text: {
    ...THEME.fonts.button,
    color: THEME.colors.warmWhite,
    textAlign: 'center',
    fontWeight: '600',
  },
});
