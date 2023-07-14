'use strict';
// Daum Postcode Service 주소찾기 기능
const addressPopUp = (e) => {
  e.preventDefault();
  const postalCodeInput = document.querySelector('#postalCode');
  const address1Input = document.querySelector('#address1');
  const address2Input = document.querySelector('#address2');
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = ''; 
      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      }
      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
};
//서버에서 회원 정보 가져오기
const getUserInfo = async () => {
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
//서버에 회원 정보 수정 요청
async function updateUserInfo(userInfo) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfo),
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    alert('정보를 수정하는데 실패하였습니다.');
    return null;
  }
}
//입력 받은 값으로 객체 생성 후 회원 정보 수정
const userInfoChange = async (e) => {
  e.preventDefault();
  const userName = document.querySelector('#userName').value;
  const phoneNumber = document.querySelector('#phoneNumber').value;
  const postalCode = document.querySelector('#postalCode').value;
  const address1 = document.querySelector('#address1').value;
  const address2 = document.querySelector('#address2').value;

  if (!userName) {
    return alert('이름을 입력해 주세요.');
  }

  const userInfo = {
    name: userName,
    phone: phoneNumber,
    postalCode: postalCode,
    address: address1,
    addressDetail: address2,
  };

  const updatedUserInfo = await updateUserInfo(userInfo);
  if (updatedUserInfo) {
    alert('회원정보 수정이 완료되었습니다.');
    location.reload();
  }
}
//서버에 회원 탈퇴 요청
const getCookie = (cname) => {
  let name = cname + '=';
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}
//비밀번호 검증 후 일치하면 회원 탈퇴
const userWithdrawalSubmit = async (event) => {
  event.preventDefault();
  const inputPw = event.target.querySelector('.modal-pw');
  const inputPwValue = inputPw.value;
  const data = await getUserInfo();
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: data.email,
      password: inputPwValue,
    }),
  });

  if (response.ok) {
    try{
      const deletedUser = await fetch(`/api/user/${data._id}`, {method: 'DELETE'});
      alert('회원탈퇴가 완료되었습니다. 언제나 기다리고 있을게요.');
      if(deletedUser){
        document.cookie ='token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
      }
    }catch(e){
      console.log(e);
    }
  }else{
    inputPw.focus();
    alert(`비밀번호가 일치하지 않습니다. 다시 확인해주세요.`);
  }
};
//회원탈퇴 모달 닫기
const closeWithdrawModal = () => {
  const modal = document.querySelector('.modal-container');
  const modalBg = document.querySelector('.modal-back');
  document.body.removeChild(modalBg);
  document.body.removeChild(modal);
};
//회원탈퇴 모달 템플릿
const withdrawModalTemplate = () => {
  return `
            <h5 class="modal-title">회원탈퇴</h5>
            <div class="modal-main">
              <h6 class="modal-main-title">정말... 가시나요?</h6>
              <p class="modal-main-text">회원 탈퇴 유의사항을 확인해주세요.</p>
              <ul class="modal-list">
                <li class="modal-list-item">회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 고객정보 보호정책에 따라 관리됩니다.</li>
                <li class="modal-list-item">잇북은 계속 회원님을 기다리겠습니다.</li>
              </ul>
              <form onsubmit="userWithdrawalSubmit(event)" class="modal-form">
                <div class="modal-input-box">
                  <label for="modalPw" class="modal-label">비밀번호</label>
                  <input type="password" name="modalPw" id="modalPw" class="modal-pw">
                </div>
                <button class="modal-Withdraw-btn">탈퇴하기</button>
              </form>
              <button class="modal-close-btn" onclick="closeWithdrawModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
          `;
};
//회원탈퇴 모달 생성
const createWithdrawModal = () => {
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal-container');
  modal.innerHTML = withdrawModalTemplate();
  const modalBg = document.createElement('div');
  modalBg.setAttribute('onclick', 'closeWithdrawModal()');
  modalBg.setAttribute('class', 'modal-back');
  document.body.append(modalBg);
  document.body.prepend(modal);
};
//회원 정보 렌더링
const showUserInfo = async () => {
  const data = (await getUserInfo()) || '';
  const { name, email, phone, address, addressDetail } = data;
  const welcomeName = document.querySelector('#welcomeName');
  const userNameInput = document.querySelector('#userName');
  const userEmailInput = document.querySelector('#userEmail');
  const phoneNumber = document.querySelector('#phoneNumber');
  const addressFirst = document.querySelector('#address1');
  const addressSecond = document.querySelector('#address2');

  welcomeName.innerText = name ? name : '비회원';
  userEmailInput.value = email ? email : '';
  userNameInput.value = name ? name : '';
  phoneNumber.value = phone ? phone : '';
  addressFirst.value = address ? address : '';
  addressSecond.value = addressDetail ? addressDetail : '';
};
window.addEventListener('load', () => {
  showUserInfo();
  const searchAddressButton = document.querySelector('#searchAddressButton');
  const saveBtn = document.querySelector('#user-info-save');
  const unregisterBtn = document.querySelector('#unregister');
  searchAddressButton.addEventListener('click', addressPopUp);
  saveBtn.addEventListener('click',userInfoChange);
  unregisterBtn.addEventListener('click',createWithdrawModal);
});
