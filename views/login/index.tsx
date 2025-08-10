import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, RelativePathString } from 'expo-router';

export default class index extends Component {
  state = {
    username: '',
    password: '',
    isLoading: false
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    this.setState({ isLoading: true });
    try {
      // First clear any existing data
      await AsyncStorage.clear();
      // Set new token
      await AsyncStorage.setItem('sessionToken', 'dummy_token');
      // Navigate after successful token storage
      router.replace('/(tabs)' as RelativePathString);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => this.setState({ username: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          style={styles.input}
        />
        <Button title="Login" onPress={this.handleLogin} />
        <Button title="Go to Signup" onPress={() => router.replace('/sign_up' as RelativePathString)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginVertical: 10 },
});
