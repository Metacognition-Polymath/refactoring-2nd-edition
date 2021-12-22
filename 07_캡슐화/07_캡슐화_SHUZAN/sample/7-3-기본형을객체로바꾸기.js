class Priority {
  toString() {
    return this._value;
  }

  constructor(value) {
    //인스턴스 검사
    if (value instanceof Priority) return value;
    //유효 타입 검사
    if (Priority.legalValues().includes(value)) this._value = value;
    else throw new Error(`<${value}> is invalid for Priority`);
  }
  toString() {
    return this._value;
  }
  get _index() {
    return Priority.legalValues().findIndex((s) => s === this._value);
  }
  static legalValues() {
    return ["low", "normal", "high", "rush"];
  }

  equals(other) {
    return this._index === other._index;
  }
  higherThan(other) {
    return this._index > other._index;
  }
  lowerThan(other) {
    return this._index < other._index;
  }
}

export class Order {
  constructor(data) {
    this._priority = new Priority(data.priority);
  }

  // 변수캡슐화
  get priority() {
    return this._priority;
  }

  get priorityString() {
    return this._priority.toString(); //우선순위를 표현하는 문자열 - 함수 선언바꾸기
  }

  set priorityString(aString) {
    this._priority = new Priority(aString);
  }
}

const orders = [
  new Order({ priority: "normal" }),
  new Order({ priority: "high" }),
  new Order({ priority: "rush" }),
];

//클라이언트 코드
export const highPriorityCount = orders.filter((o) =>
  o.priority.higherThan(new Priority("normal")),
).length;
