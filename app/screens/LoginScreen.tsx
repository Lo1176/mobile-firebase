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
  Text,
  View,
} from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { Button } from '../components/Button';
import * as yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export const LoginScreen = ({}) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async (values) => {
    setLoading(true);
    try {
      await validationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      const response = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log('🚀 ~ signIn ~ response:', response);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.forEach((err) => alert(err));
      } else if (error instanceof Error) {
        console.error(error.message);
        alert('Sign in failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (values) => {
    console.log('🚀 ~ signUp ~ values:', values);
    setLoading(true);
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log('🚀 ~ signIn ~ response:', response);
      alert('Check your emails!');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.forEach((err) => alert(err));
      } else if (error instanceof Error) {
        console.error(error.message);
        alert('Registration failed: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log('🚀 ~ values:', values);
        signIn(values);
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.mainContainer}>
          <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View>
              <TextInput
                style={styles.input}
                placeholder='Email'
                autoCapitalize='none'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Text style={styles.error}>
                {touched.email && errors.email ? errors.email : ''}
              </Text>
              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Password'
                autoCapitalize='none'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Text style={styles.error}>
                {touched.password && errors.password ? errors.password : ''}
              </Text>
            </View>

            {loading ? (
              <ActivityIndicator size='large' color='#0000ff' />
            ) : (
              <View style={styles.btnContainer}>
                <Button
                  title='Login'
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                />
                <Button title='Create account' onPress={() => signUp(values)} />
              </View>
            )}
          </KeyboardAvoidingView>
        </View>
      )}
    </Formik>
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
  error: {
    color: 'red',
    // paddingBottom: 10,
  },
});
