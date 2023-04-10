import { useState, useEffect } from "react";
import { registerUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Text, Button, Flex, Input, FormControl } from "native-base";
import { AppDispatch, RootState } from "../../redux/stores/rootStore";

export default function RegisterUser() {
    const dispatch = useDispatch<AppDispatch>();
    const authState = useSelector((state: RootState) => state.auth);
    const [stateCount, setStateCount] = useState(0);

    const [user, setUser] = useState({
        name: "",
        lastNames: "",
        passwored: "",
        email: ""
    });

    useEffect(() => {
        console.log(authState, stateCount);
        setStateCount(stateCount + 1);
    }, [authState]);

    const handleSubmit = (e: object) => {
        dispatch(registerUser({ firstName: "Pepe", lastNames: "Salcedo Uribe", email: "pepoclesng@gmail.com", password: "password" }));
    };

    return (
        <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} h={"full"} w={"full"}>
            <FormControl.Label>Usuario</FormControl.Label>
            <Input type="text" placeholder="Nombre de usuario" />
            <FormControl.Label>Nombres</FormControl.Label>
            <Input type="text" placeholder="Ingresa tu nombre" />
            <FormControl.Label>Apellidos</FormControl.Label>
            <Input type="text" placeholder="Ingresa tus apellidos" />
            <FormControl.Label>Contraseña</FormControl.Label>
            <Input type="password" placeholder="Ingresa tu contraseña" />
            <FormControl.Label>Confirmar contraseña</FormControl.Label>
            <Input type="password" placeholder="Confirma tu contraseña" />
            <Button type="submit" onPress={handleSubmit}>
                <Text>Submit!</Text>
            </Button>
        </Flex>
    )
}