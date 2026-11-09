import { randomUUID } from 'node:crypto';
import { LogExecutionTime } from '../decorators/index.js';
import {
  AutoPartEntity,
  EntityStatus,
  type CreateDto,
  type EntityAnalytics,
  type IRepository,
  type UpdateDto,
} from '../types/index.js';

export class AutoPartsService {
  constructor(private readonly repository: IRepository<AutoPartEntity>) {}

  @LogExecutionTime()
  create(dto: CreateDto<AutoPartEntity>): AutoPartEntity {
    const now = new Date();
    const entity = new AutoPartEntity(
      randomUUID(),
      dto.title,
      dto.price,
      [...dto.vinCompatibility],
      dto.oemCode,
      dto.condition,
      dto.status,
      now,
      now,
    );
    return this.repository.create(entity);
  }

  @LogExecutionTime()
  update(id: string, patch: UpdateDto<AutoPartEntity>): AutoPartEntity | null {
    return this.repository.update(id, patch);
  }

  @LogExecutionTime()
  findAll(): AutoPartEntity[] {
    return this.repository.findAll();
  }

  @LogExecutionTime()
  delete(id: string): boolean {
    return this.repository.deleteById(id);
  }

  @LogExecutionTime()
  getStatusAnalytics(): EntityAnalytics<AutoPartEntity> {
    const analytics: EntityAnalytics<AutoPartEntity> = {
      [EntityStatus.Active]: 0,
      [EntityStatus.Archived]: 0,
      [EntityStatus.Draft]: 0,
    };

    for (const item of this.repository.findAll()) {
      analytics[item.status] += 1;
    }
    return analytics;
  }
}
