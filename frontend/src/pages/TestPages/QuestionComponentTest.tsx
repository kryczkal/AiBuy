import QuestionComponent from '../../components/QuestionComponent/QuestionComponent';

const ItemRecommendationTest = () => {
  return <QuestionComponent
    question={'Test Question'}
    onAnswerChange={(answer: string) => console}
         />;
};

export default ItemRecommendationTest;
