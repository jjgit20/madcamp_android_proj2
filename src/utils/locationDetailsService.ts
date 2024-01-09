import axios from 'axios';

export const getLocationDetails = async (placeId: string) => {
  const PlaceDetailsBaseUrl = `https://maps.googleapis.com/maps/api/place/details/output?place_id=${placeId}&fields=geometry`;
  const PlaceDetailsResponse = await axios.get(PlaceDetailsBaseUrl);
  console.log(PlaceDetailsResponse);
};
