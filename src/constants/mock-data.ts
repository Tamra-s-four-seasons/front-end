export const mockRouteData = [
  {
    routeId: "jeju-001",
    routeName: "제주 숨은 보석 투어",
    checkpoints: [
      {
        latitude: 33.450223,
        longitude: 126.918293,
        name: "용머리해안",
        address: "제주특별자치도 서귀포시 안덕면 사계리 181",
        description:
          "화산암이 바다로 뻗어나간 모습이 용의 머리를 닮은 절경지로, 일몰이 아름다운 숨겨진 명소입니다.",
      },
      {
        latitude: 33.3862,
        longitude: 126.2734,
        name: "가파도",
        address: "제주특별자치도 서귀포시 대정읍 가파리",
        description:
          "청보리밭으로 유명한 작은 섬으로, 평화로운 자연과 느린 여행의 매력을 느낄 수 있는 곳입니다.",
      },
      {
        latitude: 33.5194,
        longitude: 126.8003,
        name: "비자림",
        address: "제주특별자치도 제주시 구좌읍 평대리 3164-1",
        description:
          "500~800년 된 비자나무들이 울창한 숲을 이루는 신비로운 곳으로, 산림욕과 힐링을 즐길 수 있습니다.",
      },
    ],
  },
  {
    routeId: "busan-002",
    routeName: "부산 골목길 탐험",
    checkpoints: [
      {
        latitude: 35.0979,
        longitude: 129.013,
        name: "흰여울문화마을",
        address: "부산광역시 영도구 영선동4가 1043",
        description:
          "바다를 내려다보는 계단식 마을로, 흰 파도가 아름다운 인스타그램 핫플레이스입니다.",
      },
      {
        latitude: 35.1284,
        longitude: 129.0454,
        name: "40계단 문화관광테마거리",
        address: "부산광역시 중구 중앙동4가 14-1",
        description:
          "6.25 피난민들의 애환이 서린 역사적 장소로, 현재는 문화와 예술이 살아 숨쉬는 거리입니다.",
      },
      {
        latitude: 35.1013,
        longitude: 129.0306,
        name: "깡통시장 야시장",
        address: "부산광역시 동구 중앙대로 179번길 25",
        description:
          "부산 대표 전통시장의 야시장으로, 다양한 길거리 음식과 생동감 넘치는 분위기를 즐길 수 있습니다.",
      },
    ],
  },
  {
    routeId: "seoul-003",
    routeName: "서울 골목 보물찾기",
    checkpoints: [
      {
        latitude: 37.5663,
        longitude: 126.9997,
        name: "익선동 한옥마을",
        address: "서울특별시 종로구 익선동 166-71",
        description:
          "한옥을 개조한 카페와 상점들이 모여있는 힙한 골목으로, 전통과 현대가 조화를 이루는 곳입니다.",
      },
      {
        latitude: 37.5836,
        longitude: 127.0024,
        name: "성수동 수제화 거리",
        address: "서울특별시 성동구 성수동1가 13-47",
        description:
          "오래된 제화공장들이 모여있던 거리가 이제는 핸드메이드 문화의 중심지로 변신한 숨은 명소입니다.",
      },
      {
        latitude: 37.5519,
        longitude: 126.9748,
        name: "망원시장 골목",
        address: "서울특별시 마포구 망원동 394-13",
        description:
          "젊은 상인들이 운영하는 개성 넘치는 가게들과 맛집들이 즐비한 로컬 마켓의 매력을 느낄 수 있습니다.",
      },
    ],
  },
];

export interface CheckpointData {
  checkpointId: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  description: string;
  imgUrls: string[];
  isComplete: boolean;
}

export interface MissionData {
  missionId: number;
  userId: string;
  routeId: string;
  description: string;
  routeName: string;
  routeKeyword: string[];
  isComplete: boolean;
  checkpoints: CheckpointData[];
}

