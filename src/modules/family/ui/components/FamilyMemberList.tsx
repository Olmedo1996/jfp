import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PencilIcon, SaveIcon, TrashIcon, XIcon } from 'lucide-react';

import { IFamilyMember } from '../../core/interfaces/family-member.interface';
import {
  FamilyMemberFormData,
  familyMemberSchema,
} from '../../core/schemas/family-member.schema';
import { useDeleteFamilyMember } from '../hooks/form/use-delete-family';
import { useUpdateFamilyMember } from '../hooks/form/use-update-family';
import { useFamilyMembers } from '../hooks/query/use-family-members';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface FamilyMemberListProps {
  beneficiaryId: number;
}

export function FamilyMemberList({ beneficiaryId }: FamilyMemberListProps) {
  const { data: familyMembers, isLoading } = useFamilyMembers(beneficiaryId);
  const { mutate: deleteMember } = useDeleteFamilyMember(beneficiaryId);
  const { mutate: updateMember } = useUpdateFamilyMember(beneficiaryId);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const form = useForm<FamilyMemberFormData>({
    resolver: zodResolver(familyMemberSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      birth_date: '',
      phone: '',
      address: '',
      beneficiary: beneficiaryId,
      is_active: true,
    },
  });

  const handleEdit = (member: IFamilyMember) => {
    setEditingId(member.id);
    form.reset({
      first_name: member.first_name,
      last_name: member.last_name,
      birth_date: member.birth_date,
      phone: member.phone,
      address: member.address,
      beneficiary: beneficiaryId,
      is_active: member.is_active,
    });
  };

  const handleDelete = (id: number) => {
    setMemberToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.reset();
  };

  const handleSave = (id: number) => {
    form.handleSubmit((data) => {
      updateMember({ id, formData: data });
      setEditingId(null);
      form.reset();
    })();
  };

  const handleKeyPress = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      deleteMember(memberToDelete);
      setDeleteDialogOpen(false);
      setMemberToDelete(null);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Miembros de la Familia</h2>
      <div className="overflow-x-auto">
        <Form {...form}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-sidebar-accent sticky left-0 md:bg-transparent"></TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Fecha de Nacimiento</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Dirección</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familyMembers &&
                familyMembers.results.map((member) => (
                  <TableRow
                    key={member.id}
                    onDoubleClick={() => handleEdit(member)}
                  >
                    <TableCell className="bg-sidebar-accent sticky left-0 md:bg-transparent">
                      <div className="flex space-x-2">
                        {editingId === member.id ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleSave(member.id)}
                              type="button"
                            >
                              <SaveIcon className="size-4 text-green-500" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelEdit}
                              type="button"
                            >
                              <XIcon className="size-4 text-red-500" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(member)}
                              type="button"
                            >
                              <PencilIcon className="size-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(member.id)}
                              type="button"
                            >
                              <TrashIcon className="size-4 text-red-500" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {editingId === member.id ? (
                        <div className="flex space-x-2">
                          <FormField
                            control={form.control}
                            name="first_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    error={
                                      form.formState.errors.first_name?.message
                                    }
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, member.id)
                                    }
                                    className="w-24"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    error={
                                      form.formState.errors.last_name?.message
                                    }
                                    onKeyDown={(e) =>
                                      handleKeyPress(e, member.id)
                                    }
                                    className="w-24"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      ) : (
                        `${member.first_name} ${member.last_name}`
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === member.id ? (
                        <FormField
                          control={form.control}
                          name="birth_date"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="date"
                                  error={
                                    form.formState.errors.birth_date?.message
                                  }
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, member.id)
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ) : (
                        new Date(member.birth_date).toLocaleDateString()
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === member.id ? (
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, member.id)
                                  }
                                  error={form.formState.errors.phone?.message}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ) : (
                        member.phone
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === member.id ? (
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  {...field}
                                  error={form.formState.errors.address?.message}
                                  onKeyDown={(e) =>
                                    handleKeyPress(e, member.id)
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      ) : (
                        member.address
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Form>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              family member.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FamilyMemberList;
