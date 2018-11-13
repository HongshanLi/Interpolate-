export interface Group {
  _id: string;
  creatorId:string;
  groupName: string;
  description: string;
  membersId:string[];
}
