// Load tasks from localStorage (saved from Dashboard)
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const progressList = document.getElementById("progress-list");

let totalHours = 0;
let completed = 0;

tasks.forEach(task => {
  totalHours += task.hours || 0;
  completed += task.progress || 0;

  const div = document.createElement("div");
  div.classList.add("progress-item");
  div.innerHTML = `
    <div class="progress-header">
      <span>${task.subject}</span>
      <span>${task.hours || 0}h studied</span>
    </div>
    <div class="progress-bar">
      <div class="progress-fill" style="width: ${task.progress || 0}%"></div>
    </div>
    <div class="progress-footer">
      <span>${task.progress || 0}% complete</span>
    </div>
  `;
  progressList.appendChild(div);
});

// Update stats
document.getElementById("total-hours").innerText = totalHours + " hrs";
document.getElementById("subjects-covered").innerText = tasks.length;
document.getElementById("avg-progress").innerText =
  tasks.length ? Math.round(completed / tasks.length) + "%" : "0%";

// Charts
const lineCtx = document.getElementById('lineChart').getContext('2d');
new Chart(lineCtx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Study Hours',
      data: [2, 3, 4, 2, 5, 3, 4],
      borderColor: '#1abc9c',
      backgroundColor: 'rgba(26, 188, 156, 0.2)',
      fill: true,
      tension: 0.3
    }]
  }
});

const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
  type: 'bar',
  data: {
    labels: tasks.map(t => t.subject),
    datasets: [{
      label: 'Progress (%)',
      data: tasks.map(t => t.progress || 0),
      backgroundColor: '#3498db'
    }]
  },
  options: {
    scales: {
      y: { beginAtZero: true, max: 100 }
    }
  }
});
