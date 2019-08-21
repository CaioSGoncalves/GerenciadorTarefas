import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';


export default function Main() {
    const [ tasks, setTasks ] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const response = await api.get('/tarefas');
            setTasks(response.data);
        }
        loadTasks();
    }, []);

    useEffect(() => {

        async function handleSocket() {
            const socket = io('http://192.168.0.15:3333');
            socket.on('update', async () => {
                const response = await api.get('/tarefas');
                setTasks(response.data);
            });
        }
        handleSocket();
    }, []);

    async function handleCompletarTask(taskId) {
        const response = await api.put('/tarefas', { id: taskId });
    }

  return (
    <View style={styles.container}>
        <View style={styles.interior}>
            <Text style={styles.titulo}>Tarefas</Text>

            { tasks.length > 0 ?(
                <ScrollView style={styles.taskList}>
                { tasks.map(task => (
                    <View key={task.id} style={styles.taskCard}>
                        <Text style={styles.taskTitle}>{task.titulo}</Text>
                        <TouchableOpacity onPress={() => handleCompletarTask(task.id)} style={styles.button}>
                            <Text style={styles.buttonText}>Fazer</Text>
                        </TouchableOpacity>
                    </View>
                )) }
            </ScrollView>

            ) : (
                <Text style={styles.empty}>Acabou :)</Text>
            )}
            
            
        </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#7159c1',
  },

  titulo: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20,
    marginBottom: 20,
  },

  interior: {
      marginHorizontal: 20,
      marginVertical: 20,
  },  

  taskList: {
    //   flexDirection: 'column-reverse',
  },

  taskCard: {
    borderStyle: 'solid',
    borderColor: '#FFF',
    borderWidth: 2,
    marginVertical: 14,
    width: 300,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  taskTitle: {
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 4,
  },

  button: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },

  buttonText: {
    padding: 8,
  },

  empty: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 20,
  },

});