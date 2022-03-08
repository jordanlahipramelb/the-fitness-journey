# Capstone 2 Proposal

My capstone 2 project will be an exercise database, along with a routine tracker and forum section. There are many people in the world who like/want to workout, ranging from beginners to advanced; some know what they’re doing, but some don’t. Users will be able to create an account; it will have information about what type of fitness they perform, a badge/karma system, and other basic user information. Users will be able to share their fitness knowledge with other users via post/comment system, as well as track/share their workout routines.

This application will be utilizing React and Node; focusing on an even full-stack design. It will also be developed with a responsive design in mind; dynamically changing from a website to a mobile screen size.
The users of my application will consist of users who want to learn how to perform exercises as well as track their workout routines. I plan on creating my own RESTful API with exercise data populated from the internet. I do need to secure user account information such as passwords.

The user will either log in or register for the application. Once logged in, the app will redirect the user to the main page which will be a feed of posts/workouts from users on the app. The user will be able to comment on these posts or provide a “thumbs up” for them. In the nav bar, the user will be able to click the exercise tab. This tab will consist of exercises in our database; name, equipment type, description, instructions, and image instructions. There will also be another tab which will direct to a link where the user will be able to log their workout, picking the exercises from our database.

My database schema will consist of numerous tables: exercises, routines, muscles, equipment, routines-exercises (lookup table consisting of list of which exercises are a part of which routine), logs (list of log entries for each routine and exercise), users, posts, and comments. I may run into problems of incorrect column types due to many columns referencing different tables.


**This looks good! I think you are ready to start**