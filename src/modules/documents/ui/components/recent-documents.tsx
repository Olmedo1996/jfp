'use client';

import React from 'react';
import { FileText } from 'lucide-react';

import { DocumentRecentResult } from '../../core/interfaces/documents-service.interface';
import { useDocumentsRecentList } from '../hooks/query/use-list-recent-documents';

import { formatDate, parseBackendDate } from '@/utils/dateUtils';

type RecentProps = {
  beneficiaryId: number;
  initialRecentDocuments: DocumentRecentResult[];
};

const RecentDocument = ({
  initialRecentDocuments,
  beneficiaryId,
}: RecentProps) => {
  const { data: recentDocuments } = useDocumentsRecentList({
    beneficiaryId,
    initialRecentDocuments,
  });
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Recientes</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recentDocuments?.map((doc) => (
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
  );
};

export default RecentDocument;
