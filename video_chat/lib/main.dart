import 'package:flutter/material.dart';
import 'package:video_chat/login.dart';
import './welcome.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Welcome(title: 'Flutter Demo Home Page'),
      routes: <String, WidgetBuilder> {
        '/welcome': (BuildContext context) => Welcome(title: "Welcome Pradeep"),
        '/login': (BuildContext context) => Login(title: "Login Page"),
      },
    );
  }
}