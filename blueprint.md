# Project Blueprint: 저녁 메뉴 추천 웹사이트

## Overview

이 프로젝트는 사용자가 버튼을 클릭하면 저녁 식사 메뉴를 무작위로 추천해주는 간단한 웹 애플리케이션을 만드는 것을 목표로 합니다. 사용자가 어떤 메뉴를 먹을지 고민할 때 도움을 줄 수 있도록 직관적이고 시각적으로 매력적인 인터페이스를 제공합니다.

## Current State

*   프로젝트는 초기 "Hello World" 상태로 재설정되었습니다.
*   기본 HTML, CSS, JavaScript 파일(`index.html`, `style.css`, `main.js`)이 존재합니다.
*   프로젝트는 프레임워크를 사용하지 않는 웹 구조를 가집니다.

## Implemented Features

*   **사용자 인터페이스**:
    *   페이지 제목: "저녁 메뉴 추천"
    *   메뉴 추천을 위한 버튼.
    *   추천된 메뉴를 표시하는 영역.
*   **현대적인 스타일링**: 깔끔하고 직관적인 디자인, 음식 테마에 맞는 색상 및 레이아웃, 반응형 지원.
*   **메뉴 추천 로직**: JavaScript를 사용하여 미리 정의된 메뉴 목록에서 무작위로 하나를 선택하여 표시합니다.

## Plan for Current Request (저녁 메뉴 추천 웹사이트)

현재 요청(저녁 메뉴 추천 웹사이트)을 위해 다음 단계를 수행합니다.

1.  **`blueprint.md` 업데이트**: 이 문서를 현재 변경 사항과 계획을 반영하여 업데이트합니다. (현재 단계)

2.  **`index.html` 수정**:
    *   `<title>` 및 `<h1>` 태그의 내용을 "저녁 메뉴 추천"으로 변경합니다.
    *   메뉴 추천을 시작할 `<button id="recommendButton">`을 추가합니다.
    *   추천된 메뉴를 표시할 `<div id="menuRecommendation">`을 추가합니다.
    *   `style.css` 및 `main.js` 파일이 올바르게 연결되어 있는지 확인합니다.

3.  **`style.css` 수정**:
    *   `body` 및 `.container`에 대한 스타일을 개선하여 현대적이고 음식 테마에 맞는 디자인을 적용합니다.
    *   `recommendButton` 및 `menuRecommendation` 영역에 대한 스타일을 추가하여 시각적 일관성과 사용자 경험을 향상시킵니다.
    *   반응형 디자인을 보장합니다.

4.  **`main.js` 수정**:
    *   다양한 저녁 메뉴 아이디어를 포함하는 JavaScript 배열 `dinnerMenus`를 정의합니다.
    *   `DOMContentLoaded` 이벤트 리스너 내에서 `recommendButton` 및 `menuRecommendation` 요소를 가져옵니다.
    *   `recommendButton`에 클릭 이벤트 리스너를 추가합니다. 이 리스너는 `getRandomMenu` 함수를 호출하고 반환된 메뉴를 `menuRecommendation` 요소에 표시합니다.
    *   `getRandomMenu` 함수는 `dinnerMenus` 배열에서 무작위로 메뉴를 선택하여 반환합니다.

5.  **정제 및 테스트**:
    *   모든 요소가 기능적으로 작동하는지 확인하고 UI가 반응형인지 테스트합니다.
    *   버튼 클릭 시 메뉴가 올바르게 추천되는지 확인합니다.
    *   사용자에게 웹사이트 사용 방법을 안내합니다.