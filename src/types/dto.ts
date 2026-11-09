import type { BaseEntity } from './base-entity.js';
import type { EntityStatus } from './entity-status.js';

export type CreateDto<T extends BaseEntity> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateDto<T extends BaseEntity> = Partial<CreateDto<T>>;

export type EntitySummary<
  T extends BaseEntity & { title: string; price: number },
> = Pick<T, 'id' | 'title' | 'price'>;

export type EntityAnalytics<T extends BaseEntity> = Record<EntityStatus, number>;

export type StatusAnalytics = EntityAnalytics<BaseEntity>;
