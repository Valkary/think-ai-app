import { useState } from "react";
import { registerUser, UserRegistrationCredentials } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button, Input, FormControl, VStack } from "native-base";
import { AppDispatch, RootState } from "../../redux/stores/rootStore";

type Errors = "general" | "email" | "password";

export default function RegisterUser() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [errors, setErrors] = useState<Set<Errors>>(new Set());

  const [user, setUser] = useState<UserRegistrationCredentials>({
    displayName: "",
    password: "",
    confirmPwd: "",
    email: ""
  });

  function handleSubmit() {
    // NOTE: just some cleaning up before sending
    for (const key in Object.keys(user)) {
      key.trim();
    }

    dispatch(registerUser(user));
  };

  function handleErrors(field: Errors, add_error: boolean) {
    if (errors.has(field) && !add_error) {
      setErrors(prev => new Set([...prev].filter(x => x !== field)));
    } else if (add_error) {
      setErrors(prev => new Set([...prev, field]));
    }
  }

  function handleChange(value: string, prop: keyof UserRegistrationCredentials) {
    if (prop === "password") {
      handleErrors("password", value !== user.confirmPwd);
    } else if (prop === "confirmPwd") {
      handleErrors("password", value !== user.password);
    }

    // TODO: show the correct error
    if (authState.error === "auth_error") handleErrors("general", true);

    if (prop === "email") handleErrors("email", (user.email.length === 1 && value === ""));

    setUser({
      ...user,
      [prop]: value
    });
  }


  return (
    <FormControl flexDir={"column"} alignItems={"center"} justifyContent={"center"} h={"full"} w={"full"} isRequired>
      <VStack justifyContent={"center"} h={"full"} w={"80%"} space={4}>
        <FormControl.Label>Nombre de usuario</FormControl.Label>
        <Input type="text" placeholder="Ingresa tu nombre de usuario" value={user.displayName} onChangeText={(str) => handleChange(str, "displayName")} />
        <FormControl.Label>Correo electrónico</FormControl.Label>
        <Input type="text" placeholder="Ingresa tu email" value={user.email} onChangeText={(str) => handleChange(str, "email")} />
        {
          errors.has("email") &&
          <Text fontSize={"lg"} color="red.500">El email no puede estar vacío</Text>
        }
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input type="password" placeholder="Ingresa tu contraseña" value={user.password} onChangeText={(str) => handleChange(str, "password")} />
        <FormControl.Label>Confirmar contraseña</FormControl.Label>
        <Input type="password" placeholder="Confirma tu contraseña" value={user.confirmPwd} onChangeText={(str) => handleChange(str, "confirmPwd")} />
        {
          errors.has("password") &&
          <Text fontSize={"lg"} color="red.500">Las contraseñas deben coincidir</Text>
        }
        <Button
          type="submit"
          mt={4}
          size={"lg"}
          variant={"outline"}
          onPress={handleSubmit}
          isLoading={authState.loading}
          isDisabled={errors.size > 0}
        >
          CREAR USUARIO
        </Button>
      </VStack>
    </FormControl>
  )
}
