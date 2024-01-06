var socket = io();

var leave_submitBtn = document.querySelector(".leavesubmit");
leave_submitBtn.addEventListener("click", function () {
  console.log("clicked");
  const leaveDet = {};
  var Reason = document.getElementById("leave_reason");
  var FromTime = document.getElementById("leave_from");
  var ToTime = document.getElementById("leave_to");
  leaveDet.reason = Reason.value;
  leaveDet.from_time = FromTime.value;
  leaveDet.to_time = ToTime.value;
  console.log("Form Data:", leaveDet);
  socket.emit("leave", leaveDet);
  document.getElementById("leave_form").reset();
});

var late_submitBtn = document.querySelector(".latesubmit");
late_submitBtn.addEventListener("click", function () {
  console.log("clicked");
  const lateDet = {};
  var Reason = document.getElementById("late_reason");
  var FromTime = document.getElementById("late_from");
  var ToTime = document.getElementById("late_to");
  lateDet.reason = Reason.value;
  lateDet.from_time = FromTime.value;
  console.log(lateDet.from_time);
  lateDet.to_time = ToTime.value;
  console.log("Form Data:", lateDet);
  socket.emit("late", lateDet);
  document.getElementById("late_form").reset();
});

var user_edit_submitBtn = document.querySelector(".submit_use_edit");
user_edit_submitBtn.addEventListener("click", function () {
  console.log("clicked");
  const user_edit = {};

  // Get input fields by class
  let empNameInput = document.querySelector(".emp_name");
  let empEmailInput = document.querySelector(".emp_email");
  let empPhoneNumberInput = document.querySelector(".emp_ph_number");

  user_edit.empName = empNameInput.value;
  user_edit.empEmail = empEmailInput.value;
  user_edit.empPhoneNumber = empPhoneNumberInput.value;
  socket.emit("user-edit", user_edit);
});
