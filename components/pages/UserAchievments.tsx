import { Container, Text } from "native-base";
import AchievmentList from "../molecules/AchievmentList";

type Props = {};

export default function UserAchievments({ }: Props) {
  return (
    <Container>
      <Text fontSize={"3xl"} bold>Tus logros</Text>
      <AchievmentList />
    </Container>
  )
}
