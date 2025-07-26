import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, RelativePathString } from 'expo-router';

export default class index extends Component {
  state = {
    username: '',
    password: '',
  };

  handleLogin = async () => {
    const { username, password } = this.state;
    if (username && password) {
      await AsyncStorage.setItem('sessionToken', 'dummy_token');
      router.replace('/(tabs)');
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
        <Button title="Go to Signup" onPress={() => router.push('/sign_up' as RelativePathString)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginVertical: 10 },
});
