const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.static('static'));

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

//--------------------------Utils--------------------------------------

function addNewTask(taskId, text, priority) {
  for (let i = 0; i < tasks.length - 1; i++) {
    if (tasks[i] === taskId) {
      pass;
    } else {
      let newTask = { taskId: taskId, text: text, priority: priority };
      tasks.push(newTask);
      return tasks;
    }
  }
  return tasks;
}

function editProiority(taskId, priority) {
  for (let i = 0; i < tasks.length - 1; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].priority = priority;
    } else {
      continue;
    }
  }
  return tasks;
}

function updateTask(taskId, text) {
  for (let i = 0; i < tasks.length - 1; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].text = text;
    } else {
      continue;
    }
  }
  return tasks;
}

function deleteTask(task, taskId) {
  return task.taskId != taskId;
}

function filterPriority(task, priority) {
  return task.priority === priority;
}

// --------------------------End Points--------------------------------

app.get('/tasks/add', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = req.query.priority;

  let results = addNewTask(taskId, text, priority);
  res.json({ tasks: results });
});

app.get('/tasks', (req, res) => {
  let allTasks = [];

  tasks.forEach((i) => {
    allTasks.push(i);
  });

  res.json({ tasks: allTasks });
});

app.get('/tasks/edit-priority', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let priority = req.query.priority;

  let result = editProiority(taskId, priority);
  res.json({ tasks: result });
});

app.get('/tasks/edit-text', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;

  let result = updateTask(taskId, text);
  res.json({ tasks: result });
});

app.get('/tasks/delete', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = tasks.filter((task) => deleteTask(task, taskId));

  res.json({ tasks: result });
});

app.get('/tasks/filter-by-priority', (req, res) => {
  let priority = parseInt(req.query.priority);
  let result = tasks.filter((task) => filterPriority(task, priority));

  res.json({ tasks: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
