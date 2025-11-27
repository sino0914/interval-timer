import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { STORAGE_KEYS } from '@/constants/storage';

type Choice = '霸絕天下' | '庇護親友';

const INITIAL_TEXT =
  '凡塵中，你已踏上運動之道，卻總有心魔阻礙？告訴我，你的堅持是為何？是為了庇護親友，還是霸絕天下？';

export default function OnboardingScreen() {
  const router = useRouter();
  const [choice, setChoice] = useState<Choice | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const displayText = useMemo(() => {
    switch (choice) {
      case '霸絕天下':
        return '居然是霸道之心？我見你有天資，卻重情重義，一旦認定便付出一切。在這凡仙之間，坚持不易，但你渴望變強，我已看見——繼續前進，成為運動霸者！';
      case '庇護親友':
        return '若運動不是為了庇護親人，我要這強健之身何用？從今起，我記住你的誓言——不許歲月奪走你的活力！讓我們一起修煉，成為\n\n運動之巔！';
      default:
        return INITIAL_TEXT;
    }
  }, [choice]);

  const persistAndContinue = async (selected: Choice) => {
    setIsSaving(true);
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.HAS_LOGGED_IN, 'true'],
      [STORAGE_KEYS.GUIDE_CHOICE, selected],
    ]);
    router.replace('/daily-login');
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.story}>{displayText}</ThemedText>

      {!choice ? (
        <ThemedView style={styles.buttonStack}>
          <CallToAction label="霸絕天下" onPress={() => setChoice('霸絕天下')} />
          <CallToAction label='庇護親友' onPress={() => setChoice('庇護親友')} variant="secondary" />
        </ThemedView>
      ) : (
        <CallToAction
          label={isSaving ? '前往中...' : '下一步'}
          onPress={() => persistAndContinue(choice)}
          disabled={isSaving}
        />
      )}
    </ThemedView>
  );
}

type CallToActionProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
};

const CallToAction = ({ label, onPress, disabled, variant = 'primary' }: CallToActionProps) => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    disabled={disabled}
    style={[
      styles.cta,
      variant === 'secondary' && styles.ctaSecondary,
      disabled && styles.ctaDisabled,
    ]}>
    <ThemedText style={styles.ctaLabel}>{label}</ThemedText>
  </Pressable>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 48,
    justifyContent: 'space-between',
  },
  story: {
    fontSize: 18,
    lineHeight: 28,
  },
  buttonStack: {
    gap: 16,
  },
  cta: {
    paddingVertical: 18,
    borderRadius: 12,
    backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSecondary: {
    backgroundColor: '#3d3d3d',
  },
  ctaDisabled: {
    opacity: 0.6,
  },
  ctaLabel: {
    fontSize: 18,
    color: '#ffffff',
  },
});

