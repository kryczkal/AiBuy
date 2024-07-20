import React from 'react';
import { Stack } from '@mui/material';

import ItemRecommendationBox from './ItemRecommendationBox';

import { ItemRecommendationBoxData } from 'src/models/ItemRecommendationBoxData';

interface ItemRecommendationProps {
  items: ItemRecommendationBoxData[];
}

const ItemRecommendation: React.FC<ItemRecommendationProps> = ({ items }) => {
  return (
    <Stack spacing={2} direction="column">
      {items.map((item, index) => (
        <ItemRecommendationBox
          key={index}
          itemName={item.itemName}
          itemDesc={item.itemDesc}
          itemPros={item.itemPros}
          itemCons={item.itemCons}
          itemImgUrl={item.itemImgUrl}
        />
      ))}
    </Stack>
  );
};

export default ItemRecommendation;
