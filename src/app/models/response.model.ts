export interface Response {
  _id: string;
  threadId: string;
  groupId: string;
  creatorName: string;
  editorName: string; //id of the latest editor
  responseContent: string;
  createTime: number;
  lastEditTime: number;
}
