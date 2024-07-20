import QuestionComponent from '../../components/QuestionComponent/QuestionComponent';

const QuestionComponentTest = () => {
  return <QuestionComponent
    question={'Test Question'}
    onAnswerChange={(answer: string) => console}
         />;
};

export default QuestionComponentTest;
