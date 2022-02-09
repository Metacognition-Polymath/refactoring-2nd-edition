//리팩토링 전
{
  class Person {
    constructor(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
    set name(aString) {
      this._name = aString;
    }
  }
}
//리팩토링 후 - 세터제거
{
  class Person {
    constructor(name) {
      this._name = name;
    }
    get name() {
      return this._name;
    }
  }
}
