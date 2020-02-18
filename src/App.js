/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

class App extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
      text: visible ? TEXT_OK : TEXT_ERROR,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.center}>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.viewMargin}>
              <View>
                <Text>{this.state.text}</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <TouchableHighlight
            visible={!this.state.modalVisible}
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Text>Detect Camera Permissions</Text>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewMargin: {
    marginTop: 122,
  },
  view: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TEXT_OK = 'Permissions to camera are granted';
const TEXT_ERROR =
  'Permissions to camera are not granted, allow please the application to use camera';

export default App;
