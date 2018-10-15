export class Group {
  _id: string;
  creatorName: string;
  creatorId:string;
  groupName: string;
  groupInterests: string;
  members:string[];
  pendingMembers: string[];

  constructor(
    _id: string,
    creatorName: string,
    creatorId:string,
    groupName: string,
    groupInterests: string,
    members: string[],
    pendingMembers: string[]){

    this._id = _id;
    this.creatorName = creatorName;
    this.creatorId = creatorId;
    this.groupName = groupName;
    this.groupInterests = groupInterests;
    this.members = members;
    this.pendingMembers = pendingMembers;
  }
}
