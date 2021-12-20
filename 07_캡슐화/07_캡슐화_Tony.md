# 07. 캡슐화

- 모듈 분리의 가장 중요한 기준 -> 캡슐화 : 자신을 제외한 다른 부분을 숨김

## 7.1 레코드 캡슐화 하기

- 레코드를 데이터 클래스로 전환

### 7.1.1 레코드 캡슐화 하기 - 개요

```js
// before
organization = {
  name: "애크미 구스베리",
  country: "GB"
}

// after
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get name() {return this._name;}
  set name(arg) {this._name = arg;}
  get country() {return this._country;}
  set country(arg) {return._country = arg;}
}
```

### 7.1.2 레코드 캡슐화 하기 - 배경
