# msse661 Class Project

MSSE661 is a web software development course. This repository is for course work and learning.

### Week 1

<img width="758" alt="helloWorld" src="https://github.com/dalamo20/viva-ventura/assets/35320043/55dfbc87-7b37-48fb-8bb0-989fb7aa6663">

- Demonstrate use of HTML.

### Week 2

<img width="1680" alt="Screenshot 2024-03-22 at 9 22 34 PM" src="https://github.com/dalamo20/msse661/assets/35320043/329b56e2-37fe-444b-9c1b-289da3523ab9">

- Using HTML, CSS & JS in together through a modal form that opens/closes on click.
- The entire web page uses flexbox and media queries to maintain responsiveness.
- Within the console in devtools, type: MovieRental.getMovieByGenre("horror") and see the results. Try other genres as well, only 4 genres are available. Try and find out.

### Week 3

- This week was used for backend setup.

### Week 4

<img width="1680" alt="fullstack" src="https://github.com/dalamo20/mysql-api/assets/35320043/a1a22912-bbc6-46dd-a3c3-daccff5f90a7">

- Here I am showing a connection from my frontend application with my backend server.
- Upon a successful registration, the database (highlighted on the right of the image) in the console shows that I was able to add a user (user1).
- With this new user, I was returned to the login page, entered username and password that I just created and logged in.
- I am then redirected to the home page.

### Week 5

- Week 5 & 6 are similar except week 6 executes CRUD functionality (except for Updates);

### Week 6

<img width="1676" alt="login_reg" src="https://github.com/dalamo20/msse661/assets/35320043/78f81d71-fe26-4d83-a4f4-66a671ce2d6e">

- What separates week5 from week6 is that I have consolidated the login & registration into a single page.
- Registrating successfully will lead the user back to the home page where they will have to login with their new username & password.
- Successfully logging in will lead the user straight to the home page where they can perform CRUD functionality.

<img width="1679" alt="orders" src="https://github.com/dalamo20/msse661/assets/35320043/dab60a89-f126-4755-b8e5-3e97d84e2c04">

- In the home page, I allow the users to perform tasks that mimic that of a bartender.
- The top inputs allow the user to add/delete a new drink name and a price (ex: '8.00'). The results will append below with the drink id that you can use in the order inputs below.
- In the Drinks table, the data populates in this order (delete btn, drink id, drink name, drink price).
- The bottom inputs act as a customer ordering drinks. The customer will look at the above drink menu and choose the Menu Item Number (the id of the drink) and how many they would like to order. Total and timestamp are calculated by backend server.
- In the Orders table, the data populates in this order (delete btn, order id, drink id, quantity, total price, creation date/time).
- NOTE: Each logged in user may have different orders and drinks. Please use the drink id's to order. To see orders, you must order from the menu. If the menu is empty, please create some items by following the input placeholders.

### Week 7

<img width="1680" alt="finalShot" src="https://github.com/dalamo20/msse661/assets/35320043/74ecbfa0-2367-4d40-806c-45e9c430a3b2">

- Made final modifications to improve performance when fetching data from the database.
- Now once the appropriate user logs in, they can now see their menu options and orders they have created.
