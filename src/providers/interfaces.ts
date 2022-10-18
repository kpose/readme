/* File Upload Provider Interfaces */
// interface IBookContent {
//   _id: string;
//   body: string;
//   page: number;
// }
// export interface IPDFBook {
//   _id: string;
//   url: string;
//   tilte: string;
//   content: IBookContent[];
// }

export interface IFileUploadContext {
  isUploadingPDF: boolean;
  uploadPDF: () => Promise<string | undefined>;
}
