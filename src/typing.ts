export type Id = string | number;

export interface Item {
    id: Id;
    parent: Id;
    type?: unknown;
}