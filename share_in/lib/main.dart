import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:io';
import './welcome.dart';
Socket socket;
void main() {
  Socket.connect("localhost", 4567).then((Socket client){
      socket = client;
      socket.listen(dataHandler,
        onError: errorHandler,
        onDone: doneHandler,
        cancelOnError: false
      );
  }).catchError((AsyncError e){
      print("Unable to connect: $e");
  });
  runApp(MyApp(socket));
}

void dataHandler(data) {
  print(new String.fromCharCodes(data).trim());
}

void errorHandler(error, StackTrace trace) {
    print(error);
}

void doneHandler() {
  socket.destroy();
}

class MyApp extends StatelessWidget {
  Socket channel;
  MyApp(Socket s) {
    this.channel = s;
  }
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Share IN',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: welcome(title: 'Share IN'),
    );
  }
}