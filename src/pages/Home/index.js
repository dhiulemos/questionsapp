import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler, View, StyleSheet, Text } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import ProfileHeader from './components/ProfileHeader';
import QuizList from './components/QuizList';
import RecentQuiz from './components/RecentQuiz';

const Home = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (user) {
        const { displayName, photoURL } = user;
        setUserData({ name: displayName, profilePicture: photoURL });
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <ProfileHeader
            name={userData.name}
            profilePicture={userData.profilePicture}
            handleLogout={handleLogout}
          />
          <QuizList />
          {/* <RecentQuiz user={userData} /> */}
        </>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Carregando...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
