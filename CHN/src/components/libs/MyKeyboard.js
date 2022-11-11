import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

export const useKeyboard = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const listner = [];

  function onKeyboardDidShow(e: KeyboardEvent) {
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    listner[0] = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    listner[1] = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    
    return () => {
      listner[0].remove();
      listner[1].remove();
      // Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      // Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  }, []);

  return keyboardHeight;
};
