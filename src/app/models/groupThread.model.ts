import { HighlightCoord } from "./highlightCoord";


export class GroupThread {
  groupId: string;
  _id: string;
  commentor: string;
  editorName: string;
  title: string
  content: string;
  litId: string;
  litTitle: string;
  pageNumber: number;
  highlightsCoord: HighlightCoord[];
  createTime: number;
  lastEditTime: number;
  responsesCount: number;

  constructor(
    groupId: string,
    threadId: string,
    commentor: string,
    editorName:string,
    title: string,
    content: string,
    litId:string,
    litTitle:string,
    pageNumber: number,
    highlightsCoord: HighlightCoord[],
    createTime: number,
    lastEditTime: number,
    responsesCount: number){
    this.groupId = groupId;
    this._id = threadId;
    this.commentor = commentor;
    this.editorName = editorName;
    this.title = title;
    this.content = content;
    this.litId = litId;
    this.litTitle = litTitle;
    this.pageNumber = pageNumber;
    this.highlightsCoord = highlightsCoord;
    this.createTime = createTime;
    this.lastEditTime = lastEditTime;
    this.responsesCount = responsesCount;

  }
}
