document.addEventListener('DOMContentLoaded', function() {
  // 폼 요소를 선택합니다.
  const form = document.getElementById('form');
  const cate01Input = document.getElementById('cate01');
  const cate02Input = document.getElementById('cate02');
  const cate03Input = document.getElementById('cate03');
  const cate04Input = document.getElementById('cate04');

    // form submit 이벤트 리스너를 추가합니다.
    form.addEventListener('submit', async function(event) {
      event.preventDefault(); // 폼의 기본 동작인 페이지 이동을 방지합니다.
      editCategory(); // editCategory 함수를 호출합니다.
    });

  async function editCategory() {
    try {
      const response = await fetch('/api/category');
      const data = await response.json();
      console.log(data);

      // 가져온 카테고리 값을 입력 폼에 설정합니다.
      cate01Input.value = data[0];
      cate02Input.value = data[1];
      cate03Input.value = data[2];
      cate04Input.value = data[3];

      // 수정된 입력값을 가져옵니다.
      const newCategories = [
        cate01Input.value,
        cate02Input.value,
        cate03Input.value,
        cate04Input.value
      ];

      // POST 요청을 보냅니다.
      const postResponse = await fetch('/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCategories)
      });

      if (postResponse.ok) {
        console.log('POST 요청이 성공하였습니다.');
      } else {
        throw new Error('POST 요청이 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // editCategory 함수를 초기 호출합니다.
  editCategory();
});