export const mockMissionData: MissionData[] = [
  {
    missionId: 1,
    userId: "user123",
    routeId: "jeju-001",
    routeName: "구름 올레",
    description: "구름톤 한정 숨바꼭질",
    routeKeyword: ["해커톤", "열정"],
    isComplete: false,
    checkpoints: [
      {
        checkpointId: "cp-001",
        name: "플레이스 ART동",
        // latitude: 33.489,
        latitude: 33.449968,
        // longitude: 126.4983,
        longitude: 126.918254,
        address: "제주 서귀포시 성산읍 동류암로 20 ART동",
        description:
          "화산암이 바다로 뻗어나간 모습이 용의 머리를 닮은 절경지로, 일몰이 아름다운 숨겨진 명소입니다.",
        imgUrls: [
          "https://postfiles.pstatic.net/MjAyMjAxMDVfMjQ1/MDAxNjQxMzk0MTI0MTgy.gnAmKEqGPGVACCADF6Q_x7o32D5InDatZqxJWx8LpQYg.ROgE4NiRrSnWqXZvEi1ETuUy8g5DAbanYmbELS0Abrog.JPEG.ss06748/20210723_093658.jpg?type=w966",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-002",
        name: "플레이스 액티비티 라운지",
        latitude: 33.450223,
        longitude: 126.918293,
        address: "제주 서귀포시 성산읍 동류암로 20",
        description:
          "청보리밭으로 유명한 작은 섬으로, 평화로운 자연과 느린 여행의 매력을 느낄 수 있는 곳입니다.",
        imgUrls: [
          "https://postfiles.pstatic.net/MjAyMjAxMDVfMTIy/MDAxNjQxMzk0MTIwMzM1.DYNEcs3F5eNHaSi71mDzwsxSYwuumILjS4i4sprio8cg.N0tRMoORa1p02EXoOEB9WPypvTkNxwrYURP3XAUl4icg.JPEG.ss06748/20210723_093656.jpg?type=w966",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-003",
        name: "플레이스 LOVE동",
        latitude: 33.449955,
        longitude: 126.918554,
        address: "제주 서귀포시 성산읍 동류암로 20 LOVE동",
        description:
          "500~800년 된 비자나무들이 울창한 숲을 이루는 신비로운 곳으로, 산림욕과 힐링을 즐길 수 있습니다.",
        imgUrls: [
          "https://postfiles.pstatic.net/MjAyMjAxMDVfMTA1/MDAxNjQxMzk0MTIzMzQ0.9L8kwapoqsLxPWCdfYmujhBgSKxmUlif1r-q4E47xEMg.oP2HjwQJIaGpXNAA9i5XCFWjbmPxKN3p53s-a1WXvDgg.JPEG.ss06748/20210723_093704.jpg?type=w966",
        ],
        isComplete: true,
      },
    ],
  },
  {
    missionId: 2,
    userId: "user456",
    routeId: "jeju-002",
    description: "비양도 해안가 드라이브 어때요?",
    routeKeyword: ["해안도로", "경치"],
    routeName: "한라봉 올레",
    isComplete: false,
    checkpoints: [
      {
        checkpointId: "cp-004",
        name: "제주 비양도 호니토",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 한림읍 협재리 산128-1",
        description:
          "바다를 내려다보는 계단식 마을로, 흰 파도가 아름다운 인스타그램 핫플레이스입니다.",
        imgUrls: [
          "https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2Fm5B2oSTf-ilg7WtOcSGMZgGuryOmv2aP-JxQVFv6ovxpwTf2CqF4NU6iQbNfudJYD4-0NqjZ3_EOXoPU18TQ6w.webp&type=sc960_832",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAxMjZfMjI5%2FMDAxNjExNjE4OTQ0MzQ3.GFL5l9OfvWa7bQRvAtJt9tDurO_jIj6n4JZ0VRm8IqYg.vPf9HvDfFwHp56TMAhD_z74hwdgAvPvuP4f0vHyT2Zwg.JPEG.88seojin%2FIMG_7845.JPG&type=sc960_832",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-005",
        name: "비양도 봄날",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 한림읍 비양도길 62",
        description:
          "6.25 피난민들의 애환이 서린 역사적 장소로, 현재는 문화와 예술이 살아 숨쉬는 거리입니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzA0MjNfMTQ2%2FMDAxNjgyMjIzNDQ1OTM3.o7mO7sxGTimRnUSbePMYrEv_9j2L_Qs1lNQgT_33uKUg.oasx0uYiqM4IKet_B6t6XyWtpkF4nweRsOgc-HU52EUg.JPEG%2F20230416_183731.jpg%3Ftype%3Dw1500_60_sharpen",
          "https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzA0MjNfNTkg%2FMDAxNjgyMjIzNDQ1Mzk2.uyWLLzDHk2kgk9lJig50kzDx4YI6cyFfiN6r7dgmxdcg.13OwZTiV2Z4NGWk_k9_l3PgWIKBg2eC-e5zzuq4vuNog.JPEG%2F20230416_175626.jpg%3Ftype%3Dw1500_60_sharpen",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-006",
        name: "드라마 봄날 촬영지",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 한림읍 협재리 2967",
        description:
          "6.25 피난민들의 애환이 서린 역사적 장소로, 현재는 문화와 예술이 살아 숨쉬는 거리입니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=https%3A%2F%2Fdbscthumb-phinf.pstatic.net%2F2492_000_2%2F20220708144352507_8UHQMAVGE.jpg%2Fgc34_63_i3.jpg%3Ftype%3Dm4500_4500_fst_n&type=sc960_832",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-007",
        name: "펄랑못",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 한림읍 협재리",
        description:
          "부산 대표 전통시장의 야시장으로, 다양한 길거리 음식과 생동감 넘치는 분위기를 즐길 수 있습니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20160616_291%2Fkwontor55_1466050050997cEw8o_JPEG%2F%25C6%25DE%25B6%25FB%25B8%25F82.jpg&type=sc960_832",
        ],
        isComplete: false,
      },
    ],
  },
  {
    missionId: 3,
    userId: "user789",
    routeId: "jeju-003",
    routeName: "땅콩 올레",
    description: "내가 걷는 길이 곧 땅콩",
    routeKeyword: ["낭만", "일출"],
    isComplete: true,
    checkpoints: [
      {
        checkpointId: "cp-007",
        name: "하고수동해수욕장",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 우도면 오봉리",
        description:
          "한옥을 개조한 카페와 상점들이 모여있는 힙한 골목으로, 전통과 현대가 조화를 이루는 곳입니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTA4MDNfMTc5%2FMDAxNTY0ODA1OTk0MDA1.qVKPvoY2hHcQx_3vgkPvrZ-iP094EawO_4rgbjvUYe0g.N6uh1C0J93L9RVA-dGLAA2R2JXlFqvdwVYlqhjSVb10g.JPEG.stclouds%2FIMG_2997.jpg&type=a340",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA3MDRfMTA1%2FMDAxNjg4Mzk3Nzg2OTEy.B_9230gEEKdZY1OsUMqkYXMS7LbA52qI4AgmKe1PMOYg.CxFY3skHE3Q6zfKixMEYKcFQqiOq5xtwYMae0gvPLnQg.JPEG.wldmsdl8843%2F20221115_143548.jpg&type=a340",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-008",
        name: "우도 등대",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주특별자치도 제주시 우도면 우도봉길 105",
        description:
          "오래된 제화공장들이 모여있던 거리가 이제는 핸드메이드 문화의 중심지로 변신한 숨은 명소입니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fblog_2023_03_03_1406%2Fa1bd0a52-b9a0-11ed-9cf9-48df37ae3dc4_01.jpg&type=a340",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxNzA2MjZfMjAy%2FMDAxNDk4NDgwNzExNzk4.d_Qg1cZLy0H1crVMsAjWqcnmGOj6D_P4L8Ur9WHLrXQg.9BRv8cbY3AYdyWn1KDvWUpva6yaaG2GBhbe6oE1y4xAg.JPEG.lyksd%2FNaverBlog_20170626_213831_14.jpg&type=a340",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-009",
        name: "검멀레 해수욕장",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 우도면 연평리",
        description:
          "젊은 상인들이 운영하는 개성 넘치는 가게들과 맛집들이 즐비한 로컬 마켓의 매력을 느낄 수 있습니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxODA2MTJfMTk5%2FMDAxNTI4NzgzMTY4NzM3.gSSoBM959BArKJ93oi8LkhZno4NlOasqye_Egf2k0DUg.ke2IxALeUB8oXLGQPBSato91HIRV4CozNVziBb6-Mf8g.JPEG.bk85219%2FDSC_1702.jpg&type=a340",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDAxMTNfMTMw%2FMDAxNTc4OTIwNDMwMzQz.c0xtbYo4lG6vfGARCi4UU9V9sZOV5Fc0gTc3CSKZXMkg.RIA4vGmGpc8wM2koI_XO460L89xwrmaThruQ1Z3Y7t4g.JPEG.globeplus%2FIMG_0774.jpg&type=a340",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-010",
        name: "유채꽃 정보화마을",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 우도면 연평리 1751-9",
        description:
          "폐선된 경의선 철로를 공원으로 조성한 곳으로, 연남동의 핫플레이스와 연결되는 산책로입니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTAyMjFfMzkg%2FMDAxNzQwMTM2ODc0NDUz.lRlWbG_sbDmr0jpVrYkMlkDroI2yFkSKT_aU9hOlIAcg.mruG1qTFOYXxopBuDLvX54V3cDhyqWXQk4kTu7BvfpIg.JPEG%2Fs%25BB%25E7%25BA%25BB_-_DSF9169.jpg&type=a340",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNTA0MTRfMjAg%2FMDAxNzQ0NjE1MzU5NTg1.zTFrzoC_MSi0lCJ_oJlelyW04WOZgYPSf1mrHndNrrUg.bZkrZS9eSWrwUMyWoiAkfixljgNO1CcDSIQeE711mnwg.JPEG%2F1.jpg&type=a340",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-011",
        name: "득생곶등대",
        latitude: 36.16877,
        longitude: -115.29323,
        address: "제주 제주시 우도면",
        description:
          "젊은 상인들이 운영하는 개성 넘치는 가게들과 맛집들이 즐비한 로컬 마켓의 매력을 느낄 수 있습니다.",
        imgUrls: [
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA4MjJfMjg3%2FMDAxNzI0MzMxNTU5NTQ0.An5YuHc60yrKRCfvLvskWtJkuBw5drjkjE2dhIy_xmcg.J1BSeGXWz5RBasAYy9hMvapIREZstAbtAwOzXH-_EbUg.JPEG%2F20240801_180210.jpg&type=a340",
          "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA2MDRfMjI4%2FMDAxNjU0MzQ1MjcwMTY2.Yq4zFRBxnm9oYhImsr_NZwVUCB30B2ds-7p4IfL5dDog.wwHK1TLFFziXy2mQZMDESf7QdoX5WgsCZvD9YEmi2YIg.JPEG.neweunha%2FDSC09765.JPG&type=a340",
        ],
        isComplete: true,
      },
    ],
  },
  {
    missionId: 4,
    userId: "user123",
    routeId: "jeju-001",
    routeName: "구름 올레",
    description: "구름톤 한정 숨바꼭질",
    routeKeyword: ["해커톤", "열정"],
    isComplete: false,
    checkpoints: [
      {
        checkpointId: "cp-001",
        name: "플레이스 ART동",
        // latitude: 33.489,
        latitude: 33.449968,
        // longitude: 126.4983,
        longitude: 126.918254,
        address: "제주 서귀포시 성산읍 동류암로 20 ART동",
        description:
          "화산암이 바다로 뻗어나간 모습이 용의 머리를 닮은 절경지로, 일몰이 아름다운 숨겨진 명소입니다.",
        imgUrls: [
          "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          "https://images.unsplash.com/photo-1698362696630-edcb05807fbb?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-002",
        name: "플레이스 액티비티 라운지",
        latitude: 33.450223,
        longitude: 126.918293,
        address: "제주 서귀포시 성산읍 동류암로 20",
        description:
          "청보리밭으로 유명한 작은 섬으로, 평화로운 자연과 느린 여행의 매력을 느낄 수 있는 곳입니다.",
        imgUrls: [
          "https://example.com/checkpoints/gapa1.jpg",
          "https://example.com/checkpoints/gapa2.jpg",
          "https://example.com/checkpoints/gapa3.jpg",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-003",
        name: "플레이스 LOVE동",
        latitude: 33.449955,
        longitude: 126.918554,
        address: "제주 서귀포시 성산읍 동류암로 20 LOVE동",
        description:
          "500~800년 된 비자나무들이 울창한 숲을 이루는 신비로운 곳으로, 산림욕과 힐링을 즐길 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/bija1.jpg"],
        isComplete: false,
      },
    ],
  },
];
