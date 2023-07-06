'use strict';

window.addEventListener('load',()=>{
  const ul = document.querySelector('.cart-list');
  const books = JSON.parse(localStorage.getItem("books"));
  const orderBtn = document.querySelector('.btn-order');
  const totalPrice = document.querySelector('.total-price');
  const totalPre = document.querySelector('.total-pre');
  books.map((book) => {
    const li = document.createElement('li');
    li.setAttribute('class','cart-item');
    li.setAttribute('key',book._id);
    li.innerHTML = itemTemplate(book);
    ul.append(li);
  });
  const total = books.reduce((acc,cur) => {
    acc += cur.price * cur.count
    return acc;
  },0);
  orderBtn.innerHTML=`${total}원 주문하기`;
  totalPrice.innerHTML = `${total}원`;
  totalPre.innerHTML = `${total}원`;

  const allCheckBtn = document.querySelector('#allCheck');
  const checkBoxs = document.querySelectorAll('.selectCheck');
  allCheckBtn.addEventListener('change',(e)=>{
      if(e.target.checked){
        checkBoxs.forEach((box) => box.checked = true);
      }else{
        checkBoxs.forEach((box) => box.checked = false);
      }
    })
})

function itemTemplate(book){
  return `
  <input type="checkbox" class="selectCheck" checked>
  <a href="#" class="item-info">
    <img src="${book.imageUrl}" alt="도서 사진">
    <div class="info-text">
      <p class="info-title">${book.title}</p>
      <p class="description">${book.author}</p>
    </div>
  </a>
  <div class="item-count">
    <button class="btn-minus"><i class="fa-solid fa-minus"></i></button>
      <input type="number" id="item-number" value=${book.count}>
      <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
  </div>
  <p class="item-price">${book.price * book.count}원</p>
  <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
  `;
}