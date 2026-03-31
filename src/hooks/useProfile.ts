import { useState, useCallback } from 'react';
import { supabase } from '@lib/supabase';
import { Profile } from '@apptypes/index';
import { useAuth } from '@lib/auth';

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      setProfile(data as any);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: updateError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (updateError) throw updateError;

        setProfile(data as any);
      } catch (err) {
        console.error('Error updating profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to update profile');
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  const createProfile = useCallback(
    async (displayName: string) => {
      if (!user) return;

      try {
        setLoading(true);
        setError(null);

        const { data, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            phone: user.phone,
            display_name: displayName,
          })
          .select()
          .single();

        if (createError) throw createError;

        setProfile(data as any);
      } catch (err) {
        console.error('Error creating profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to create profile');
      } finally {
        setLoading(false);
      }
    },
    [user]
  );

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    createProfile,
  };
};
