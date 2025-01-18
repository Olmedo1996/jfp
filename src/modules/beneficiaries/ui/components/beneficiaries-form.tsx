'use client';

import { EBeneficiaryRoute } from '../../constants';
import { BeneficiaryModel } from '../../core/models/beneficiary.model';
import useCreateBeneficiary from '../hooks/use-create-beneficiaries';
import { AdditionalInformationForm } from './forms/additional-information-form';
import { ContactDetailsForm } from './forms/contact-details-form';
import { PersonalInformationForm } from './forms/personal-information-form';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import * as m from '@/paraglide/messages';

export function BeneficiariesForm() {
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
              title={m.new_beneficiary()}
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
