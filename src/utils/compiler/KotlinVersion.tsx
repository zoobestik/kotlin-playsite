type Segment = `${number | ''}${number}`;

type Major = Segment;
type Minor = Segment;
type Patch = `${number | ''}${Segment}`;

export type KotlinVersion = `${Major}.${Minor}.${Patch}`;
