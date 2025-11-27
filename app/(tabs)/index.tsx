import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useCallback, useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { STORAGE_KEYS } from '@/constants/storage';

type RedirectState = 'checking' | 'redirecting';

export default function HomeScreen() {
  const router = useRouter();
  const [status, setStatus] = useState<RedirectState>('checking');

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const decideNextStep = async () => {
        setStatus('checking');
        const hasLoggedIn = await AsyncStorage.getItem(STORAGE_KEYS.HAS_LOGGED_IN);

        if (!isMounted) {
          return;
        }

        setStatus('redirecting');
        if (!hasLoggedIn) {
          router.replace('/onboarding');
          return;
        }

        router.replace('/daily-login');
      };

      decideNextStep();

      return () => {
        isMounted = false;
      };
    }, [router]),
  );

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="small" />
      <ThemedText type="defaultSemiBold">
        {status === 'checking' ? '檢查登入狀態中…' : '前往適合你的頁面'}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
