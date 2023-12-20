import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../assets/constants/Color';

const Star = ({ filled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Ionicons
      name={filled ? 'star' : 'star'}
      size={40}
      color={filled ? 'gold' : COLORS.lightgray}
    />
  </TouchableOpacity>
);

export default Star;
