# Chapter 04. 테스트 구축하기

## Introduction

- 본 문서에는 주로 책에서 나온 일반적인 이론 또는 조언들을 정리하는데 초점을 두었다.
- Javascript에 한정되는 내용들은 정리 내용에서 제외하였다.

## 자가 테스트 코드의 가치

- 리팩터링을 제대로 하려면 견고한 테스트 스위트가 뒷받침되어야 한다.
- 좋은 테스트를 작성하는 일은 개발 효율을 높인다.
- **모든 테스트를 완전히 자동화하고 그 결과까지 스스로 검사하게 하자.**
- 잘 작성된 테스트를 자주 수행하는 습관은 디버깅의 효율을 극도로 높일 수 있다.
- 테스트를 작성하기 가장 좋은 시점은 프로그래밍을 시작하기 전이다.
  - _테스트 주도 개발 (Test-Driven Development)_

## 테스트 작성 시의 조언

- 실패해야 할 상황에서는 반드시 실패하게 만들자.
- 자주 테스트하자.

  - 작성 중인 코드는 최소 몇 분 간격으로 테스트
  - 적어도 하루에 한 번은 전체 테스트

- **테스트는 위험 요인을 중심으로 작성하자**

  - 테스트의 목적은 현재 혹은 향후 발생할 수 있는 버그를 찾는 것이다.
  - 단순한 Getter/Setter는 보통 테스트를 할 필요 없다.
  - 모든 경우에 대해 완벽하게 테스트를 작성할 필요 없다.

- **공유 픽스쳐의 사용은 피하자.**

  - 개별 테스트마다 픽스처를 새로 구성해야 모든 테스트를 독립적으로 구성할 수 있다.

- 의도된 동작 외에 **경계 조건**에 대해서도 꼭 검사하자.

  - 문제 생길 가능성이 있는 경계 조건을 생각해보고 그 부분을 집중적으로 테스트하자.
  - 의식적으로 프로그램을 망가뜨리기.
  - 경계 조건에 대응하는 동작은 겉보기 동작이 아니다.
  - 리팩터링으로 인해 이 동작이 변하는지는 신경 쓸 필요 없다.

- **수확 체감 법칙**

  - 테스트를 너무 많이 작성하면 오히려 의욕이 떨어진다.
  - 위험한 부분에 집중하자.

- 리팩터링을 하는 동안에도 꾸준히 테스트를 보강하자.

## 그 외의 조언

- 버그 리포트를 받으면 가장 먼저 그 버그를 드러내는 단위 테스트부터 작성하자.
- 리팩터링 후 테스트 결과가 모두 통과된 것만으로 리팩터링 과정에서 생겨난 버그가 없다 확신할 수 있다면 좋은 테스트 스위트이다.
