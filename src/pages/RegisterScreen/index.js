import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import InputPassword from '../../components/InputPassword';
import InputText from '../../components/InputText';
import ButtonAction from '../../components/ButtonAction';
import Logo from '../../components/Logo';
import ImagePicker from '../../components/ImagePicker';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isImagePickerVisible, setIsImagePickerVisible] = useState(false);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const pickImageFromGallery = () => {
    setIsImagePickerVisible(false);
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const takePictureWithCamera = () => {
    setIsImagePickerVisible(false);
    launchCamera({}, response => {
      if (!response.didCancel && !response.error) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Permissão para usar a câmera',
            message: 'O aplicativo precisa de permissão para acessar a câmera.',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissão concedida');
        } else {
          console.log('Permissão negada');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de câmera:', error);
      }
    }
  };

  const registerUser = async () => {
    try {
      const authResult = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const userResult = authResult.user;
      const userUid = userResult.uid;

      setUser(authResult.user);

      if (profileImage) {
        const storageRef = storage().ref(
          `profile_images/${userUid}/profileImage.jpg`,
        );
        await storageRef.putFile(profileImage);
        const imageUrl = await storageRef.getDownloadURL();

        if (userResult) {
          await userResult.updateProfile({
            displayName: name,
            photoURL: imageUrl,
          });
        }

        await firestore().collection('users').doc(userUid).set({
          name,
          email,
          photoURL: imageUrl,
        });
      } else {
        await firestore().collection('users').doc(userUid).set({
          name,
          email,
        });
      }

      console.log('Usuário registrado com sucesso.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error.message);

      if (user) {
        user.delete();
      }

      Alert.alert('Erro ao registrar usuário', 'Por favor, tente novamente.');
    }
  };

  const handleLoginNavigation = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      <View style={styles.mainWrapper}>
        <Logo />

        <Text style={styles.title}>Cadastre-se e divirta-se!</Text>

        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <TouchableOpacity
            style={styles.choosePick}
            onPress={() => setIsImagePickerVisible(true)}>
            <FontAwesomeIcon icon={faUserPlus} size={46} />
          </TouchableOpacity>
        )}

        <ImagePicker
          isVisible={isImagePickerVisible}
          onClose={() => setIsImagePickerVisible(false)}
          onGalleryPress={pickImageFromGallery}
          onCameraPress={takePictureWithCamera}
        />

        <InputText onChangeText={text => setName(text)} placeholder="Nome" />
        <InputText onChangeText={text => setEmail(text)} placeholder="Email" />
        <InputPassword
          onChangeText={text => setPassword(text)}
          placeholder="Senha"
        />

        <ButtonAction onPress={registerUser} text="Cadastrar" />

        <TouchableOpacity
          style={styles.wrapperGoLogin}
          onPress={handleLoginNavigation}
          title="Já tem uma conta? Entrar">
          <Text style={styles.textGoLogin}>Já tem uma conta?</Text>
          <Text style={styles.buttonLink}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

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
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: '80%',
    paddingLeft: 10,
  },
  choosePick: {
    width: 120,
    height: 120,
    borderRadius: 40,
    marginVertical: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  pickImageText: {
    color: 'blue',
    marginVertical: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 40,
    marginVertical: 10,
    marginBottom: 20,
  },
  wrapperGoLogin: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 10,
  },
  textGoLogin: {
    color: 'gray',
  },
  buttonLink: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
