import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TextInput, View, StyleSheet, Text, Dimensions } from 'react-native';
import { Button } from 'galio-framework';
import { validateBoard, solveBoard } from "../store/actions";
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get("window").width;

const Board = ({name, level}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const { initBoard, validation, solvedBoard } = useSelector(state => state)
  const [board, setBoard] = useState()

  useEffect(() => {
    setBoard(initBoard)
  }, [initBoard])

  const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

  const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

  const handleInput = (value, row, col) => {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[row][col] = Number(value);
    setBoard(newBoard);
  };

  const clear = () => {
    setBoard(initBoard)
  }

  const solve = async () => {
    try {
      const payload = await encodeParams(board)
      await dispatch(solveBoard(payload))
      setBoard(solvedBoard)
    }
    catch (err) {
      console.log('err', err)
    }
  }

  const finished = () => {
    navigation.navigate("FinishScreen", {
      name,
      level
    })
  }
  

  const validate = () => {
    const payload = encodeParams(board)
    dispatch(validateBoard(payload))
    alert(validation)
    if (validation == 'solved') {
      finished()
    }
  }
  
  return (
    <View style={styles.container}>
      {
        board && board.map((row, rowIdx) => {
          return (
            <View style={styles.rowStyle} key={rowIdx}>
              {
                row.map((col, colIdx) => {
                  return (
                    <TextInput
                      key={colIdx}
                      style={[styles.colStyle, initBoard[rowIdx][colIdx] != 0 ? styles.initValue : styles.updValue ]}
                      keyboardType='numeric'
                      maxLength={1}
                      value={col == 0 ? "" : String(col)}
                      numericValue
                      textAlign="center"
                      onChangeText={(value) => handleInput(value, rowIdx, colIdx)}
                      editable={initBoard[rowIdx][colIdx] == 0}
                    />
                  )
                })
              }
            </View>
          )
        })
      }
      <View style={styles.btn}>
        <Button onPress={validate} round size="small" color="#d08d85" title="Validate">Validate</Button>
        <Button onPress={solve} round size="small" color="#d08d85" title="Solve">Solve</Button>
        <Button onPress={clear} round size="small" color="#d08d85" title="Clear">Clear</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  rowStyle: {
    flexDirection: 'row',
    marginVertical: 17
  },
  colStyle: {
    borderColor: '#808080', 
    borderWidth: 1, 
    width: (windowWidth - 20) / 10,
    height: (windowWidth - 20) / 10,
    fontSize: 20
  },
  initValue: {
    color: '#d08d85'
  },
  updValue: {
    color: '#808080'
  },
  btn: {
    marginTop: 25,
    flexDirection: "row",
    alignContent: "space-around"
  }
});

export default Board
