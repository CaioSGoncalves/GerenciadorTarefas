import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import io from 'socket.io-client';
import {API_HOST} from 'react-native-dotenv';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getCurrentPosition} from 'react-native-geolocation-service';

import Camera from './Camera';
import api from '../services/api';

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState([true]);
  const [displayCamera, setDisplayCamera] = useState(false);
  const [taskToComplete, setTaskToComplete] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
      const socket = io(API_HOST);
      socket.on('update', async () => {
        setReload(true);
      });
    }
    handleSocket();
  }, []);

  async function handleFazer(task) {
    await setDisplayCamera(true);
    await setTaskToComplete(task);
  }

  function handleCompletarTask(childData) {
    setDisplayCamera(false);
    setModalVisible(true);

    // getCurrentPosition(
    //   (position) => {
    //       alert(position);
    //   },
    //   (error) => {
    //       // See error code charts below.
    //       alert(error.code, error.message);
    //   },
    //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );

    setTimeout(() => {
      const formData = new FormData();
      formData.append('file', {
        uri: childData,
        type: 'image/jpeg', // or photo.type
        name: `task_${taskToComplete.id}.jpeg`,
      });
      const response = api
        .post(`/tarefas/${taskToComplete.id}/completar`, formData)
        .then(() => {
          setTaskToComplete({...taskToComplete, success: true});
        })
        .catch(err => {
          setTaskToComplete({...taskToComplete, error: true});
        });
    }, 3000);
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.modalExt}>
          <View style={styles.modalInt}>
            <Text style={{fontSize: 22, fontWeight: 'bold'}}>Aguarde ...</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 14, paddingLeft: 10, marginRight: 30}}>
                Enviando resolucão de tarefa: "{taskToComplete.titulo}"
              </Text>

              <View style={{marginRight: 20}}>
                {!taskToComplete.success && !taskToComplete.error && (
                  <ActivityIndicator size={30} color="#00e0ff" />
                )}

                {taskToComplete.success && (
                  <Icon name="check-circle" size={30} color="#78e5d5" />
                )}
                {taskToComplete.error && (
                  <Icon name="highlight-off" size={30} color="#e57878" />
                )}
              </View>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#FFF',
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {displayCamera ? (
        <Camera parentCallback={handleCompletarTask} />
      ) : (
        <View style={styles.interior}>
          <Text style={styles.titulo}>Tarefas</Text>
          {tasks.length > 0 ? (
            <ScrollView style={styles.taskList}>
              {tasks.map(task => (
                <View key={task.id} style={styles.taskCard}>
                  <Text style={styles.taskTitle}>{task.titulo}</Text>
                  <TouchableOpacity
                    onPress={() => handleFazer(task)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Fazer</Text>
                  </TouchableOpacity>
                </View>
              ))}
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

  modalExt: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },

  modalInt: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    height: 140,
    borderRadius: 4,
  },

  modalButton: {
    backgroundColor: '#2D547E',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
