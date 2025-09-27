'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  ICreateBeneficiary,
  IUpdateBeneficiary,
} from '../core/interfaces/beneficiaries.interface';
import {
  ApiBeneficiariesRequestParams,
  ApiBeneficiariesResponse,
  BeneficiaryResult,
} from '../core/interfaces/beneficiaries-service.interface';
import { beneficiariesService } from '../services/beneficiaries.service';

// Action para crear beneficiario
export async function createBeneficiaryAction(data: ICreateBeneficiary) {
  try {
    const response = await beneficiariesService.create(data);

    // Revalidar la página de lista para mostrar los cambios
    revalidatePath('/beneficiaries');

    return {
      success: true,
      data: response,
      message: 'Beneficiario creado exitosamente',
    };
  } catch (error) {
    console.error('Error in createBeneficiaryAction:', error);
    return {
      success: false,
      error: 'Error al crear el beneficiario',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// Action para actualizar beneficiario
export async function updateBeneficiaryAction(
  id: BeneficiaryResult['id'],
  data: IUpdateBeneficiary
) {
  try {
    const response = await beneficiariesService.update(id, data);

    // Revalidar múltiples rutas
    revalidatePath('/beneficiaries');
    revalidatePath(`/beneficiaries/${id}`);

    return {
      success: true,
      data: response,
      message: 'Beneficiario actualizado exitosamente',
    };
  } catch (error) {
    console.error('Error in updateBeneficiaryAction:', error);
    return {
      success: false,
      error: 'Error al actualizar el beneficiario',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// Action para eliminar beneficiario
export async function deleteBeneficiaryAction(id: number) {
  try {
    await beneficiariesService.delete(id);

    // Revalidar la lista después de eliminar
    revalidatePath('/beneficiaries');

    return {
      success: true,
      message: 'Beneficiario eliminado exitosamente',
    };
  } catch (error) {
    console.error('Error in deleteBeneficiaryAction:', error);
    return {
      success: false,
      error: 'Error al eliminar el beneficiario',
      details: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

// Action para obtener lista de beneficiarios
export async function getBeneficiariesAction(
  params?: ApiBeneficiariesRequestParams
): Promise<ApiBeneficiariesResponse> {
  try {
    return await beneficiariesService.listView(params);
  } catch (error) {
    console.error('Error in getBeneficiariesAction:', error);
    throw new Error('Error al obtener la lista de beneficiarios');
  }
}

// Action para obtener un beneficiario específico
export async function getBeneficiaryAction(
  id: BeneficiaryResult['id']
): Promise<BeneficiaryResult> {
  try {
    return await beneficiariesService.get(id);
  } catch (error) {
    console.error('Error in getBeneficiaryAction:', error);
    throw new Error('Error al obtener el beneficiario');
  }
}

// Actions combinadas con redirect (útil para formularios que necesitan redirigir)
export async function createBeneficiaryAndRedirectAction(
  data: ICreateBeneficiary,
  redirectTo?: string
) {
  const result = await createBeneficiaryAction(data);

  if (result.success && redirectTo) {
    redirect(redirectTo);
  }

  return result;
}

export async function updateBeneficiaryAndRedirectAction(
  id: BeneficiaryResult['id'],
  data: IUpdateBeneficiary,
  redirectTo?: string
) {
  const result = await updateBeneficiaryAction(id, data);

  if (result.success && redirectTo) {
    redirect(redirectTo);
  }

  return result;
}
