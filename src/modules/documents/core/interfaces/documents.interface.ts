export interface ICreateDocument {
  name: string;
  description?: string;
  document_type: number;
  folder?: number;
  file: File;
  expiration_date?: string;
  beneficiary: number;
}
