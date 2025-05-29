import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText style={styles.emoji} type="title">
          😕
        </ThemedText>
        <ThemedText style={styles.title} type="title">
          Page Not Found
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          The page you are looking for doesn&apos;t exist or has been moved.
        </ThemedText>
        <Link href='/' style={styles.link} asChild>
          <ThemedView style={styles.button}>
            <ThemedText style={styles.buttonText} type="link">
              Go to Home
            </ThemedText>
          </ThemedView>
        </Link>
      </ThemedView>
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emoji: {
    fontSize: 58,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    textDecorationLine: 'none',
  },
});
