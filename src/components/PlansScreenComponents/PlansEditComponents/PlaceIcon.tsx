import FOOD from '@src/assets/icons/category-food.svg';
import LANDMARK from '@src/assets/icons/category-landmark.svg';
import SHOP from '@src/assets/icons/category-shop.svg';
import TRANSPORT from '@src/assets/icons/category-transport.svg';
import OTHER from '@src/assets/icons/category-unknown.svg';
import React from 'react';

const PlaceIcon = ({
  type,
  customSize,
  customColor,
}: {
  type: string;
  customSize?: number;
  customColor?: string;
}) => {
  const iconSize = customSize ? customSize : 15;
  switch (type) {
    case 'FOOD':
      return (
        <FOOD
          width={iconSize}
          height={iconSize}
          fill={customColor ? customColor : '#FF6C29'}
        />
      );
    case 'TRANSPORT':
      return (
        <TRANSPORT
          width={iconSize}
          height={iconSize}
          fill={customColor ? customColor : '#0085FF'}
        />
      );
    case 'LANDMARK':
      return (
        <LANDMARK
          width={iconSize}
          height={iconSize}
          fill={customColor ? customColor : '#4B68FA'}
        />
      );
    case 'SHOP':
      return (
        <SHOP
          width={iconSize}
          height={iconSize}
          fill={customColor ? customColor : '#FF2121'}
        />
      );
    default:
      return (
        <OTHER
          width={iconSize}
          height={iconSize}
          fill={customColor ? customColor : '#000'}
        />
      );
  }
};

export default React.memo(PlaceIcon);
