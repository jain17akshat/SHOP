
    function login(e) {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const savedEmail = localStorage.getItem("fb_user_email");
      const savedPassword = localStorage.getItem("fb_user_password");

      if (email === savedEmail && password === savedPassword) {
        alert("Login successful!");
        window.location.href = "home.html"; 
      } else {
        alert("Invalid email or password!");
      }

      return false;
    }
