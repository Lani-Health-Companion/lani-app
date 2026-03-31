import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '@constants/theme';

export default function FriendsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="heart"
            size={THEME.icon.xl}
            color={THEME.colors.primary}
          />
        </View>

        <Text style={styles.title}>Friends Coming Soon!</Text>

        <Text style={styles.description}>
          Lani is working on finding friends near you who share your interests. Soon you'll be able to connect with peers and build meaningful friendships right here.
        </Text>

        <View style={styles.featureList}>
          <FeatureItem
            icon="account-group"
            title="Find Peers"
            description="Connect with people who understand you"
          />
          <FeatureItem
            icon="heart-multiple"
            title="Shared Interests"
            description="Matched based on what you love"
          />
          <FeatureItem
            icon="message"
            title="Start Conversations"
            description="Make genuine connections"
          />
        </View>

        <Text style={styles.waitingText}>
          Stay tuned! We'll let you know when this feature launches.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <MaterialCommunityIcons
      name={icon as any}
      size={THEME.icon.large}
      color={THEME.colors.primary}
      style={styles.featureIcon}
    />
    <View style={styles.featureText}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.warmWhite,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.xxl,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: THEME.spacing.xxl,
  },
  title: {
    ...THEME.fonts.heading,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.lg,
    textAlign: 'center',
    fontWeight: '700',
  },
  description: {
    ...THEME.fonts.body,
    color: THEME.colors.lightText,
    textAlign: 'center',
    marginBottom: THEME.spacing.xxl,
    lineHeight: 28,
  },
  featureList: {
    width: '100%',
    marginBottom: THEME.spacing.xxl,
    gap: THEME.spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.lightGray,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    alignItems: 'flex-start',
    minHeight: THEME.touchTarget.min * 0.75,
  },
  featureIcon: {
    marginRight: THEME.spacing.lg,
    marginTop: THEME.spacing.md,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...THEME.fonts.bodyBold,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.sm,
  },
  featureDescription: {
    ...THEME.fonts.caption,
    color: THEME.colors.lightText,
    lineHeight: 22,
  },
  waitingText: {
    ...THEME.fonts.body,
    color: THEME.colors.primary,
    textAlign: 'center',
    fontWeight: '600',
    marginTop: THEME.spacing.xxl,
  },
});
