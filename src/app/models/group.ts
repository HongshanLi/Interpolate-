export interface Group {
  _id: string;
  //creatorName: string;
  creatorId:string;
  groupName: string;
  groupInterests: string;
  //membersName:string[];
  membersId:string[];
  //pendingMembersName: string[];
  pendingMembersId:string[];
}
