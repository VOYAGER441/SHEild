import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { router, RelativePathString } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/utils/constants/Colors';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const handleSocialLogin = (provider: string) => {
    // Placeholder for auth logic
    console.log(`Login with ${provider}`);
    // For demo purposes, navigate to tabs on "Email" or others if desired
    if (provider === 'Email') {
      // router.replace('/(tabs)' as RelativePathString);
    }
  };

  const SocialButton = ({ icon, title, onPress }: { icon: any, title: string, onPress: () => void }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.socialButton,
        {
          backgroundColor: theme.card,
          shadowColor: theme.shadowColor,
          shadowOffset: theme.shadowOffset,
          shadowOpacity: theme.shadowOpacity,
          shadowRadius: theme.shadowRadius,
          elevation: theme.elevation,
        }
      ]}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={[styles.socialButtonText, { color: theme.tint }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.tint }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={[styles.logoContainer, { backgroundColor: theme.card }]}>
            <Image
              source={require("../../assets/images/favicon.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={[styles.title, { color: theme.textSecondary }]}>SHEild</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Women Safety & Empowerment
          </Text>
        </View>

        <View style={styles.spacer} />

        {/* Actions Section */}
        <View style={styles.actions}>
          <Text style={[styles.actionLabel, { color: theme.textSecondary }]}>
            Get started by creating your account
          </Text>

          <View style={styles.buttonStack}>
            <SocialButton
              title="Sign In with Google"
              icon={<AntDesign name="google" size={24} color={theme.tint} />}
              onPress={() => handleSocialLogin('Google')}
            />

            <SocialButton
              title="Sign In with Facebook"
              icon={<FontAwesome5 name="facebook" size={24} color={theme.tint} />}
              onPress={() => handleSocialLogin('Facebook')}
            />

            <SocialButton
              title="Sign In with Apple"
              icon={<AntDesign name="apple" size={24} color={theme.tint} />}
              onPress={() => handleSocialLogin('Apple')}
            />

            <SocialButton
              title="Sign In with Email"
              icon={<MaterialCommunityIcons name="email" size={24} color={theme.tint} />}
              onPress={() => handleSocialLogin('Email')}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.replace('/sign_up' as RelativePathString)}>
            <Text style={{ color: theme.textSecondary, fontSize: 14 }}>
              Already have an account? <Text style={{ fontWeight: 'bold', color: theme.card }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 5,
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.9,
    textAlign: 'center',
  },
  spacer: {
    height: 40,
  },
  actions: {
    width: '100%',
  },
  actionLabel: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  buttonStack: {
    gap: 15,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30, // Pill shape
    elevation: 2,
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  }
});

