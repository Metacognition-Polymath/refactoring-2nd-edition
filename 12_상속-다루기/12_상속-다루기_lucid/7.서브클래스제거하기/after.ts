class Person {
  private readonly _name: any;
  private _genderCode: any;
  /** 햇갈리니 기본 값 세팅을 해주는 방향으로 하기로 했다 */

  constructor(name, genderCode: 'M' | 'F') {
    this._name = name;
    this._genderCode = genderCode;
  }

  get name(): any {
    return this._name;
  }

  get genderCode() {
    return 'X'
  }

  get isMale() {
    return 'M' === this.genderCode
  }
}

/** 서브 클래스가 너무 단순한일을 하니 존재할 필요학 없다  */
/* class Male extends Person {get genderCode() {return 'M';}*/

// class Female extends Person {get genderCode() {return 'F'}}

const createPerson = (record) => {
  let person;
  switch (record.gender) {
    case 'M':
      person = new Person(record, 'M');
      break;
    case 'F':
      person = new Person(record, 'F');
      break;
    default:
      person = new Person(record, 'M');
  }
  return person;
}

const loadFromInput = (data) => {
  const result = [];
  data.forEach(record => {
    const person = createPerson(record);
    result.push(person);
  })
  return result;
}
