import { Button, Text, View } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';

export const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => navigation.navigate('list')} title='Open List' />
      <Button onPress={() => FIREBASE_AUTH.signOut()} title='Logout' />
      <Text>Details</Text>
    </View>
  );
};
