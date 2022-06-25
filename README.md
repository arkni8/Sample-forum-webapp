# Sample-forum-webapp
An app where you can submit posts/questions and votes your favors. You can also access user account settings too!

![Login page](/ScreenLogin.png)
The login page

![Landing page if logged in](/ScreenHomepage.png)
The homepage

![Comment Section](/ScreenComments.png)
The complete post and comments on the post

### Notable features and techs used :-

- Firebase as the backend
- Firebase Authentication for securing theee app
- Firebase Database (Firestore) for the database storage to save posts and users
- Structuring of database to minimize reads (and costs) on Firestore
- Likes and Dislikes implementation
- Post Submission
- Timestamps for all the posts and comments
- Comment Section for each post
- Paginate the comments for limiting the number of comments on each request thus saving data for users and read costs for us
- React router Routing for dynamic routing within different pages (like in settings) for optional rendering of different elements
- Use of Outlet and collecting all routes in 1 file

### Issues

- Likes and Dislikes are linked to display names. If a user changes the display name, all the user interface accent is ruined and votes 
are unlinked with the user. In future, only use UID to link any user to votes and comments.
This was done in the first place to save and optimise the read costs from DB. If we use UID, the names have to be fetched everytime.

### Possible future development

- Redo the whole database model to streamline the frontend and better access of data
- On changing the display name, all the duplicate (denormalised) data should be updated as well. Denormalised data is very normal in 
NoSQL database and they usually need to be updated on key value changes. As mentioned in the issue, using UID for storing data is important
because that stays constant at all time for a given user.
