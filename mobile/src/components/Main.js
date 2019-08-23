import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import io from 'socket.io-client';


import Camera from './Camera';
import api from '../services/api';


export default function Main() {
    const [ tasks, setTasks ] = useState([]);
    const [ reload, setReload ] = useState([true]);
    const [ displayCamera, setDisplayCamera] = useState(false);
    const [ taskToComplete, setTaskToComplete] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const response = await api.get('/tarefas');
            setTasks(response.data);
            setReload(false);
        }
        loadTasks();
    }, [reload]);

    useEffect(() => {

        async function handleSocket() {
            const socket = io('http://192.168.0.15:3333');
            socket.on('update', async () => {
              setReload(true);
            });
        }
        handleSocket();
    }, []);

    async function handleFazer(taskId) {
      await setDisplayCamera(true);
      await setTaskToComplete(taskId);
      // if (this.camera) {
      //   const options = { quality: 0.5, base64: true };
      //   const data = await this.camera.takePictureAsync(options);
  
      //   alert(data.uri);
      // }
        // const response = await api.post(`/tarefas/${taskId}/completar`);
    }

    async function handleCompletarTask(childData) {
      setDisplayCamera(false);
      
      const formData = new FormData();
      formData.append('file', {
        uri: childData,
        type: 'image/jpeg', // or photo.type
        name: `task_${taskToComplete}.jpeg`
      });

      const response = await api.post(`/tarefas/${taskToComplete}/completar`, formData)
        .catch(err => alert(err));
      ;
    }

  return (
    <View style={styles.container}>

      { displayCamera ? (
        <Camera parentCallback={handleCompletarTask}/>
      ) : (
        <View style={styles.interior}>
            <Text style={styles.titulo}>Tarefas</Text>
            { tasks.length > 0 ?(
                <ScrollView style={styles.taskList}>
                { tasks.map(task => (
                    <View key={task.id} style={styles.taskCard}>
                        <Text style={styles.taskTitle}>{task.titulo}</Text>
                        <TouchableOpacity onPress={() => handleFazer(task.id)} style={styles.button}>
                            <Text style={styles.buttonText}>Fazer</Text>
                        </TouchableOpacity>
                    </View>
                )) }
            </ScrollView>

            ) : (
                <Text style={styles.empty}>Acabou :)</Text>
            )}
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#2D547E',
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