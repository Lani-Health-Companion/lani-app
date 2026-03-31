import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '@constants/theme';

export default function FamilyScreen() {
  const [emergencyContacts] = React.useState<any[]>([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {emergencyContacts.length === 0 ? (
          <>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="heart"
                size={THEME.icon.xl}
                color={THEME.colors.primary}
              />
            </View>

            <Text style={styles.title}>Family & Emergency Contacts</Text>

            <Text style={styles.description}>
              Keep your loved ones close. Add emergency contacts so we can reach out when you need them most.
            </Text>

            <TouchableOpacity
              style={styles.addButton}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name="plus"
                size={THEME.icon.large}
                color={THEME.colors.warmWhite}
                style={styles.buttonIcon}
              />
              <Text style={styles.buttonText}>Add Emergency Contact</Text>
            </TouchableOpacity>

            <View style={styles.benefitsContainer}>
              <BenefitItem
                icon="phone"
                title="Quick Access"
                description="Reach family in seconds"
              />
              <BenefitItem
                icon="shield-check"
                title="Safety First"
                description="Emergency contacts on file"
              />
              <BenefitItem
                icon="heart-handshake"
                title="Stay Connected"
                description="Your family stays informed"
              />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Emergency Contacts</Text>
            {/* TODO: Render emergency contacts list */}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ icon, title, description }) => (
  <View style={styles.benefitItem}>
    <MaterialCommunityIcons
      name={icon as any}
      size={THEME.icon.medium}
      color={THEME.colors.primary}
      style={styles.benefitIcon}
    />
    <View style={styles.benefitText}>
      <Text style={styles.benefitTitle}>{title}</Text>
      <Text style={styles.benefitDescription}>{description}</Text>
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
  },
  iconContainer: {
    alignItems: 'center',
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
  addButton: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.lg,
    paddingHorizontal: THEME.spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: THEME.button.height,
    marginBottom: THEME.spacing.xxl,
    ...THEME.shadow.medium,
  },
  buttonIcon: {
    marginRight: THEME.spacing.md,
  },
  buttonText: {
    ...THEME.fonts.button,
    color: THEME.colors.warmWhite,
    fontWeight: '600',
  },
  benefitsContainer: {
    gap: THEME.spacing.lg,
  },
  benefitItem: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.lightGray,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    alignItems: 'flex-start',
    minHeight: THEME.touchTarget.min * 0.75,
  },
  benefitIcon: {
    marginRight: THEME.spacing.lg,
    marginTop: THEME.spacing.sm,
  },
  benefitText: {
    flex: 1,
  },
  benefitTitle: {
    ...THEME.fonts.bodyBold,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.sm,
  },
  benefitDescription: {
    ...THEME.fonts.caption,
    color: THEME.colors.lightText,
    lineHeight: 22,
  },
});
