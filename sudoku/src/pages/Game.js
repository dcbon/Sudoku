import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { Block } from 'galio-framework'
import Board from '../components/Board'
import { genBoard } from "../store/actions";
import CountDown from 'react-native-countdown-component';

export default ({route}) => {
  const { name, level, countdown } = route.params
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(genBoard(level))
  }, [])

  const timesUp = () => {
    alert("Time's Up!")
  }
  

  return (
    <View style={styles.padd}>
      <Block flex fluid space="between" style={styles.statBar}>
        <Block top fluid>
          <Text>Name: {name}</Text>
          <Text>Difficulty: {level}</Text>
        </Block>
        <Block bottom fluid >
          <CountDown
            until={countdown}
            size={18}
            onFinish={timesUp}
            digitStyle={{backgroundColor: '#FFF'}}
            digitTxtStyle={{color: '#d08d85'}}
            timeToShow={['M', 'S']}
            timeLabels={{m: '', s: ''}}
            style={styles.cd}
        />
        </Block>
      </Block>
      <View style={styles.container}>
        <Board name={name} level={level} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  statBar: {
    marginBottom: 20
  },
  padd: {
    padding: 20
  },
  cd: {
    marginTop: 20
  }
});