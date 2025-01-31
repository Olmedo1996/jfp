import { FileText } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Document } from '@/modules/beneficiaries/core/interfaces/beneficiaries-documents';

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Upload By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((doc) => (
          <TableRow key={doc.name}>
            <TableCell>
              <div className="flex items-center gap-2">
                <FileText className="text-muted-foreground size-4" />
                <span>{doc.name}</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="text-muted-foreground">
                  {doc.uploadedBy.name}
                </span>
                <Avatar className="size-6">
                  <AvatarImage src={doc.uploadedBy.avatar} />
                  <AvatarFallback>{doc.uploadedBy.name[0]}</AvatarFallback>
                </Avatar>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
