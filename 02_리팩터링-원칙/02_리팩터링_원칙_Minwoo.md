# Chapter 02. 리팩터링 원칙

## 리팩터링 정의

- **리팩터링** (Refactoring)
  - "소프트웨어의 겉보기 동작은 그대로 유지한 채, 코드를 이해하고 수정하기 쉽도록 내부 구조를 변경하는 기법"
  - 본 책에서 소개하는 이름 붙은 기법 (_함수 추출하기_ 등) 들이 리팩터링이다.
- **리팩터링하다** (Refactor)
  - "소프트웨어의 겉보기 동작은 그대로 유지한 채 여러 가지 리팩터링 기법을 적용해서 소프트웨어를 재구성하다."
- **특정한 방식에 따라 코드를 정리하는 것만이 리팩터링이다.**
  - 프로그램 자체의 동작 (겉보기 동작; Observable behavior)은 그대로 유지하면서, 작은 단계들을 차근차근 거쳐가며 코드를 수정.
  - 프로그램이 깨졌다면 리팩터링 한 것이 아니다.
  - 리팩터링은 결국 코드 재구성(Reconstructuring)의 한 형태

## 두 개의 모자

- 소프트웨어를 개발 할 때 _기능 추가_ 모드와 _리팩터링_ 모드가 있음.
- 적절할 때 위 두 모드를 서로 왔다갔다하며 개발을 해나간다.

## 리팩터링하는 이유

- 소프트웨어 설계가 좋아진다.
- 소프트웨어를 이해하기가 쉬워진다.
- 버그를 쉽게 찾을 수 있다.
- 프로그래밍 속도를 높일 수 있다.
  - 리팩터링을 하면 개발 속도가 느려진다고 생각하는 것은 근시안적인 착각
  - 리팩터링을 통해 좋은 설계를 계속해서 유지하면 나중에 기능 추가를 하는 것도 굉장히 쉬워짐.
  - _설계 지구력 가설(Design Stamina Hypothesis)_

## 리팩터링을 언제 해야 할까?

- **3의 법칙**
  - 비슷한 일을 세 번째 하게 되면 리팩터링한다.
  - 꼭 이와 같은 법칙을 따라야 하는 것은 아니지만 자신 또는 팀 만의 리팩터링 원칙을 세우고 지키는 것이 중요하다.
- **준비를 위한 리팩터링: 기능을 쉽게 추가하게 만들기**

  - 작업을 수행하기 전에 **구조를 바꾸면 작업을 하기 훨씬 쉬워질 만한 부분**을 찾는다.
  - 예시

    ```python
    # 목표: Hello 다음에 바로 Bye 할 수 있도록 하기

    # 기존 코드
    print('Hello, Smith!')
    print('Hello, Robert!')
    ```

    ```python
    # 함수 매개변수화 하기
    def greeting(name):
        print(f'Hello, {name}')

    greeting('Smith')
    greeting('Robert')
    ```

    ```python
    # 기능 추가
    def greeting(name):
        print(f'Hello, {name}')
        print(f'Bye, {name}')

    greeting('Smith')
    greeting('Robert')
    ```

- **이해를 위한 리팩터링: 코드를 이해하기 쉽게 만들기**

  - 직관적이지 않은 코드는 이해하더라도 시간이 지나면 까먹는다.
  - 의도가 분명하게 드러나도록 리팩터링을 할 수 있다. (e.g. _함수 추출하기_)

- **쓰레기 줍기 리팩터링**

  - _방문한 장소는 이전보다 깨끗하게 하고 나가기_
  - 코드를 읽다 보면 딱봐도 고쳐주고 싶은 부분이 있다.
  - 간단히 수정할 수 있는 것은 즉시 고치고, 시간이 좀 걸리는 일은 하던 일 마치고 처리.
  - 코드를 훑어볼 때마다 조금씩 고쳐 나가자.

