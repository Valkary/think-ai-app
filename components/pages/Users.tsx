import { collection, DocumentData, getDocs } from "firebase/firestore";
import { Flex, Text } from "native-base";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export default function Users() {
  const [users, setUsers] = useState<DocumentData[]>();
  console.log(users);

  useEffect(() => {
    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, 'users'));

      const retrieved_users: DocumentData[] = [];

      querySnapshot.forEach(doc => {
        retrieved_users.push(doc.data());
      });

      setUsers(retrieved_users);
    }

    getUsers();
  }, []);

  return (
    <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"} h={"full"} w={"full"}>
      {users?.map(user => <Text>{JSON.stringify(user)}</Text>)}
    </Flex>
  )
};
