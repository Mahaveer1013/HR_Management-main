let date = new Date();

let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let displayDate = currentDate + "/" + currentMonth + "/" + currentYear;

document.querySelector(".date").innerHTML = `Date : ${displayDate}`;

setInterval(() => {
  document.querySelector(
    ".time"
  ).innerHTML = `Time : ${new Date().toLocaleTimeString()}`;
}, 1000);

const toggle = document.querySelector(".toogle-sidebar");

toggle.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".main").classList.toggle("active");
});

let documentDelete = document.querySelector(".download-btn");

if (documentDelete) {
  documentDelete.addEventListener("click", function () {
    let confirmation = confirm("are you sure..?");

    if (confirmation) {
      document.querySelector(".model-footer").style.display = "none";
      html2canvas(document.querySelector(".notification-model")).then(
        (canvas) => {
          // Create an image and set its source to the canvas data
          var image = canvas.toDataURL("image/png");
          // Create a temporary link to trigger the download
          var tmpLink = document.createElement("a");
          tmpLink.download = "username.png"; // Set the download name
          tmpLink.href = image;

          // Temporarily add the link to the document and trigger the download
          document.body.appendChild(tmpLink);
          tmpLink.click();
          document.body.removeChild(tmpLink);
          document.querySelector(".model-footer").style.display = "flex";
        }
      );
    }
  });
}

let printBtn = document.querySelector(".print-btn");

if (printBtn) {
  printBtn.addEventListener("click", function () {
    window.print();
  });
}

const bell_btn = document.querySelector(".notification-btn");
const notifications_div = document.querySelector(".notifications");

bell_btn.addEventListener("click", () => {
  notifications_div.classList.toggle("active");
});

document.addEventListener('click', function (event) {
    const isNotificationButton = event.target.closest('.notification-btn');
    const isNotificationContainer = event.target.closest('.notifications');

    if (!(isNotificationButton || isNotificationContainer)) {
        notifications_div.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", function () {
  let all_downloads = document.querySelectorAll(".download");

  all_downloads.forEach((download) => {
    download.addEventListener("click", () => {
      let parent = download.parentElement.parentElement.parentElement;
      let table = parent.querySelector("table");

      // Convert the table to a worksheet
      let ws = XLSX.utils.table_to_sheet(table);

      // Create a workbook with a single worksheet
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Convert the workbook to an array buffer
      var wbArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Create a Blob from the array buffer
      var blob = new Blob([wbArrayBuffer], {
        type: "application/octet-stream",
      });

      // Trigger download using FileSaver.js
      let fileName = parent.querySelector(".frame-details").textContent.trim();
      saveAs(blob, `${fileName}.xlsx`);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var dropArea = document.getElementById("drop-area");
  var fileInput = document.getElementById("file");
  var actions = document.getElementById("file-actions");
  var cancelBtn = document.getElementById("cancel-btn");
  var fileNameDisplay = document.createElement("p");
  fileNameDisplay.id = "file-name-display";
  dropArea.appendChild(fileNameDisplay); // Add the file name display to the drop area

  // Function to update UI with file name
  function updateFileNameDisplay(file) {
    fileNameDisplay.innerHTML = file
      ? `Selected file: <strong>${file.name}</strong>`
      : "";
  }

  // Open file selector when clicked on the drop area
  dropArea.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    handleFileSelection(this.files);
  });

  dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropArea.classList.add("drag-over");
  });

  dropArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    dropArea.classList.remove("drag-over");
  });

  dropArea.addEventListener("drop", function (e) {
    e.preventDefault(); // Prevent the default action (open as link)
    dropArea.classList.remove("drag-over");
    handleFileSelection(e.dataTransfer.files);
  });

  cancelBtn.addEventListener("click", function () {
    clearFileInput();
  });

  function handleFileSelection(files) {
    if (files && files.length > 0) {
      var allowedFileTypes = ["xlsx", "xls", "csv"];
      var file = files[0];
      var fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedFileTypes.indexOf(fileExtension) === -1) {
        alert("Invalid file type. Please select a valid file.");
        clearFileInput();
        return;
      }

      // Manually set the files for the file input
      fileInput.files = files;

      updateFileNameDisplay(file);
      actions.style.display = "block";
    }
  }

  function clearFileInput() {
    fileInput.value = ""; // Clear the file input
    updateFileNameDisplay(null);
    actions.style.display = "none";
  }
});

let all_radios = document.querySelectorAll('input[type="radio"]');

all_radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    all_radios.forEach((rad) => {
      rad.parentElement.classList.remove("active");
    });
    if (radio.checked == true) {
      radio.parentElement.classList.add("active");
    }
  });
});

const upload_model = document.querySelector(".upload-model");
const uploadClose = document.querySelectorAll(".close-btn");

uploadClose.forEach((element) => {
  element.addEventListener("click", () => {
    element.parentElement.parentElement.style.display = "none";
  });
});

const upload_button = document.querySelector(".upload-option");

upload_button.addEventListener("click", () => {
  upload_model.style.display = "flex";
});

const delete_model= document.querySelector('.delete-model');
const delete_option = document.querySelector(".delete-option");

delete_option.addEventListener("click", () => {
  document.querySelector(".delete-model").style.display = "flex";
});

const edit_model = document.querySelector('.edit-model');
const edit_option = document.querySelector(".edit-option");

edit_option.addEventListener("click", () => {
  document.querySelector(".edit-model").style.display = "flex";
});


