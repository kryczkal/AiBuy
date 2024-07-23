import 'package:flutter/material.dart';
import 'package:flutter_frontend/components/search_page_title.dart';

class SearchPage extends StatelessWidget {
  const SearchPage({super.key});

  static const String title = 'AI Shopping Assistant';
  static const String subtitle =
      'Describe what you need and we\'ll find the\n perfect solution';
  static const String hintText = 'What do you need help with?';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const SearchPageTitle(title: title, subtitle: subtitle),
            const SizedBox(height: 30),
            SearchAnchor.bar(
                barHintText: hintText,
                viewConstraints: const BoxConstraints(
                  maxHeight: 300,
                ),
                suggestionsBuilder:
                    (BuildContext context, SearchController controller) {
                  return [];
                }),
          ],
        ),
      ),
    );
  }
}
