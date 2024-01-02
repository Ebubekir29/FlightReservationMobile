import AsyncStorage from '@react-native-async-storage/async-storage';


export const setUserSessionWithId = async (id) => {
  try {
    await AsyncStorage.setItem('userUID', id);

  } catch (e) {
    console.error('Error saving user id:', e);
  }
};
export const getUserSession = async () => {
  try {
    const userId = await AsyncStorage.getItem('userUID');
    return userId;
  } catch (e) {
    console.error('Error getting user id:', e);
  }
};