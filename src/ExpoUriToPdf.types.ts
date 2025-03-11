import type { StyleProp, ViewStyle } from "react-native";

export type ChangeEventPayload = {
  value: string;
};

export type ExpoUriToPdfModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type OnLoadEventPayload = {
  uri: string;
};

export type ExpoPdfViewProps = {
  uri: string;
  onLoad: (event: { nativeEvent: OnLoadEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
