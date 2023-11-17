import React, { useEffect, useState, useCallback } from 'react';
import {
  BackHandler,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

import Logo from '../../components/Logo';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import ButtonAction from '../../components/ButtonAction';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = auth().currentUser;
      if (user) {
        navigation.navigate('Home');
      }
    };

    checkAuthStatus();
  }, [navigation]);

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

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);

      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao fazer login', 'Credenciais inválidas');
    }
  };

  const handleRegisterNavigation = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={styles.mainWrapper}>
        <Logo />
        <Text style={styles.title}>Entre e divirta-se!</Text>

        <InputText onChangeText={text => setEmail(text)} placeholder="Email" />
        <InputPassword
          onChangeText={text => setPassword(text)}
          placeholder="Senha"
        />

        <ButtonAction onPress={handleLogin} text="Entrar" />

        <TouchableOpacity
          style={styles.wrapperGoRegister}
          onPress={handleRegisterNavigation}
          title="Não tem uma conta? Cadastre-se">
          <Text style={styles.textGoRegister}>Não tem uma conta?</Text>
          <Text style={styles.buttonLink}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  wrapperGoRegister: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
  textGoRegister: {
    color: 'black',
  },
  buttonLink: {
    color: 'black',
    fontWeight: 'bold',
  },
});
