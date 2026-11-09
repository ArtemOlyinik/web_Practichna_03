import type { BaseEntity, IRepository, UpdateDto } from '../types/index.js';

export class InMemoryRepository<T extends BaseEntity>
  implements IRepository<T>
{
  protected items: T[] = [];

  create(item: T): T {
    this.items.push(item);
    return item;
  }

  findById(id: string): T | null {
    return this.items.find((item) => item.id === id) ?? null;
  }

  findAll(): T[] {
    return [...this.items];
  }

  update(id: string, patch: UpdateDto<T>): T | null {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const current = this.items[index];
    if (!current) {
      return null;
    }

    const updated = {
      ...current,
      ...patch,
      id: current.id,
      createdAt: current.createdAt,
      updatedAt: new Date(),
    } as T;

    this.items[index] = updated;
    return updated;
  }

  deleteById(id: string): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }
}
