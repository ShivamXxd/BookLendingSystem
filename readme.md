BookLendingSystem:

This site lets users rent books for a period of time in days.

How to Run the project:

- First make sure you have node.js installed locally.
- Download the zip folder from GitHub repository and extract it.
- while in the backend folder, write "npm i" to install all the necessary packages.
- Do the same thing in the frontend folder.
- Use the parent folder "BookLendingSystem" and open terminal here, create two separate terminals.
- Run "nodemon start" command in backend, use "cd backend" to go there.
- Run "npm run dev" command in frontend, use "cd frontend" to go there.
- Click on "http://localhost:5173" in your frontend terminal to open the website.

UI/UX:
When user is not logged in:

- User will first come into the home page and will be able to navigate throughout the entire webapp without authentication.
- User can search for books by their name, can filter for books by their category.
- User can add books to cart, number of books added can be seen above the cart icon in the navbar.
- User can switch to dark mode or light mode.
- User will see a sign in button which navigates to login page, login page and register page are linked together.
- The Hero section will show books according to search or filter, initially it picks random books for top selling and hottest deals section.
- The cart icon will take user into the cart page. When the user tries to add the same book to cart again, the cart page will open instead.
- User cannot rent more than one book of same type because of security reasons.
- The cart will show all the books that were added and a payment section which calculates the total price user has to pay.
- The user cannot buy any items yet as they are not logged in currently, so the buy button will show a modal with backdrop that leads to the login page.

When user is logged in:

- User can see the site is welcoming them in the navbar section.
- User will now see a log out button instead of sign in button.
- User can see a new "User Icon" in the end of the navbar. This icon leads to the user profile page.
- User can edit their data or permanently delete their account in this user profile page.
- When trying to delete account, user will be prompted with a window asking to confirm for the deletion.
- User can now buy the items from cart as they're logged in currently and buy button will now give them a confirmation window with their data.

API Routes:

- "/books" route is a get method route which responds with json data of all books available as we want to show all the books in our website. It gets data from the books collection.
- "/user/register" route is a post method route which takes user's registered data and saves it into the database's users collection along the password as a new hashed password using bcrypt.
- "/user/login" route is a post method route which takes user's login credentials and matches it with database's data, if user is found then password is matched. On full authentication it sends a response of 200, or 500 or 404 on fail. It also sends the user's data which is used as currentUser context variable for frontend UI.
- "/user/patch" route is a patch route which takes user's updated data and updates the user using findOneAndUpdate method.
- "/user/delete" route is a delete method route which takes currentUser's email from frontend and deletes the user from database using findOneAndDelete method.

Authentication Flow:

- User can login from the login page, if they're currently not registered then they'll be informed.
- User can then go to register page and fill details. The user data will be stored in mongoDB database with hashed password using bcrypt.
- On successful register, user will be moved to login page.
- The login credentials are verified in the backend using bcrypt compare method and response is sent to frontend with the current user's data i.e. the user that just tried logging in.
- If user successfully logs in then a context state variable named "isLoggedIn" will be set to true and a jwt token will be generated.
- Current User's data is stored in a global context variable named "currentUser", so that we can use their data across the site.
- This jwt token will ensure that the user stays logged in even after refreshing the site.
- Using "isLoggedIn" we have made a lot of conditional frontend UI.
- When the user clicks on logout, the jwt token will be removed and on refresh user will have to login again.
- As mentioned earlier, user cannot buy books until they're authenticated and is logged into the site.

Challenges faced with solution:

- Faced difficulty in learning context API. But managed to catch onto it.
- CSS difficulties, the modal backdrop was not taking full height of website even on position: fixed and height: 100%. But fixed it using height in pixels and negative margins.
- Nested conditional statements were difficult to visualize, managed to implement it somehow.
- Passing props from child to parent component was difficult to understand.
- Most difficult thing was to get the final price of all the books from the cart and show it in the payment section's MRP. Had to make a separate context variable of array type.
- On plus and minus button click, the lending price changes and the array variable updates with the new book with new lending price. And after that the final price is calculated using reduce method in the payment section.
