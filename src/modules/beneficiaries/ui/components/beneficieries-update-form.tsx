'use client';

import useUpdateBeneficiary from '../hooks/form/use-update-beneficiaries';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { AdditionalInformationForm } from '@/modules/beneficiaries/ui/components/forms/additional-information-form';
import { ContactDetailsForm } from '@/modules/beneficiaries/ui/components/forms/contact-details-form';
import { PersonalInformationForm } from '@/modules/beneficiaries/ui/components/forms/personal-information-form';
import * as m from '@/paraglide/messages';

interface UseUpdateBeneficiaryProps {
  initialValues: BeneficiaryModel;
  beneficiaryId: number;
}

export function UpdateBeneficiariesForm({
  beneficiaryId,
  initialValues,
}: UseUpdateBeneficiaryProps) {
  const { methods, handleSubmit } = useUpdateBeneficiary({
    beneficiaryId,
    initialValues,
  });

  function onSubmit(values: BeneficiaryModel) {
    handleSubmit(values);
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <SaveHeaderForm
              title={m.edit_beneficiary()}
              backUrl={EBeneficiaryRoute.list}
            />
          </CardHeader>
          <CardContent>
            <div className="shadow-sm">
              <PersonalInformationForm />
              <hr className="my-8" />
              <ContactDetailsForm />
              <hr className="my-8" />
              <AdditionalInformationForm />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
