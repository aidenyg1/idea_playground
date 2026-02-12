document.addEventListener('DOMContentLoaded', () => {
  const cameraFeed = document.getElementById('cameraFeed');
  const captureButton = document.getElementById('captureButton');
  const faceImage = document.getElementById('faceImage');
  const ageResult = document.getElementById('ageResult');
  const hiddenCanvas = document.getElementById('hiddenCanvas');
  const context = hiddenCanvas.getContext('2d');
  let stream; // To store the MediaStream object

  // 웹캠 접근 및 비디오 스트림 표시
  async function startCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      cameraFeed.srcObject = stream;
      cameraFeed.play();
      ageResult.innerHTML = '<p>사진 촬영 버튼을 눌러 나이를 추정하세요.</p>';
    } catch (err) {
      console.error("카메라 접근에 실패했습니다: ", err);
      ageResult.innerHTML = '<p style="color: red;">카메라 접근 권한을 허용해주세요.</p>';
      captureButton.disabled = true;
    }
  }

  // 비디오에서 프레임 캡처
  captureButton.addEventListener('click', () => {
    if (stream) {
      hiddenCanvas.width = cameraFeed.videoWidth;
      hiddenCanvas.height = cameraFeed.videoHeight;
      context.drawImage(cameraFeed, 0, 0, hiddenCanvas.width, hiddenCanvas.height);
      const imageDataURL = hiddenCanvas.toDataURL('image/png');
      faceImage.src = imageDataURL;
      faceImage.style.display = 'block'; // 캡처된 이미지 표시
      estimateAge(imageDataURL); // 연령 추정 함수에 이미지 데이터 전달
    } else {
      ageResult.innerHTML = '<p style="color: red;">카메라가 시작되지 않았습니다.</p>';
    }
  });

  // 페이지 로드 시 카메라 시작
  startCamera();

  // 플레이스홀더 연령 추정 함수
  function estimateAge(imageData) {
    // 실제 애플리케이션에서는 'imageData' (base64)가 머신러닝 모델을 통해 처리하기 위해
    // API로 전송될 것입니다.
    // 현재는 연령 추정을 시뮬레이션합니다.
    ageResult.innerHTML = '<p>나이 추정 중...</p>';

    setTimeout(() => {
      // API 호출 지연 시뮬레이션
      const simulatedAge = Math.floor(Math.random() * 60) + 18; // 18세에서 77세 사이의 연령
      ageResult.innerHTML = `<p>예상 나이: <strong>${simulatedAge}세</strong></p>`;
    }, 2000); // 2초 지연 시뮬레이션
  }
});
