import { AutoPartsService, InMemoryRepository } from './repositories/index.js';
import {
  AutoPartEntity,
  EntityStatus,
  type ApiResponse,
  type EntitySummary,
} from './types/index.js';

function formatPrice(value: number): string {
  return `${new Intl.NumberFormat('uk-UA', {
    maximumFractionDigits: 2,
  }).format(value)} грн`;
}

const repository = new InMemoryRepository<AutoPartEntity>();
const service = new AutoPartsService(repository);

console.log('=== GENERIC REPOSITORY & SERVICE LAYER ===\n');

console.log('[Створення сутностей]');
const brakePads = service.create({
  title: 'Гальмівні колодки Brembo P85020',
  price: 2450,
  vinCompatibility: ['WVWZZZ1JZXW000001', 'WVWZZZ1KZAW000002'],
  oemCode: 'P85020',
  condition: 'new',
  status: EntityStatus.Active,
});
console.log(
  `Створено: ${brakePads.title} | ${formatPrice(brakePads.price)} | ${brakePads.status}`,
);

const shockAbsorber = service.create({
  title: 'Амортизатор KYB Excel-G 333504',
  price: 1890,
  vinCompatibility: ['WVWZZZ1JZXW000001'],
  oemCode: '333504',
  condition: 'new',
  status: EntityStatus.Active,
});
console.log(
  `Створено: ${shockAbsorber.title} | ${formatPrice(shockAbsorber.price)} | ${shockAbsorber.status}`,
);

const starter = service.create({
  title: 'Стартер Bosch 0001108231',
  price: 3200,
  vinCompatibility: ['WVWZZZ1KZAW000002'],
  oemCode: '0001108231',
  condition: 'refurbished',
  status: EntityStatus.Archived,
});
console.log(
  `Створено: ${starter.title} | ${formatPrice(starter.price)} | ${starter.status}`,
);

const airFilter = service.create({
  title: 'Повітряний фільтр MANN C25114',
  price: 650,
  vinCompatibility: ['WVWZZZ1JZXW000001'],
  oemCode: 'C25114',
  condition: 'new',
  status: EntityStatus.Draft,
});
console.log(
  `Створено: ${airFilter.title} | ${formatPrice(airFilter.price)} | ${airFilter.status}`,
);

console.log('\n[Часткове оновлення]');
const updated = service.update(brakePads.id, { price: 2390 });
if (updated) {
  console.log(
    `Оновлено: ${updated.title} | нова ціна ${formatPrice(updated.price)} | id не змінився: ${updated.id === brakePads.id}`,
  );
}

console.log('\n[Список сутностей]');
for (const item of service.findAll()) {
  console.log(
    `- ${item.title}: ${formatPrice(item.price)}, стан ${item.condition}, статус ${item.status}`,
  );
}

console.log('\n[Аналітика статусів]');
const analytics = service.getStatusAnalytics();
console.log(
  `ACTIVE: ${analytics[EntityStatus.Active]}, ARCHIVED: ${analytics[EntityStatus.Archived]}, DRAFT: ${analytics[EntityStatus.Draft]}`,
);

console.log('\n[ApiResponse]');
const summaries: EntitySummary<AutoPartEntity>[] = service
  .findAll()
  .map(({ id, title, price }) => ({ id, title, price }));

const response: ApiResponse<EntitySummary<AutoPartEntity>[]> = {
  success: true,
  data: summaries,
  timestamp: new Date(),
  meta: { total: summaries.length, source: 'in-memory' },
};
console.log(JSON.stringify(response, null, 2));

console.log('\n[Видалення]');
console.log(`Видалено стартер: ${service.delete(starter.id)}`);
console.log(`Повторне видалення: ${service.delete(starter.id)}`);

console.log('\n[Захист класу від розширення]');
try {
  Object.defineProperty(AutoPartEntity.prototype, 'hacked', {
    value: () => 'hacked',
    configurable: true,
  });
  console.log('Захист не спрацював: прототип вдалося розширити');
} catch (error) {
  console.log(`Очікувана помилка: ${(error as Error).message}`);
}
