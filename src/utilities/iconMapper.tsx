import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MaterialIconsPack = {
  name: 'material',
  icons: createIconsMap(),
};

function createIconsMap() {
  return new Proxy({}, {
    get(target, name) {
      return IconProvider(name);
    },
  });
}

const IconProvider = (name:any) => ({
  toReactElement: (props:any) => MaterialIcon({ name, ...props }),
});

function MaterialIcon({ name, style }:{name:any, style:any}) {
  const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
  return (
    <MaterialCommunityIcons name={name} size={height} color={tintColor} style={iconStyle} />
  );
}