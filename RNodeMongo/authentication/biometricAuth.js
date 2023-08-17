import React, { useEffect, useState } from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { isSensorAvailable, biometricAuthenticate } from 'react-native-biometrics';

const BiometricAuthentication = () => {
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  useEffect(() => {
    isSensorAvailable().then((result) => {
      setIsBiometricAvailable(result === 'Biometrics');
    });
  }, []);

  const authenticateWithBiometrics = async () => {
    try {
      const { success } = await biometricAuthenticate('Authenticate using your biometrics');
      if (success) {
        // Save authentication status to local storage
        await AsyncStorage.setItem('isAuthenticated', 'true');
        // You can navigate to the main app screen here
      } else {
        console.log('Biometric authentication failed');
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
    }
  };

  return (
    <View>
      <Text>Biometric Authentication</Text>
      {isBiometricAvailable ? (
        <Button title="Authenticate" onPress={authenticateWithBiometrics} />
      ) : (
        <Text>Biometric authentication not available on this device.</Text>
      )}
    </View>
  );
};

export default BiometricAuthentication;
