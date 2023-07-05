// 로그인
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('login-result').textContent = '로그인 성공: ' + data.token;
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('login-result').textContent = '로그인 실패';
      });
  });
  