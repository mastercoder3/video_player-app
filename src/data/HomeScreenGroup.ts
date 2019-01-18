import { HomeScreenGroupItem } from "./HomeScreenGroupItem";

export class HomeScreenGroup {
  constructor() {}

  groupId: string;
  name: string;
  groupItems: HomeScreenGroupItem[] = [];
}
