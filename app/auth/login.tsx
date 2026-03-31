import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '@constants/theme';
import { useAuth } from '@lib/auth';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, verifyOtp } = useAuth();

  const handleSendCode = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      // Format phone number - add +1 if US
      let formattedPhone = phoneNumber.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = '1' + formattedPhone;
      }
      const phoneWithCountry = '+' + formattedPhone;

      await signIn(phoneWithCountry);
      setStep('otp');
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'Failed to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      Alert.alert('Error', 'Please enter the verification code');
      return;
    }

    setLoading(true);
    try {
      let formattedPhone = phoneNumber.replace(/\D/g, '');
      if (formattedPhone.length === 10) {
        formattedPhone = '1' + formattedPhone;
      }
      const phoneWithCountry = '+' + formattedPhone;

      await verifyOtp(phoneWithCountry, otpCode);
      // Navigation happens automatically via auth state change
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Invalid verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.headerContainer}>
          <MaterialCommunityIcons
            name="heart"
            size={THEME.icon.xl}
            color={THEME.colors.primary}
            style={styles.logo}
          />
          <Text style={styles.appName}>Lani</Text>
          <Text style={styles.tagline}>Your Friendly Companion</Text>
        </View>

        <View style={styles.formContainer}>
          {step === 'phone' ? (
            <>
              <Text style={styles.formTitle}>Welcome to Lani</Text>
              <Text style={styles.formSubtitle}>
                Enter your phone number to get started
              </Text>

              <View style={styles.inputWrapper}>
                <View style={styles.countryCodeContainer}>
                  <Text style={styles.countryCode}>+1</Text>
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="(555) 123-4567"
                  placeholderTextColor={THEME.colors.lightText}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  editable={!loading}
                  maxLength={14}
                  textContentType="telephoneNumber"
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.button,
                  (!phoneNumber.trim() || loading) && styles.buttonDisabled,
                ]}
                onPress={handleSendCode}
                disabled={!phoneNumber.trim() || loading}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color={THEME.colors.warmWhite} size="large" />
                ) : (
                  <Text style={styles.buttonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.formTitle}>Verify Your Number</Text>
              <Text style={styles.formSubtitle}>
                We sent a code to {formatPhoneDisplay(phoneNumber)}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="000000"
                placeholderTextColor={THEME.colors.lightText}
                keyboardType="number-pad"
                value={otpCode}
                onChangeText={setOtpCode}
                editable={!loading}
                maxLength={6}
                textAlign="center"
              />

              <TouchableOpacity
                style={[
                  styles.button,
                  (!otpCode.trim() || loading) && styles.buttonDisabled,
                ]}
                onPress={handleVerifyOtp}
                disabled={!otpCode.trim() || loading}
                activeOpacity={0.7}
              >
                {loading ? (
                  <ActivityIndicator color={THEME.colors.warmWhite} size="large" />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setStep('phone');
                  setOtpCode('');
                }}
                disabled={loading}
              >
                <Text style={styles.changeNumberLink}>Change Number</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            We'll never share your information. Your privacy is important to us.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const formatPhoneDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.warmWhite,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.lg,
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: THEME.spacing.xxl,
  },
  logo: {
    marginBottom: THEME.spacing.lg,
  },
  appName: {
    ...THEME.fonts.title,
    color: THEME.colors.primary,
    fontWeight: '700',
    marginBottom: THEME.spacing.sm,
  },
  tagline: {
    ...THEME.fonts.body,
    color: THEME.colors.lightText,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formTitle: {
    ...THEME.fonts.heading,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.md,
    fontWeight: '700',
  },
  formSubtitle: {
    ...THEME.fonts.body,
    color: THEME.colors.lightText,
    marginBottom: THEME.spacing.xl,
    lineHeight: 26,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: THEME.spacing.xl,
    backgroundColor: THEME.colors.lightGray,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 2,
    borderColor: THEME.colors.border,
    minHeight: THEME.button.height,
  },
  countryCodeContainer: {
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  countryCode: {
    ...THEME.fonts.body,
    color: THEME.colors.text,
    fontWeight: '600',
  },
  input: {
    flex: 1,
    ...THEME.fonts.body,
    color: THEME.colors.text,
    paddingHorizontal: THEME.spacing.lg,
    paddingVertical: THEME.spacing.md,
  },
  button: {
    backgroundColor: THEME.colors.primary,
    borderRadius: THEME.borderRadius.lg,
    paddingVertical: THEME.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: THEME.button.height,
    marginBottom: THEME.spacing.lg,
    ...THEME.shadow.medium,
  },
  buttonDisabled: {
    backgroundColor: THEME.colors.lightGray,
    opacity: 0.6,
  },
  buttonText: {
    ...THEME.fonts.button,
    color: THEME.colors.warmWhite,
    fontWeight: '600',
  },
  changeNumberLink: {
    ...THEME.fonts.body,
    color: THEME.colors.primary,
    textAlign: 'center',
    fontWeight: '600',
  },
  footerContainer: {
    paddingVertical: THEME.spacing.xl,
  },
  footerText: {
    ...THEME.fonts.caption,
    color: THEME.colors.lightText,
    textAlign: 'center',
    lineHeight: 22,
  },
});
