import { useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Stack } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Index() {
  const [todo, setTodo] = useState('')
  const [todoList, setTodoList] = useState<{id: number; text: string}[]>([])

  const addTodo = () => {
    if (todo?.trim() === "") return

    setTodoList([
      ...todoList,
      { id: Math.random(), text: todo }
    ])
    setTodo('')
  }

  const deleteTodo = (id: number) => {
    setTodoList(todoList.filter(todo => todo.id !== id))
  }

  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          // headerStyle: { backgroundColor: 'white' },
          headerLeft: () => (<></>),
          headerRight: () => (<></>),
          headerTitle: 'Notes App'
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={e => setTodo(e)}
        value={todo}
        placeholder="Enter Todo"
      />
      <Button title="Add" color={'blue'} onPress={addTodo} />

      <ScrollView horizontal style={{marginTop: 40}}>
        {todoList.map((todo, index) => (
          <View key={index} style={styles.todoItem}>
            <Text>{todo.text}</Text>
            <Pressable onPress={() => deleteTodo(todo.id)}>
              
            <AntDesign name="delete" size={24} color="black" />
            </Pressable>
          </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  todoItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'gray',
    minHeight: 100,
    width: 150,
    marginHorizontal: 5
  }
});
