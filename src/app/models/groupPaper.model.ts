export class GroupPaper {
  public _id: string;
  public title: string;
  public authors: string;
  public userName: string;
  public groupId: string; // id of the group owning it
  public uploadTime: number; // timestamp
  public threadsCount: number;

  constructor(id: string, title: string, authors: string,
    groupId:string, userName:string, uploadTime:number,
    threadsCount:number){
    this._id = id;
    this.title = title;
    this.authors = authors;
    this.groupId = groupId;
    this.userName = userName;
    this.uploadTime = uploadTime;
    this.threadsCount = threadsCount;
  }
}
