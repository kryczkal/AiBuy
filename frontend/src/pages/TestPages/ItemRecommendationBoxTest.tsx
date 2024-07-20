import React from 'react';

import ItemRecommendationBox from 'src/components/ItemRecommendation/ItemRecommendationBox';

const ItemRecommendationTest = () => {
  return <ItemRecommendationBox
    itemName="Test Item"
    itemDesc="Test Description"
    itemPros={['Pro 1', 'Pro 2']}
    itemCons={['Con 1', 'Con 2']}
         />;
};

export default ItemRecommendationTest;
