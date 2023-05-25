import { Button, Flex, Text } from "native-base";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/rootStore";
import WaterIcon from "react-native-vector-icons/FontAwesome5";
import TrashIcon from "react-native-vector-icons/Entypo";
import EditIcon from "react-native-vector-icons/FontAwesome";

export default function Dashboard() {
  const [waterFp, setWaterFp] = useState<number | null>(null);
  const [carbonFp, setCarbonFp] = useState<number | null>(null);
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    async function retrieveFootPrints() {
      const users_ref = collection(db, 'users');
      const curr_user_ref = query(users_ref, where('email', '==', authState.userInfo?.email));

      const querySnapshot = await getDocs(curr_user_ref);
      querySnapshot.forEach(doc => {
        setWaterFp(doc.data().waterFootprint);
        setCarbonFp(doc.data().carbonFootprint);
      })
    }

    retrieveFootPrints();
  }, []);


  return (
    <Flex flexDir={"column"} alignItems={"flex-start"} justifyContent={"flex-start"} h={"full"} w={"full"} safeArea px={5}>
      <Text fontSize={"3xl"} bold>Huella hídrica</Text>
      <Flex flexDir={"column"} alignItems={"center"} w={"full"} py={5}>
        <WaterIcon name="hand-holding-water" size={100} color={"#1b95e0"} />
        {waterFp ?
          <Text fontSize={"xl"}>{`${waterFp} toneladas de CO2/año`}</Text> :
          <Text fontSize={"xl"}>Sin información</Text>
        }
        <Button leftIcon={<EditIcon name="edit" size={20} color={"white"} />} name="edit-water-fp" size="sm">Editar</Button>
      </Flex>
      <Text fontSize={"3xl"} bold>Huella de carbono</Text>
      <Flex flexDir={"column"} alignItems={"center"} w={"full"} py={5}>
        <TrashIcon name="trash" size={100} />
        {carbonFp ?
          <Text fontSize={"xl"}>{`${carbonFp} toneladas de CO2/año`}</Text> :
          <Text fontSize={"xl"}>Sin información</Text>
        }
        <Button leftIcon={<EditIcon name="edit" size={20} color={"white"} />} name="edit-water-fp" size="sm">Editar</Button>
      </Flex>
    </Flex>
  )
}
