class ContainerMemory {
  constructor() {
    this.elements = [];
  }
/**
 * @constructor sets an array in memory to be used as DB, and sets the methos in wich container can be used for handling data.
 */
  getAll() {
    return this.elements;
  }

  save(element) {
    element.id =
      this.elements.length === 0
        ? 1
        : this.elements[this.elements.length - 1].id + 1;

    this.elements.push(element);

    return element;
  }

  getById(id) {
    return this.elements.find((element) => element.id === id);
  }
  
  updateById(id, newData) {
    const elementIndex = this.elements.findIndex((element) => element.id == id);

    if (elementIndex === -1) return null;

    const foundElement = this.elements[elementIndex];

    this.elements[elementIndex] = {
      ...this.elements[elementIndex],
      ...newData,
    };

    return this.elements[elementIndex];
  }

  deleteById(id) {
    this.elements.filter((element) => element.id != id);
    return { success: true };
  }
}

export { ContainerMemory };
