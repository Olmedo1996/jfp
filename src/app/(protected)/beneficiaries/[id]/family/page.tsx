import { notFound } from 'next/navigation';

import { beneficiariesService } from '@/modules/beneficiaries/services/beneficiaries.service';
import { FamilyMemberForm } from '@/modules/family/ui/components/FamilyMemberForm';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function FamilyMemberPage({ params }: PageProps) {
  const beneficiary = await beneficiariesService.get(parseInt(params.id));

  if (!beneficiary) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-2xl font-bold">Family Members</h1>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Beneficiary Information
          </h2>
          <div className="space-y-4">
            <p>
              <span className="font-medium">Name:</span>{' '}
              {beneficiary.first_name} {beneficiary.last_name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {beneficiary.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {beneficiary.phone}
            </p>
          </div>
        </div>
        <FamilyMemberForm beneficiaryId={parseInt(params.id)} />
      </div>
    </div>
  );
}
