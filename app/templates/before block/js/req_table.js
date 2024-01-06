socket = io();


function generateUrl(empId, empName, fromTime, toTime, reason, reqId, status, approved_by) {
    back_page = "${permission_type.lower()}_table";
    return (
      "{{ url_for('views.'+permission_type.lower()+'_req_profile') }}" +
      `?emp_id=${empId}&emp_name=${empName}&from_time=${fromTime}&to_time=${toTime}&reason=${reason}&req_id=${reqId}&status=${status}&approved_by=${approved_by}&back_page=${back_page}`
    );
}

  socket.on("${permission_type.lower()}", function (permission) {
    console.log("Received permission:", permission.emp_id);

    var currentDate = new Date().toLocaleDateString();
    var currentTime = new Date().toLocaleTimeString();
    var tbody = document.getElementById("${permission_type.lower()}-table");
    tbody.innerHTML += `
                          <tr>
                          <td>#${permission.emp_id}</td>
                          <td>${permission.emp_name}</td>
                          <td>${currentDate}</td>
                          <td>${currentTime}</td>
                          <td>${permission.from_time}</td>
                          <td>${permission.to_time}</td>
                          <td>${permission.reason}</td>
                          <td>${permission.status}</td>
                          <td>${permission.approved_by}</td>
                          <td><a href="${generateUrl(permission.emp_id,
                            permission.emp_name,
                            permission.from_time,
                            permission.to_time,
                            permission.reason,
                            permission.id,
                            permission.status,
                            permission.approved_by
                          )}">
                            <i class="fas fa-eye"></i>
                            </a>
                          </td>
                          </tr>
                      `;
    console.log("Received permission:", permission.emp_id);
  });
  const bell_btn = document.querySelector(".notification-btn");
  const notifications = document.querySelector(".notifications");
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
    const isNotificationButton =
      event.target.closest(".notification-btn");
    const isNotificationContainer =
      event.target.closest(".notifications");

    if (!(isNotificationButton || isNotificationContainer)) {
      notifications.classList.remove("active");
      console.log("Removed active class");
    }
  });

  bell_btn.addEventListener("click", () => {
    notifications.classList.toggle("active");
    console.log("Toggled active class");
  });
  function LategenerateSocketUrl(
    empId,
    empName,
    fromTime,
    toTime,
    reason,
    reqId,
    status,
    approved_by,
    socket_permission
  ) {
    var back_page = "${socket_permission}_table";
    return (
      `{{ url_for('views.late_req_profile') }}` +
      `?emp_id=${empId}&emp_name=${empName}&from_time=${fromTime}&to_time=${toTime}&reason=${reason}&req_id=${reqId}&status=${status}&approved_by=${approved_by}&back_page=${back_page}`
    );
  }
  function LeavegenerateSocketUrl(
    empId,
    empName,
    fromTime,
    toTime,
    reason,
    reqId,
    status,
    approved_by,
    socket_permission
  ) {
    var back_page = "${socket_permission}_table";
    return (
      `{{ url_for('views.leave_req_profile') }}` +
      `?emp_id=${empId}&emp_name=${empName}&from_time=${fromTime}&to_time=${toTime}&reason=${reason}&req_id=${reqId}&status=${status}&approved_by=${approved_by}&back_page=${back_page}`
    );
  }

  socket.on("late", function (late_permission) {
    console.log("Received late_permission:", late_permission.emp_id);
    const notifications = document.querySelector(".notifications");
    const notification_box =
      document.querySelector(".notification-box");

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
                    ${
                      late_permission.emp_name
                    } <a href="${LategenerateSocketUrl(
      late_permission.emp_id,
      late_permission.emp_name,
      late_permission.from_time,
      late_permission.to_time,
      late_permission.reason,
      late_permission.id,
      late_permission.status,
      late_permission.approved_by,
      "{{permission_type}}"
    )}"> <i class="fas fa-eye eye-icon"></i></a>
                </div>
                <div class="notification-message">
                    Late - ${late_permission.reason}
                </div>
            </div>
        </li>
                          `;
    countNotification();
    window.location.href = "";
  });

  socket.on("leave", function (leave_permission) {
    console.log(
      "Received leave_permission:",
      leave_permission.emp_id
    );
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
                    ${leave_permission.emp_name}-<a href="${LeavegenerateSocketUrl(
      leave_permission.emp_id,
      leave_permission.emp_name,
      leave_permission.from_time,
      leave_permission.to_time,
      leave_permission.reason,
      leave_permission.id,
      leave_permission.status,
      leave_permission.approved_by,
      "{{permission_type}}"
    )}"> <i class="fas fa-eye eye-icon"></i></a>
                </div>
                <div class="notification-message">
                    Leave - ${leave_permission.reason}
                </div>
            </div>
        </li>
                      `;
    countNotification();
    window.location.href = "";
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
