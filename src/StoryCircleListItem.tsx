import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { usePrevious } from './helpers/StateHelpers';
import { IUserStory, StoryCircleListItemProps } from './interfaces';


const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = 60,
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {
  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  const avatarWrapperSize = avatarSize + 4;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => _handleItemPress(item)}
        style={[
          styles.avatarWrapper,
          {
            height: avatarWrapperSize,
            width: avatarWrapperSize,
          },
          avatarWrapperStyle,
          !isPressed
            ? {
                borderColor: unPressedBorderColor ?? 'red',
              }
            : {
                borderColor: pressedBorderColor ?? 'grey',
              },
        ]}
      >{item.user_image !== null && item.user_image !== undefined &&
        <Image
          style={[
            {
              height: avatarSize,
              width: avatarSize,
              borderRadius: 100,
            },
            avatarImageStyle,
          ]}
          source={{ uri: item.user_image }}
        />}
      </TouchableOpacity>
      {showText && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            {
              width: avatarWrapperSize,
              ...styles.text,
              ...avatarTextStyle,
            },
            isPressed
              ? { color: pressedAvatarTextColor || undefined }
              : { color: unPressedAvatarTextColor || undefined },
          ]}
        >
          {item.user_name}
        </Text>
      )}
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginRight: 10,
  },
  avatarWrapper: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
  },
});
