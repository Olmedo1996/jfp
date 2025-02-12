import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { GradientPicker } from './gradient-picker';

import { ApiDocumentsFolderResponse } from '@/modules/documents/core/interfaces/documents-folder-service.interface';
import { documentsService } from '@/modules/documents/services/documents.service';

interface FolderColorSelectorProps {
  folderId: number;
  initialColor: string;
}

export const FolderColorSelector = ({
  folderId,
  initialColor,
}: FolderColorSelectorProps) => {
  const params = useParams();
  const beneficiaryId = Number(params.id);
  const queryClient = useQueryClient();

  const { mutate: updateColor } = useMutation({
    mutationFn: (newColor: string) =>
      documentsService.updatePartialFolder(folderId, { color: newColor }),
    onSuccess: (updatedFolder) => {
      queryClient.setQueryData(
        ['folders', beneficiaryId],
        (oldData: ApiDocumentsFolderResponse) => {
          const newResult = oldData.results.map((folder) =>
            folder.id === folderId
              ? { ...folder, color: updatedFolder.color }
              : folder
          );

          return {
            ...oldData,
            results: newResult,
          };
        }
      );
    },
  });

  const handleColorChange = (newColor: string) => {
    queryClient.setQueryData(
      ['folders', beneficiaryId],
      (oldData: ApiDocumentsFolderResponse) => {
        const newResult = oldData.results.map((folder) =>
          folder.id === folderId ? { ...folder, color: newColor } : folder
        );

        return {
          ...oldData,
          results: newResult,
        };
      }
    );

    updateColor(newColor);
  };

  return (
    <div className="w-48">
      <GradientPicker
        background={initialColor}
        setBackground={handleColorChange}
      />
    </div>
  );
};
