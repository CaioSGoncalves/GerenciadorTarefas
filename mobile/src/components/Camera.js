import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


export default class components extends Component {

    takePicture = async () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          this.props.parentCallback(data.uri);
        }
      };

  render() {
    return (
        <View style={styles.container}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style = {styles.camera}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
              captureAudio={false}
              // permissionDialogTitle={'Permission to use camera'}
              // permissionDialogMessage={'We need your permission to use your camera phone'}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
              <Text style={styles.buttonText}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "black"
      },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center"
    },
    capture: {
        flex: 0,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20
    },
    buttonText: {
        fontSize: 14
    },
  
  });
