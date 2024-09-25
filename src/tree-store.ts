import { Id, Item } from "./typing.ts";

export class TreeStore {
  // Массив всех элементов
  private readonly items: Item[];
  // Map для быстрого доступа к элементам по их идентификатору
  private itemMap: Map<Id, Item>;
  // Map для хранения детей каждого элемента
  private childrenMap: Map<Id, Item[]>;
  // Map для хранения родителя каждого элемента
  private parentMap: Map<Id, Id>;

  // Конструктор, который инициализирует классы и карты
  constructor(items: Item[]) {
    this.items = items; // Сохраняем элементы
    this.itemMap = new Map(); // Инициализируем карты
    this.childrenMap = new Map();
    this.parentMap = new Map();

    // Заполняем карты на основе переданных элементов
    this.initializeMaps(items);
  }

  // Метод для инициализации карт из переданных элементов
  private initializeMaps(items: Item[]): void {
    for (const item of items) {
      const { id, parent } = item; // Извлекаем id и родителя из элемента
      this.itemMap.set(id, item); // Заполняем itemMap

      // Если родитель еще не имеет детей, инициализируем пустой массив
      if (!this.childrenMap.has(parent)) {
        this.childrenMap.set(parent, []);
      }
      // Добавляем элемент в массив детей родителя
      this.childrenMap.get(parent)?.push(item);
      this.parentMap.set(id, parent); // Заполняем parentMap
    }
  }

  // Метод для получения всех элементов
  public getAll(): Item[] {
    return this.items; // Возвращаем массив всех элементов
  }

  // Метод для получения элемента по его id
  public getItem(id: Id): Item | null {
    return this.itemMap.get(id) || null; // Возвращаем элемент или null, если не найден
  }

  // Метод для получения прямых детей элемента по его id
  public getChildren(id: Id): Item[] {
    return this.childrenMap.get(id) || []; // Возвращаем массив детей или пустой массив
  }

  // Метод для получения всех потомков элемента по его id
  public getAllChildren(id: Id): Item[] {
    const result: Item[] = []; // Массив для хранения потомков

    // Вспомогательный рекурсивный метод для сбора детей
    const collectChildren = (parentId: number | string): void => {
      const children = this.getChildren(parentId); // Получаем детей текущего элемента
      for (const child of children) {
        result.push(child); // Добавляем ребенка в результат
        collectChildren(child.id); // Рекурсивно собираем детей ребенка
      }
    };

    collectChildren(id); // Начинаем сбор детей с указанного id

    // Сортируем результат по id перед возвратом
    return result.sort((a, b) => (a.id > b.id ? 1 : -1));
  }

  // Метод для получения всех родителей элемента до корня
  public getAllParents(id: Id): Item[] {
    const result: Item[] = []; // Массив для хранения родителей
    let currentId: Id | undefined = id; // Текущий id для обхода

    // Цикл для получения всех родителей
    while (currentId !== "root" && currentId !== undefined) {
      const currentItem = this.getItem(currentId); // Получаем текущий элемент по id
      if (currentItem) {
        result.push(currentItem); // Добавляем текущий элемент в результат
        currentId = this.parentMap.get(currentId); // Переходим к родителю
      } else {
        break; // Выходим из цикла, если элемент не найден
      }
    }

    return result; // Возвращаем массив родителей
  }
}
