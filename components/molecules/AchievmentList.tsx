import { VStack } from "native-base";
import ListedAchievment, { ListedAchievmentProps } from "../atoms/ListedAchievment";

type Props = {};

const mockData: ListedAchievmentProps[] = [
  {
    id: 1,
    name: "Test achievment",
    description: "Just a random ass description",
    img_src: "https://depor.com/resizer/Mm3cwCXebQlQEWsiBCSjvTCBryY=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IJFZ5ZGT2NAJJOWIRBXBUZRSCI.jpg",
    achieved: true,
    completed_at: new Date()
  },
  {
    id: 2,
    name: "Nerf jg pls",
    description: "Some other random ass achievment that should be truncated if this shit works well",
    img_src: "https://depor.com/resizer/Mm3cwCXebQlQEWsiBCSjvTCBryY=/1200x800/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IJFZ5ZGT2NAJJOWIRBXBUZRSCI.jpg",
    achieved: false,
    completed_at: new Date()
  },
];

export default function AchievmentList({ }: Props) {
  // TODO: Request achievment list from the server depending on the user

  return (
    <VStack paddingLeft={2} space={"md"}>
      {
        mockData.map(achievment => {
          return (
            <ListedAchievment
              key={achievment.id}
              id={achievment.id}
              name={achievment.name}
              description={achievment.description}
              img_src={achievment.img_src}
              achieved={achievment.achieved}
              completed_at={achievment.completed_at}
            />
          )
        })
      }
    </VStack>
  )
}
