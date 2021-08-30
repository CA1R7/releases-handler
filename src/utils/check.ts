export const check = <A = any>(t: string, o: A): boolean => { // eslint-disable-line
  return !(t in o);
};
