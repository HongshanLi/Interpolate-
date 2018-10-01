export class Group {
  _id: string;
  creator: string;
  groupName: string;
  groupInterests: string;
  members:string[];
  pendingMembers: string[];

  constructor(
    _id: string,
    creator: string,
    groupName: string,
    groupInterests: string,
    members: string[],
    pendingMembers: string[]){

    this._id = _id;
    this.creator = creator;
    this.groupName = groupName;
    this.groupInterests = groupInterests;
    this.members = members;
    this.pendingMembers = pendingMembers;
  }
}
