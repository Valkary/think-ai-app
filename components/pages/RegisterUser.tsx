import { useState, useEffect } from "react";
import { registerUser, UserRegistrationCredentials } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button, Flex, Input, FormControl } from "native-base";
import { AppDispatch, RootState } from "../../redux/stores/rootStore";

export default function RegisterUser() {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector((state: RootState) => state.auth);
  const [isError, setIsError] = useState<(keyof UserRegistrationCredentials)[]>([]);

  useEffect(() => {
    console.log("actual authstate: ", authState);
  }, [authState]);

  const [user, setUser] = useState<UserRegistrationCredentials>({
    displayName: "",
    password: "",
    confirmPwd: "",
    email: ""
  });

  function handleSubmit() {
    for (const key in Object.keys(user)) {
      key.trim();
    }

    dispatch(registerUser(user));
  };

  function handleChange(value: string, prop: keyof UserRegistrationCredentials) {
    if (prop === "confirmPwd" && value !== user.password) {
      addError("password");
    } else if (prop === "password" && value !== user.confirmPwd) {
      addError("password");
    }

    setUser({
      ...user,
      [prop]: value
    });
  }

  // TODO: This function is actual shit, need to completely rewrite it because it's fucking useless
  function addError(field: keyof UserRegistrationCredentials) {
    if (isError.indexOf(field) === -1) {
      setIsError([...isError, field]);
    }
  }

  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} h={"full"} w={"full"}>
      <FormControl isRequired>
        <FormControl.Label>Nombre de usuario</FormControl.Label>
        <Input type="text" placeholder="Ingresa tu nombre de usuario" value={user.displayName} onChangeText={(str) => handleChange(str, "displayName")} />
        <FormControl.Label>Correo electrónico</FormControl.Label>
        <Input type="text" placeholder="Ingresa tu email" value={user.email} onChangeText={(str) => handleChange(str, "email")} />
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input type="password" placeholder="Ingresa tu contraseña" value={user.password} onChangeText={(str) => handleChange(str, "password")} />
        <FormControl.Label>Confirmar contraseña</FormControl.Label>
        <Input type="password" placeholder="Confirma tu contraseña" value={user.confirmPwd} onChangeText={(str) => handleChange(str, "confirmPwd")} />
        {
          isError.includes("password") &&
          <Text fontSize={"lg"} color="red.500">Las contraseñas deben coincidir</Text>
        }
        <Button type="submit" onPress={handleSubmit}>
          <Text>Submit!</Text>
        </Button>
      </FormControl>
    </Flex>
  )
}
