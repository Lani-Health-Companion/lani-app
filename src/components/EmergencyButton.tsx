import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Linking,
  Alert,
  Modal,
  Pressable,
} from 'react-native';
import { THEME } from '@constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmergencyButtonProps {
  style?: object;
}

export const EmergencyButton: React.FC<EmergencyButtonProps> = ({ style }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCall911 = () => {
    setShowConfirmation(false);
    const phoneNumber = 'tel:911';
    Linking.openURL(phoneNumber).catch((err) => {
      console.error('Failed to call emergency services:', err);
      Alert.alert('Error', 'Unable to make emergency call. Please try manually.');
    });
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.emergencyButton, style]}
        onPress={() => setShowConfirmation(true)}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name="phone-alert"
          size={THEME.icon.large}
          color={THEME.colors.warmWhite}
          style={styles.icon}
        />
        <Text style={styles.text}>911</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={showConfirmation}
        animationType="fade"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Emergency Services</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to call 911? Emergency services will be contacted.
            </Text>

            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={() => setShowConfirmation(false)}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.confirmButton]}
                onPress={handleCall911}
              >
                <Text style={[styles.buttonText, styles.confirmButtonText]}>Call 911</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  emergencyButton: {
    backgroundColor: THEME.colors.error,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: THEME.button.height,
    minWidth: THEME.button.height,
    ...THEME.shadow.medium,
  },
  icon: {
    marginBottom: THEME.spacing.sm,
  },
  text: {
    ...THEME.fonts.button,
    color: THEME.colors.warmWhite,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: THEME.colors.warmWhite,
    borderRadius: THEME.borderRadius.lg,
    padding: THEME.spacing.xxl,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    ...THEME.fonts.heading,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.lg,
    fontWeight: '700',
  },
  modalMessage: {
    ...THEME.fonts.body,
    color: THEME.colors.text,
    textAlign: 'center',
    marginBottom: THEME.spacing.xxl,
    lineHeight: 28,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: THEME.spacing.lg,
  },
  button: {
    flex: 1,
    paddingVertical: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  cancelButton: {
    backgroundColor: THEME.colors.lightGray,
    borderWidth: 2,
    borderColor: THEME.colors.border,
  },
  confirmButton: {
    backgroundColor: THEME.colors.error,
  },
  buttonText: {
    ...THEME.fonts.button,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: THEME.colors.text,
  },
  confirmButtonText: {
    color: THEME.colors.warmWhite,
  },
});
