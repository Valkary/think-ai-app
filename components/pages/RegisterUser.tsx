import { useState, useEffect } from "react";
import { registerUser } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Text, Button } from "native-base";
import { AppDispatch, RootState } from "../../App";

export default function RegisterUser() {
    const dispatch = useDispatch<AppDispatch>();

    const [user, setUser] = useState({
        name: "",
        lastNames: "",
        passwored: "",
        email: ""
    });

    const authState = useSelector<RootState>(state => state.auth);

    useEffect(() => {
        console.log(authState);
    }, [authState]);

    const handleSubmit = (e: object) => {
        dispatch(registerUser({ firstName: "Pepe", lastNames: "Salcedo Uribe", email: "pepoclesng@gmail.com", password: "password" }));
    };


    return (
        <Container>
            <Button type="submit" onPress={handleSubmit}>
                <Text>Submit!</Text>
            </Button>
        </Container>
    )
}