- **계획된 리팩터링과 수시로 하는 리팩터링**

  - 저자는 리팩터링을 위한 별도의 일정을 잡지 않고, **기능 추가 또는 버그 수정 시 리팩터링도 함께하는 것을 추천**하고 있다.
  - "보기 싫은 코드를 발견하면 리팩터링하자."
  - "무언가 수정하려 할 때는 먼저 수정하기 쉽게 정돈하고 그런 다음 쉽게 수정하자."
  - 만약 리팩터링에 너무 소홀했던 경우에는 일정 기간 동안 각잡고 리팩터링만을 하는게 좋을 수 있다. 그러나 이런 상황을 최소화 하는 것이 더 중요하다.
  - 리팩터링 커밋과 기능 추가 커밋을 분리하고 말고는 팀 상황에 맞게 적절히 한다.

- **오래 걸리는 리팩터링**

  - 팀 전체가 리팩터링에 매달리기 보다는 몇 주에 걸쳐 조금씩 해결해나가는 것을 추천.
  - 리팩터링 해야 할 코드와 관련된 작업을 할 때마다 조금씩 해결해가는 것이 효과적이다.

- **코드 리뷰에 리팩터링 활용하기**
  - 코드 리뷰 하면서 리팩터링 하기?
  - 리팩터링을 통해 아이디어를 직접 구현해볼 수 있고 개선점을 훨씬 더 쉽게 찾을 수 있다.
  - 일종의 _짝 프로그래밍_
- **관리자에게는 뭐라고 말해야 할까?**

  - 개발자에게 주어진 임무는 새로운 기능을 빠르게 구현하는 것
  - **새로운 기능을 구현하는 가장 빠른 방법은 리팩터링을 하는 것**

- **리팩터링하지 말아야 할 때**
  - 굳이 수정할 필요가 없는 코드에 대해서는 리팩터링을 하지 않는다.
  - 기능 추가 또는 버그 수정을 하면서 필요한 리팩터링을 한다.

## 리팩터링 시 고려할 문제

- **새 기능 개발 속도 저하**

  - **"리팩터링의 긍극적인 목적은 개발 속도를 높여서, 더 적은 노력으로 더 많은 가치를 창출하는 것이다."**
  - 새 기능을 구현하기 편해지기 위한 리팩터링은 주저 말고 하자.
  - 그 외 상관 없다 싶은 부분은 굳이 리팩터링 하지 않는다.

- **코드 소유권**

  - 코드 소유권이 나뉘어져 있어 내 소유가 아닌 코드를 수정하지 못하는 경우도 있다.
  - 이 경우 기존 함수는 유지한 채 _함수 이름 바꾸기_ 를 적용해 새 함수를 정의한다.
  - 코드 내에서는 새 함수를 이용한다.
  - 코드 소유권을 엄격하게 나누어 관리하는 것은 추천하지 않는다.
  - 오픈 소스 개발 모델을 권장하기도 한다.

- **브랜치**

  - 머지(Merge)와 통합(Integration)

    - 머지: 마스터를 개인 브랜치에 가져오는 것으로 단방향이다.
    - 통합: 마스터를 개인 브랜치로 가져와서 (Pull) 작업 결과를 다시 마스터에 올리는 (Push)양방향 처리

  - **지속적 통합 (Continuous Integration; CI)**

    - 모든 팀원이 하루에 최소 한 번은 마스터와 통합한다.
    - 브랜치 간의 차이가 크게 벌어지지 않아 머지 복잡도를 낮출 수 있다.
    - 마스터를 건강하게 유지하고, 거대한 기능을 세분화하고, 미완의 기능이 시스템을 망가뜨리지 않도록 별도의 플래그를 마련하는 등의 노력이 필요하다.
    - 리팩터링을 하면 브랜치 간 의미 충돌이 발생하는 경우가 많으며, 이 때 CI는 좋은 보완재가 된다.

- **테스팅**

  - 리팩터링의 주요 특성은 프로그램의 겉보기 동작이 똑같이 유지된다는 것
  - 이 특성을 유지하기 위해서는 코드의 다양한 측면을 검사하는 테스트 코드가 반드시 필요하다.

