export function LogExecutionTime(): (
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) => void {
  return (_target, propertyKey, descriptor) => {
    const original = descriptor.value as (...args: unknown[]) => unknown;

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const startedAt = performance.now();
      const result = original.apply(this, args);
      const elapsed = performance.now() - startedAt;

      console.log(
        `[BENCHMARK] Метод ${String(propertyKey)} виконано за ${elapsed.toFixed(3)} ms.`,
      );
      return result;
    };
  };
}
