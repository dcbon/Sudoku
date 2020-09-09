import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

export default ({route}) => {
  const navigation = useNavigation();
  const { name, level } = route.params

  const toHome = () => {
    navigation.navigate("HomeScreen")
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Congratulations! You Win!</Text>
      <Text p>Name: {name}</Text>
      <Text p>Level: {level}</Text>
      <Button 
        color="#d08d85"
        title="Back to Home"
        onPress={toHome}
        style={styles.btn}
      >Back to Home</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginVertical: 40
  },
  btn: {
    marginVertical: 40
  }
})
