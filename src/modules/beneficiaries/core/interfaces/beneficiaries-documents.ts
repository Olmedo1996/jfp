export interface Folder {
  name: string;
  fileCount: number;
  size: string;
}

export interface Document {
  name: string;
  date: string;
  size: string;
  uploadedBy: {
    name: string;
    avatar: string;
  };
}
