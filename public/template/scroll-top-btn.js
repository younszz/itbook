const scrollTopBtn = () => {
  const btn = document.createElement('button');
  btn.className = 'top-btn';

  window.addEventListener('scroll', function () {
    if (this.scrollY > 200) {
      btn.classList.add('on');
    } else {
      btn.classList.remove('on');
    }
  });

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  return btn;
}

document.body.append(scrollTopBtn());