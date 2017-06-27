# apt-maintenance-account (client side / frontend)
Apartment Maintenance Account is a web application:  
1. To track the amount collected and expended towards maintenance of flats in the apartment complex  
2. To ensure any time access to transaction details  
3. To enable transparency  
4. To simplify data entries  

## Tools/Frameworks used:  
Angular	framework		  - for client side coding (a.k.a. Front End Coding),  
RBAC feature		      - for Authorization - Access modules in Application with Role Based Access Control,  
Karma, Jasmine tools	- for Unit Testing (still in development)  

## Demo
For a demo of this application, please visit [demo](http://eastgate.in/apt-maint-acct-demo).  
(A guest user id and password are preset; just click on Submit button; it has read-only permissions)  

## Installations (for backend refer [here](https://github.com/mohankumaranna/apt-maintenance-account-backend))
_Step 1:_  Clone or Download this front-end application into a folder
_Step 2:_  `npm install`  
_Step 3:_  Make necessary updates in the environment files, such as API_URL.  
_Step 4:_  `ng build --prod -bh '/my-apt/'`. It creates 'dist' folder with deployable files.
_Step 5:_  Copy this 'dist' folder into your hosting site and rename it to 'my-apt' or whatever name selected in the previous step.
_Step 6:_  Go to host url, say http://www.myhost.com/my-apt.  It show the home page of this application.

## License
MIT
