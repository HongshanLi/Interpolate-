import { HighlightCoord } from "./highlightCoord";


export interface Annotation{
  _id: string;
  entityType:string;
  entityId:string;
  documentId: string;
  creatorId: string;

  creatorName?:string;
  isOwner?:boolean;

  title: string
  content: string;
  page: number;
  highlightsCoord: HighlightCoord[];
  createTime: number;
  lastEditTime: number;

  editorName?:string;

  followedBy:string[];
  viewedBy:string[];
  parent: string; // parent annotations, annotation responed to
  children: string[]; // list of child-annotation, i.e responses
}
