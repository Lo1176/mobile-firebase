import { Button, Text, View } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export const List = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Details')}
        title='Open Details'
      />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout' />
      <Text>List</Text>
    </View>
  );
};
