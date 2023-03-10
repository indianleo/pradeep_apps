import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const showSubs = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubs = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    
    return () => {
      showSubs.remove()
      hideSubs.remove();
    };
  }, []);

  return keyboardHeight;
};
