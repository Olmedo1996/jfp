import { BeneficiaryResult } from '@/modules/beneficiaries/core/interfaces/beneficiaries-service.interface';

interface BeneficiaryCardProps {
  beneficiary: BeneficiaryResult;
}

export function BeneficiaryCard({ beneficiary }: BeneficiaryCardProps) {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Beneficiary Information</h2>
      <div className="space-y-3">
        {[
          {
            label: 'Name',
            value: `${beneficiary.first_name} ${beneficiary.last_name}`,
          },
          { label: 'Email', value: beneficiary.email },
          { label: 'Phone', value: beneficiary.phone },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col">
            <span className="text-muted-foreground text-sm">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
