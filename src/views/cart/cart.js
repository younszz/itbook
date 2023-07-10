'use strict';

const ul = document.querySelector('.cart-list');
const allCheckBox = document.querySelector('#allCheck');
const allSelectLabel = document.querySelector('.all-box-container>label');

const getUserInfo = async () =>{
  try{
    const token = getTokenFromCookie();
    const response = await fetch('/api/user',{
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("실패");
      }
    } catch (err) {
      console.error(err);
    }
}

window.addEventListener('load', async()=>{
  const books = await getServerBooks();
  renderBooks();
  ul.addEventListener('click',enableBtnFunc);
  paymentResult();
  allSelectLabel.innerHTML = `전체선택(${books.length}/${books.length})`;
  
  allCheckBox.addEventListener('change',async ()=>{
    const selectCheckBoxs = document.querySelectorAll('.selectCheck');
    if(allCheckBox.checked){
      selectCheckBoxs.forEach((box)=>{
        box.checked = true;
        allSelectLabel.innerHTML = `전체선택(${books.length}/${books.length})`;
      })
    }else{
      selectCheckBoxs.forEach((box)=>{
        box.checked = false;
        allSelectLabel.innerHTML = `전체선택(0/${books.length})`;
      })
    }
  })
  getUserInfo();
})

function enableBtnFunc(e){
  if(e.target.className == "btn-delete" || e.target.className == "fa-solid fa-xmark"){
    const confirmDelete = confirm('상품을 삭제하시겠습니까?');
    const id = e.target.className == "fa-solid fa-xmark" ? e.target.parentElement.parentElement.id : e.target.parentElement.id;
    console.log(id);
    if(confirmDelete){
      deleteLocalItem(id);
    }
  }
  if(e.target.className == "btn-plus" || e.target.className == "fa-solid fa-plus"){
    const id = e.target.className == "fa-solid fa-plus" ? e.target.parentElement.parentElement.parentElement.id : e.target.parentElement.parentElement.id;
    plusQuantityItem(id);
  }
  if(e.target.className == "btn-minus" || e.target.className == "fa-solid fa-minus"){
    const id = e.target.className == "fa-solid fa-minus" ? e.target.parentElement.parentElement.parentElement.id : e.target.parentElement.parentElement.id;
    minusQuantityItem(id);
  }
}

async function paymentResult(){
  const totalPre = document.querySelector('.total-pre');
  const totalPrice = document.querySelector('.total-price');
  const orderBtn = document.querySelector('.btn-order');
  const delivery = document.querySelector('.delivery');
  const books = await getServerBooks();
  if(books){
    const total = books.reduce((acc,cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    },0);
    if(total < 30000){
      delivery.innerHTML = `+3000원`;
    }
    orderBtn.innerHTML=`${total}원 주문하기`;
    totalPrice.innerHTML = `${total}원`;
    totalPre.innerHTML = `${total}원`;
    
  }
}

function minusQuantityItem(id){
  const books = JSON.parse(localStorage.getItem("books")) || '';
  const values = Object.values(books);
  if(books){
    const filteredBooks = values.filter(obj => obj.id !== id);
    const findBook = values.find(obj => obj.id == id);
    const index = values.findIndex((item) => item == findBook);
    const updatedBook = findBook.quantity > 1 ? {...findBook, quantity: findBook.quantity - 1} : findBook;
    filteredBooks.splice(index,0,updatedBook);
    localStorage.setItem('books',JSON.stringify(filteredBooks));
    location.reload();
  }
}

function plusQuantityItem(id){
  const books = JSON.parse(localStorage.getItem("books")) || '';
  const values = Object.values(books);
  if(books){
    const filteredBooks = values.filter(obj => obj.id !== id);
    const findBook = values.find(obj => obj.id == id);
    const index = values.findIndex((item) => item == findBook);
    const updatedBook = {...findBook, quantity: findBook.quantity + 1};
    filteredBooks.splice(index,0,updatedBook);
    localStorage.setItem('books',JSON.stringify(filteredBooks));
    location.reload();
  }
}

function deleteLocalItem(id){
  const books = JSON.parse(localStorage.getItem("books")) || '';
  const values = Object.values(books);
  if(books){
    const updatedBooks = values.filter(obj => obj.id !== id);
    localStorage.setItem('books',JSON.stringify(updatedBooks));
    location.reload();
  }
}

async function renderBooks(){
  const books = await getServerBooks();
  books.forEach((book)=>{
    const li = document.createElement('li');
    li.setAttribute('class','cart-item');
    li.setAttribute('id',book._id);
    li.innerHTML = itemTemplate(book);
    ul.append(li);
  });
}

function getLocalBooks(){
  const books = JSON.parse(localStorage.getItem("books"));
  return books;
}

async function getServerBooks(){
  const localBooks = getLocalBooks();
  const booksLength = localBooks.length;
  const books = [];
  for(let i = 0; i < booksLength; i++){
    const bookId = localBooks[i].id;
    const quantity = localBooks[i].quantity;
    const response = await fetch(`/api/product/${bookId}`);
    const book = await response.json();
    books.push({...book, quantity});
  }
  return books;
}

function itemTemplate(book){
  return `
  <input type="checkbox" class="selectCheck" checked>
  <a href="/product/${book._id}" class="item-info">
    <img class="item-img" src="${book.imageUrl}" alt="도서 사진">
    <div class="info-text">
      <p class="info-title">${book.title}</p>
      <p class="description">${book.author}</p>
    </div>
  </a>
  <div class="item-count">
    <button class="btn-minus"><i class="fa-solid fa-minus"></i></button>
      <input type="number" class="item-num" id="item-number" value=${book.quantity}>
      <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
  </div>
  <p class="item-price">${book.price * book.quantity}원</p>
  <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
  `;
}



function getTokenFromCookie() {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split("=");
    if (name === "jwt") {
      return decodeURIComponent(value);
    }
  }
  return null;
}

