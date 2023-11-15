let totalIncome = 0;
let totalExpense = 0;
let balance = 0;
var rowCount = 0;

var iSubmitJS = document.getElementById("iSubmit");
var eSubmitJS = document.getElementById("eSubmit");
var listJS = document.getElementById("list");

let iSourceErrorJS = document.getElementById("iSourceError");
let iAmountErrorJS = document.getElementById("iAmountError");
let eCategoryErrorJS = document.getElementById("eCategoryError");
let eAmountErrorJS = document.getElementById("eAmountError");

iSubmitJS.addEventListener("click", function (event) {
  // Get input values
  let iSourceJS = document.querySelector("#iSource").value.trim().toUpperCase();
  let iAmountJS = parseFloat(document.querySelector("#iAmount").value);

  var iSErrorCount = 0;
  var iAErrorCount = 0;

  // Validate source input
  if (
    iSourceJS === "" ||
    iSourceJS.length < 3 ||
    /\d/.test(iSourceJS) ||
    /[@?]{3,}/.test(iSourceJS)
  ) {
    iSourceErrorJS.innerHTML = "You have to enter at least 3 letters";
    iSErrorCount = 1;
  }

  // Validate amount input
  if (isNaN(iAmountJS) || iAmountJS < 0) {
    iAmountErrorJS.innerHTML = "You have to enter a valid amount";
    iAErrorCount = 1;
  }

  // If there are errors, prevent form submission
  if (iSErrorCount === 1 || iAErrorCount === 1) {
    event.preventDefault();
    return;
  }
  // Reset error messages
  iSourceErrorJS.innerHTML = "";
  iAmountErrorJS.innerHTML = "";

  // Continue with adding the row
  document.getElementById("quote").style.display = "none";
  document.getElementById("ieList").style.display = "block";
  document.querySelector("#chartContainer").style.display = "block";

  // Insert new row
  var newRow = listJS.insertRow();
  newRow.style.color = "green";

  var column1 = newRow.insertCell(0);
  var column2 = newRow.insertCell(1);
  var column3 = newRow.insertCell(2);

  column1.innerHTML = ++rowCount;
  column2.innerHTML = iSourceJS;
  column3.innerHTML = iAmountJS;

  // Update totals and chart
  totalIncome += iAmountJS;

  calculateBalance();
  chartAdd();

  // Clear input fields
  document.getElementById("iSource").value = "";
  document.getElementById("iAmount").value = "";
});

eSubmitJS.addEventListener("click", function (event) {
  // Get input values
  let eCategoryJS = document
    .querySelector("#eCategory")
    .value.trim()
    .toUpperCase();
  let eAmountJS = parseFloat(document.querySelector("#eAmount").value);

  var eCErrorCount = 0;
  var eAErrorCount = 0;

  // Validate source input
  if (
    eCategoryJS === "" ||
    eCategoryJS.length < 3 ||
    /\d/.test(eCategoryJS) ||
    /[@?]{3,}/.test(eCategoryJS)
  ) {
    eCategoryErrorJS.innerHTML = "You have to enter at least 3 letters";
    eCErrorCount = 1;
  }

  // Validate amount input
  if (isNaN(eAmountJS) || eAmountJS < 0) {
    eAmountErrorJS.innerHTML = "You have to enter a valid amount";
    eAErrorCount = 1;
  }

  // If there are errors, prevent form submission
  if (eCErrorCount === 1 || eAErrorCount === 1) {
    event.preventDefault();
    return;
  }
  // Reset error messages
  eCategoryErrorJS.innerHTML = "";
  eAmountErrorJS.innerHTML = "";

  // Continue with adding the row
  document.getElementById("quote").style.display = "none";
  document.getElementById("ieList").style.display = "block";
  document.querySelector("#chartContainer").style.display = "block";

  // Insert new row
  var newRow = listJS.insertRow();
  newRow.style.color = "red";

  var column1 = newRow.insertCell(0);
  var column2 = newRow.insertCell(1);
  var column3 = newRow.insertCell(2);

  column1.innerHTML = ++rowCount;
  column2.innerHTML = eCategoryJS;
  column3.innerHTML = eAmountJS;

  // Update totals and chart
  totalExpense += eAmountJS;
  calculateBalance();
  chartAdd();

  // Clear input fields
  document.querySelector("#eCategory").value = "";
  document.querySelector("#eAmount").value = "";
});

function calculateBalance() {
  balance = totalIncome - totalExpense;
  document.getElementById("tBalance").innerHTML = balance;
  document.getElementById("tExpence").innerHTML = totalExpense;
}

function chartAdd() {
  var xValues = ["Income", "Balance", "Expense"];
  var yValues = [totalIncome, balance, totalExpense];
  var barColors = ["green", "blue", "red"];

  new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "",
      },
    },
  });
}
