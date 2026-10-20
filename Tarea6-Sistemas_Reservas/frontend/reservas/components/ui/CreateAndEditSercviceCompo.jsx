import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { InputComponent } from "./InputComponent";
import { ButtonComponent } from "./ButtonComponent";
import { useService } from "../../contexts/ServiceContext";
import {ErrorComponent} from "./ErrorComponent"
import { useEffect } from "react";
export const CreateAndEditSercviceCompo = ({formulario, setFormulario}) => {
  const { handleSaveService, isLoading, error } = useService();
  return (
    <ScrollView
      style={s.form}
      contentContainerStyle={s.formContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <InputComponent
        label="Nombre del servicio"
        placeholder="Ej. Corte clásico"
        textContentType="name"
        value={formulario.nombre}
        onChangeText={(text)=> setFormulario({...formulario, nombre: text})}
      />
      <InputComponent
        label="Descripción"
        placeholder="Cuenta qué incluye el servicio"
        textContentType="description"
        value={formulario.descripcion}
        onChangeText={(text)=> setFormulario({...formulario, descripcion: text})}
      />
      <InputComponent
        label="Duración"
        placeholder="30"
        keyboardType="number-pad"
        textContentType="number"
        value={formulario.duracion}
        onChangeText={(text)=> setFormulario({...formulario, duracion: text})}
      />
      <InputComponent
        label="Precio"
        placeholder="0"
        keyboardType="number-pad"
        textContentType="number"
        value={formulario.precio}
        onChangeText={(text)=> setFormulario({...formulario, precio: text})}
      />
      {error && <ErrorComponent error={error}/>}
      
      {/* Botón principal */}
      <ButtonComponent text="Guardar Servicio" isLoading={isLoading} action={() => handleSaveService(formulario)}/>
    </ScrollView>
  );
};

const s = StyleSheet.create({
  form: {
    backgroundColor: "#2F6BFF",
    flex: 1,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    overflow: "hidden",
  },
  formContent: {
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 120,
  },
});
