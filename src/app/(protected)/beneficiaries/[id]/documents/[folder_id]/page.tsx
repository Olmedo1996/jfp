import { notFound } from 'next/navigation';

import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { documentsServerSideService } from '@/modules/documents/services/documents-server.service';
import { DocumentsInList } from '@/modules/documents/ui/components/documents-in-folder-list';
import Filters from '@/modules/documents/ui/components/filter/filters';
import NewDocument from '@/modules/documents/ui/components/form/document-new';

interface PageProps {
  params: {
    id: string;
    folder_id: string;
  };
}

export default async function FolderDocumentsPage({ params }: PageProps) {
  const beneficiary = await beneficiariesService.get(
    Number.parseInt(params.id)
  );

  const folderDocumentsResp =
    await documentsServerSideService.listDocumentsInFolder(
      Number.parseInt(params.folder_id)
    );

  if (!beneficiary) {
    notFound();
  }

  const folderSelector = await documentsServerSideService.getFolderSelectorById(
    Number.parseInt(params.folder_id)
  );
  console.log(folderSelector);

  return (
    <div className="container mx-auto space-y-8 p-4">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Documentos en la carpeta {params.folder_id} de {beneficiary.full_name}
        </h1>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Filters />
          <NewDocument beneficiary={beneficiary} folder={folderSelector} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-8">
        <DocumentsInList
          folderId={Number.parseInt(params.folder_id)}
          initialDocuments={folderDocumentsResp}
        />
      </div>
    </div>
  );
}
