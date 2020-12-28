Hello there, and welcome to:
Teodor Jonasson's 3rd semester construction exam project.
Here is what you need to do, to start the project:

STEP 1: 
 - Create a localhosted database called 'portfolio_db'

STEP 2:
 - In the folder you will find 2 folders, 'portfolio front' and 'portfolio api'.
   open intelliJ and import 'portfolio api' folder. Then press build so it imports all dependencies.

STEP 3: 
 - Go into applocation.properties. at line 3, you need to update the url with your user and password ->
   spring.datasource.url=jdbc:mysql://YOUR_USER:YOUR_PASSWORD@localhost:3306/portfolio_db?serverTimezone=UTC&characterEncoding=UTF-8

STEP 4: 
 - Now you should be able to run the project in intelliJ and this creates the tables in you database.

STEP 5: 
 - Now open visual studio code and import 'portfolio front' folder. in terminal write npm install.

STEP 6:
 - Now write npm start in terminal. There is no data in the DB, but you can click the 'INIT DB' button, 
   and this will add some data to the database.

STEP 7:
 - Have fun. Im looking forward to hear your response. 
