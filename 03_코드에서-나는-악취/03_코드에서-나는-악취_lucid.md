# 03. 코드에서 나는 악취
 - 언제 시작하고 언제 그만할지 판단 중요하다
 - 인스턴스 변수 삭제, 상속 계층 만드는 방법 설명만 쉽다(적용하기는 어렵다)
 - 숙련된 사람의 직관이 좋을때가 많다

## 3.1 기이한 이름
 - **_이름만 봐도 알 수 있는 변수명이 좋다! 이름이 어렵다면 설계가 어려운거다_**
 - 해결방법:
   1. 변수이름 바꾸기 
   2. 함수 선언 바꾸기
   3. 필드 이름 바꾸기

## 3.2 중복 코드
  - _똑같은 코드 구조 반복 시 통합하는게 관리 하기 쉽다_
  - 한 클래스 두 메서드에서 같은 표현식(같은 로직) 일 경우 => 함수 추출하기
  - 완전 똑같지 않다면 => 문장 슬라이드하기
  - 같은 클래스를  상속 받은 서브 클래스 코드 중복 => 메서드 올리기(부모에게 통합)

## 3.3 긴 함수
  - _함수는 짧고 간결한게 좋다(잘 만든 프로그램이 그렇단다)_
  - _짧고 좋은 이름을 짓자_
  - 짧게 만드는 가장 잘쓰는 방법: 99% 함수 추출하기
  - 매개 변수가 많아져 난해해 질 경우:
     1) 임시변수를 질의함수로 바꾸기 
     2) 임시 변수를 매개변수 객체 만들기 및 객체 통째로 넘기기
     3) 함수를 명령으로 바꾸기
  - 추출할 코드 덩어리를 어떻게 판단할하는 방법:
    1) 주석 내용을 토대로 함수를 분리하자
    2) 조건문 반복문 을 함수로 분리: 조건문 분해하기
    3) case: 함수 추출하기
    4) switch 일 경우 조건을 다형성 바꾸기
    5) 반복문 안에 코드 작업이 섞일 경우: 반복분 쪼개
## 3.4 긴 매개변수 목록
  - 앞에서 보듯이 : 매개변수 질의 함수로 바꾸기
  - 객체 통째로 넘기기
  - 매개 변수 객체 만들기
  - 플래그 인수 제거하기(?)
  - 여러 함수를 클래스로 묶서 처리하기
## 3.5 전역 데이터
  - 전역 데이터는 항상 조심해야한다(머 다 아실듯)
  - 대표적인 형태: 클래스 변수, 싱글톤
  - 해결 방법 변수 캡슐화하기
  - 전역 데이터가 가변일 경우는 골치가 아프니 언어에서 컴파일 수준에서 잡아주면 좋겟다
## 3.6 가변 데이터
  - 예쌍치 못한 곳에서 변경, 다른 코드에서 반영한다는 걸 인식 못하고 변경시 오작동
  - 함수형 프로그래밍은 이걸 해결하고 싶어한다
  - 변수 캡슐화로 함수를 이용해서 수정할수잇게만 변경한다
  - 하나의 변수에 섞어서 사용일 경우 => 변수 쪼개기를 해서 독립 변수로 만든다
  - 갱신로직과 다른 코드는 떨어트려놓자? => 문장 슬라이드/함수 추출하기 => 뷰작용 없게 만들자
  - API 를 만들때 질의함수와 변경 함수 분리하자(부작용 있는 코드를 제거)
  - 세터 제거하기 적용
  - 파생 변수를 질의 함수로 바꿔서 쓸데없는 코드를 검사한다
  - 가변 변수의 여러 함수를 클래스로 묶거나, 여러 함수를 변환 함수로 묶자
  - 구조체의 데이터 변수라는 참조 값으로 바꾸고 => 참조하는 구조체를 변경하자
