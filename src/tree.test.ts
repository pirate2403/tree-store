import {TreeStore} from './tree-store';
import {Item} from "./typing.ts";


const items: Item[] = [
    {id: 1, parent: 'root'},
    {id: 2, parent: 1, type: 'test'},
    {id: 3, parent: 1, type: 'test'},
    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},
    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
];

let treeStore: TreeStore;

beforeEach(() => {
    treeStore = new TreeStore(items);
});

describe('Tree class tests', () => {
    test('getAll() should return all items', () => {
        expect(treeStore.getAll()).toEqual(items);
    });

    test('getItem() should return the correct item by id', () => {
        expect(treeStore.getItem(1)).toEqual({id: 1, parent: 'root'});
        expect(treeStore.getItem(4)).toEqual({id: 4, parent: 2, type: 'test'});
    });

    test('getItem() should return null for non-existent id', () => {
        expect(treeStore.getItem(999)).toBeNull();
    });

    test('getChildren() should return direct children of an item', () => {
        expect(treeStore.getChildren(1)).toEqual([
            {id: 2, parent: 1, type: 'test'},
            {id: 3, parent: 1, type: 'test'},
        ]);
        expect(treeStore.getChildren(2)).toEqual([
            {id: 4, parent: 2, type: 'test'},
            {id: 5, parent: 2, type: 'test'},
            {id: 6, parent: 2, type: 'test'},
        ]);
    });

    test('getChildren() should return an empty array if there are no children', () => {
        expect(treeStore.getChildren(8)).toEqual([]);
    });

    test('getAllChildren() should return all descendants of an item', () => {
        expect(treeStore.getAllChildren(2)).toEqual([
            {id: 4, parent: 2, type: 'test'},
            {id: 5, parent: 2, type: 'test'},
            {id: 6, parent: 2, type: 'test'},
            {id: 7, parent: 4, type: null},
            {id: 8, parent: 4, type: null},
        ]);
    });

    test('getAllChildren() should return an empty array if there are no descendants', () => {
        expect(treeStore.getAllChildren(6)).toEqual([]);
    });

    test('getAllParents() should return all parents up to the root', () => {
        expect(treeStore.getAllParents(7)).toEqual([
            {id: 7, parent: 4, type: null},
            {id: 4, parent: 2, type: 'test'},
            {id: 2, parent: 1, type: 'test'},
            {id: 1, parent: 'root'},
        ]);
    });

    test('getAllParents() should return just the item if it has no parent', () => {
        expect(treeStore.getAllParents(1)).toEqual([{id: 1, parent: 'root'}]);
    });

    test('getAllParents() should return an empty array if the id is invalid', () => {
        expect(treeStore.getAllParents(999)).toEqual([]);
    });
});
