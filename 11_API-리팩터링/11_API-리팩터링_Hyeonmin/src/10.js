/*
- 복잡하지 않은 작은 명령 객체를 함수로 변환하는 예제
- 명령 클래스가 간단한 편이므로 함수로 대체한다.

1. 이 클래스를 생성하고 호출하는 코드를 함께 함수로 추출
2. 명령의 실행함수가 호출하는 보조 메서드들 각각을 인라인
3. 생성자가 받던 모든 매개변수를 charge() 메서드로 옮긴다 (함수 선언 바꾸기)
4. charge() 메서드에서 필드 대신 건네받은 매개변수를 사용하도록 수정
5. 다 됐으면 최상위 charge() 함수로 인라인
6. 죽은 코드 제거하기
*/

function charge(customer, usage, provider) {
	const baseCharge = customer.baseRate * usage;
	return baseCharge + provider.connectionCharge;
}
const customer = { baseRate: 100 };
const usage = 1000;
const provider = { connectionCharge: 50 };
const monthCharge = charge(customer, usage, provider);
console.log(monthCharge);
