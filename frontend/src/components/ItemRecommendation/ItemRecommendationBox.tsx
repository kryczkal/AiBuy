import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, CardMedia } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './ItemRecommendationBox.scss';

interface ItemRecommendationBoxProps {
  itemName: string;
  itemDesc: string;
  itemPros: string[];
  itemCons: string[];
  itemImgUrl?: string;
}

const ItemRecommendationBox: React.FC<ItemRecommendationBoxProps> = ({ itemName, itemDesc, itemPros, itemCons, itemImgUrl }) => {
  return (
    <Card className="item-recommendation-box">
      {itemImgUrl && <CardMedia component="img" image={itemImgUrl} alt={itemName} />}
      <CardContent>
        <Typography variant="h5" component="div">{itemName}</Typography>
        <Typography variant="body2" color="text.secondary">{itemDesc}</Typography>
        <List dense>
          {itemPros.map((pro, index) => (
            <ListItem key={index}>
              <ListItemIcon><CheckCircleOutlineIcon className="pro-icon" /></ListItemIcon>
              <ListItemText primary={pro} />
            </ListItem>
          ))}
          {itemCons.map((con, index) => (
            <ListItem key={index}>
              <ListItemIcon><HighlightOffIcon className="con-icon" /></ListItemIcon>
              <ListItemText primary={con} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ItemRecommendationBox;
