
  // 회원가입
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const password_confirm = document.getElementById('signup-confirm-password').value;
  
    fetch('http://localhost:3000/api/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirm,
      }),
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('signup-result').textContent = '회원가입 성공: ' + data.token;
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('signup-result').textContent = '회원가입 실패';
      });
  });
  