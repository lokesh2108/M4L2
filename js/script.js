var $ = function(e){
    "use strict";
    return window.document.getElementById(e);
}


// CREATE AN ARRAY OF EMPLOYEES
let employeesarr = [
    [98765432, "Loki", 2232, "loki123@gmail.com", "Executive"],
    [92233451, "Hari", 8374, "hari435@gmail.com", "Engineering"],
    [64765344, "Monish", 2773, "monish233@gmail.com", "Marketing"],
    [93847671, "Adil", 6655, "adil288@gmail.com", "Administration "],
    [77774773, "Vijay", 8970, "vijay266@gmail.com", "Executive"]
]


// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('employees') !== null) {
    employeesarr = JSON.parse(localStorage.getItem('employees'))
}

// GET DOM ELEMENTS
let form        = $('addForm')
let employeeTable    = $('empTable')
let employeeCount    = $('empCount')


// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid()

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault()
    // GET THE VALUES FROM THE TEXT BOXES

    let empID       = parseInt($('id').value)
    let name     = $('name').value
    let ext    = parseInt($('extension').value)
    let email    = $('email').value
    let depart   = $('department').value

    let arrNewEmp = [empID, name, ext, email, depart]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employeesarr.push(arrNewEmp)
    // BUILD THE GRID
    buildGrid()
    // RESET THE FORM
    form.reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    form.id.focus()

});

// DELETE EMPLOYEE
employeeTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this employee details?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex;
            // REMOVE EMPLOYEE FROM ARRAY
            employeesarr.splice(rowIndex - 1, 1)
            // BUILD THE GRID
            buildGrid()
        }
    }
})

// BUILD THE EMPLOYEES GRID
function buildGrid() {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    employeeTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for (let employee of employeesarr) {
        tbody.innerHTML += 
        `
        <tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        </tr>
        `
    }
    // BIND THE TBODY TO THE EMPLOYEE TABLE
    employeeTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT
    employeeCount.value = `(${employeesarr.length})`
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', JSON.stringify(employeesarr))
}