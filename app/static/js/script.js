console.log("script.js");
function updateClock() {
  let date = new Date();

  let currentDate = date.getDate();
  let currentMonth = date.getMonth() + 1; // Months are zero-based, so add 1
  let currentYear = date.getFullYear();

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (12 AM)

  let displayDate = `${currentDate}/${currentMonth}/${currentYear}`;
  let displayTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  if (document.querySelector(".date")) {
    document.querySelector(".date").innerHTML = `Date: ${displayDate}`;
  }

  if (document.querySelector(".time")) {
    document.querySelector(".time").innerHTML = `Time: ${displayTime}`;
  }
}

// Update the clock every second (1000 milliseconds)
setInterval(updateClock, 1000);

// Initial call to display the time immediately
updateClock();


// const notification_icon = document.querySelector(".notification-icon");

// notification_icon.addEventListener("click", ()=> {
//     document.querySelector(".notification-list").classList.toggle("active");
// });

const toggle = document.querySelector(".toogle-sidebar");

toggle.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".main").classList.toggle("active");
});





document.addEventListener("DOMContentLoaded", function () {
  console.log("downlaods");
  let all_downloads = document.querySelectorAll(".download");

  all_downloads.forEach(download => {
      download.addEventListener("click", () => {
          let parent = download.parentElement.parentElement.parentElement;
          let table = parent.querySelector('table');

          // Convert the table to a worksheet
          let ws = XLSX.utils.table_to_sheet(table);

          // Create a workbook with a single worksheet
          let wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

          // Convert the workbook to an array buffer
          var wbArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

          // Create a Blob from the array buffer
          var blob = new Blob([wbArrayBuffer], { type: 'application/octet-stream' });

          // Trigger download using FileSaver.js
          let fileName = parent.querySelector(".frame-details").textContent.trim();
          saveAs(blob, `${fileName}.xlsx`);
      });
  });
});

const upload_model = document.querySelector(".upload-model");
const uploadClose = document.querySelectorAll(".close-btn");

uploadClose.forEach(element => {
    element.addEventListener("click",()=>{
        element.parentElement.parentElement.style.display = "none";
    });
});

const upload_button = document.querySelector(".upload-option");

upload_button.addEventListener("click", ()=>{
    upload_model.style.display = "flex";
});

const delete_option = document.querySelector(".delete-option");

delete_option.addEventListener("click",()=>{
    document.querySelector(".delete-model").style.display = "flex";
});

const edit_option = document.querySelector(".edit-option");

edit_option.addEventListener("click",()=>{
    document.querySelector(".edit-model").style.display = "flex";
});