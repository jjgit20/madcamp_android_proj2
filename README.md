# 1. 소개

<aside>
💡 **맞춤여행플래너SNS**
나만의 여행을 계획해보세요
다른 사람들의 계획을 참고하고 나만의 여행을 공유해보세요
주요기능: 여행플랜 공유, 다른 사람 여행플랜 포크 및 수정

</aside>

# 2. 테크 스택

- 프론트앤드 - react native
- 백앤드 - node.js
- 데이터베이스 - mySQL

# 3. 화면 구성

## SignUpScreen

- 로그인 및 회원가입 창입니다.
- `카카오로 로그인`을 할 수 있습니다.
- `카카오 ouath`를 이용한 로그인이 가능합니다.
    - 로그인 관련 정보를 `토큰`을 사용해 암호화하여 관리합니다.

## FinderScreen

- 다른 사람들이 작성한 여행 플랜을 볼 수 있습니다.
- 검색 기능으로 나라의 이름을 partial match로 찾아줍니다.
- 유저의 여행이 마음에 들었다면 `좋아요`로 표현할 수 있습니다.
- 유저의 여행을 그대로 사용하거나 참고하고 싶다면 `퍼가기`로 나만의 계획을 만들 수 있습니다.
- 유저가 궁금하다면 유저 프로필을 확인할 수 있습니다.
- 플랜의 좋아요와 퍼가요 수를 통해 여행이 얼마나 참조되었는지 확인할 수 있습니다.
- 플랜을 누르면 `PlanViewScreen` 에서 해당 플랜의 자세한 정보를 확인할 수 있습니다.

## PlansScreen

- 개정 주인의 모든 여행을 시간별로 정리해둔 것을 볼 수 있습니다.
- 페이지 상단에 이제 곧 떠나갈 여행, D-day 여행을 띄어줍니다.
- 페이지에 여정이 끝난 여행과 앞으로 올 여행을 띄어줍니다.
- 여행플랜 카드에서 여행 주요 정보를 확인할 수 있습니다.
- 플랜을 누르면 `PlanViewScreen` 으로 넘어가 각 여행의 자세한 정보를 확인할 수 있습니다.

## PlanViewScreen

- 내가 누른 여행에 대한 상세 정보를 보여줍니다.
- 해당 화면에서는 플랜을 수정할 수 없습니다.
- 수정 권한이 있는 유저 본인일 경우, 수정 버튼을 눌러 `PlanEditScreen` 으로 넘어가 여행 수정을 할 수 있습니다.

## PlanEditScreen

- 내가 누른 여행에 대한 상세 정보를 보여줍니다.
- 해당 화면에서는 플랜을 수정할 수 있습니다.
- 대표적인 기능으로, 여행 수정 및 제거, 여행 대표 이미지 수정, 공개 여부 수정, complete 하기 등의 기능이 있습니다.
- complete 기능은 여행 평점 완전성을 위한 기능으로, 완료하지 않은 여행 계획을 공유하는 것이나 유저가 여행을 변경하여 사적 이익을 위해 사용하는 것 등을 미연에 방지하기 위한 기능입니다. 한 번 complete 한 여행은 공유하기 옵션 이외의 모든 사항을 수정할 수 없습니다.

## UserScreen

- 본인이 complete 한 여행을 한 눈에 볼 수 있습니다.
- 내 전체 여행에 대한 좋아요와 퍼가요 수를 확인할 수 있습니다.
- 유저 본인 외의 사람들 역시 유저의 프로필과 그가 complete한 여행을 갤러리뷰로 볼 수 있습니다.

![Android Large - 2.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/e3fa26c4-2f02-4a6f-84eb-7e9fe8b25028/Android_Large_-_2.png)

![Android Large - 42.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/adfc515f-0d9b-4f59-ac20-ce7530050bba/Android_Large_-_42.png)

![Android Large - 44.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/d498df45-2022-43db-9d0d-33a358ba51f1/Android_Large_-_44.png)

![Android Large - 51.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/efc60644-5be6-453c-a444-7d9c102e5075/Android_Large_-_51.png)

![Screenshot 2024-01-10 at 8.15.51 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/c0d2e321-eb22-4f9d-ab2b-fd9b64b92be5/Screenshot_2024-01-10_at_8.15.51_PM.png)

![Screenshot 2024-01-10 at 8.18.00 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/7eafd5ce-1fdd-4797-9047-849217906677/Screenshot_2024-01-10_at_8.18.00_PM.png)

![Screenshot 2024-01-10 at 8.16.03 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/399f368f-bca1-4524-8e88-d6ae3dd97db2/Screenshot_2024-01-10_at_8.16.03_PM.png)

![Screenshot 2024-01-10 at 8.16.48 PM.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/f6cb388f-3934-47d6-9928-26d2e10eb0fc/dafcc393-7b49-4e5c-ac9f-bfda4ddd8430/Screenshot_2024-01-10_at_8.16.48_PM.png)
