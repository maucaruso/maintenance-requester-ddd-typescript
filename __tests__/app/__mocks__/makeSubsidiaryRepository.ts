import { ISubsidiaryRepository } from '@app/subsidiaries/ISubsidiaryRepository';
import { Subsidiary } from '@domain/subsidiaries/Subsidiary';

const makeSubsidiaryRepository = (subsidiary: Subsidiary) => {
  class SubsidiaryRepository implements ISubsidiaryRepository {
    search(): Promise<Subsidiary[]> {
      throw new Error('Method not implemented.');
    }
    async searchById(id: string): Promise<Subsidiary> {
      return subsidiary;
    }
    add(entity: Subsidiary): Promise<void> {
      throw new Error('Method not implemented.');
    }
  }

  const subsidiaryRepository = new SubsidiaryRepository();

  return { subsidiaryRepository };
};

export { makeSubsidiaryRepository };
