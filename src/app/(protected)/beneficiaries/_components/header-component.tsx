'use client';

import SaveHeaderForm from '@/components/forms/save-header-form';
import { EBeneficiaryRoute } from '@/modules/beneficiaries/constants';

const HeaderClientComponent = () => {
  return (
    <SaveHeaderForm
      title={`Miembros de la familia`}
      backUrl={EBeneficiaryRoute.list}
      hideSaveButton={true}
    />
  );
};

export default HeaderClientComponent;
