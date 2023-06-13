export const objectKeys = <T extends Object>(obj: T) => {
  return Object.keys(obj) as (keyof T)[];
};

export const objectValues = <T extends Object>(obj: T) => {
  return Object.values(obj) as T[keyof T][];
}
