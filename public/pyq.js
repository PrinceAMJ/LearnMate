// Updated subjects list
const subjects = [
  "SE",
  "OB",
  "DAA",
  "DSA",
  "IoT",
  "CN"
];

// Sample PYQ data for these subjects (example data)
const pyqs = {
  "SE": [
    { title: "Software Engineering EndSem 2018", pages: 4, size: "664 kb", file: "pdfs/SE_2018.pdf" },
    { title: "Software Engineering EndSem 2021", pages: 10, size: "555 kb", file: "pdfs/SE_2021.pdf" },
    { title: "Software Engineering EndSem 2022", pages: 7, size: "2.01 MB", file: "pdfs/SE_2022.pdf" },
    { title: "Software Engineering EndSem 2024_1", pages: 1, size: "206 kb", file: "pdfs/SE_2024_1.pdf" },
    { title: "Software Engineering EndSem 2024_2", pages: 6, size: "0.98 MB", file: "pdfs/SE_2024_2.pdf" }
  ],
  "OB": [
    { title: "Organizational Behaviour Exam 2023", pages: 10, size: "2.1 MB" },
    { title: "Organizational Behaviour Exam 2022", pages: 9, size: "1.9 MB" }
  ],
  "DAA": [
    { title: "DAA EndSem 2018", pages: 4, size: "1.0 MB", file: "pdfs/DAA_2018.pdf" },
    { title: "DAA EndSem 2019", pages: 4, size: "1.7 MB", file: "pdfs/DAA_2019.pdf" },
    { title: "DAA EndSem 2022", pages: 6, size: "1.5 MB", file: "pdfs/DAA_2022.pdf" },
    { title: "DAA EndSem 2023_1", pages: 4, size: "423 kb", file: "pdfs/DAA_2023_1.pdf" },
    { title: "DAA EndSem 2023_2", pages: 4, size: "402 kb", file: "pdfs/DAA_2023_2.pdf" }
  ],
  "DSA": [
    { title: "Data Structures and Algorithms 2023", pages: 13, size: "3.0 MB" },
    { title: "Data Structures and Algorithms 2022", pages: 12, size: "2.7 MB" }
  ],
  "IoT": [
    { title: "Internet of Things Exam 2023", pages: 8, size: "1.8 MB" },
    { title: "Internet of Things Exam 2022", pages: 7, size: "1.6 MB" }
  ],
  "CN": [
    { title: "Computer Networks EndSem 2018", pages: 4, size: "954 kb", file: "pdfs/CN_2018.pdf" },
    { title: "Computer Networks EndSem 2019", pages: 4, size: "1.15 MB", file: "pdfs/CN_2019.pdf"},
    { title: "Computer Networks EndSem 2022", pages: 4, size: "1.21 MB", file: "pdfs/CN_2022.pdf" },
    { title: "Computer Networks EndSem 2023", pages: 7, size: "605 kb", file: "pdfs/CN_2023.pdf" },
    { title: "Computer Networks EndSem 2024", pages: 4, size: "812 kb", file: "pdfs/CN_2024.pdf" }
  ]
};

const subjectSelect = document.getElementById("subjectSelect");
const selectedSubjectTitle = document.getElementById("selectedSubjectTitle");
const pyqList = document.getElementById("pyqList");
const emptyState = document.getElementById("emptyState");

// Populate subject dropdown
function populateSubjects() {
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });
}

// Render PYQs for selected subject
function renderPYQs(subjectName) {
  const subjectPYQs = pyqs[subjectName] || [];

  if (subjectPYQs.length === 0) {
    emptyState.style.display = "block";
    pyqList.innerHTML = "";
    pyqList.appendChild(emptyState);
    return;
  }

  emptyState.style.display = "none";
  pyqList.innerHTML = "";

  subjectPYQs.forEach((pyq) => {
    const pyqItem = document.createElement("div");
    pyqItem.className = "pyq-item";

    pyqItem.innerHTML = `
      <div class="pyq-item-left">
        <div class="pyq-icon-bg">
          <i">pdf</i>
        </div>
        <div class="pyq-info">
          <h4>${pyq.title}</h4>
          <div class="pyq-info-details">
            <span><i class="far fa-file-alt"></i> ${pyq.pages} pages</span>
            <span><i class="far fa-hdd"></i> ${pyq.size}</span>
          </div>
        </div>
      </div>
      <div class="pyq-actions">
        <a href="${pyq.file}" target="_blank" rel="noopener" class="pyq-button view" title="View PDF">
          <i >View</i>
        </a>
        <a href="${pyq.file}" class="pyq-button download" title="Download PDF">
          <i>Download</i>
        </a>
      </div>
    `;
    pyqList.appendChild(pyqItem);
  });
}

// Event listener for subject selection
subjectSelect.addEventListener("change", (e) => {
  const selected = e.target.value;
  selectedSubjectTitle.textContent = `${selected} PYQs`;
  renderPYQs(selected);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateSubjects();
});