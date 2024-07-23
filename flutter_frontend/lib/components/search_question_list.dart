import 'package:flutter/material.dart';
import 'package:flutter_frontend/components/search_question.dart';

class SearchQuestionList extends StatefulWidget {
  const SearchQuestionList({
    super.key,
    required this.questions,
    required this.onAllAnswered,
  });

  final List<String> questions;
  final void Function(Map<String, String>) onAllAnswered;

  @override
  State<SearchQuestionList> createState() => _SearchQuestionListState();
}

class _SearchQuestionListState extends State<SearchQuestionList> {
  // Declare answers as a list of question answer pairs
  Map<String, String> answers = {};

  void handleAnswer(String answer, int index) {
    setState(() {
      answers[widget.questions[index]] = answer;
      widget.questions.removeAt(index);

      if (widget.questions.isEmpty) {
        print(answers.toString());
        widget.onAllAnswered(answers);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: widget.questions.length,
      itemBuilder: (context, index) {
        return SearchQuestion(
          question: widget.questions[index],
          onAnswer: (answer) => handleAnswer(answer, index),
        );
      },
    );
  }
}
