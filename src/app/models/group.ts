export interface Group {
  _id: string;
  //creatorName: string;
  creatorId:string;
  groupName: string;
  groupInterests: string;
  //membersName:string[];
  members:string[];
  //pendingMembersName: string[];
  pendingMembers:string[];
}
