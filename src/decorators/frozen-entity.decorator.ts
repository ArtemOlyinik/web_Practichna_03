export function FrozenEntity(): ClassDecorator {
  return (constructor) => {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
  };
}
