document.addEventListener('DOMContentLoaded', () => {
  const recommendButton = document.getElementById('recommendButton');
  const menuRecommendation = document.getElementById('menuRecommendation');

  const dinnerMenus = [
    { name: "김치찌개", recipe: "돼지고기, 김치, 두부, 파, 양파를 넣고 얼큰하게 끓여낸 찌개입니다. 밥과 함께 먹으면 든든해요!" },
    { name: "된장찌개", recipe: "두부, 애호박, 양파, 버섯 등을 넣고 구수하게 끓여낸 한국인의 소울푸드입니다. 매콤한 고추를 넣어 얼큰하게 즐겨보세요." },
    { name: "부대찌개", recipe: "햄, 소시지, 김치, 라면 등을 넣고 얼큰하게 끓여낸 찌개입니다. 친구들과 함께 푸짐하게 즐겨보세요!" },
    { name: "삼겹살", recipe: "두툼한 삼겹살을 노릇노릇하게 구워 상추, 깻잎에 싸서 먹으면 환상의 맛! 김치와 마늘은 필수입니다." },
    { name: "갈비찜", recipe: "부드러운 갈비살을 달콤 짭짤한 양념에 졸여낸 요리입니다. 남녀노소 누구나 좋아하는 고급스러운 메뉴예요." },
    { name: "제육볶음", recipe: "돼지고기를 매콤한 양념에 볶아낸 한국인이 사랑하는 메뉴! 밥과 비벼 먹어도 맛있고 쌈 싸 먹어도 일품입니다." },
    { name: "닭볶음탕", recipe: "매콤한 양념에 감자, 당근, 양파 등을 넣고 끓여낸 닭요리입니다. 밥도둑이 따로 없어요!" },
    { name: "고등어 구이", recipe: "노릇노릇하게 구운 고등어는 밥반찬으로 최고! 비린 맛 없이 고소하고 담백한 맛이 일품입니다." },
    { name: "오징어볶음", recipe: "쫄깃한 오징어를 매콤한 양념에 볶아낸 요리입니다. 술안주로도 좋고 밥반찬으로도 좋아요." },
    { name: "순두부찌개", recipe: "부드러운 순두부를 넣고 얼큰하게 끓여낸 찌개입니다. 해물이나 고기를 추가하여 풍성하게 즐겨보세요." },
    { name: "초밥", recipe: "신선한 해산물과 밥의 조화가 예술인 초밥! 깔끔하고 가볍게 즐기기 좋은 메뉴입니다." },
    { name: "파스타", recipe: "크림, 토마토, 오일 등 다양한 소스로 즐길 수 있는 파스타! 취향에 맞춰 골라보세요." },
    { name: "피자", recipe: "따끈따끈한 피자는 언제나 옳다! 친구들과 함께, 가족과 함께 나눠 먹으면 행복이 두 배." },
    { name: "스테이크", recipe: "겉은 바삭하고 속은 촉촉한 스테이크! 특별한 날 분위기 내기 좋은 메뉴입니다." },
    { name: "샐러드", recipe: "신선한 채소와 드레싱으로 가볍고 건강하게 즐기는 샐러드! 다이어트 중이라면 강추!" },
    { name: "카레", recipe: "다양한 재료를 넣어 만들 수 있는 카레! 밥과 함께 비벼 먹으면 꿀맛입니다." },
    { name: "돈까스", recipe: "바삭한 튀김옷과 부드러운 돼지고기의 환상 조합! 소스를 듬뿍 뿌려 맛있게 즐겨보세요." },
    { name: "햄버거", recipe: "육즙 가득한 패티와 신선한 채소의 조화! 간편하면서도 든든한 한 끼 식사로 최고입니다." },
    { name: "족발", recipe: "쫄깃하고 야들야들한 족발은 술안주로도 좋고, 야식으로도 최고! 쟁반국수와 함께 먹으면 더욱 맛있어요." },
    { name: "보쌈", recipe: "부드럽게 삶아낸 돼지고기와 아삭한 김치의 환상 조합! 건강하고 맛있는 한 끼 식사로 추천합니다." },
    { name: "비빔밥", recipe: "갖가지 나물과 고기, 계란을 넣고 고추장에 비벼 먹는 한국의 대표 건강식! 채소 듬뿍 넣어 비벼보세요." },
    { name: "불고기", recipe: "달콤 짭짤한 양념에 재운 소고기를 구워 먹는 불고기! 밥반찬으로도 좋고, 손님 접대용으로도 좋습니다." },
    { name: "짜장면", recipe: "쫄깃한 면발에 진한 짜장 소스가 일품인 짜장면! 남녀노소 누구나 좋아하는 국민 메뉴입니다." },
    { name: "짬뽕", recipe: "얼큰하고 시원한 국물이 생각날 때! 해산물이 가득 들어간 짬뽕으로 스트레스를 날려보세요." },
    { name: "탕수육", recipe: "겉바속촉 탕수육은 사랑입니다! 달콤새콤한 소스에 찍어 먹으면 자꾸 손이 가는 맛이에요." }
  ];

  function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    return dinnerMenus[randomIndex];
  }

  recommendButton.addEventListener('click', () => {
    const recommended = getRandomMenu();
    menuRecommendation.innerHTML = `
      <h3>${recommended.name}</h3>
      <p class="recipe-text">${recommended.recipe}</p>
    `;
  });

  // 초기 메시지 설정
  menuRecommendation.innerHTML = `<p>버튼을 눌러 추천 메뉴를 확인하세요!</p>`;
});
