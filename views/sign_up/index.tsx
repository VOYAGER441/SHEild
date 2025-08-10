import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, RelativePathString } from 'expo-router';

export default class Signup extends Component {
  state = {
    username: 'mainak',
    password: 'banduri',
  };

  handleSignup = async () => {
    const { username, password } = this.state;
    if (username && password) {
      await AsyncStorage.setItem('sessionToken', 'dummy_signup_token');
      router.replace('/(tabs)');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Signup</Text>
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
        <Button title="Signup" onPress={this.handleSignup} />
        <Button title="Go to Login" onPress={() => router.replace("/login" as RelativePathString)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderBottomWidth: 1, marginVertical: 10 },
});
