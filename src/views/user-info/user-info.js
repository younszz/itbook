'use strict';

const searchAddressButton = document.querySelector("#searchAddressButton");
searchAddressButton.addEventListener("click", searchAddress);

function searchAddress(e) {
  const postalCodeInput = document.querySelector("#postalCode");
  const address1Input = document.querySelector("#address1");
  const address2Input = document.querySelector("#address2");    
  e.preventDefault();
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = ""; // 주소 변수
      let extraAddr = ""; // 참고항목 변수
      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }
      // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
      if (data.userSelectedType === "R") {
        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        // 건물명이 있고, 공동주택일 경우 추가한다.
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }
      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      // 커서를 상세주소 필드로 이동한다.
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}

const saveBtn = document.querySelector("#user-info-save");
saveBtn.addEventListener("click", doCheckout);

async function doCheckout(e) {
  const userName = document.querySelector("#userName").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const postalCode = document.querySelector("#postalCode").value;
  const address1 = document.querySelector("#address1").value;
  const address2 = document.querySelector("#address2").value;

  e.preventDefault();
  if (!userName || !phoneNumber || !postalCode || !address1 || !address2) {
    return alert("회원정보를 모두 입력해 주세요.");
  }
  // const data = {
  //   userName,
  //   phoneNumber,
  //   postalCode,
  //   address1,
  //   address2,
  // };
  // const dataJson = JSON.stringify(data);
  // const apiUrl = `https://${window.location.hostname}:8190/api/order`;

  // const res = await fetch(apiUrl, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "aplication/json",
  //   },
  //   body: dataJson,
  // });
  // if (res.status === 201) {
  //   alert("주문에 성공하였습니다!");
  // } else {
  //   alert("주문에 실패하였습니다..");
  // }
}

const unregisterBtn = document.querySelector('#unregister');
unregisterBtn.addEventListener('click',() => alert('정말... 가시나요?'));

const showUserInfo = async () => {
  const data = await getUserInfo();
  const { name , email, phone, address } = data;
  const welcomeName = document.querySelector('#welcomeName');
  const userNameInput = document.querySelector("#userName");
  const userEmailInput = document.querySelector("#userEmail");
  const phoneNumber = document.querySelector('#phoneNumber');
  const addressFirst = document.querySelector('#address1');

  welcomeName.innerText= name ? name : '비회원';
  userEmailInput.value = email ? email : '';
  userNameInput.value = name ? name : '';
  phoneNumber.value = phone ? phone : '';
  addressFirst.value = address ? address : '';
}

window.addEventListener('load',showUserInfo);

