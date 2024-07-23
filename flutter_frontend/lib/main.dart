import 'package:flutter/material.dart';
import 'pages/search_page.dart';

void main() {
  runApp(MaterialApp(
      home: const SearchPage(),
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      )));
}
