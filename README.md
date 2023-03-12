# simplytasks.github.io

Welcome to the homepage for our CS 35L -- Intro to Software Construction -- group project, Winter 2023 at UCLA. The group members involved were Arteen Abrishami, Byron Karlen, Matthew Aboudi, Karim Amr, and Nakul Khambati. 

Our project was a task manager with the following features:
 - ability to add, highlight, remove tasks
 - ability to do the same for individual subtasks
 - ability to sort tasks by preferences
 - ability to manually sort tasks by drag-and-drop
 - ability to view tasks in a calender view
 
 The following segments of the app were implemented by each group member:
 
  - Arteen Abrishami: UI Design; Home Page; Log In Page; Create Account Page; Task Page with Task List and functionality to add, remove, highlight tasks; Subtasks for each individual task in Task List with add, remove, highlight functionality
  - Byron Karlen: Sort task button with ability to sort tasks by Time Added, Due Date, or by Highlight
  - Nakul Khambati: Calender heat-map view of tasks with different colors based on number of tasks due on any given date
  - Karim Amr: Drag-and-drop and manual sort functionality to enable user re-organization of tasks
  - Matthew Aboudi: Backend integration in order to allow user tasks to be individually stored and requested upon log in
  
  ## Run locally
  
  Simply perform the following commands in your terminal in sequence in order to set up the project to run locally:
  
  ```
 $ git clone https://github.com/simplytasks/simplytasks.github.io.git
  ````
  
  ```
  $ cd simplytasks.github.io/simply-tasks
  ```
  
  ```
  npm install && npm start
  ```
  
  The above assumes a POSIX-compliant [shell](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18), a local [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installation, and also a local [Node.js](https://nodejs.org/en/) installation.
  
  