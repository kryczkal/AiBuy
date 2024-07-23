import 'package:flutter/material.dart';

/// A widget that displays a question, that the user should answer.
/// Has a [question] parameter that is required.
/// Has a [OnAnswer] parameter that is required.
class SearchQuestion extends StatefulWidget {
  const SearchQuestion({
    super.key,
    required this.question,
    required this.onAnswer,
  });

  final String question;
  final void Function(String) onAnswer;

  @override
  State<SearchQuestion> createState() => _SearchQuestionState();
}

class _SearchQuestionState extends State<SearchQuestion> {
  final TextEditingController _controller = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Card(
          elevation: 2,
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  widget.question,
                  textAlign: TextAlign.left,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _controller,
                  decoration: InputDecoration(
                    suffix: IconButton(
                      icon: const Icon(Icons.send),
                      onPressed: () {
                        widget.onAnswer(_controller.text);
                        _controller.clear();
                      },
                    ),
                    border: null,
                    hintText: 'Type your answer here',
                  ),
                  maxLines: null, // Allow the text field to expand vertically
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