## 3.7 뒤엉킨 변경
   - 단일 책임 원치 제대로 지켜지지 않는 경우를 말한다
   - _EX)데이터베이스가 추가될때 함수 세개 변경시, 금융 상품 추가시 함수를 여러개, 모듈이 뒤 엉킬때
   - 해결 방법: 단계 쪼개기(맥락에 따라 다르게 처리)
   - 맥락에따라 관여하는 함수가 있다면 함수 추출, 모듈이 클래스이 경우 클래스 추축로 정리한다
## 3.8 산탄총 수술
   - 변경할 부분이 코드 전반에 퍼져있는경우
   - 해결 방법: 변경 대상들 => 함수 옮기기, 필드옮기기 모듈화하기
   - 비슷한 데이터 함수 많을 경우: 여러 함수를 클래스로 묶기
   - 데이터 구조 변환 혹은 보강시 여러 함수를 변환 함수로 묶는다
   - 단계 쪼개기로 전달 하기 쉽게 코드 만들기
   - 어설픈 경우는 함수 인라인 및 클래스 인라인으로 처리한다
## 3.9 기능 편애
   - 함수에 데이터와 가까이 옮겨주자. 함수 옮기기

## 3.10 데이터 뭉치
 - 필드형태의 데이터 뭉치 => 클래스 추출하기(객체 만들기)

## 3.11 기본형 집착
 - 일반적인 문자열에서 비교 할때 다양한 타입을 고려하지않는다
 - 필요한 문자 타입의 객체를 만들어서 다양하게 비교할수있게 만들자

## 3.12 반복되는 switch 문
 - 각 스위치가 반복될때마다 고쳐야하는 코드가 많이 온다(실수를 유발할수 있음)
 - 조건부 다형성으로 바꾼다
 - if 문도 이에 해당된다고 주장하는 사람이잇다

## 3.13 반복문
 - 일급함수로 반복문을 파이프라인으로 변경하자
 - 맵 필터와 같은 파이프라인으로 가독성 좋게 만ㄷ르자

## 3.14 성의 없는 요소
 - 메서드가 하나인 클래스, 
 - 무의미한 변수 및 함수는 불필요하다
 - 함수 인라인하기, 클래스 인라하기, 상속시 계층 합치기

## 3.15 추측성 일반화
 - 나중에 필요할껄 예상하고 만드는데 실제로 필요하지않는게 대부분이다
 - 추상 클래스는 계층 합치기
 - 쓸데없는 위임 코드는 함수 인라인하기, 클래스 인라인하기
 - 실제로 사용하지않는 함수의 매개변수는 함수 선언 바꾸기로 제거
 - 사용 없는 함수는 테스트 케이스부터 제거후 죽은 코드 제거하기 적용

## 3.16 임시 필드

## 3.17 메시지 체인

## 3.18 중개자

## 3.19 내부자 거래

## 3.20 거대한 클래스
 - 클래스 필드 수가 많을 경우 중복 코드가 생기기 쉽다
 - 해결 방법: 클래스 추출하기(일부 필드 따로 묶기)
 - 슈퍼 클래스 추출 OR 타입코드 서브클래스로 바꾸기

## 3.21 서로 다른 인터페이스의 대안 클래스
 - 클래스는 필요에 따라 언제든지 다른 클래스로 바꿀수 있다 but) 인터페이스가 같아야된다
 - 함수 선언 바꾸기로 메서드 시그니처를 일치 시킨다
 - 함수 옮기기 => 인터페이스 같아질깨ㅏ지 필요 동작 클래스 옮기기
 - 중복 코드시 슈퍼클래스 추출

## 3.22 데이터 클래스

## 3.23 상속 포기
 - 계층구조를 잘못 설계할 경우
 - 같은 클래스 서브클래스 새로 만들어 메서드 및 필드를 선언, 물려받지 않을 부모 코드를 서브클래스로 넘긴다
 - 부모에게 공톤되 부분만 나기는게 핵심인거같다(부모는 추상화가 되어야한다)

## 3.24 주석
 - 주석 없이 하는게 가장중요
 - 장황하는게 악취가 나는거 같다
 - 해결방법: 함수 추출, 함수 선언 바꾸기(함수 이름), 시스템 동작 선행 조건은 어서션 추가!

