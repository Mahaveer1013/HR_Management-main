const bell_btn = document.querySelector(".notification-btn");
      const notifications = document.querySelector(".notifications");
      // let count = Array.from(notifications.children).filter(element => !element.classList.contains('notification-box'))
      // .length;
      const all_notifications = notifications.querySelectorAll("li");
      function countNotification() {
        let count = notifications.childElementCount;
        if (count > 9) {
          count = "9+";
        }
        all_notifications.forEach((element) => {
          if (element.getAttribute("data-display") == "none") {
            parseInt(count--);
          }
        });
        document.querySelector(".count").innerHTML = count;
      }

      countNotification();

      document.addEventListener("click", function (event) {
        const isNotificationButton = event.target.closest(".notification-btn");
        const isNotificationContainer = event.target.closest(".notifications");

        if (!(isNotificationButton || isNotificationContainer)) {
          notifications.classList.remove("active");
          console.log("Removed active class");
        }
      });

      bell_btn.addEventListener("click", () => {
        notifications.classList.toggle("active");
        console.log("Toggled active class");
      });

      const socket = io();
      socket.on("late", function (late_permission) {
        console.log("Received late_permission:", late_permission.emp_id);
        const notifications = document.querySelector(".notifications");

        if (document.querySelector(".notification-box")) {
          const default_notification =
            document.querySelector(".notification-box");
          default_notification.style.display = "none";
          default_notification.disabled = true;
        }
        notifications.innerHTML += `
                  <li class="notification-box">
                      <div class="profile">
                          <img src="icon/default.jpeg" alt="default user">
                      </div>
                      <div class="notification-details">
                          <div class="notification-user-name">
                              ${late_permission.emp_name} <a href="{{ url_for('views.late_req_profile',
                    emp_id=late_permission.emp_id,
                    emp_name=late_permission.emp_name,
                    from_time=late_permission.from_time,
                    to_time=late_permission.to_time,
                    reason=late_permission.reason,
                    req_id=late_permission.id,
                    backpage='admin')}}"> <i class="fas fa-eye eye-icon"></i></a>
                          </div>
                          <div class="notification-message">
                              Late - ${late_permission.reason}
                          </div>
                      </div>
                  </li>
                                `;
        countNotification();
        location.reload();
      });

      socket.on("leave", function (leave_permission) {
        console.log("Received leave_permission:", leave_permission.emp_id);
        const notifications = document.querySelector(".notifications");

        if (document.querySelector(".notification-box")) {
          const default_notification =
            document.querySelector(".notification-box");
          default_notification.style.display = "none";
          default_notification.disabled = true;
        }

        notifications.innerHTML += `
                  <li class="notification-box">
                      <div class="profile">
                          <img src="icon/default.jpeg" alt="default user">
                      </div>
                      <div class="notification-details leave-notification">
                          <div class="notification-user-name">
                              ${leave_permission.emp_name}-<a href="{{ url_for('views.leave_req_profile',
                              permission='leave',
                                             emp_id=leave_permission.emp_id,
                                             emp_name=leave_permission.emp_name,
                                             from_time=leave_permission.from_time,
                                             to_time=leave_permission.to_time,
                                             reason=leave_permission.reason,
                                             req_id=leave_permission.id,
                                             backpage='admin',)}}"> <i class="fas fa-eye eye-icon"></i></a>
                          </div>
                          <div class="notification-message">
                              Leave - ${leave_permission.reason}
                          </div>
                      </div>
                  </li>
                                `;
        countNotification();
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
          e.preventDefault();
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

      // const upload_model = document.querySelector(".upload-model");
      // const uploadClose = document.querySelector(".close-btn");

      // uploadClose.addEventListener("click", () => {
      //   upload_model.style.display = "none";
      // });

      // const upload_button = document.querySelector(".upload-option");

      // upload_button.addEventListener("click", () => {
      //   upload_model.style.display = "flex";
      // });

      if (document.querySelector(".download-btn")) {
        document
          .querySelector(".download-btn")
          .addEventListener("click", function () {
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
                  document.querySelector(".model-footer").style.display =
                    "flex";
                }
              );
            }
          });
      }
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

      function submitForm() {
        var form = document.getElementById("deleteForm");
        var checkboxes = form.querySelectorAll('input[name="select"]:checked');

        if (checkboxes.length > 0) {
          form.submit();
        } else {
          alert("Please select at least one employee to delete.");
        }
      }


const all_rows = document.querySelectorAll(".today-attendance-table tbody tr");
const all_shiftDisplay = document.querySelectorAll(".currentShift");

let shiftSelect = document.getElementById("shift");

shiftSelect.addEventListener("change", () => {
  let shift = shiftSelect.value;
  if (shift == "" || shift.lenght <= 0) {
    let currentShift = getCurrentShift();
    filter(currentShift);
  } else {
    filter(shift.toLowerCase());
  }
});

function filter(currentShift) {
  all_rows.forEach((row) => {
    if (currentShift == row.getAttribute("data-shift").toLowerCase()) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });

  all_shiftDisplay.forEach((display) => {
    display.children[0].innerHTML = currentShift.toUpperCase();
  });
}

function getCurrentShift() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 6 && currentHour < 14) {
    return "a";
  } else if (currentHour >= 14 && currentHour < 22) {
    return "b";
  } else {
    return "c";
  }
}

const currentShift = getCurrentShift();
filter(currentShift);

// let empArray = [1,2,3,4,5];
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

selectDelete.addEventListener("click", (e) => {
  e.preventDefault();
  if (empArray.length <= 0) {
    alert("Select Atleast one Employee to delete..");
  }
});
