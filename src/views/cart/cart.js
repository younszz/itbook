'use strict';
const ul = document.querySelector('.cart-list');

window.addEventListener('load',()=>{
  renderBooks();

  ul.addEventListener('click',(e)=>{
    if(e.target.className == "fa-solid fa-xmark"){
      const id = e.target.parentElement.parentElement.id;
      const confirmDelete = confirm('상품을 삭제하시겠습니까?');
      if(confirmDelete){
        deleteLocalItem(id);
      }
    }
  })
})

function deleteLocalItem(id){
  const books = JSON.parse(localStorage.getItem("books"));
  const values = Object.values(books);
  if(books){
    const updatedBooks = values.filter(obj => obj._id !== id);
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
  <a href="#" class="item-info">
    <img src="${book.imageUrl}" alt="도서 사진">
    <div class="info-text">
      <p class="info-title">${book.title}</p>
      <p class="description">${book.author}</p>
    </div>
  </a>
  <div class="item-count">
    <button class="btn-minus"><i class="fa-solid fa-minus"></i></button>
      <input type="number" id="item-number" value=${book.quantity}>
      <button class="btn-plus"><i class="fa-solid fa-plus"></i></button>
  </div>
  <p class="item-price">${book.price * book.quantity}원</p>
  <button class="btn-delete"><i class="fa-solid fa-xmark"></i></button>
  `;
}

// window.addEventListener('load',()=>{
//   const ul = document.querySelector('.cart-list');
//   const books = JSON.parse(localStorage.getItem("books"));
//   const orderBtn = document.querySelector('.btn-order');
//   const totalPrice = document.querySelector('.total-price');
//   const totalPre = document.querySelector('.total-pre');
//   books.map((book) => {
//     const li = document.createElement('li');
//     li.setAttribute('class','cart-item');
//     li.setAttribute('id',book._id);
//     li.innerHTML = itemTemplate(book);
//     ul.append(li);
//   });
//   const total = books.reduce((acc,cur) => {
//     acc += cur.price * cur.count
//     return acc;
//   },0);
//   orderBtn.innerHTML=`${total}원 주문하기`;
//   totalPrice.innerHTML = `${total}원`;
//   totalPre.innerHTML = `${total}원`;

//   const allCheckBtn = document.querySelector('#allCheck');
//   const checkBoxs = document.querySelectorAll('.selectCheck');
//   allCheckBtn.addEventListener('change',(e)=>{
//       if(e.target.checked){
//         checkBoxs.forEach((box) => box.checked = true);
//       }else{
//         checkBoxs.forEach((box) => box.checked = false);
//       }
//     })
    
//   
    
//   })
// })



