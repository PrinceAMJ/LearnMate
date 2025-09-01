// To be replaced by your actual dashboard localStorage logic
const tasks = JSON.parse(localStorage.getItem("tasks")) || [
  // Example:
  // { name: "Calculus Chapter 3", progress: 75 }
];

// To be replaced by your actual dashboard localStorage logic
const weakSubjects = JSON.parse(localStorage.getItem("weakSubjects")) || [
  // Example:
  // { name: "Organic Chemistry", score: 58 }
];

const taskProgressList = document.getElementById("taskProgressList");
const emptyTasks = document.getElementById("emptyTasks");
const weakSubjectList = document.getElementById("weakSubjectList");
const emptySubjects = document.getElementById("emptySubjects");

// Render tasks
if (!tasks.length) {
  emptyTasks.style.display = "block";
  taskProgressList.innerHTML = "";
  taskProgressList.appendChild(emptyTasks);
} else {
  emptyTasks.style.display = "none";
  taskProgressList.innerHTML = "";
  tasks.forEach(task => {
    // Clamp task.progress between 0-100
    const percent = Math.min(Math.max(task.progress || 0, 0), 100);
    const div = document.createElement("div");
    div.className = "pyq-item";
    div.innerHTML = `
      <div class="pyq-item-left">
        <span class="pyq-icon-bg bg-green-100"><i class="fas fa-tasks"></i></span>
        <div class="pyq-info">
          <h4>${task.name}</h4>
          <div class="pyq-info-details"><span>${percent}% complete</span></div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:${percent}%;"></div>
          </div>
        </div>
      </div>
    `;
    taskProgressList.appendChild(div);
  });
}

// Render weak subjects
if (!weakSubjects.length) {
  emptySubjects.style.display = "block";
  weakSubjectList.innerHTML = "";
  weakSubjectList.appendChild(emptySubjects);
} else {
  emptySubjects.style.display = "none";
  weakSubjectList.innerHTML = "";
  weakSubjects.forEach(ws => {
    // Clamp ws.score between 0-100
    const percent = Math.min(Math.max(ws.score || 0, 0), 100);
    const div = document.createElement("div");
    div.className = "pyq-item";
    div.innerHTML = `
      <div class="pyq-item-left">
        <span class="pyq-icon-bg bg-red-100"><i class="fas fa-exclamation-triangle"></i></span>
        <div class="pyq-info">
          <h4>${ws.name}</h4>
          <div class="pyq-info-details"><span>Score: ${percent}%</span></div>
          <div class="progress-bar weak">
            <div class="progress-fill" style="width:${percent}%;background:#dc2626;"></div>
          </div>
        </div>
      </div>
    `;
    weakSubjectList.appendChild(div);
  });
}

// Style for progress bars (add to <head>)
(function injectBarStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e0e7ff;
      border-radius: 8px;
      margin: 8px 0 0 0;
      overflow: hidden;
    }
    .progress-bar.weak { background: #fee2e2; }
    .progress-fill {
      height: 100%;
      background: #4f46e5;
      border-radius: 8px;
      transition: width 0.6s cubic-bezier(.4,0,.2,1);
    }
  `;
  document.head.appendChild(style);
})();
