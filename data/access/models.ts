export type FilterMap = Map<string, Operator>;

export enum Operator {
  EQUALTO = "EQUALSTO",
  NOTEQUALTO = "NOTEQUALTO",
  GREATERTHAN = "GREATERTHAN",
  GREATERTHANEQUALTO = "GREATERTHANEQUALTO",
  LESSTHAN = "LESSTHAN",
  LESSTHANEQUALTO = "LESSTHANEQUALTO",
};

export const operatorSymbolMap: Record<Operator, string> = {
  [Operator.EQUALTO]: "=",
  [Operator.NOTEQUALTO]: "<>",
  [Operator.GREATERTHAN]: ">",
  [Operator.GREATERTHANEQUALTO]: ">=",
  [Operator.LESSTHAN]: "<",
  [Operator.LESSTHANEQUALTO]: "<=",
};
