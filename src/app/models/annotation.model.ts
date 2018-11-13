import { HighlightCoord } from "./highlightCoord";


export interface Annotation{
  _id: string;
  entityType:string;
  entityId:string;
  documentId: string;
  creatorId: string;
  title: string
  content: string;
  page: number;
  highlightsCoord: HighlightCoord[];
  createTime: number;
  lastEditTime: number;
  followedBy:string[];
  viewedBy:string[];
  parent: string; // parent annotations, annotation responed to
  children: string[]; // list of child-annotation, i.e responses
}
