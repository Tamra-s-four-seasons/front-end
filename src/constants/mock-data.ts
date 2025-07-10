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
  routeName: string;
  routeKeyword: string;
  isComplete: boolean;
  checkpoints: CheckpointData[];
}

export const mockMissionData: MissionData[] = [
  {
    missionId: 1,
    userId: "user123",
    routeId: "jeju-001",
    routeName: "구름 올레",
    routeKeyword: "런닝맛집코스",

    isComplete: false,
    checkpoints: [
      {
        checkpointId: "cp-001",
        name: "용머리해안",
        // latitude: 33.489,
        latitude: 33.450223,
        // longitude: 126.4983,
        longitude: 126.918293,
        address: "제주특별자치도 서귀포시 안덕면 사계리 181",
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
        name: "가파도",
        latitude: 33.3862,
        longitude: 126.2734,
        address: "제주특별자치도 서귀포시 대정읍 가파리",
        description:
          "청보리밭으로 유명한 작은 섬으로, 평화로운 자연과 느린 여행의 매력을 느낄 수 있는 곳입니다.",
        imgUrls: [
          "https://example.com/checkpoints/gapa1.jpg",
          "https://example.com/checkpoints/gapa2.jpg",
          "https://example.com/checkpoints/gapa3.jpg",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-003",
        name: "비자림",
        latitude: 33.5194,
        longitude: 126.8003,
        address: "제주특별자치도 제주시 구좌읍 평대리 3164-1",
        description:
          "500~800년 된 비자나무들이 울창한 숲을 이루는 신비로운 곳으로, 산림욕과 힐링을 즐길 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/bija1.jpg"],
        isComplete: false,
      },
    ],
  },
  {
    missionId: 2,
    userId: "user456",
    routeId: "busan-002",
    routeKeyword: "바다내음",

    routeName: "부산 올레",
    isComplete: true,
    checkpoints: [
      {
        checkpointId: "cp-004",
        name: "흰여울문화마을",
        latitude: 35.0979,
        longitude: 129.013,
        address: "부산광역시 영도구 영선동4가 1043",
        description:
          "바다를 내려다보는 계단식 마을로, 흰 파도가 아름다운 인스타그램 핫플레이스입니다.",
        imgUrls: [
          "https://example.com/checkpoints/hinyeoul1.jpg",
          "https://example.com/checkpoints/hinyeoul2.jpg",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-005",
        name: "40계단 문화관광테마거리",
        latitude: 35.1284,
        longitude: 129.0454,
        address: "부산광역시 중구 중앙동4가 14-1",
        description:
          "6.25 피난민들의 애환이 서린 역사적 장소로, 현재는 문화와 예술이 살아 숨쉬는 거리입니다.",
        imgUrls: [
          "https://example.com/checkpoints/40stairs1.jpg",
          "https://example.com/checkpoints/40stairs2.jpg",
          "https://example.com/checkpoints/40stairs3.jpg",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-006",
        name: "깡통시장 야시장",
        latitude: 35.1013,
        longitude: 129.0306,
        address: "부산광역시 동구 중앙대로 179번길 25",
        description:
          "부산 대표 전통시장의 야시장으로, 다양한 길거리 음식과 생동감 넘치는 분위기를 즐길 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/market1.jpg"],
        isComplete: true,
      },
      {
        checkpointId: "cp-007",
        name: "깡통시장 야시장",
        latitude: 35.1013,
        longitude: 129.0306,
        address: "부산광역시 동구 중앙대로 179번길 25",
        description:
          "부산 대표 전통시장의 야시장으로, 다양한 길거리 음식과 생동감 넘치는 분위기를 즐길 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/market1.jpg"],
        isComplete: true,
      },
    ],
  },
  {
    missionId: 3,
    userId: "user789",
    routeId: "seoul-003",
    routeName: "서울 올레",
    routeKeyword: "한옥",

    isComplete: false,
    checkpoints: [
      {
        checkpointId: "cp-007",
        name: "익선동 한옥마을",
        latitude: 37.5663,
        longitude: 126.9997,
        address: "서울특별시 종로구 익선동 166-71",
        description:
          "한옥을 개조한 카페와 상점들이 모여있는 힙한 골목으로, 전통과 현대가 조화를 이루는 곳입니다.",
        imgUrls: [
          "https://example.com/checkpoints/ikseon1.jpg",
          "https://example.com/checkpoints/ikseon2.jpg",
          "https://example.com/checkpoints/ikseon3.jpg",
        ],
        isComplete: true,
      },
      {
        checkpointId: "cp-008",
        name: "성수동 수제화 거리",
        latitude: 37.5836,
        longitude: 127.0024,
        address: "서울특별시 성동구 성수동1가 13-47",
        description:
          "오래된 제화공장들이 모여있던 거리가 이제는 핸드메이드 문화의 중심지로 변신한 숨은 명소입니다.",
        imgUrls: [
          "https://example.com/checkpoints/seongsu1.jpg",
          "https://example.com/checkpoints/seongsu2.jpg",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-009",
        name: "망원시장 골목",
        latitude: 37.5519,
        longitude: 126.9748,
        address: "서울특별시 마포구 망원동 394-13",
        description:
          "젊은 상인들이 운영하는 개성 넘치는 가게들과 맛집들이 즐비한 로컬 마켓의 매력을 느낄 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/mangwon1.jpg"],
        isComplete: false,
      },
      {
        checkpointId: "cp-010",
        name: "연남동 경의선숲길",
        latitude: 37.5658,
        longitude: 126.9254,
        address: "서울특별시 마포구 연남동",
        description:
          "폐선된 경의선 철로를 공원으로 조성한 곳으로, 연남동의 핫플레이스와 연결되는 산책로입니다.",
        imgUrls: [
          "https://example.com/checkpoints/yeonnam1.jpg",
          "https://example.com/checkpoints/yeonnam2.jpg",
        ],
        isComplete: false,
      },
      {
        checkpointId: "cp-011",
        name: "망원시장 골목",
        latitude: 37.5519,
        longitude: 126.9748,
        address: "서울특별시 마포구 망원동 394-13",
        description:
          "젊은 상인들이 운영하는 개성 넘치는 가게들과 맛집들이 즐비한 로컬 마켓의 매력을 느낄 수 있습니다.",
        imgUrls: ["https://example.com/checkpoints/mangwon1.jpg"],
        isComplete: false,
      },
    ],
  },
];
