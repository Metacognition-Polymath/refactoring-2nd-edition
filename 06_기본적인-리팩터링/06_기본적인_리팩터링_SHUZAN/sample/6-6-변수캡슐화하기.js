//default data
{
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };
}
//읽고 쓰는 함수를 정의
{
  let defaultOwner = { firstName: "Martin", lastName: "Fowler" };

  function getDefaultOwner() {
    return defaultOwner;
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}
//값 캡슐화하기
{
  function getDefaultOwner() {
    return Object.assign({}, defaultOwner);
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}

// 레코드 캡슐화하기
{
  class Person {
    constructor(data) {
      this._lastName = data.lastName;
      this._firstName = data.firstName;
    }
    get lastName() {
      return this._lastName;
    }
    get firstName() {
      return this._firstName;
    }
  }

  function getDefaultOwner() {
    return Object.assign({}, defaultOwner);
  }
  function setDefaultOwner(arg) {
    defaultOwner = arg;
  }
}
