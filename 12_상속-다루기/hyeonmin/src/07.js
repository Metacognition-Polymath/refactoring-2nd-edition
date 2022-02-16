/**
 * - 서브클래스의 역할을 분석해보고 굳이 존재해야할 이유가 없다면 리팩터링을 적용하자.
 * - 바로 제거하지 말고 혹시라도 이 클래스들을 사용하는 클라이언트가 있는지 살펴봐야 한다.
 */

class Person {
  #name
  constructor(name) {
    this.#name = name
  }
  get name() {
    return this.#name
  }
  get genderCode() {
    return 'X'
  }
}
class Male extends Person {
  get genderCode() {
    return 'M'
  }
}
class Female extends Person {
  get genderCode() {
    return 'F'
  }
}

const people = [new Male('재남'), new Female('지금'), new Male('로이'), new Female('이지')]
const numberOfMales = people.filter(p => p instanceof Male).length
console.log(numberOfMales)