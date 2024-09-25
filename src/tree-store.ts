import {Id, Item} from "./typing.ts";

export class TreeStore {
    private readonly items: Item[];
    private itemMap: Map<Id, Item>;
    private childrenMap: Map<Id, Item[]>;
    private parentMap: Map<Id, Id>;

    constructor(items: Item[]) {
        this.items = items;
        this.itemMap = new Map();
        this.childrenMap = new Map();
        this.parentMap = new Map();

        this._initializeMaps(items);
    }

    private _initializeMaps(items: Item[]): void {
        for (const item of items) {
            const {id, parent} = item;
            this.itemMap.set(id, item);

            if (!this.childrenMap.has(parent)) {
                this.childrenMap.set(parent, []);
            }
            this.childrenMap.get(parent)?.push(item);
            this.parentMap.set(id, parent);
        }
    }

    getAll(): Item[] {
        return this.items;
    }

    getItem(id: Id): Item | null {
        return this.itemMap.get(id) || null;
    }

    getChildren(id: Id): Item[] {
        return this.childrenMap.get(id) || [];
    }

    getAllChildren(id: Id): Item[] {
        const result: Item[] = [];

        const collectChildren = (parentId: number | string): void => {
            const children = this.getChildren(parentId);
            for (const child of children) {
                result.push(child);
                collectChildren(child.id);
            }
        };

        collectChildren(id);

        return result.sort((a, b) => (a.id > b.id ? 1 : -1));
    }

    getAllParents(id: Id): Item[] {
        const result: Item[] = [];
        let currentId: Id | undefined = id;

        while (currentId !== 'root' && currentId !== undefined) {
            const currentItem = this.getItem(currentId);
            if (currentItem) {
                result.push(currentItem);
                currentId = this.parentMap.get(currentId);
            } else {
                break;
            }
        }

        return result;
    }
}