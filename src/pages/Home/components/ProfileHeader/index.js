import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileHeader = ({ name, profilePicture, handleLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userContainer}>
        <Image style={styles.profileImage} source={{ uri: profilePicture }} />
        <View style={styles.profileName}>
          <Text style={styles.text}>Olá, {name}</Text>
          <Text style={styles.textSmall}>Vamos começar!</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../../../../assets/images/logo.png')}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.textLogout}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  profileImage: {
    width: 68,
    height: 68,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
  },
  logoImage: {
    width: 90,
    height: 30,
  },
  profileName: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  textSmall: {
    color: 'gray',
    fontSize: 13,
    fontWeight: 'normal',
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textLogout: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#FFC10F',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 10,
  },
});

export default ProfileHeader;
