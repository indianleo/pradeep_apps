package com.swayamcab;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // Import this for splash screen
import android.os.Bundle; // Import this for splash screen

public class MainActivity extends ReactActivity {

  // Add this method for splashscreen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
      //SplashScreen.show(this);
      super.onCreate(savedInstanceState);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "swayamCab";
  }
}
