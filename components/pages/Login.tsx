import { useState } from "react";
import { loginUser, UserRegistrationCredentials } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { Text, Button, Flex, Input, FormControl } from "native-base";
import { AppDispatch } from "../../redux/stores/rootStore";

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();

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

    dispatch(loginUser(user));
  };

  function handleChange(value: string, prop: keyof UserRegistrationCredentials) {
    setUser({
      ...user,
      [prop]: value
    });
  }

  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} h={"full"} w={"full"}>
      <FormControl isRequired>
        <FormControl.Label>Correo electrónico</FormControl.Label>
        <Input type="text" placeholder="Ingresa tu email" value={user.email} onChangeText={(str) => handleChange(str, "email")} />
        <FormControl.Label>Contraseña</FormControl.Label>
        <Input type="password" placeholder="Ingresa tu contraseña" value={user.password} onChangeText={(str) => handleChange(str, "password")} />
        <Button type="submit" onPress={handleSubmit}>
          <Text>Submit!</Text>
        </Button>
      </FormControl>
    </Flex>
  )
}