//to close section if clicked out of it
document.addEventListener('click', function (event) {
  const is_Side_Section = event.target.closest('.side-sections');
  const main_section =  event.target.closest('.main-section');

  if (is_Side_Section && !main_section) {
      const openSections = document.querySelectorAll('.side-sections[style="display: flex;"]');
      
      openSections.forEach(section => {
          section.style.display = 'none';
          console.log('closed open section');
      });
  }
});

let empArray = [];

function showSingleEmp() {
  document.querySelector(".single-form").style.display = "flex";
  document.querySelector(".table-container").style.display = "none";
  parseData.type = "single employee";

  all_checkbox.forEach((checkbox) => {
    checkbox.checked = false;
  });
  empArray = [];
  handleInfoHeader();
}

function showMultiEmp() {
  document.getElementById("empid").value = "";
  document.querySelector(".single-form").style.display = "none";
  document.querySelector(".table-container").style.display = "block";
  parseData.type = "multiple employee";
}

function handleInfoHeader() {
  let selectedCount = empArray.length;
  document.querySelector(".counter .tag").innerHTML = selectedCount;
}

function handleCheckbox(checkbox) {
  checkbox.click();
  empArray = [];
  all_checkbox.forEach((checkbox) => {
    if (checkbox.checked == true) {
      let value = checkbox.value;
      empArray.push(value);
    }
  });
  handleInfoHeader();
}

const deleteRows = document.querySelectorAll(
  ".delete-table .delete-table-body tr"
);
const all_checkbox = document.querySelectorAll(
  ".delete-table .delete-table-body tr input[type='checkbox']"
);
deleteRows.forEach((row) => {
  row.addEventListener("click", () => {
    let checkbox = row.querySelector("input[type='checkbox']");
    handleCheckbox(checkbox);
  });
});

all_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    handleCheckbox(checkbox);
  });
});

let selectCancel = document.querySelector(".delete-btns.cancel");

selectCancel.addEventListener("click", () => {
  all_checkbox.forEach((checkbox) => {
    checkbox.checked = false;
  });
  empArray = [];
  handleInfoHeader();
});

let inputDelete = document.querySelector(".delete-btns.submit");
let selectDelete = document.querySelector(".delete-btns.confirm");

inputDelete.addEventListener("click", () => {
  let input = document.getElementById("empid");
  if (input.value > 0) {
    empArray.push(input.value);
  } else {
    alert("empty input to delete user");
  }
});

selectDelete.addEventListener("click", () => {
  if (empArray.length <= 0) {
    alert("Select Atleast one Employee to delete..");
  }
});

function bringUserEdit() {
  fetch('/user_edit_data', {
      method: 'POST',
      body: 'hello',
  })
  .then(response => response.json()) // Adjust if the response is JSON
    .then(data => {
      console.log(data.data)
      // const dataArray = Array.isArray(data) ? data : [data];
      var edit_requests = document.querySelector('.edit-requests-body');
      edit_requests.innerHTML = ''
        data.data.forEach(user => {
          edit_requests.innerHTML += `<tr>
          <td>${user.id}</td>
          <td>${user.emp_id}</td>
          <td>${user.name}</td>
          <td>${user.data_type}</td>
          <td>${user.old_data}</td>
          <td>${user.new_data}</td>
          <td>
            <div class="action-btns">
              <input
                type="hidden"
                name="empid"
                id="empid"
                value="${user.emp_id}"
              />
              <button class="request-btns confirm-request" data-action="accept" data-id="${user.id}" data-emp-id="${user.emp_id}" data-name="${user.name}" data-data-type="${user.data_type}" data-old-data="${user.old_data}" data-new-data="${user.new_data}">
                <i class="fas fa-check"></i>Confirm
              </button>
              <button class="request-btns cancel-request" data-action="decline" data-id="${user.id}" data-emp-id="${user.emp_id}" data-name="${user.name}" data-data-type="${user.data_type}" data-old-data="${user.old_data}" data-new-data="${user.new_data}">
                <i class="fas fa-times"></i>Cancel
              </button>
            </div>
          </td>
        </tr>`;
        });
    })
  .catch(error => console.error('Error:', error));
}

edit_option.addEventListener("click", bringUserEdit);

document.body.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('request-btns')) {
    const action = target.dataset.action;
    const id = target.dataset.id;
    const emp_id = target.dataset.empId; // Note: Use camelCase for consistency
    const name = target.dataset.name;
    const data_type = target.dataset.dataType;
    const old_data = target.dataset.oldData;
    const new_data = target.dataset.newData;

    if (action === 'accept') {
      AcceptEdit(id, emp_id, name, data_type, old_data, new_data);
    } else if (action === 'decline') {
      DeclineEdit(id, emp_id, name, data_type, old_data, new_data);
    }
  }
});
 
function AcceptEdit(id, emp_id, name, data_type, old_data, new_data) {
  const data = {
    id: id,
    emp_id: emp_id,
    name: name,
    data_type: data_type,
    old_data: old_data,
    new_data: new_data,
  };
  fetch('/accept_edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json()) // Adjust if the response is JSON
    .then(data => {
      bringUserEdit();
    });
}

function DeclineEdit(id, emp_id, name, data_type, old_data, new_data) {
  const data = {
    id: id,
    emp_id: emp_id,
    name: name,
    data_type: data_type,
    old_data: old_data,
    new_data: new_data,
  };
  fetch('/decline_edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json()) // Adjust if the response is JSON
    .then(data => {
      bringUserEdit();
    });
}