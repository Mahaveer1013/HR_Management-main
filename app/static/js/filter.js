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
