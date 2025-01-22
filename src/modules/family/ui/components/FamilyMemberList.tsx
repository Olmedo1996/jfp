import { useFamilyMembers } from '../hooks/query/use-family-members';

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="mb-4 text-xl font-semibold">Family Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Birth Date</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {familyMembers &&
            familyMembers?.results?.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.first_name} {member.last_name}
                </TableCell>
                <TableCell>
                  {new Date(member.birth_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{member.phone}</TableCell>
                <TableCell>{member.address}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
