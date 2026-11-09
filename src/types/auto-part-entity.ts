import { FrozenEntity } from '../decorators/index.js';
import type { BaseEntity } from './base-entity.js';
import { EntityStatus } from './entity-status.js';

@FrozenEntity()
export class AutoPartEntity implements BaseEntity {
  constructor(
    public readonly id: string,
    public title: string,
    public price: number,
    public vinCompatibility: string[],
    public oemCode: string,
    public condition: 'new' | 'refurbished',
    public status: EntityStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}
