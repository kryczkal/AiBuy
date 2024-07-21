import React from 'react';
import { Card, CardContent, Typography, Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './ProductRecommendationBoxComponent.scss'; // Import the SCSS for styling

interface ProductRecommendationBoxProps {
  productName: string;
  productPrice: string;
  productURL?: string;
  productPros: string[];
  productCons: string[];
  description: string;
}

const ProductRecommendationBoxComponent: React.FC<ProductRecommendationBoxProps> = ({
  productName,
  productPrice,
  productURL,
  productPros,
  productCons,
  description
}) => {
  return (
    <Card className="product-recommendation-box">
      <CardContent>
        <Typography variant="h5" component="div">{productName}</Typography>
        <Typography variant="h6" color="text.secondary">{productPrice}</Typography>
        {productURL && <Link href={productURL} target="_blank" rel="noopener">Visit Website</Link>}
        <Typography variant="body2" color="text.secondary">{description}</Typography>
        <div className="pros-cons-list">
          <List>
            {productPros.map((pro, index) => (
              <ListItem key={`pro-${index}`}>
                <ListItemIcon><ThumbUpAltIcon style={{ color: 'green' }} /></ListItemIcon>
                <ListItemText primary={pro} />
              </ListItem>
            ))}
            {productCons.map((con, index) => (
              <ListItem key={`con-${index}`}>
                <ListItemIcon><ThumbDownAltIcon style={{ color: 'red' }} /></ListItemIcon>
                <ListItemText primary={con} />
              </ListItem>
            ))}
          </List>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductRecommendationBoxComponent;

