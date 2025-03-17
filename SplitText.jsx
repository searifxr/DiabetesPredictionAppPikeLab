import React, { useEffect, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const AnimatedLetter = ({ letter, delay, animationFrom, animationTo, easing, onLetterAnimationComplete, textStyle }) => {
    const opacity = useSharedValue(animationFrom.opacity);
    const translateY = useSharedValue(animationFrom.translateY);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        opacity.value = withTiming(animationTo.opacity, { duration: 500, easing });
        translateY.value = withTiming(animationTo.translateY, { duration: 500, easing });
  
        if (onLetterAnimationComplete) onLetterAnimationComplete();
      }, delay);
  
      return () => clearTimeout(timeout);
    }, []);
  
    const animatedStyle = useAnimatedStyle(() => ({
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }));
  
    return <Animated.Text style={[textStyle, animatedStyle]}>{letter}</Animated.Text>;
  };
  

const SplitText = ({
  text = '',
  style = {},
  delay = 100,
  animationFrom = { opacity: 0, translateY: 40 },
  animationTo = { opacity: 1, translateY: 0 },
  easing = Easing.out(Easing.cubic),
  onLetterAnimationComplete,
}) => {
  const letters = text.split('');
  const animatedCount = useRef(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setInView(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {letters.map((letter, index) => (
        <AnimatedLetter
          key={index}
          letter={letter}
          delay={index * delay}
          animationFrom={animationFrom}
          animationTo={animationTo}
          easing={easing}
          textStyle={style}  // Pass the main text style
          onLetterAnimationComplete={() => {
            animatedCount.current += 1;
            if (animatedCount.current === letters.length && onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          }}
        />
      ))}
    </View>
  );
};


export default SplitText;
