import { FileText, Filter, Plus } from 'lucide-react';
import { notFound } from 'next/navigation';

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
interface PageProps {
  params: {
    id: string;
  };
}

const folders = [
  { name: 'Results 2023', fileCount: 23, size: '137 MB', color: '#4F46E5' },
  { name: 'Market Analysis', fileCount: 8, size: '56 MB', color: '#EC4899' },
  { name: 'All contract', fileCount: 37, size: '92 MB', color: '#10B981' },
  { name: 'Archived', fileCount: 99, size: '267 MB', color: '#F59E0B' },
  {
    name: 'Financial Reports',
    fileCount: 45,
    size: '156 MB',
    color: '#6366F1',
  },
  { name: 'Client Projects', fileCount: 67, size: '289 MB', color: '#8B5CF6' },
  { name: 'Research Data', fileCount: 12, size: '78 MB', color: '#14B8A6' },
  { name: 'Marketing Assets', fileCount: 89, size: '445 MB', color: '#F43F5E' },
  { name: 'Legal Documents', fileCount: 34, size: '167 MB', color: '#8B5CF6' },
  { name: 'Team Resources', fileCount: 56, size: '234 MB', color: '#06B6D4' },
];

const recentDocuments = [
  {
    name: 'Analysis Data July',
    date: 'Aug 5, 2023',
    size: '1.0 MB',
    uploadedBy: { name: 'Cameron Williamson', avatar: '/placeholder.svg' },
  },
  {
    name: 'Q2 Results',
    date: 'Jul 31, 2023',
    size: '2.5 MB',
    uploadedBy: { name: 'Jenny Wilson', avatar: '/placeholder.svg' },
  },
  {
    name: 'Electrometer Data',
    date: 'Jul 25, 2023',
    size: '1.9 MB',
    uploadedBy: { name: 'Floyd Miles', avatar: '/placeholder.svg' },
  },
];
export default async function DocumentsPage({ params }: PageProps) {
  const beneficiary = await beneficiariesService.get(
    Number.parseInt(params.id)
  );

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
          <FoldersContainer folders={folders} />
        </section>

        {/* Recent Documents Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Recent</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <div
                key={doc.name}
                className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 transition-colors sm:p-4"
              >
                <FileText className="text-muted-foreground size-5 shrink-0" />
                <div className="min-w-0">
                  {' '}
                  {/* Previene que el texto se desborde */}
                  <p className="truncate font-medium">{doc.name}</p>
                  <p className="text-muted-foreground truncate text-xs sm:text-sm">
                    {doc.date} · {doc.size}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Files Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">All Files</h2>
          <DocumentList documents={recentDocuments} />
        </section>
      </div>
    </div>
  );
}
