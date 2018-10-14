import { HighlightCoord } from "./highlightCoord";

//TODO add fields: viewed by, up votes, down votes
// followed by

export class GroupThread {
  groupId: string;
  _id: string;
  commentor: string;
  creatorId: string;
  editorName: string;
  editorId:string;
  title: string
  content: string;
  litId: string;
  litTitle: string;
  pageNumber: number;
  highlightsCoord: HighlightCoord[];
  createTime: number;
  lastEditTime: number;
  followedBy:string[];
  viewedBy:string[];
  responsesCount: number;

  constructor(
    groupId: string,
    threadId: string,
    commentor: string,
    creatorId: string,
    editorName:string,
    editorId: string,
    title: string,
    content: string,
    litId:string,
    litTitle:string,
    pageNumber: number,
    highlightsCoord: HighlightCoord[],
    createTime: number,
    lastEditTime: number,
    followedBy: string[],
    viewedBy:string[],
    responsesCount: number){
    this.groupId = groupId;
    this._id = threadId;
    this.commentor = commentor;

    this.creatorId = creatorId;
    this.editorName = editorName;
    this.editorId = editorId;
    this.title = title;
    this.content = content;
    this.litId = litId;
    this.litTitle = litTitle;
    this.pageNumber = pageNumber;
    this.highlightsCoord = highlightsCoord;
    this.createTime = createTime;
    this.lastEditTime = lastEditTime;
    this.followedBy = followedBy;
    this.viewedBy = viewedBy;
    this.responsesCount = responsesCount;

  }
}
