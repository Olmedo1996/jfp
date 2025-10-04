'use client';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';
import { BeneficiaryModel } from '@/modules/beneficiaries/core/models/beneficiary.model';
import { AdditionalInformationForm } from '@/modules/beneficiaries/ui/components/forms/additional-information-form';
import { ContactDetailsForm } from '@/modules/beneficiaries/ui/components/forms/contact-details-form';
import { PersonalInformationForm } from '@/modules/beneficiaries/ui/components/forms/personal-information-form';
import useCreateBeneficiary from '@/modules/beneficiaries/ui/hooks/form/use-create-beneficiaries';

export function CreateBeneficiariesForm() {
  const { methods, handleSubmit } = useCreateBeneficiary();

  function onSubmit(values: BeneficiaryModel) {
    handleSubmit(values);
  }

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <SaveHeaderForm
              title={'Nuevo beneficiario'}
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
