import { FileText, Filter, Plus } from 'lucide-react';
import { notFound } from 'next/navigation';

import { formatDate, parseBackendDate } from '../../../../../utils/dateUtils';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { DocumentList } from '@/modules/beneficiaries/ui/components/documents/document-list';
import FoldersContainer from '@/modules/beneficiaries/ui/components/documents/folders-container';
import { documentsServerSideService } from '@/modules/documents/services/documents-server.service';
interface PageProps {
  params: {
    id: string;
  };
}

export default async function DocumentsPage({ params }: PageProps) {
  const beneficiary = await beneficiariesService.get(
    Number.parseInt(params.id)
  );

  const foldersResp = await documentsServerSideService.listFoldersServer({
    beneficiary: Number.parseInt(params.id),
  });

  const recentDocumentsResp = await documentsServerSideService.listRecentServer(
    {
      beneficiary: Number.parseInt(params.id),
    }
  );

  const allDocumentsResp = await documentsServerSideService.listAllServer({
    beneficiary: Number.parseInt(params.id),
  });

  if (!beneficiary) {
    notFound();
  }

  return (
    <div className="container mx-auto space-y-8 p-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">Documents</h1>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Button variant="outline" size="sm" className="flex-none">
            <Filter className="mr-2 size-4" />
            Filters
          </Button>

          <Select defaultValue="latest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Sort By: Latest</SelectItem>
              <SelectItem value="oldest">Sort By: Oldest</SelectItem>
              <SelectItem value="name">Sort By: Name</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="flex-none">
            <Plus className="mr-2 size-4" />
            New
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        {/* Folders Section */}
        <section className="w-full">
          <FoldersContainer folders={foldersResp} />
        </section>

        {/* Recent Documents Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recent</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentDocumentsResp.map((doc) => (
              <div
                key={doc.id}
                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 transition-colors sm:p-4"
              >
                <FileText className="text-muted-foreground size-5 shrink-0" />
                <div className="min-w-0">
                  {' '}
                  {/* Previene que el texto se desborde */}
                  <a
                    className="text-primary truncate font-medium underline-offset-4 hover:underline"
                    href={doc.file}
                    target="_blank"
                  >
                    {doc.name}
                  </a>
                  <p className="text-muted-foreground truncate text-xs sm:text-sm">
                    {formatDate(
                      parseBackendDate(doc.created_at) || new Date(),
                      'TEXT_ES'
                    )}
                    · {doc.file_size_display}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Files Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">All Files</h2>
          <DocumentList documents={allDocumentsResp} />
        </section>
      </div>
    </div>
  );
}
