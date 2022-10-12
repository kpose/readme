/* File Upload Provider Interfaces */

export interface IUploadedBookProps {
  name: string;
}

export interface IFileUploadContext {
  isUploadingPDF: boolean;
  uploadPDF: () => Promise<IUploadedBookProps | undefined>;
}
