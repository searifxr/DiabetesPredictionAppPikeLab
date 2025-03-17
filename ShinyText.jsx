import React, { useEffect, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import MaskedView from '@react-native-masked-view/masked-view';

const ShinyText = ({ text, disabled = false, speed = 3, style = {} }) => {
  const shineAnimation = useSharedValue(0);

  useEffect(() => {
    if (!disabled) {
      shineAnimation.value = withRepeat(
        withTiming(1, {
          duration: speed * 1000,
          easing: Easing.linear,
        }),
        -1,
        false
      );
    }
  }, [shineAnimation, speed, disabled]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: shineAnimation.value * 300 - 150, // Adjust width based on the length of the text
      },
    ],
  }));

  return (
    <View style={[styles.container, style]}>
      <MaskedView
        style={{ flexDirection: 'row', height: '100%' }}
        maskElement={
          <View style={styles.maskedTextContainer}>
            <Text style={[styles.text, style]}>{text}</Text>
          </View>
        }
      >
        <Text style={[styles.text, style]}>{text}</Text>
        {!disabled && (
          <Animated.View style={[styles.shine, animatedStyle]}>
            <View style={styles.gradient}>
              <View style={styles.gradientInner} />
            </View>
          </Animated.View>
        )}
      </MaskedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  maskedTextContainer: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black', // Adjust this color to match the shiny effect
  },
  shine: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
  },
  gradient: {
    flex: 1,
    width: 30, // Narrower width to make the shine effect more subtle
    height: '100%',
  },
  gradientInner: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // More transparent color for subtle effect
    opacity: 0.2,
  },
});

export default ShinyText;
