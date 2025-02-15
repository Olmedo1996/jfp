// beneficiaries/edit/[id]/page.tsx
import { contactService } from '@/modules/contacts/services/contact.service';
import UpdateContactForm from '@/modules/contacts/ui/components/contacts-edit-form';

interface EditContactProps {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function EditContact({ params }: EditContactProps) {
  const contactId = params.id ? Number(params.id) : 0;

  const contact = await contactService.get(contactId);

  // Transformar los datos para que coincidan con la estructura del formulario
  const initialValues = {
    ...contact,
  };
  console.log(initialValues);
  return (
    <UpdateContactForm initialValues={initialValues} contactId={contactId} />
  );
}

export default EditContact;
