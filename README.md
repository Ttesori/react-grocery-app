# GroceryMapper: Smarter Grocery Shopping

![screenshot of GroceryMapper home page](https://grocerymap.app/img/gm-screenshot.png)

GroceryMapper is a web application which allows users to streamline their grocery shopping by putting their list in the order they shop. Users create a 'map' of their local stores, putting the sections of the store in the order that they shop, and then each time they make a list it is put in order so they don't forget anything!

**Link to project:** https://grocerymap.app

## How It's Made:

**Tech used:** React, Firebase, HTML, CSS, Tailwind

This application was built with a React front-end, implementing a design created in Adobe xD. The styles were created with Tailwind, utilizing a strategy of primarily using @apply to apply the desired classes from within an external stylesheet.

The user authentication and database systems are provided by Firebase. User authentication options include local, Twitter login and Google login.The Firestore database allows persistence of the stores and lists the user creates.

# Features:

- Users can create, edit and delete stores
- Stores can only be deleted if they have no lists
- Users can create, edit and delete lists
- Users can email lists to a friend and view them on any device without being logged in
- Items on the list can be checked off while the user shops and, if they are logged in, this persists to the database
- Users can change the store a list belongs to if they decide to shop elsewhere, and the list is reordered automatically
- Local, Twitter, and Google user authentication
- Reset Password capability

## Lessons Learned:

- How to work with drag-and-drop lists using react-beautiful-dnd
- How to manage both local and production databases with Firebase, including setting the proper security rules for Firestore in production
- How to implement non-local authentication providers (Twitter and Google in this case)
- How and when to implement a loading state
- Implementing and managing alerts
- Implementing modals
- The importance of using a \_redirects file so Netlify can properly utilize react-router-dom
- My preference for keeping pages and components separate
- The challenges of using props to pass down application-level state

## Additional Feature/Optimization Ideas:

- State is currently passed down through props. I would like to refactor this to use the useContext/useReducer hooks instead.
- I would like to add additional details to the desktop design, including a preview of the list items.
- Implementing automated tests throughout the application
