// 유저정보 가져오기
const getUserFromDB = async () => {
  try {
    const response = await fetch('/api/user');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('실패');
    }
  } catch (err) {
    console.error(err);
  }
};

const searchAddress = (e) => {
  e.preventDefault();
  const address1Input = document.querySelector('#address1');
  const address2Input = document.querySelector('#address2');

  new daum.Postcode({
    oncomplete: function (data) {
      let addr = ''; // 주소 변수
      let extraAddr = ''; // 참고항목 변수
      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === 'R') {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }
      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === 'R') {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }
      // 주소 정보를 해당 필드에 넣는다.
      address1Input.value = `${addr} ${extraAddr}`;
      // 커서를 상세주소 필드로 이동한다.
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
};

const orderPageInfo = async () => {
  const user = await getUserFromDB();
  const deliveryInfo = document.querySelector('.delivery-info');
  const orderInfo = document.querySelector('.order-info');
  orderInfo.innerHTML = `<p>성함 : ${user.name}</p>
    <p>이메일 주소 : ${user.email}</p>`;
  console.log(user);
  if (user.address !== undefined) {
    deliveryInfo.innerHTML = `${user.address} ${user.addressDetail}`;
    orderInfo.innerHTML = `<p>성함 : <div>${user.name}</div></p>
    <p>휴대폰 번호 : ${user.phone}</p>
    <p>이메일 주소 : ${user.email}</p>`;
  } else {
    deliveryInfo.innerHTML = `<ul>
  <li>
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address1"
            type="text"
            placeholder="배송지를 등록해 주세요."
            autocomplete="on"
            readonly
          />
        </p>
      </div>
    </div>
  </li>
  <li>
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address2"
            type="text"
            placeholder=""
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </li>
</ul>`;
    document
      .querySelector('.address-btn')
      .addEventListener('click', searchAddress);
  }
};

orderPageInfo();

const orderList = document.getElementById('orderList');
const selectedItems = JSON.parse(localStorage.getItem('selectedItems'));
console.log(selectedItems);
selectedItems.forEach(async (item) => {
  const response = await fetch(`/api/product/${item.id}`);
  const bookData = await response.json();

  console.log(bookData);

  const el = document.createElement('div');
  el.className = 'item';
  el.innerHTML = `
    <div class="item-name">${bookData.title}</div>
    <span class="item-count">${item.quantity}개</span>
    <span class="item-count">${
      parseInt(item.quantity) * parseInt(bookData.price)
    }원</span>
  `;
  orderList.prepend(el);
});
