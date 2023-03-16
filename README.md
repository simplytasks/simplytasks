# [simplytasks.github.io](https://github.com/simplytasks/simplytasks.github.io)

Welcome to the homepage for our CS 35L -- Intro to Software Construction -- group project, Winter 2023 at UCLA. The group members involved were Arteen Abrishami, Byron Karlen, Matthew Aboudi, Karim Amr, and Nakul Khambhati. 

Our project was a task manager with the following features:
 - ability to store user accounts with individual task lists on backend
 
 - within each user account:
   - ability to add, highlight, remove tasks
   - ability to do the same for individual subtasks
   - ability to sort tasks by preferences
   - ability to manually sort tasks by drag-and-drop
   - ability to view tasks in a calender view
 
 The following segments of the app were implemented by each group member:
 
  - Arteen Abrishami: 
    - UI Design
    - Home Page
    - Log In Page
    - Create Account Page
    - Task Page with Task List and functionality to add, remove, highlight tasks
    - Subtasks for each individual task in Task List with add, remove, highlight functionality
    - Fully functional backend implementation using JSON-Server with Node.js to serve dynamic updates to users/tasks/subtasks
  - Byron Karlen
    - Sort task button with ability to sort tasks by Time Added, Due Date, or by Highlight
  - Nakul Khambhati
    - Calendar heat-map view of tasks with different colors based on number of tasks due on any given date
  - Karim Amr
    - Drag-and-drop and manual sort functionality to enable user re-organization of tasks
  - Matthew Aboudi
    - Partially functional Firebase backend -- able to store tasks/users but not subtasks
  
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
  Make sure that the development environment is not running on port 3002. Also, make sure no other process is using port 3002. One way to do this would be:
  ```
  kill -9 $(awk '{print $2}' <(lsof -i :3002) | grep '[0-9]')
  ```
  Then, in a separate terminal, within the `simply-tasks` directory, run the following:
  ```
  npm run server
  ```
  to run the server concurrently with the development environment in order to track state changes to users and user task lists and serve the necessary dynamic data for correct frontend functionality.
  
  The above assumes a POSIX-compliant [shell](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html#tag_18), a local [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) installation, and also a local [Node.js](https://nodejs.org/en/) installation.
  
  
