import {Item} from "./typing.ts";
import {TreeStore} from "./tree-store.ts";

const items = [
    {id: 1, parent: 'root'},
    {id: 2, parent: 1, type: 'test'},
    {id: 3, parent: 1, type: 'test'},
    {id: 4, parent: 2, type: 'test'},
    {id: 5, parent: 2, type: 'test'},
    {id: 6, parent: 2, type: 'test'},
    {id: 7, parent: 4, type: null},
    {id: 8, parent: 4, type: null},
] satisfies Item[];

const treeStore = new TreeStore(items);

console.log(treeStore.getAll()); // Полный список элементов
console.log(treeStore.getItem(7)); // Элемент с id 7
console.log(treeStore.getChildren(4)); // Прямые потомки элемента с id 4
console.log(treeStore.getAllChildren(2)); // Все потомки элемента с id 2
console.log(treeStore.getAllParents(7)); // Все родители элемента с id 7