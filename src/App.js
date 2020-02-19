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
  Platform,
} from 'react-native';
import {check, request, RESULTS} from 'react-native-permissions';

class App extends Component {
  state = {
    checkModalVisible: false,
    doRequest: false,
    requestModalVisible: false,
    textCheck: 'INITIAL CHECK TEXT',
    textRequest: 'INITIAL REQUEST TEXT',
  };

  switchOffCheckModalVisible() {
    this.setState({
      checkModalVisible: false,
    });
  }

  switchOffRequestModalVisible() {
    this.setState({
      requestModalVisible: false,
    });
  }

  setCheckModalVisible(visible, checkResult) {
    this.setState({
      checkModalVisible: visible,
      doRequest: checkResult.doRequest,
      textCheck: checkResult.text,
    });
  }

  setRequestModalVisible(visible, requestResult) {
    this.setState({
      requestModalVisible: visible,
      textRequest: requestResult,
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.center}>
        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.checkModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.center}>
              <Text>{this.state.textCheck}</Text>

              <TouchableHighlight
                onPress={async () => {
                  this.switchOffCheckModalVisible();
                  if (this.state.doRequest) {
                    let result = await requestCamera();
                    this.setRequestModalVisible(true, result);
                  }
                }}>
                <Text>
                  {this.state.doRequest
                    ? 'Request camera access'
                    : 'Hide Modal'}
                </Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.requestModalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.center}>
              <Text>{this.state.textRequest}</Text>

              <TouchableHighlight
                onPress={() => {
                  this.switchOffRequestModalVisible();
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </Modal>

          <TouchableHighlight
            visible={!this.state.checkModalVisible}
            onPress={async () => {
              let result = await checkCamera();
              this.setCheckModalVisible(true, result);
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

const PERMISSIONS_CAMERA_REQUEST =
  Platform.OS === 'ios' ? 'ios.permission.CAMERA' : 'android.permission.CAMERA';

async function checkCamera() {
  let result;
  try {
    result = await check(PERMISSIONS_CAMERA_REQUEST);
  } catch (e) {
    console.log('==========Error during Camera check service: ' + e);
  }
  console.log('==========result: ' + result);
  console.log(result);
  switch (result) {
    case RESULTS.UNAVAILABLE:
      return {
        text:
          'This feature is not available (on this device / in this context)',
        doRequest: false,
      };
    case RESULTS.DENIED:
      console.log('======Inside check switch');
      return {
        text:
          'The permission has not been requested / is denied but requestable',
        doRequest: true,
      };
    case RESULTS.GRANTED:
      return {
        text: 'The permission is granted',
        doRequest: false,
      };
    case RESULTS.BLOCKED:
      return {
        text: 'The permission is denied and not requestable anymore',
        doRequest: false,
      };
    default:
      return {
        text: 'ERROR - No known code allocated',
        doRequest: false,
      };
  }
}

async function requestCamera() {
  let result;
  try {
    result = await request(PERMISSIONS_CAMERA_REQUEST);
  } catch (e) {
    console.log('==========Error during Camera request service: ' + e);
  }
  console.log('==========result of request: ' + result);
  console.log(result);

  return 'result: ' + result;
}

export default App;
