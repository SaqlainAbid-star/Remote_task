import React, { useEffect } from 'react';
import {
    Alert,
    FlatList,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../features/chatSlice/chatSlice';
import MsgComponent from '../components/MsgComponent';
import { COLORS } from '../assets/constants/Color';
import ChatHeader from '../components/ChatHeader';
import Status from '../components/Status';

const Chat = props => {

    const userId = 1;
    const receiverId = 2;
    const roomId = 123;

    const [msg, setMsg] = React.useState('');
    const [disabled, setdisabled] = React.useState(false);

    const dispatch = useDispatch();
    const messages = useSelector(state => state.chat.messages);



    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;

    const sendMsg = () => {
        if (msg == '' || msgvalid(msg) == 0) {
            Alert.alert('Enter something....');
            return false;
        }
        // setdisabled(true);

        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        const formattedHours = hours % 12 || 12;
        const formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;

        let msgData = {
            roomId: roomId,
            message: msg,
            from: userId,
            to: receiverId,
            sendTime: formattedTime,
            msgType: 'text',
        };

        dispatch(addMessage(msgData));
        setMsg('');

        console.log("67", msgData);

    };


    const uploadImage = async () => {
       
    };

    return (
        <SafeAreaView style={styles.container}>
            <ChatHeader />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: COLORS.white,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderTopColor: COLORS.lightgray,
                        borderBottomColor: COLORS.lightgray,
                    }}
                >
                    <FlatList
                        style={{ flex: 1, margin: 15, }}
                        data={messages}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        inverted={false}
                        renderItem={({ item }) =>
                            item.msgType === "status" ? <Status sender={item.from === userId} item={item} /> : <MsgComponent sender={item.from === userId} item={item} />
                        }
                    />
                </View>

                <View
                    style={{
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingTop: 8,
                        paddingBottom: 15,
                        justifyContent: 'space-evenly',
                        paddingHorizontal: 10,
                    }}>
                    <TouchableOpacity disabled={disabled} onPress={uploadImage}>
                        <Ionicons color={COLORS.black} name="attach-outline" size={28} />
                    </TouchableOpacity>

                    <TextInput
                        style={{
                            backgroundColor: '#f6f7fb',
                            width: '80%',
                            borderRadius: 25,
                            borderWidth: 0.5,
                            borderColor: COLORS.white,
                            paddingHorizontal: 15,
                            color: COLORS.black,
                            height: 48,
                        }}
                        placeholder="Send message"
                        placeholderTextColor={COLORS.liteBlack}
                        multiline={true}
                        numberOfLines={5}
                        value={msg}
                        onChangeText={val => setMsg(val)}
                    />



                    <TouchableOpacity disabled={disabled} onPress={sendMsg}>
                        <Ionicons
                            color={COLORS.black}
                            name="paper-plane-outline"
                            size={25}
                        />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

});

export default Chat;
