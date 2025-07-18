/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function getClassName(cls: Function): string | undefined {
  return cls.name;
}
