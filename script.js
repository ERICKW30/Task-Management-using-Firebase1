firebase.initializeApp({
    apiKey: "AIzaSyCNx5kXI9sYel5wP1XxJG-9oHOWQo6ID8M",
    authDomain: "task-management-with-firebase.firebaseapp.com",
    projectId: "task-management-with-firebase",
    storageBucket: "task-management-with-firebase.appspot.com",
    messagingSenderId: "688550199354",
    appId: "1:688550199354:web:90fcca86828664e935f503"
  });
  
  const db = firebase.firestore();
  
  function addTask() {
      const taskInput = document.getElementById("task-input");
      const task = taskInput.value.trim();
      if (task !== "") {
          db.collection("tasks").add({
              task: task,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
          taskInput.value = "";
          console.log("Task added.");
      }
  }
  
  function renderTasks(doc) {
      const taskList = document.getElementById("task-list");
      const taskItem = document.createElement("li");
      taskItem.className = "task-item";
      taskItem.innerHTML = `
        <span>${doc.data().task}</span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
      `;
      taskList.appendChild(taskItem);
  }
  
  db.collection("tasks")
      .orderBy("timestamp", "desc")
      .onSnapshot(snapshot => {
          const changes = snapshot.docChanges();
          changes.forEach(change => {
              if (change.type === "added") {
                  renderTasks(change.doc);
              }
          });
      });
  
  function deleteTask(id) {
      db.collection("tasks").doc(id).delete();
  }
  