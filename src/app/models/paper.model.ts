export class Paper {
  public _id: string;
  public title: string;
  public authors: string;
  public userId: string;
  public userName: string;

  constructor(id: string, title: string, authors: string,
    litIdentifier:string, userId: string, userName: string){
    this._id = id;
    this.title = title;
    this.authors = authors;
    this.userName = userName;
  }
}