- **레거시 코드**

  - 코드는 굉장히 복잡한데 테스트 코드 또한 잘 작성되어 있지 않다...
  - **해답은 테스트 보강**
  - "프로그램에서 테스트를 추가할 틈새를 찾아서 시스템을 테스트해야 한다." from _레거시 코드 활용 전략_
  - 테스트 코드를 적용하기 위해선 코드 수정을 해야 하는데, 코드 수정을 안전하게 하려면 테스트 코드가 있어야 한다.
  - 여러모로 쉽지 않은 문제

- **데이터베이스**
  - _진화형 데이터베이스 설계 (Evolutionary database design)_
  - _데이터베이스 리팩터링 기법_
  - 커다란 변경들을 쉽게 조합하고 다룰 수 있는 데이터 마이그레이션 스크립트를 작성
  - 접근 코드와 데이터베이스 스키마에 대한 구조 변경을 이 스크립트를 통해 처리

## 리팩터링, 아키텍처, 애그니(YAGNI)

- 리팩터링을 통해 소프트웨어 설계를 지속적으로 개선해나갈 수 있다.
- 소프트웨어 요구사항은 개발 프로세스 도중에 충분히 파악되거나 변경될 수 있다. 이럴 때 리팩터링이 도움이 된다.
- 간결한 설계, 점진적 설계, **YAGNI (You aren't going to need it)**
  - 그저 현재까지 파악한 요구사항만을 해결하는 소프트웨어를 구축
  - 진행하면서 사용자의 요구사항을 더 잘 이해하게 되면 아키텍처도 그에 맞게 리팩터링

## 리팩터링과 소프트웨어 개발 프로세스

- [익스트림 프로그래밍](https://namu.wiki/w/%EC%9D%B5%EC%8A%A4%ED%8A%B8%EB%A6%BC%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D)
  - **지속적 통합, 자가 테스트 코드, 리팩터링** 등을 하나로 묶은 프로세스
  - **테스트 주도 개발**
- 리팩터링의 첫 번째 토대는 자가 테스트 코드
- **지속적 통합**을 통해 팀으로 개발하는 동안에는 다른 사람의 작업을 방해하지 않고 얼마든지 리팩터링 할 수 있어야 한다.
- 자가 테스트 코드, 지속적 통합, 리팩터링은 소프트웨어 개발 프로세스에 있어서 상호 보완적이면서 큰 시너지를 발휘할 수 있다.
- 이러한 실천법은 소프트웨어를 언제든 릴리스 할 수 있는 상태로 유지해준다.

## 리팩터링과 성능

- 리팩터링 자체는 성능을 저해하는 방향으로 수정하는 경우가 많다. (e.g. _함수 인라인 하기_ )
- **그러나 리팩터링이 잘 된 코드는 추후 성능을 튜닝하기도 더 쉽다.**
- 빠른 소프트웨어를 작성하는 방법 세 가지

  - 시간 예산 분배 방식
    - 설계를 여러 컴포넌트로 나눠 컴포넌트마다 자원(시간과 공간)을 할당한다.
    - 엄격하게 시간을 엄수해야 하는 프로그램을 작성할 때 사용
  - 계속해서 관심을 기울이자.
    - 프로그램의 동작에만 주목하지 않기
    - 컴파일러, 런타임, 하드웨어 동작을 이해하고 프로그램을 작성하자.
  - 프로파일링을 통해 자원을 많이 잡아 먹는 지점을 집중 공략하자.
    - 대부분의 프로그램은 전체 코드 중 극히 일부에서 대부분의 시간을 소비한다.
    - 프로파일링을 통해 자원을 많이 잡아 먹는 지점을 파악 후 집중적으로 최적화
    - 최적화를 위한 수정도 작은 단계로 나눠서 진행각 단계마다 컴파일, 테스트 그리고 프로파일러를 다시 실행해본다.
