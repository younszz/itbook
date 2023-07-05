const renderHeader = () => {
  return `
  <header>
  <!-- 로고 -->
  <div class="header-in">
    <a href="#">
      <img src="/img/logo.png" alt="logo">
    </a>
  </div>
  <!-- 메뉴 -->
  <ul class="header-menu">
    <li><a href="">전체</a></li>
    <li><a href="">수험서</a></li>
    <li><a href="">알고리즘</a></li>
    <li><a href="">Ai</a></li>
    <li><a href="">웹/모바일</a></li>
    <li><a href="">자기계발</a></li>
    <li><a href="">대학서적</a></li>
  </ul>
  <!-- 로그인/회원가입/장바구니 -->
  <div class="header-btn">
    <ul>
      <li><i class="fas fa-magnifying-glass fa-lg"></i></li>
      <li><a href=""><i class="fas fa-cart-shopping fa-lg"></i></a></li>
      <li><a href="">로그인</a></li>
      <li><a href="">회원가입</a></li>
    </ul>
  </div>
</header>
  `
}
