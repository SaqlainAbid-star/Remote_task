import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/constants/Color';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../features/chatSlice/chatSlice';

const ChatHeader = () => {

  const userId = 1;
  const receiverId = 2;
  const roomId = 123;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setModalVisible(false);
    });

    return unsubscribe;
  }, [navigation]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleButtonClick = (buttonLabel) => {
    Alert.alert(
      `${buttonLabel}`,
      `Notify Charlie that you are ${buttonLabel} with the task?`,
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => sendStatus(buttonLabel),
        },
      ],
      { cancelable: false }
    );
  };


  const sendStatus = (buttonLabel) => {

    const date = new Date();

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;

    let msgData = {
      roomId: roomId,
      message: `You requested to ${buttonLabel} with the task.`,
      from: userId,
      to: receiverId,
      sendTime: `${month} ${day}, ${year} - ${hours}:${minutes} ${ampm}`,
      msgType: 'status',
    };

    dispatch(addMessage(msgData));

  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.white}
        translucent={false}
      />
      <Ionicons
        style={{
          marginHorizontal: 10,
        }}
        name="arrow-back"
        size={25}
        color={COLORS.black}
      />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text
          numberOfLines={1}
          style={{
            color: COLORS.black,
            fontSize: 20,
            // fontWeight: "bold",
            fontFamily: 'Roboto-Medium',
            textTransform: 'capitalize',
          }}>
          Charlie
        </Text>

      </View>


      <TouchableOpacity onPress={toggleModal}>
        <Ionicons
          style={{ marginHorizontal: 10, color: COLORS.black }}
          name="document-outline"
          size={25}
        />
      </TouchableOpacity>

      <Ionicons
        style={{
          marginHorizontal: 10,
          color: COLORS.black,
        }}
        name="videocam-outline"
        size={25}
      />


      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigation.navigate('Req')}
            >
              <Text style={{ color: COLORS.theme }}>Req</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleButtonClick('Pause')}
            >
              <Text style={{ color: COLORS.theme }}>Pause</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleButtonClick('relieve')}
            >
              <Text style={{ color: COLORS.theme }}>Relieve</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleButtonClick('proceed')}
            >
              <Text style={{ color: COLORS.theme }}>Proceed</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.disabledButton}
              onPress={() => navigation.navigate('Invoice')}
              // disabled
            >
              <Text style={{ color: COLORS.liteBlack }}>Invoice</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.disabledButton}
              onPress={() => navigation.navigate('TaskDetails')}
              // disabled
            >
              <Text style={{ color: COLORS.liteBlack }}>Complete</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: COLORS.white,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 20,
  },
  modalButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fef3e6",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f6f7fb",
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatHeader;
