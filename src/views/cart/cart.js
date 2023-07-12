'use strict';

const onUserState = async () => {
  const user = await getUserInfo();
  const ul = document.querySelector('.cart-list');
  const isLogin = user ? true : false;
  if(isLogin){
    const userBooks = user.cart;

    userBooks.forEach((book)=>{
      const li = document.createElement('li');
      li.setAttribute('class','cart-item');
      li.setAttribute('id',book._id);
      li.innerHTML = itemTemplate(book);
      ul.append(li);
    });
  }
  await renderBooks();
}

window.addEventListener('load', async()=>{
  const ul = document.querySelector('.cart-list');
  await onUserState();
  ul.addEventListener('click',enableBtnFunc);
  paymentResult();
})

function checkBoxOnOff(books){
  const allCheckBox = document.querySelector('#allCheck');
  const allSelectLabel = document.querySelector('.all-box-container>label');

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
}

function enableBtnFunc(e){
  if(e.target.className == "btn-delete" || e.target.className == "fa-solid fa-xmark"){
    const confirmDelete = confirm('상품을 삭제하시겠습니까?');
    const id = e.target.className == "fa-solid fa-xmark" ? e.target.parentElement.parentElement.id : e.target.parentElement.id;
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

function paymentResult(books){
  const totalPre = document.querySelector('.total-pre');
  const totalPrice = document.querySelector('.total-price');
  const orderBtn = document.querySelector('.btn-order');
  const delivery = document.querySelector('.delivery');
  if(books){
    const total = books.reduce((acc,cur) => {
      acc += cur.price * cur.quantity;
      return acc;
    },0);
    if(total == 0){
      orderBtn.innerHTML=`주문하기`;
      totalPrice.innerHTML = `0원`;
      totalPre.innerHTML = `0원`;
      return ;
    }
    else if(total < 30000){
      delivery.innerHTML = `+3000원`;
      orderBtn.innerHTML=`${total+3000}원 주문하기`;
      totalPrice.innerHTML = `${total}원`;
      totalPre.innerHTML = `${total+3000}원`;
      return ;
    }else{
      orderBtn.innerHTML=`${total}원 주문하기`;
      totalPrice.innerHTML = `${total}원`;
      totalPre.innerHTML = `${total}원`;
    }
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
  const ul = document.querySelector('.cart-list');
  const books = await getServerBooks();
  books.forEach((book)=>{
    const li = document.createElement('li');
    li.setAttribute('class','cart-item');
    li.setAttribute('id',book._id);
    li.innerHTML = itemTemplate(book);
    ul.append(li);
  });
  checkBoxOnOff(books);
  paymentResult(books);
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


