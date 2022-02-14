class Person {
  private _name: any;

  get name(): any {
    return this._name;
  }

  get genderCode() {
    return 'X'
  }

  constructor(name) {
    this._name = name;
  }
}

class Male extends Person {
  get genderCode() {
    return 'M';
  }
}

class Female extends Person {
  get genderCode() {
    return 'F'
  }
}



/** 1. 무언가 영향을 주는것을바꾸려할때 먼저 현재의 표현을 캡슐화 하여 이 변화가 클라이언ㅇ트 코드에 주는 영향을 최소하하한다. 서브크래스 만들기를 캡슐화하는 방법은
 *  바로 생성자를 팩터리 함수로 바꾸기다. 지금의 예라면 팩터리를 만드는 방법은 여러가지 존재한다.
 *
 * */

/**
 *  가장 직관적이 방법은 팩터리 메서드를 생성자 하나당 하나씩 만드는 것이다.
 *
 * */
const createPerson = (name) => new Person(name);
const createMale = (name) => new Male(name);
const createFemale = (name) => new Female(name);

/**
 * 실제로는 이렇게 생성될 가능성이 있다
 * */

const loadFromInput = (data) => {
  const result = [];
  data.forEach(record => {
    let person;
    switch (record.gender){
      case 'M': person = new Male(record); break;
      case 'F': person = new Female(record); break;
      default: person = new Person(record);
    }
    result.push(person);
  })
  return result;
}