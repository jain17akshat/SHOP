
function createAccount(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return false;
  }

  localStorage.setItem("fb_user_email", email);
  localStorage.setItem("fb_user_password", password);
  localStorage.setItem("fb_user_name", name);

  alert("Account created! Please log in.");
  window.location.href = "index.html"; // Redirect to login
  return false;
}
