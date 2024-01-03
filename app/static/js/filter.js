const all_rows = document.querySelectorAll(".today-attendance-table tbody tr");
const all_shiftDisplay = document.querySelectorAll(".currentShift");
console.log(all_shiftDisplay);

let shiftSelect = document.getElementById("shift");

shiftSelect.addEventListener("change",()=>{
    let shift = shiftSelect.value;
    if (shift == "" || shift.lenght <= 0) {
        let currentShift = getCurrentShift();
        filter(currentShift)
    }else{
        filter(shift.toLowerCase());
    }
    

})

function filter(currentShift){
    all_rows.forEach(row => {

        if ((currentShift) == (row.getAttribute("data-shift").toLowerCase())) {
            row.style.display = "";
        }else{
            row.style.display = "none";
        }
    });

    all_shiftDisplay.forEach(display => {
        display.querySelector(".tag").innerHTML = currentShift.toUpperCase();
        console.log(display);
    });
}

function getCurrentShift() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour < 14) {
        return '8a';
    } else if (currentHour >= 14 && currentHour < 22) {
        return '8b';
    } else {
        return '8c';
    }
}

const currentShift = getCurrentShift();
filter(currentShift);

const deleteRows = document.querySelectorAll(".delete-table .delete-table-body tr");

deleteRows.forEach(row => {
    row.addEventListener("click",()=>{
        
    })
});