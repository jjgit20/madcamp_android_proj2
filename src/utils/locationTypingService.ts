const FOOD_TYPES = [
  'restaurant',
  'food',
  'cafe',
  'bakery',
  //   'pharmacy',
  'meal_delivery',
  //   'hospital',
  //   'health',
  'meal_takeaway',
];
const TRANSPORT_TYPES = [
  'intersection',
  'airport',
  'bus_station',
  'gas_station',
  'subway_station',
  'train_station',
  'transit_station',
  'light_rail_station',
];
const LANDMARK_TYPES = [
  'tourist_attraction',
  'art_gallery',
  'casino',
  'museum',
  'library',
  'campground',
  'church',
  'cemetery',
  'embassy',
  'mosque',
];
const SHOP_TYPES = [
  'department_store',
  'store',
  'spa',
  'electronics_store',
  'shopping_mall',
];

export const getLocationType = (locationTypes: string[] | undefined) => {
  if (!locationTypes || locationTypes.length == 0) {
    return 'OTHER';
  }
  const locationType = locationTypes[0];
  if (FOOD_TYPES.includes(locationType)) {
    return 'FOOD';
  } else if (TRANSPORT_TYPES.includes(locationType)) {
    return 'TRANSPORT';
  } else if (LANDMARK_TYPES.includes(locationType)) {
    return 'LANDMARK';
  } else if (SHOP_TYPES.includes(locationType)) {
    return 'SHOP';
  } else if (locationType === 'point_of_interest') {
    return 'LANDMARK';
  } else {
    return 'OTHER';
  }
};
