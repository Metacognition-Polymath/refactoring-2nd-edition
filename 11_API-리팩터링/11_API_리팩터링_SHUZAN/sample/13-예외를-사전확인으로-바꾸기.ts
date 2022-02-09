class ResourcePool<T extends Resource> {
  private available: T[] = [];
  private allocated: T[] = [];

  get() {
    let result;
    if (this.isEmpty) {
      result = Resource.create();
      this.allocated.push(result);
    } else {
      result = this.available.pop();
      this.allocated.push(result);
    }
    return result;
  }

  isEmpty() {
    this.available.length === 0;
  }
}

class Resource {
  static create() {
    return new Resource();
  }
}
