import FavoritIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import ViewIcon from '@src/assets/icons/View.svg';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const cardWidth = windowWidth / 2 - 25;
const profileImage = require('../../assets/image/airplane.png');
const backgroundImage = require('../../assets/image/tokyo.png');

const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    height: cardWidth,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 16,
    },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    borderRadius: 30, // 이제 이 속성은 card에 직접 적용됩니다.
    overflow: 'hidden', // borderRadius 적용을 위해 필요합니다.
    margin: 5,
  },
  darkFilter: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This creates the semi-transparent overlay
  },
  rowWiseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20, // Add margin to the top of the container
    marginBottom: 20, // Add margin to the bottom of the container
    marginLeft: 20, // Add margin to the left of the container
    marginRight: 20, // Add margin to the right of the container
  },
  columnWiseContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  countryText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  interactionText: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Inter',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
});

const PlanCardType3 = ({backgroundImage, country, likes, forks}) => {
  const iconSize = 24;

  return (
    <ImageBackground source={backgroundImage} style={styles.card}>
      <View style={styles.darkFilter} />
      <View style={styles.columnWiseContainer}>
        <View style={styles.rowWiseContainer}>
          <Text style={styles.countryText}>{`${country}`}</Text>
          <ViewIcon width={iconSize} height={iconSize} />
        </View>
        <View style={styles.rowWiseContainer}>
          <TouchableOpacity style={styles.interactionText}>
            <FavoritIcon
              width={iconSize}
              height={iconSize}
              style={{color: '#ffffff'}}
            />
            <Text style={styles.interactionText}>{`${likes}`}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionText}>
            <ForkIcon
              width={iconSize}
              height={iconSize}
              style={{color: '#ffffff'}}
            />
            <Text style={styles.interactionText}>{`${forks}`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default PlanCardType3;
