
export class Thread {
  userId: string; // used to identifity the ownership of each thread
  _id: string;
  commentor: string;
  title: string
  content: string;
  litId: string;
  pageNumber: string;
  constructor(
    userId: string,
    threadId: string,
    commentor: string,
    title: string,
    content: string,
    litId:string,
    pageNumber: string){

    this.userId = userId;
    this._id = threadId;
    this.commentor = commentor;
    this.title = title;
    this.content = content;
    this.litId = litId;
    this.pageNumber = pageNumber;
  }
}
