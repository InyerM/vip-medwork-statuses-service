/**
 * Wraps a response (array or object) with a message to be picked up by the response interceptor.
 *
 * @param data - The data to return (array or object).
 * @param message - The message to attach to the response.
 * @returns An object with `_message` and the actual data.
 */
export function withMessage<T>(data: T, message: string): T {
  if (Array.isArray(data)) {
    return {
      _message: message,
      data,
    } as T;
  }

  return {
    _message: message,
    ...data,
  };
}
