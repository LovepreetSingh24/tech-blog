document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('[name="username"]').value;
    const password = document.querySelector('[name="password"]').value;
  
    const response = await fetch('/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // Redirect to the dashboard after registration
      document.location.replace('/dashboard');
    } else {
      alert('Failed to register');
    }
  });
  