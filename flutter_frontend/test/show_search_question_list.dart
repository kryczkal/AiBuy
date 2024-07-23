import 'package:flutter/material.dart';
import 'package:flutter_frontend/components/search_question_list.dart';

void main() {
  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: SearchQuestionList(
            questions: const [
              'What do you need help with?',
              'What is your budget?',
              'What is your location?',
            ],
            onAllAnswered: (answer) {
              print('The user answered: $answer');
            },
          ),
        ),
      ),
    ),
  );
}
