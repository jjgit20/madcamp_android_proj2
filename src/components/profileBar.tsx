import LikeIcon from '@src/assets/icons/Favorite_fill.svg';
import ForkIcon from '@src/assets/icons/fork_icon.svg';
import SendIcon from '@src/assets/icons/Send_fill.svg';
import {BLACK} from '@src/styles/globalStyleVariables';
import globalStyles from '@src/styles/style';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const styles = StyleSheet.create({
  profileContainer: {
    width: '100%',
    height: 130,
    flexDirection: 'column',
    justifyContent: 'space-around', // Adjust as needed for your layout
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileAndstatitemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000000',
  },
  profileImage: {
    width: 60, // Set the size as needed
    height: 60,
    borderRadius: 30, // Half the width/height to make it circular
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statHorizontalItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15, // Add spacing between items
  },
  statText: {
    ...globalStyles.body2,
    color: BLACK,
    marginLeft: 5,
  },
  statNumber: {
    ...globalStyles.h4,
    color: BLACK,
  },
});

const profileBar = ({user}: {user: any}) => {
  if (!user) return null;

  return (
    <View style={styles.profileContainer}>
      <Text style={[globalStyles.h4, {color: BLACK}]}>@{user.nickname}</Text>
      <View style={styles.profileAndstatitemContainer}>
        <Image
          source={{
            uri: user.image
              ? user.image
              : 'https://i.pinimg.com/564x/85/b0/02/85b00271cb3cfaa900f7d5165ee6a80d.jpg',
          }}
          style={styles.profileImage}
        />

        <View style={styles.statsContainer}>
          <View style={styles.statHorizontalItem}>
            <Text style={styles.statNumber}>{user.plans}</Text>
            <View style={styles.statItem}>
              <SendIcon width={24} height={24} style={{color: '#000000'}} />
              <Text style={styles.statText}>게시물</Text>
            </View>
          </View>
          <View style={styles.statHorizontalItem}>
            <Text style={styles.statNumber}>{user.receivedLikes}</Text>
            <View style={styles.statItem}>
              <LikeIcon width={22} height={22} style={{color: '#000000'}} />
              <Text style={styles.statText}>좋아요</Text>
            </View>
          </View>
          <View style={styles.statHorizontalItem}>
            <Text style={styles.statNumber}>{user.receivedForks}</Text>
            <View style={styles.statItem}>
              <ForkIcon width={22} height={22} style={{color: '#000000'}} />
              <Text style={styles.statText}>퍼가요</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default profileBar;
