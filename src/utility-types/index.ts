export type ToString<T extends Record<string, any>> = {
  [K in keyof T]: string;
};
