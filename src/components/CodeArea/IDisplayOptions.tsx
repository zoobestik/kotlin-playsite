export interface IDisplayOptionsFromTo {
  from: number;
  to: number;
}

export interface IDisplayOptions {
  autoComplete?: boolean;
  indent?: number;
  showLines?: boolean;
  fromTo?: IDisplayOptionsFromTo;
  matchBrackets?: boolean;
  theme?: string;
}
