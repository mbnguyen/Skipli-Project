# Skipli-Project

Project: Skipli Project
Description: This programs simulate the verifying phone number process.
             Using React Node.js for front end.
             Using Express for back end.
             Using Firebase Firestore for database.
             Using Twilio for texting.
Programmer: Minh Nguyen

# How to run (MacOS)

1. Navigate to the project folder after downloaded.

2. Install create react app. Please read the README_CREATE_REACT_APP.md
  
3. Install express for the back end.
  
        npm install express --save
  
        npm install cors
  
4. Install nodemon to run the back end.
  
        npm install -g nodemon
  
5. Install twilio to send sms.
  
        npm install twilio
  
6. Install Firebase FireStore for database.
  
        npm install --save firebase
  
        npm install firebase-admin --save
  
7. Navigate to the sever folder.
  
        cd src/sever
  
8. Copy the credential files for FireStore and Twilio into the sever folder (not available on public).

9. Export the Google credential file using command:
  
        export GOOGLE_APPLICATION_CREDENTIALS="[Directory to the project]/src/server/[name of the credential json file]"

10. Run the BackEnd.js using nodemon.
  
        nodemon BackEnd.js
  
11. Run the project, and follow the instruction on screen.

Thank you.
  
  
                

  
  

  
