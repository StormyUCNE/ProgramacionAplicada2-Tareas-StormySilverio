import { StyleSheet, Text, View } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export const ErrorComponent = ({ error }) => {
  return (
    <View style={s.errorBox}>
      <Text style={s.errorText}>{error}</Text>
    </View>
  );
};

const s = StyleSheet.create({
  errorBox: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.field,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    margin: 8,
  },
  errorText: {
    fontSize: 12.5,
    fontFamily: TYPOGRAPHY.fonts.dmSans.medium,
    color: COLORS.danger,
  },
});
