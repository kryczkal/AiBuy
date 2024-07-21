import { ItemRecommendationBoxData } from 'src/models/ItemRecommendationBoxData';

export interface ProcessQueryResult {
  status : string;
  questions : string[];
  components : ItemRecommendationBoxData[];
}
