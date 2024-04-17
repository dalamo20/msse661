(() => {
  const isAuth = getStorage("isAuth");
  if (!isAuth) {
    logout();
    alert("Login to view the menu.");
    window.location.href = "/login.html";
  }
})();
