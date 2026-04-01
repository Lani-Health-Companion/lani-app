import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

const SUPABASE_URL = 'https://limwdusgqsxylsaelppc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_k3xP78RG7SzLIH2sffj2Qg_6lDrh69g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Handle app state changes for token refresh
let appStateSubscription: any = null;

export const initializeAuth = () => {
  // Clean up existing subscription if it exists
  if (appStateSubscription) {
    try {
      appStateSubscription.remove();
    } catch (e) {
      // Ignore cleanup errors
    }
  }

  appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
  return () => {
    if (appStateSubscription) {
      try {
        appStateSubscription.remove();
      } catch (e) {
        // Ignore cleanup errors
      }
      appStateSubscription = null;
    }
  };
};

const handleAppStateChange = async (state: any) => {
  try {
    if (state === 'active') {
      await supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  } catch (error) {
    console.error('Error handling app state change:', error);
  }
};

export type Database = any; // TODO: Generate with supabase CLI