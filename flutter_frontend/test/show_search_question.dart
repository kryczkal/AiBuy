import 'package:flutter/material.dart';
import 'package:flutter_frontend/components/search_question.dart';

void main() {
  onAnswer(String answer) {
    print('The user answered: $answer');
  }

  const question = 'What do you need help with?';

  final searchQuestion = SearchQuestion(
    question: question,
    onAnswer: onAnswer,
  );

  runApp(
    MaterialApp(
      home: Scaffold(
        body: Center(
          child: SizedBox(
            width: 400,
            child: searchQuestion,
          ),
        ),
      ),
    ),
  );
}
