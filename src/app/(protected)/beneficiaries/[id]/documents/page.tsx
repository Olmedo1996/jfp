import { notFound } from 'next/navigation';

import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import FoldersContainer from '@/modules/beneficiaries/ui/components/documents/folders-container';
import { documentsServerSideService } from '@/modules/documents/services/documents-server.service';
import { DocumentList } from '@/modules/documents/ui/components/document-list';
import Filters from '@/modules/documents/ui/components/filter/filters';
import NewDocument from '@/modules/documents/ui/components/form/document-new';
import RecentDocument from '@/modules/documents/ui/components/recent-documents';
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
        <h1 className="text-2xl font-bold sm:text-3xl">
          Documentos de {beneficiary.full_name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Filters />
          <NewDocument beneficiary={beneficiary} />
        </div>

        {/* Controls */}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        <FoldersContainer
          beneficiaryId={Number.parseInt(params.id)}
          initialFolderDocuments={foldersResp}
        />
        <RecentDocument
          beneficiaryId={Number.parseInt(params.id)}
          initialRecentDocuments={recentDocumentsResp}
        />
        <DocumentList
          beneficiaryId={Number.parseInt(params.id)}
          initialDocuments={allDocumentsResp}
        />
      </div>
    </div>
  );
}
