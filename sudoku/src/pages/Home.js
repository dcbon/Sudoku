import React, { useState, useEffect } from 'react'
import { View , StyleSheet, Alert } from 'react-native'
import { Text, Button, Input, Block, Checkbox } from 'galio-framework';


export default ({navigation}) => {
  const [name, setName] = useState()  
  const [level, setLevel] = useState()
  const [ready, setReady] = useState(false)
  const [nameInserted, setNameInserted] = useState(false)
  const [countdown, setCountdown] = useState()

  useEffect(() => {
    if (name) setNameInserted(true)
    if (!name) setNameInserted(false)
    if (name && level) {
      setNameInserted(false)
      setReady(true)
    }
    if (level == "easy") setCountdown(60 * 10)
    else if (level == "medium") setCountdown(60 * 15)
    else if (level == "hard") setCountdown(60 * 20)
  }, [name, level])

  const startPlay = () => {
    if (!name && !level) Alert.alert('Name and Level are required!')
    else if (!name) Alert.alert('Please input your name')
    else if (!level) Alert.alert('Please choose the difficulty')
    else {
      navigation.navigate("GameScreen", {
        name,
        level,
        countdown
      })
    }
    setLevel()
  }
  

  return (
    <View style={styles.container}>
      <Text h2 style={{marginVertical: 25}}>Sugoku</Text>
      {
        nameInserted && <Text p color="rgb(30, 30, 30)" style={styles.info}>Welcome {name}, Please choose the difficulty</Text>
      }
      {
        !name && <Text p color="rgb(30, 30, 30)" style={styles.info}>Input your name and choose your level to start playing</Text>
      }
      {
        ready && <Text p color="rgb(30, 30, 30)" style={styles.info}>All set! Press 'Start' to continue</Text>
      }
      <Input 
        placeholder="Player Name"
        style={{ borderColor: "#d08d85" }}
        placeholderTextColor="#d08d85"
        bgColor="rgb(242, 242, 242)"
        color="#d08d85"
        right
        icon="user"
        family="evilicons"
        iconSize={30}
        rounded
        onChangeText={(input) => setName(input)}
        value={name ? name : ''}
      />
      {/* <Block fluid space="between" style={styles.block}>
        <Block top fluid middle row space="around">
          <Checkbox style={styles.mr} checkboxStyle={{borderColor: "#d08d85"}} onChange={() => setLevel("easy")} label="Easy" />
          <Checkbox checkboxStyle={{borderColor: "#d08d85"}} onChange={() => setLevel("medium")} label="Medium" />
        </Block>
        <Block bottom fluid middle row space="around" style={{marginTop: 10}}>
          <Checkbox style={styles.mr} checkboxStyle={{borderColor: "#d08d85"}} onChange={() => setLevel("hard")} label="Hard" />
          <Checkbox checkboxStyle={{borderColor: "#d08d85"}} onChange={() => setLevel("random")} label="Random" />
        </Block>
      </Block> */}
      {/* <Text>:</Text> */}
      <Block fluid middle row space="evenly">
        <Button onPress={() => setLevel("easy")} disabled={level == "easy"} round size="small" color={level == "easy" ? "#808080" : "#d08d85"} title="Easy">Easy</Button>
        <Button onPress={() => setLevel("medium")} disabled={level == "medium"} round size="small" color={level == "medium" ? "#808080" : "#d08d85"} title="Medium">Medium</Button>
      </Block>
      <Block fluid middle row space="evenly">
        <Button onPress={() => setLevel("hard")} disabled={level == "hard"} round size="small" color={level == "hard" ? "#808080" : "#d08d85"} title="Hard">Hard</Button>
        <Button onPress={() => setLevel("random")} disabled={level == "random"} round size="small" color={level == "random" ? "#808080" : "#d08d85"} title="Random">Random</Button>
      </Block>
        
      <Button 
        onPress={startPlay} 
        round 
        size="large" 
        color="#d08d85"
        title="Go to Game Screen"
      >Start</Button>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  block: {
    // marginVertical: 20
  },
  info: {
    textAlign: "center",
    padding: 10
  },
  mr: {
    marginRight: 10
  }
});