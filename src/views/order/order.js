// 유저정보 가져오기
const getUserFromDB = async () => {
  try {
    const response = await fetch("/api/user");
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("실패");
    }
  } catch (err) {
    console.error(err);
  }
};

const searchAddress = (e) => {
  e.preventDefault();
  const address1Input = document.querySelector("#address1");
  const address2Input = document.querySelector("#address2");

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
      // 주소 정보를 해당 필드에 넣는다.
      address1Input.value = `${addr} ${extraAddr}`;
      // 커서를 상세주소 필드로 이동한다.
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
};

// 배송지, 유저 정보
const populateOrderUserInfo = async () => {
  const user = await getUserFromDB();
  const deliveryInfo = document.querySelector(".delivery-info");
  const orderInfo = document.querySelector(".order-info");
  orderInfo.innerHTML = `<p>성함 : ${user.name}</p>
    <p>이메일 주소 : ${user.email}</p>`;
  deliveryInfo.insertAdjacentHTML(
    "beforeend",
    `<ul>
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
</ul>`
  );
  document
    .querySelector(".address-btn")
    .addEventListener("click", searchAddress);
  if (user.address !== undefined) {
    orderInfo.insertAdjacentHTML(
      "beforeend",
      `<p>휴대폰 번호 : ${user.phone}</p>`
    );
    document.querySelector("#address1").value = user.address;
    document.querySelector("#address2").value = user.addressDetail;
  }
};

populateOrderUserInfo();

// const orderList = document.getElementById("orderList");
// const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
// // console.log(selectedItems);
// selectedItems.forEach(async (item) => {
//   const response = await fetch(`/api/product/${item.id}`);
//   const bookData = await response.json();

//   console.log(bookData);

//   const el = document.createElement("div");
//   el.className = "item";
//   el.innerHTML = `
//       <div class="item-name">${bookData.title}</div>
//       <span class="item-count">${item.quantity}개</span>
//       <span class="item-count">${
//         parseInt(item.quantity) * parseInt(bookData.price)
//       }원</span>
//     `;
//   orderList.prepend(el);
// });

const displayOrderItems = async () => {
  const orderList = document.getElementById("orderList");
  const selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
  let totalPrice = 0;

  for (const item of selectedItems) {
    const response = await fetch(`/api/product/${item.id}`);
    const bookData = await response.json();

    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <div class="item-name">${bookData.title}</div>
      <span class="item-count">${item.quantity}개</span>
      <span class="item-count t-price">${
        parseInt(item.quantity) * parseInt(bookData.price)
      }원</span>
    `;
    orderList.prepend(el);

    totalPrice += parseInt(item.quantity) * parseInt(bookData.price);
  }
  extractInfoFromInnerHTML(totalPrice);
};

// 주문 금액
const extractInfoFromInnerHTML = async (totalPrice) => {
  const oPrice = document.querySelector(".order-price");
  const pPrice = document.querySelector(".products-price");
  const dPrice = document.querySelector(".delivery");
  const tPrice = document.querySelectorAll(".total-price");
  oPrice.insertAdjacentHTML("afterbegin", totalPrice);
  pPrice.insertAdjacentHTML("afterbegin", totalPrice);

  // 주문금액 30000원미만이면 배송비 3000원
  if (parseInt(oPrice.innerText) < 30000) {
    dPrice.insertAdjacentHTML("afterbegin", "3000");
  } else {
    dPrice.insertAdjacentHTML("afterbegin", "0");
  }
  tPrice.forEach((el) => {
    el.insertAdjacentHTML(
      "afterbegin",
      totalPrice + parseInt(dPrice.innerText)
    );
  });
};

displayOrderItems();

// 필수사항 체크박스 전체 체크
const selectAll = document.querySelector("#all-btn");
selectAll.addEventListener("click", () => {
  const selectCheckBoxs = document.querySelectorAll(".checkbox");
  if (selectAll.checked) {
    selectCheckBoxs.forEach((box) => {
      box.checked = true;
    });
  } else {
    selectCheckBoxs.forEach((box) => {
      box.checked = false;
    });
  }
});

document.querySelector(".payment-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const address = document.querySelector("#address1").value;
  const addressDetail = document.querySelector("#address2").value;
  const check1 = document.querySelector("#check-btn1").checked;
  const check2 = document.querySelector("#check-btn2").checked;
  const tPrice = parseInt(document.querySelector(".total-price").innerHTML);
  if (!address || !addressDetail) {
    alert("배송지를 입력해주세요.");
    return false;
  }
  if (!check1 || !check2) {
    alert("필수 항목에 동의해 주세요.");
    return false;
  }
  const data = {
    address: address,
    addressDetail: addressDetail,
    // ..?
    totalAmount: tPrice,
  };
  console.log(data);
});
