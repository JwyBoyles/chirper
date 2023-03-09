
Chirper is a website that is an attempt at recreating Twitter.

It uses React for the front-end and Firebase from Google to handle the back-end. Users are able to create accounts, upload profile pictures, post statuses, follow other users and interact to their posts. 

The back-end is set up so that when a user creates an account they are assigned a user ID. This user ID is how all information for the site is retrieved. For everything that a user uploads or changes, their ID is sent to the server and logged. This keeps track of everything that the user has done. This ID also retrieves all of the users account information. For example a user signs in and their ID is saved to their account state. From this piece of state it goes into various databases such as profile information, username, and images, and then uses the ID to get the correct information for that user. Pretty much all requests are only made with a User ID except for a select which are made with a Post ID. Such as when a user likes a post the website makes a request to the server using the Post ID to update it correctly.

The site is designed to be easily navigable with React Router. The app is divided into three main sections: A sidebar for navigation, the main body, and a sidebar for signing up and logging in. The two sidebars are always displayed on the screen at all times, while the body is dynamically rendered based on what section of the site the user navigates to. This is done by having all navigation done in one of the sidebars with the links to other sections always being on screen. In the main body there are also links to users profile to give the user more options for site navigation. 

Posting itself is designed to be very easy to do. The post button is always on screen located in the right sidebar. It has its own distinct color so that users will naturally notice it. All users have to do is click the button and a screen pops up that lets them create posts.

The post is then sent to the server where it is added to a list of all posts. This list is sent back to the application where it is turned into an array. From this array the main feed is created and put into the DOM. This array is also used to create other feeds such as a feed of a single user's posts or only posts from accounts that the user is following. This is done by filtering out any posts that don't contain the requested account IDs.

This site can be found at https://chirper-pi.vercel.app/

The current code base you are looking at is the exact same as the site except the API key has been removed to protect user privacy. If you would like to run this program on your own machine you will need to go to Firebase, create a project and then put your API key into the firebase.js file in the src code. You will also need to activate Firestore Database, Authentication, and Storage in the Firestore console. If you have questions about the site or running it please email me at Jwyboyles@gmail.com

