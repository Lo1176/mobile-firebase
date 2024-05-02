import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Button } from '../components/Button';

export const Login = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('🚀 ~ signIn ~ response:', response);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert('Sign in failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('🚀 ~ signIn ~ response:', response);
      alert('Check your emails!');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        alert('Registration failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View>
          <TextInput
            value={email}
            style={styles.input}
            placeholder='Email'
            autoCapitalize='none'
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
          <TextInput
            secureTextEntry={true}
            value={password}
            style={styles.input}
            placeholder='Password'
            autoCapitalize='none'
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>

        {loading ? (
          <ActivityIndicator size='large' color='#0000ff' />
        ) : (
          <View style={styles.btnContainer}>
            <Button title='Login' onPress={signIn} />
            <Button title='Create account' onPress={signUp} />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  container: { display: 'flex', gap: 20 },
  btnContainer: { display: 'flex', gap: 10 },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
