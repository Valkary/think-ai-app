import { Avatar, HStack, Text, VStack, CheckCircleIcon, CloseIcon, Flex } from "native-base";

export type ListedAchievmentProps = {
  id: number;
  name: string;
  description: string;
  achieved: boolean;
  completed_at?: Date;
  img_src: string;
};

export default function ListedAchievment({ name, description, achieved, img_src, completed_at }: ListedAchievmentProps) {
  return (
    <HStack space="lg" alignItems="center">
      <Avatar
        // TODO: make this so that it grabs the image from the server
        source={{
          uri: img_src
        }}
      />
      <VStack w={"100%"} maxW={250}>
        <Text fontSize={"xl"} bold letterSpacing={"xl"}>{name}</Text>
        <Text fontSize={"md"} isTruncated>{description}</Text>
      </VStack>

      <Flex flex={1} direction="row" justifyContent="center">
        {
          achieved ?
            <CheckCircleIcon color={"green.600"} size={6} /> :
            <CloseIcon color={"red.600"} size={6} />
        }
      </Flex>
    </HStack>
  )
}
