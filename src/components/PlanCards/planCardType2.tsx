import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 120, // Set this to your desired height
    borderRadius: 30,
    overflow: 'hidden', // This makes sure the borderRadius is applied
    position: 'relative',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // This creates the semi-transparent overlay
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 20,
    left: 20,
  },
  countryText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Inter',
  },
  cityAndDateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  // countryCityText: {
  //   position: 'absolute',
  //   top: 20,
  //   left: 20,
  //   color: 'white',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
  dateDdayText: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'white',
    fontSize: 16,
  },
});

const PlanCardType2 = ({
  backgroundImage,
  country,
  city,
  duration,
  date,
  dday,
}) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.imageOverlay} />
        <View style={styles.textContainer}>
          <Text style={styles.countryText}>{`${country}`}</Text>
          <Text style={styles.cityAndDateText}>{`${city} - ${duration}`}</Text>
        </View>
        <Text style={styles.dateDdayText}>{`${date} | D-day ${dday}`}</Text>
      </ImageBackground>
    </View>
  );
};

export default PlanCardType2;
