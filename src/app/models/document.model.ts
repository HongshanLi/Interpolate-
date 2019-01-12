export interface Document {
  _id: string;
  title: string;
  authors: string;
  userId: string;
  entityType: string;
  entityId?: string;
  uploadTime: number;
  canDelete?: boolean;
  fileType: string;
}
