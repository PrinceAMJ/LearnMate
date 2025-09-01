// Subjects list (same as PYQ page for consistency)
const subjects = [
  "SE",
  "OB",
  "DAA",
  "DSA",
  "IoT",
  "CN"
];

// Sample study plans data with file paths (jpg or pdf)
const studyPlans = {
  "SE": [
    {
      title: "Software Engg Study Plan 2023",
      type: "pdf",
      size: "1.5 MB",
      file: "study-plans/software_engg_plan_2023.pdf"
    },
    {
      title: "Software Engg Overview",
      type: "jpg",
      size: "800 KB",
      file: "study-plans/software_engg_overview.jpg"
    }
  ],
  "OB": [
    {
      title: "Org Behaviour Study Plan 2023",
      type: "pdf",
      size: "1.2 MB",
      file: "study-plans/org_behaviour_plan_2023.pdf"
    }
  ],
  "DAA": [
    {
      title: "DAA Study Plan Image",
      type: "jpg",
      size: "900 KB",
      file: "study-plans/daa_plan.jpg"
    }
  ],
  "DSA": [],
  "IoT": [],
  "CN": []
};

const subjectSelect = document.getElementById("subjectSelect");
const selectedSubjectTitle = document.getElementById("selectedSubjectTitle");
const planList = document.getElementById("planList");
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

// Render study plans for selected subject
function renderPlans(subjectName) {
  const plans = studyPlans[subjectName] || [];

  if (plans.length === 0) {
    emptyState.style.display = "block";
    planList.innerHTML = "";
    planList.appendChild(emptyState);
    return;
  }

  emptyState.style.display = "none";
  planList.innerHTML = "";

  plans.forEach((plan) => {
    const planItem = document.createElement("div");
    planItem.className = "pyq-item";

    // Icon depends on file type
    const iconClass = plan.type === "pdf" ? "fas fa-file-pdf" : "fas fa-image";
    const iconBgColor = plan.type === "pdf" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600";

    planItem.innerHTML = `
      <div class="pyq-item-left">
        <div class="pyq-icon-bg ${iconBgColor}">
          <i class="${iconClass}"></i>
        </div>
        <div class="pyq-info">
          <h4>${plan.title}</h4>
          <div class="pyq-info-details">
            <span><i class="far fa-file-alt"></i> ${plan.size}</span>
          </div>
        </div>
      </div>
      <div class="pyq-actions">
        <a href="${plan.file}" target="_blank" rel="noopener" class="pyq-button view" title="View">
          <i class="fas fa-eye"></i>
        </a>
        <a href="${plan.file}" download class="pyq-button download" title="Download">
          <i class="fas fa-download"></i>
        </a>
      </div>
    `;
    planList.appendChild(planItem);
  });
}

// Event listener for subject selection
subjectSelect.addEventListener("change", (e) => {
  const selected = e.target.value;
  selectedSubjectTitle.textContent = `${selected} Study Plans`;
  renderPlans(selected);
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateSubjects();
});