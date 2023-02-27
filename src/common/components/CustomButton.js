import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, Platform} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import colors from '../Colors';

const styles = StyleSheet.create({
  solidButtonStyle: {
    height: moderateScale(50),
    width: '100%',
    borderRadius: moderateScale(100),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  solidTextStyle: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Regular',
    color: colors.defaultLight,
    paddingTop: Platform.OS === 'android' ? moderateScale(7) : moderateScale(0),
  },
  outlineButtonStyle: {
    height: moderateScale(50),
    width: '100%',
    borderRadius: moderateScale(100),
    backgroundColor: colors.defaultLight,
    borderColor: colors.primary,
    borderWidth: moderateScale(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineTextStyle: {
    textAlign: 'center',
    fontSize: moderateScale(15),
    fontFamily: 'Poppins-Regular',
    color: colors.primary,
    paddingTop: Platform.OS === 'android' ? moderateScale(7) : moderateScale(0),
  },
});
export const CustomButton = ({
  type,
  disableButton,
  buttonStyle,
  onPress,
  textStyle,
  title,
}) => {
  const disableButtonStyle = disableButton === true ? {opacity: 0.35} : {};

  if (type === 'solid') {
    return (
      <TouchableOpacity
        style={{
          ...styles.solidButtonStyle,
          ...buttonStyle,
          ...disableButtonStyle,
        }}
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disableButton}>
        <Text style={{...styles.solidTextStyle, ...textStyle}}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{...styles.outlineButtonStyle, ...buttonStyle, ...disableButton}}
      onPress={onPress}
      disabled={disableButton}>
      <Text style={{...styles.outlineTextStyle, ...textStyle}}>{title}</Text>
    </TouchableOpacity>
  );
};
