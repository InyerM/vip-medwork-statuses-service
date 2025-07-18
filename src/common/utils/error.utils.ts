export const getMessageFromError = (error: unknown): string => {
  if (
    error instanceof Error ||
    (typeof error === 'object' && error !== null && Object.hasOwn(error, 'message'))
  )
    return (
      (Object.getOwnPropertyDescriptor(error, 'message')?.value as string | undefined) ??
      'There was an unknown error'
    );
  if (typeof error === 'string') return error;
  return 'There was an unknown error';
};

export const getStackFromError = (error: unknown): string | undefined => {
  if (error instanceof Error) return error.stack;
  if (typeof error === 'string') return error;
  return 'There was an unknown error';
};
