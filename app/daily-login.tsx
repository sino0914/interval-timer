import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { STORAGE_KEYS } from '@/constants/storage';

export default function DailyLoginPrompt() {
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  const resetProgress = async () => {
    setIsClearing(true);
    await AsyncStorage.multiRemove([STORAGE_KEYS.HAS_LOGGED_IN, STORAGE_KEYS.GUIDE_CHOICE]);
    router.replace('/onboarding');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">今日有好好修煉嗎？</ThemedText>
      <ThemedText style={styles.description}>
        這裡會顯示每日登入提示與個人化任務。你已經通過導覽，因此直接回到了登入提示頁。
      </ThemedText>
      <Button title={isClearing ? '重置中...' : '重新導覽'} onPress={resetProgress} disabled={isClearing} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 24,
    justifyContent: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
});

