export interface Document {
  _id: string;
  title:string;
  authors: string;
  userId:string;
  entityType:string;
  entityId:string;
  uploadTime:number;
  threadsCount:number;
  fileType: string;
  fileDir?:string; // during development, remove it after uniying
  // different entities
}
