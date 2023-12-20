import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import { COLORS } from '../assets/constants/Color';

const { width } = Dimensions.get('window');

const Status = props => {
    const { sender, item } = props;

    return (
        <TouchableOpacity style={{ marginVertical: 0 }}>

            <View
                style={styles.statusBox}>
                <Text
                    style={{
                        color: COLORS.theme,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                    }}>
                    {item.message}
                </Text>
                <Text
                    style={{
                        marginTop: 2,
                        color: COLORS.liteBlack,
                        fontFamily: 'Roboto-Medium',
                        fontSize: 11,
                    }}>
                    {item.sendTime}
                </Text>
            </View>

        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    statusBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: '#f6f7fb',
        borderColor: COLORS.liteBlack,
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
});

export default Status;
