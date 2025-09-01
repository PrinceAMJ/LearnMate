// List of subjects
const subjects = ["SE", "OB", "DAA", "DSA", "IoT", "CN"];

// Resource data for each subject
const resources = {
  "SE": [
    { type: "YouTube Playlist", title: "Gate Smashers SE Playlist", link: "https://www.youtube.com/playlist?list=PLqleLpAMfxGD_Qg0l8bKtiJzs0xA3xE8X" },
    { type: "Book", title: "Pressman - Software Engineering", link: "https://example.com/pressman-se-book" },
    { type: "PPT", title: "SE Basics Slides", link: "files/se_basics.pptx" },
    { type: "Notes", title: "SE Short Notes PDF", link: "files/se_notes.pdf" }
  ],
  "OB": [
    { type: "YouTube Playlist", title: "Nitin Sangwan OB", link: "https://www.youtube.com/playlist?list=PLobYWbsi2oe5DCl8dW_6pF7buXvCr8oDR" },
    { type: "Book", title: "Stephen Robbins - Organizational Behaviour", link: "https://example.com/ob-book" },
    { type: "PPT", title: "OB Concepts", link: "files/ob_concepts.pptx" },
    { type: "Notes", title: "OB Summary Notes", link: "files/ob_notes.pdf" }
  ],
  "DAA": [
    { type: "YouTube Playlist", title: "Abdul Bari DAA", link: "https://www.youtube.com/playlist?list=PLqleLpAMfxGDVwCiK9e1w7nEMzZGr8vmR" },
    { type: "Book", title: "Horowitz and Sahni - Fundamentals of Computer Algorithms", link: "https://example.com/daa-book" },
    { type: "PPT", title: "DAA PPTs", link: "files/daa_ppt.pptx" },
    { type: "Notes", title: "DAA Notes", link: "files/daa_notes.pdf" }
  ],
  "DSA": [
    { type: "YouTube Playlist", title: "Kunal Kushwaha DSA", link: "https://www.youtube.com/playlist?list=PLqleLpAMfxGAke4-Q9mMfJC_WzcQcBMyd" },
    { type: "Book", title: "Narasimha Karumanchi - DSA", link: "https://example.com/dsa-book" },
    { type: "Notes", title: "DSA Cheat Sheet", link: "files/dsa_notes.pdf" }
  ],
  "IoT": [
    { type: "YouTube Playlist", title: "Great Learning IoT", link: "https://www.youtube.com/playlist?list=PLqleLpAMfxGDA1RiWKX9BAKItgDZT75OD" },
    { type: "Book", title: "Arshdeep Bahga - Internet of Things", link: "https://example.com/iot-book" },
    { type: "PPT", title: "IoT Overview PPT", link: "files/iot_overview.pptx" }
  ],
  "CN": [
    { type: "YouTube Playlist", title: "Neso Academy Computer Networks", link: "https://www.youtube.com/playlist?list=PLqleLpAMfxGBlPX6-9g_txkWlEwXOgcT9" },
    { type: "Book", title: "Forouzan - Data Communications and Networking", link: "https://example.com/cn-book" },
    { type: "PPT", title: "CN Protocols", link: "files/cn_protocols.pptx" },
    { type: "Notes", title: "CN Handwritten Notes", link: "files/cn_notes.pdf" }
  ]
};

// UI element hooks
const subjectSelect = document.getElementById("subjectSelect");
const selectedSubjectTitle = document.getElementById("selectedSubjectTitle");
const resourceList = document.getElementById("resourceList");
const emptyState = document.getElementById("emptyState");

// Populate subject dropdown
function populateSubjects() {
  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    subjectSelect.appendChild(option);
  });
}

// Render resources for a selected subject
function renderResources(subjectName) {
  const subjectResources = resources[subjectName] || [];
  selectedSubjectTitle.textContent = `Resources for ${subjectName}`;
  if (subjectResources.length === 0) {
    emptyState.style.display = "block";
    resourceList.innerHTML = "";
    resourceList.appendChild(emptyState);
    return;
  }
  emptyState.style.display = "none";
  resourceList.innerHTML = "";

  subjectResources.forEach(resource => {
    const resDiv = document.createElement("div");
    resDiv.className = "pyq-item";

    let icon = "";
    switch(resource.type) {
      case "YouTube Playlist": icon = `<span class="pyq-icon-bg bg-green-100"><i class="fab fa-youtube"></i></span>`; break;
      case "Book": icon = `<span class="pyq-icon-bg bg-red-100"><i class="fas fa-book"></i></span>`; break;
      case "PPT": icon = `<span class="pyq-icon-bg bg-green-100"><i class="fas fa-file-powerpoint"></i></span>`; break;
      case "Notes": icon = `<span class="pyq-icon-bg bg-blue-100"><i class="fas fa-file-alt"></i></span>`; break;
      default: icon = `<span class="pyq-icon-bg"><i class="fas fa-link"></i></span>`;
    }

    resDiv.innerHTML = `
      <div class="pyq-item-left">
        ${icon}
        <div class="pyq-info">
          <h4>${resource.title}</h4>
          <div class="pyq-info-details">
            <span>${resource.type}</span>
          </div>
        </div>
      </div>
      <div class="pyq-actions">
        <a class="pyq-button view" href="${resource.link}" target="_blank">View</a>
      </div>
    `;
    resourceList.appendChild(resDiv);
  });
}

// Event listeners
subjectSelect.addEventListener("change", (e) => renderResources(e.target.value));

// Initialize
populateSubjects();
