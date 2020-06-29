import 'package:flutter/material.dart';
import 'package:esys_flutter_share/esys_flutter_share.dart';
import 'dart:async';

import 'package:flutter/services.dart';
import 'package:flutter_share/flutter_share.dart';
import 'package:flutter_document_picker/flutter_document_picker.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Share IN'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  Future<void> send() async {
    // final ByteData bytes = await rootBundle.load('assets/image1.png');
    // await Share.file('esys image', 'esys.png', bytes.buffer.asUint8List(), 'image/png');
    await FlutterShare.share(
      title: 'Example share',
      text: 'Example share text',
      linkUrl: 'https://flutter.dev/',
      chooserTitle: 'Example Chooser Title'
    );
  }

  Future<void> shareFile() async {
      //List<dynamic> docs = await FlutterDocumentPicker.openDocument();
      final docs = await FlutterDocumentPicker.openDocument();
      if (docs == null || docs.isEmpty) return null;

      await FlutterShare.shareFile(
        title: 'Example share',
        text: 'Example share text',
        filePath: docs[0] as String,
      );
  }

  void _test() {
    setState(() {
      _counter++;
    });
  }

  void _recieve() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FloatingActionButton(
              onPressed: send,
              tooltip: 'Send',
              child: Text("Send"),
            ),
            FloatingActionButton(
              onPressed: send,
              tooltip: 'Share File',
              child: Text("Share"),
            ),
            FloatingActionButton(
              onPressed: _test,
              tooltip: 'Recieve',
              child: Icon(Icons.add),
            ),
            FloatingActionButton(
              onPressed: _test,
              tooltip: 'Local',
              child: Text("Local"),
            ),
            FloatingActionButton(
              onPressed: _test,
              tooltip: 'Videos',
              child: Icon(Icons.add),
            ),
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
