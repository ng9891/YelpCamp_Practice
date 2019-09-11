# YelpCamp_Practice
Learning/Practicing Web Development following an 
[Udemy course](https://www.udemy.com/the-web-developer-bootcamp/) (MEAN Stack.)

I have also added couple of extra features to the website to learn more about the ExpressJS framework and to practice problems.
***
### To run:
```sh-session
    $ git clone https://github.com/ng9891/YelpCamp_Practice.git
    $ cd YelpCamp_Practice
    $ npm i
```
Before you run `npm start` you will need a `.env` file in the root folder
```code
// .env contains the following:
SESSION_SECRET = "your_session_secret"
CRYPTO_SECRET = "your_crypto_secret"
ADMIN_CODE ="your_admin_code"
MONGO_DB = "mongodb://localhost:27017/yelpcamp"
```
And finally run: `npm start` to run the server.

***
Dependencies used:
- ExpressJS
- MongoDB (mongoose)
- EJS
- Bootstrap 4
- Body-parser
- Method-Overwrite
- Express-session
- Passport
- Connect-Flash
- MomentJS
- Leaflet Map
- Helmet and CSurf

# TODO LIST:
  - [x] Display campgrounds
  - [x] Comments to campgrounds
  - [x] Session
  - [x] Login and Register
  - [x] CRUD routes for campgrounds
  - [x] CRUD routes for comments
  - [x] Admin user
  - [x] Date with MomentJS
  - [x] Footer
  - [x] Password Reset
  - [x] Include CRSF and XSS protection
  - [x] Landing Page
  - [ ] Camp geolocation
  - [ ] User Profile
  - [ ] Image Upload
  - [ ] Pagination
  - [ ] Fuzzy Search
  - [ ] Ratings (like button)