import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, TYPOGRAPHY } from "../../constants/theme";

export const InputComponent = ({
  label,
  placeholder = null,
  keyboardType = null,
  textContentType,
  value,
  onChangeText = null,
  showPassword = null,
  setShowPassword = null,
  isPassword = null
}) => {
  return (
    <View style={s.fieldWrap}>
      <Text style={s.label}>{label}</Text>
      <View style={s.field}>
        <TextInput
          style={s.input}
          placeholder={placeholder}
          placeholderTextColor={COLORS.muted}
          keyboardType={keyboardType || "default"}
          textContentType={textContentType}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={12}
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
          >
            <Text style={s.toggleText}>
              {showPassword ? "Ocultar" : "Mostrar"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  fieldWrap: {
    marginBottom: 16,
  },
  label: {
    fontSize: TYPOGRAPHY.sizes.label.fontSize,
    fontFamily: TYPOGRAPHY.fonts.dmSans.medium,
    color: COLORS.mist,
    marginBottom: 8,
  },
  field: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.line,
    backgroundColor: COLORS.field,
  },
  fieldFocused: {
    borderColor: COLORS.lagoon,
  },
  fieldError: {
    borderColor: COLORS.danger,
  },
  input: {
    flex: 1,
    fontSize: TYPOGRAPHY.sizes.input.fontSize,
    fontFamily: TYPOGRAPHY.fonts.dmSans.regular,
    color: COLORS.ink,
    paddingVertical: 0,
  },
  toggleText: {
    fontSize: TYPOGRAPHY.sizes.label.fontSize,
    fontFamily: TYPOGRAPHY.fonts.dmSans.bold,
    color: COLORS.primary,
    marginLeft: 10,
  },
});
