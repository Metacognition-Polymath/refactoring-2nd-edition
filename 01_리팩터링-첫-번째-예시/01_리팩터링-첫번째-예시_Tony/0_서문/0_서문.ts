{
  class Person {
    // 위와 같은 코드
    get name() {
      return this._name;
    } // 게터
    set name(name: string) {
      this._name = name;
    }

    constructor(private _name: string) {
      // private _name 이 아니라 _name 인 경우 setter를 호출하기 때문에 무한 루프에 빠짐
    }
  }

  const tony = new Person('tony');
  console.log(tony.name); // getter가 호출 됨
  tony.name = '태환'; // setter가 호출 됨
  console.log(tony.name); // setter로 변경된 name 출력
}
