// AUTH
const doLogin = function (e) {
  e.preventDefault();
  const username = document.getElementById("uname").value;
  const password = document.getElementById("psw").value;

  login({
    username: username,
    password: password,
  }).then(function (res) {
    window.location.href = "home.html";
  });
};

const doRegister = function (e) {
  e.preventDefault();
  const username = document.getElementById("uname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("psw").value;

  register({
    username: username,
    email: email,
    password: password,
  }).then(function (res) {
    window.location.href = "home.html";
  });
};

const doLogout = function (e) {
  e.preventDefault();
};

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = this.elements["email"].value;
    const password = this.elements["psw"].value;

    // Perform your authentication logic here
    // For demonstration purposes, let's assume authentication is successful
    // Redirect to home.html
    window.location.href = "./home.html";
  });

class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  getUserName() {
    return this.username;
  }
}

var user1 = new User("catDadDan", "catDaddy", "catsRkool@sbcglobal.com");
console.log(user1);
console.log("Testing username getter: " + user1.getUserName());

var MovieRental = {
  genre: ["horror", "comedy", "action", "rom-com"],
  film: ["Hereditary", "Ace Ventura", "Batman", "Love Actually"],
  getMovieByGenre(genre) {
    const index = this.genre.indexOf(genre.toLowerCase());
    if (index !== -1) {
      return this.film[index];
    } else {
      return "Please choose between horror, comedy, action, or rom-com";
    }
  },
};

console.log(MovieRental);
console.log("Renting a horror movie: " + MovieRental.getMovieByGenre("horror"));
