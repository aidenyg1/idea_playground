document.addEventListener('DOMContentLoaded', () => {
  const recommendButton = document.getElementById('recommendButton');
  const menuRecommendation = document.getElementById('menuRecommendation');

  const dinnerMenus = [
    "김치찌개", "된장찌개", "부대찌개", "삼겹살", "갈비찜",
    "제육볶음", "닭볶음탕", "고등어 구이", "오징어볶음", "순두부찌개",
    "초밥", "파스타", "피자", "스테이크", "샐러드",
    "카레", "돈까스", "햄버거", "족발", "보쌈",
    "비빔밥", "불고기", "짜장면", "짬뽕", "탕수육"
  ];

  function getRandomMenu() {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    return dinnerMenus[randomIndex];
  }

  recommendButton.addEventListener('click', () => {
    const recommendedMenu = getRandomMenu();
    menuRecommendation.innerHTML = `<p>${recommendedMenu}</p>`;
  });

  // 초기 메시지 설정 (옵션)
  menuRecommendation.innerHTML = `<p>버튼을 눌러 추천 메뉴를 확인하세요!</p>`;
});
