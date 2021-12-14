### 6.0

- 가장 많이 사용하는 리팩터링 : 함수 추출하기 ↔ 함수 인라인하기, 변수 추출하기 ↔ 변수 인라인하기
- 함수 선언 바꾸기: 함수의 이름을 변경할때 많이씀(함수의 인수 추가 및 제거할때 사용됨)
- 변수 이름 바꾸기: 변수 캡슐화 하기와 관련이 깊음
- 매개변수 객체 만들기 : 자주 함께 뭉쳐 다니는 인수들을 객체 하나로 묶을 때 많이 사용
- 여러 함수를 클래스로 묶기 : 함수를 그룹으로 묶을 때 사용
- 여러 함수를 변환 함수로 묶기 : 읽기 전용 데이터를 다룰 때 특히 좋다.
- 단계 쪼개기 : 모듈들의 작업 처리 과정을 명확한 단계로 구분짓기 위해 사용



### 6.1 함수 추출하기

반대 리팩터링 : 함수 인라인하기

**배경**

1. 목적과 구현을 분리(저자가 원하는 방향)
    - 무슨일을 하는 지 파악하는데 비용이 많이 든다면 빼자
    - 목적을 함수의 이름에서 드러내기 때문에 파악이 빨라진다.
    

함수의 이름을 잘지어야 효과가 잘 발휘됩니다.

절차

---

1. 함수의 목적을 드러내는 이름을 붙임(어떻게가 아닌 '무엇을' 하는지가 드러나야 한다.)
2. 추출할 코드를 새 함수에 복사
3. 참조하는 지역변수는 인수로 전달
    - 새 함수에서만 사용되는 변수는 지역변수로
    - 지역변수의 값을 변경할 경우 새 함수의 결과로 전달
4. 새로 만든 함수를 호출하는 문으로 수정(위임)
5. 테스트
6. 다른 코드에 중복되거나 비슷한 코드가 없는지 확인하고 해당 코드에도 적용할지 검토한다.

**예시**

```jsx
function printOwing(invoice) {
	let outstanding = 0;

  console.log("***************");
  console.log("*** 고객 채무 ***");
  console.log("***************");

  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);

	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
	console.log(`고객명: ${invoice.customer}`);
	console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```

```jsx
function printOwing(invoice) {
	let outstanding = 0;

  printBanner();
  // 미해결 채무(outstanding)를 계산한다.
  for (const O of invoice.orders){
      outstanding += O.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate() + 30);
	let outstanding = calculateOutstanding();
	
	//세부 사항 출력
  printDetails();

  function printBanner(){
      console.log("***************");
      console.log("*** 고객 채무 ***");
      console.log("***************");
  }
  function printDetails(){
      console.log(`고객명: ${invoice.customer}`);
      console.log(`채무액: ${outstanding}`);
      console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}
```