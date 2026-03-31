import { Stack } from 'expo-router';
import { THEME } from '@constants/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: THEME.colors.warmWhite },
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Login' }} />
    </Stack>
  );
}
