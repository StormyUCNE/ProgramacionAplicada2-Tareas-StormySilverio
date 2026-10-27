import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export const ButtonComponent = ({ text, isLoading, action }) => {
  return (
    <TouchableOpacity
        onPress={action}
        disabled={isLoading}
        style={s.button}
    >
      {isLoading ? (
        <ActivityIndicator color={COLORS.ink} />
      ) : (
        <Text style={s.buttonText}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    backgroundColor: COLORS.lagoon,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: TYPOGRAPHY.sizes.button.fontSize,
    fontFamily: TYPOGRAPHY.fonts.sora.semibold,
    color: COLORS.ink,
    letterSpacing: 0.2,
  },
});
