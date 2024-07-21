from langchain.schema import BaseOutputParser

class NumberEndingOutputParser(BaseOutputParser):
    def __init__(self):
        super().__init__()

    def parse(self, text):
        if text.strip()[-1].isdigit():
            return text[-1]
        else:
            raise ValueError("Output does not end with a number.")
