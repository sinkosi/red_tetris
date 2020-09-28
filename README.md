# Red Tetris <!-- omit in toc -->
----------
 This project is about creating a dating website.
 
  ![Tetris Gameplay Page](docs/../frontend/build/../public/img192.png)

- [Introduction](#introduction)
- [Objectives](#objectives)
- [Mandatory](#mandatory)
- [How To Use](#how-to-use)
  - [Running Back-End](#running-back-end)
  - [Running Front-End](#running-front-end)
- [Further Reading](#further-reading)
- [Contributors](#contributors)
  
 ## Introduction
 The purpose of this project is to create an app allowing two potential lovers to meet, from the registration to the final encounter.
 A user will then be able to register, connect, fill his/her profile, search and look into the profile of other users, like them, chat with those that “liked” back.

 ## Objectives
 This web project is challenging you to create a dating app.

 ## Mandatory
Your website should have a decent page layout (meaning at least a header, a main section and a footer), be able to display correctly on mobile devices and have an adapted layout on small resolutions.
All your forms should have correct validations and the whole site should be secured.
This point is MANDATORY and shall be verified when your application would be evaluated. To have an idea, here are some stuff that is NOT considered as SECURE:
* Store plain or unencrypted passwords in the database.
* Offer the ability to inject HTML or “user” JavaScript in badly protected variables.
* Offer the ability to upload unwanted content on the server.
* Offer the possibility of altering an SQL query.
* Use an extern form to manipulate so-called private data

The application should allow a user to sign up by asking at least a valid email
address, an username and a password with at least a minimum level of complexity.
* At the end of the registration process, an user should confirm his account via a
unique link sent at the email address fullfiled in the registration form.
* The user should then be able to connect to your application, using his username
and his password. He also should be able to tell the application to send a password
reinitialisation mail, if he forget his password.
* The user should be able to disconnect in one click at any time on any page.
* Once connected, an user should modify his username, mail address or password.

## How To Use

* Use your favourite apache or Nginx server to host the server.
* Ensure your mail server is active, this application sends confirmation emails to 
    - activate accounts
    - reset passwords
    - update details
    - notify of comments & likes
### [Running Back-End](api/README.md)

Details on How to get the get the [NodeJS on the Backend](api/README.md) to start running 
including MySQL Database is included inside the 'api' folder.

### [Running Front-End](UI/README.md)

The front-end and the backend must be running concurrently in separate instances. You must keep port 3000
and port 5000 free.

If you wish to get the [Front-End](frontend/README.md) running, check the document in the UI Folder.

## Further Reading

[Documentation](docs/documentation.pdf)
<!-- omit in toc -->
## FINAL MARK /100

- [x] Simple Launch of Server
- [x] User Account Creation
- [x] User Account Confirmation Requirement
- [x] Complete Profile
- [x] Matching Algorithm
- [x] Profile Search
- [x] Search By Filter
- [x] Sorting While Filtering
- [x] Geolocation
- [x] Popularity & Rating System
- [ ] Notifications
- [x] See who viewed your profile
- [x] View another user's profile
- [x] Last Seen
- [x] Block Account
- [x] Chat
- [x] Browser Compatibility
- [x] Mobile Phone Adaptation
- [x] Security (Passwords / CSRF / SQL Injection)
- [ ] BONUS

## Contributors

<!-- ![Mosima Mamaleke](api/uploads/default.png){:height="50%" width="50%"} ![Sibonelo Nkosi](api/uploads/default.png){:height="50%" width="50%"} -->

[Mosima Mamaleke](www.gihub.com/mmamalek)

[Sibonelo Nkosi](www.github.com/sinkosi)