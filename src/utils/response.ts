export interface ResponseStTypo<A> {
  status: boolean;
  message: string | null;
  content?: A;
}

export const ResponseSt = <Y = any>( // eslint-disable-line
  status: boolean,
  message: string | null,
  content?: Y,
): ResponseStTypo<Y> => {
  return { status, message, content };
};
