# 리팩터링 2판 스터디

- https://join.slack.com/t/metacognition-hq/shared_invite/zt-ycnqoy0h-YacPYAu67xVbU66XFVa5gQ

## 진행 방법

- 미팅 시간 및 장소 : **매주 수요일 오후 9시**, 게더타운 회의실
  - https://gather.town/app/zF6wrPJUcYkDEXde/metacognition
- 매주 chapter 1개씩 진행할 예정
- 매주 한명이 발표를 주도적으로 진행
  - 발표 순서 : Lucid님 -> Minwoo님 -> Kiwi님 -> 수잔님 -> hyeonmin님 -> Tony님
  - 발표자가 아니더라도 공부한 내용을 정리해서 미팅 전날까지 커밋할 것
- 어떤 질문이 들어오더라도 긍정적으로 받아들이기
  - That's a good question
- 서로간 호칭은 '~님'을 사용

## 업로드 파일명

- 각 장의 숫자\_제목\_발표자.md
  - e.g., 01\_리팩터링-첫번째 예시\_Tony.md
    - 파일명만 통일, 작성 양식은 자유

## 진행 상황

- [x] 0.  OT : 간단한 자기소개, 진행 방법 정하기 (2021.11.10)
- [x] 1.  리팩터링: 첫 번째 예시 (2021.11.17 - Lucid)
- [x] 2.  리팩터링 원칙 (2021.11.24 - Minwoo)
- [x] 3.  코드에서 나는 악취 (2021.12.01 - Kiwi)
- [x] 4.  테스트 구축하기 (2021.12.08 - Shuzan)
- [x] 5.  리팩터링 카탈로그 보는 법 - (2021.12.15 - Hyeonmin)
- [x] 6.  기본적인 리팩터링 - (2021.12.15 - Hyeonmin / 6-11: 2021.12.22 - Tony)
- [x] 7.  캡슐화 - (2021.12.22 - Lucid)
- [ ] 8.  기능 이동 - Kiwi님 진행 예정
- [ ] 9.  데이터 조직화 - Minwoo님 진행 예정
- [ ] 10. 조건부 로직 간소화
- [ ] 11. API 리팩터링
- [ ] 12. 상속 다루기

## Github에 코드 올리는 방법

### 작업은 새로운 branch에서 하기

#### 새로운 브랜치 만드는 방법

git fetch

- 원격(github)과 관련된 무언가를 하기전엔 항상 git fetch를 먼저 해야합니다

git checkout -b 새로운\_브랜치\_이름 origin/master

- origin(Github)의 master브랜치에 있는 코드를 기준으로 브랜치를 새로 만들겠다는 의미

### 코드 작성이 완료되면 커밋하기

- git add .
- git commit -m "커밋 메세지"

- [좋은 커밋 메세지를 작성하는 방법](https://beomseok95.tistory.com/328)

### 1. git fetch

- Github에 있는 코드를 로컬(내 컴퓨터)과 동기화합니다

### 2. git pull origin master

- origin(Github)의 master 브랜치에 있는 코드를 로컬에 가져옵니다
- 이때 충돌이 있는 경우 해결을 해야합니다

### 3. git push origin 새로운\_브랜치\_이름

- Github에 새로운 브랜치 이름으로 브랜치를 생성됩니다

### 4. Pull Request

3번까지 진행 후 깃허브에 들어가면
![](https://images.velog.io/images/gth1123/post/bca8b32d-0a2d-420c-b624-ee4115cff83e/image.png)
위와 같은 버튼이 나타납니다.
Compare & pull request 버튼을 누릅니다

![](https://images.velog.io/images/gth1123/post/50d4ec2c-e2e4-42d3-a449-66674ed25ee3/image.png)

- 깃허브에 올리려는 코드에 대한 설명을 상세히 적고
- Create pull request 버튼을 누릅니다

![](https://images.velog.io/images/gth1123/post/fd068c70-d574-46b3-b822-5b221401a737/image.png)

- merge(내 코드를 깃허브의 코드와 합치는 것) 종류를 Squesh and merge로 설정 후 해당 버튼을 누릅니다

![](https://images.velog.io/images/gth1123/post/161dfcbb-ae61-47d6-a287-41f8edffa44a/image.png)

- merge 후엔 자신이 생성한 브랜치 삭제를 해줍니다
- 정상적으로 코드가 깃허브에 올라간 것을 확인하실 수 있습니다

### 5. 로컬에서 브랜치 삭제하기(선택사항)

- 4번까지 진행 후 깃허브의 master브랜치에 내 코드가 정상적으로 merge가 된 후 더 이상 사용하지 않는 로컬 브랜치도 삭제를 해줍니다

1. 새로운 브랜치 생성(다음 Pull Request를 위한 브랜치)
2. 기존 브랜치 삭제

#### 5-1. git checkout -b 새로운-브랜치명

![](https://images.velog.io/images/gth1123/post/fecf69bb-7307-4242-88c7-76ee8f1c0607/image.png)

#### 5-2. git branch -D 삭제할-브랜치명

![](https://images.velog.io/images/gth1123/post/4ab0e316-bb73-4cd1-bc24-5d283bff3a35/image.png)

#### 5-3. 로컬 브랜치 목록 확인

![](https://images.velog.io/images/gth1123/post/a21fe1a3-4601-43d1-b28f-1d633a056abd/image.png)

- 새로 생성한 브랜치만 남아있는 것을 확인할 수 있습니다
- 로컬의 master 브랜치도 삭제하시는 것이 좋습니다.
- 필요하다면 원격의 master 브랜치 기반으로 생성하셔야 합니다.
  - git fetch
    - 원격(github)과 관련된 무언가를 하기전엔 항상 git fetch를 먼저 해야합니다
  - git checkout -b 새로운\_브랜치\_이름 origin/master
  - origin(Github)의 master브랜치에 있는 코드를 기준으로 브랜치를 새로 만들겠다는 의미
