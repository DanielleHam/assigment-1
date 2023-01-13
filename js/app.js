window.onload = function () {
  getComputers();
};

let allComputers;
let chosenComputer;
let balance = 0;
let salary = 0;
let loan = 0;

async function getComputers() {
  let res = await fetch("https://hickory-quilled-actress.glitch.me/computers");

  let computers = await res.json();
  allComputers = computers; // put all the fetched computers to a global variable
  //set a variable for the HTML to insert
  let options = "";

  for (let computer of computers) {
    let title = computer.title;
    let id = computer.id;
    // crate an option element for each computer
    options += `<option value="${id}">${title}</option>`;
  }
  // add the options to the select
  document.getElementById("computerName").innerHTML = options;
  // add the base balance to html
  document.getElementById("balance").innerText =
    Intl.NumberFormat().format(balance);
  //add base salary to html
  document.getElementById("workPay").innerText =
    Intl.NumberFormat().format(salary);
  // call the function to add the information abut the computer
  features();

  return computers;
}

const checkLoan = () => {
  // get the input from user
  let loanSum = document.getElementById("askedLoan").value;
  // check if input is more then double the balance
  if (loanSum > balance * 2) {
    // if it is you can't take a loan
    alert(
      "to high loan. can only be 2 times the amount on balance. so no higher then " +
        balance * 2
    );
    //take away to get loan button in the modal so user can't press it
    document.getElementById("getLoanButton").style.display = "none";
  } else {
    // display the button for user to apply for a loan
    document.getElementById("getLoanButton").style.display = "block";
  }
};

const getALoan = () => {
  // get the value the user puts in for the desired amount
  let loanSum = document.getElementById("askedLoan").value;
  //reset the input after
  document.getElementById("askedLoan").value = "";
  //set the loan to the desired amount
  loan = Number(loanSum);
  //add the loan to the balance
  balance = balance + loan;

  document.getElementById("repayLoanButton").style.display = "block";
  document.getElementById("modal").style.display = "none";

  document.getElementById("loanSum").style.display = "flex";
  document.getElementById("LoanBalance").innerText =
    Intl.NumberFormat().format(loan);
  document.getElementById("balance").innerText =
    Intl.NumberFormat().format(balance);
};

const repayLoan = () => {
  if (salary === 0) {
    alert("you have to work some first");
  } else if (loan <= salary) {
    let left = salary - loan;
    loan = 0;
    salary = 0;
    balance = balance + left;
    document.getElementById("LoanBalance").innerText =
      Intl.NumberFormat().format(loan);
    document.getElementById("workPay").innerText =
      Intl.NumberFormat().format(salary);
    document.getElementById("balance").innerText =
      Intl.NumberFormat().format(balance);
    document.getElementById("loanSum").style.display = "none";
    document.getElementById("repayLoanButton").style.display = "none";
    document.getElementById("modal").style.display = "block";
  } else if (salary < loan) {
    loan = loan - salary;
    salary = 0;

    document.getElementById("LoanBalance").innerText =
      Intl.NumberFormat().format(loan);
    document.getElementById("workPay").innerText =
      Intl.NumberFormat().format(salary);
  }
};

const bank = () => {
  let part = salary * 0.1;

  if (loan > 0) {
    if (loan >= part) {
      loan = loan - part;

      let left = salary - part;
      balance = balance + left;
      document.getElementById("balance").innerText =
        Intl.NumberFormat().format(balance);
      document.getElementById("LoanBalance").innerText =
        Intl.NumberFormat().format(loan);

      salary = 0;
      document.getElementById("workPay").innerText =
        Intl.NumberFormat().format(salary);
    } else if (loan < part) {
      let loanLeft = part - loan;
      let salaryLeft = salary - part;
      lone = 0;

      balance = balance + loanLeft + salaryLeft;

      document.getElementById("balance").innerText =
        Intl.NumberFormat().format(balance);
      document.getElementById("LoanBalance").innerText =
        Intl.NumberFormat().format(loan);
      salary = 0;
      document.getElementById("workPay").innerText =
        Intl.NumberFormat().format(salary);
    }
  } else {
    balance = balance + salary;
    document.getElementById("balance").innerText =
      Intl.NumberFormat().format(balance);

    salary = 0;
    document.getElementById("workPay").innerText =
      Intl.NumberFormat().format(salary);
  }

  // om lån är mer än 10% av lön. sänk summan på lån ohc resterande in på balanse
  // om låner är mindre än 10% av lön ta ort lån från lön och nolla lånert
};

const work = () => {
  salary = salary + 100;

  document.getElementById("workPay").innerText =
    Intl.NumberFormat().format(salary);
};

const features = () => {
  let selected = document.querySelector("#computerName").value;

  let thisComputer = allComputers.find((x) => x.id == selected);
  chosenComputer = thisComputer;

  let featuresText = "";

  thisComputer.specs.forEach((text) => {
    featuresText += text + "\n";
  });

  document.getElementById("features").innerText = featuresText;
  document.getElementById("buyPart").style.display = "block";
  document.getElementById("nameOfComputer").innerText = thisComputer.title;
  document.getElementById("description").innerText = thisComputer.description;
  document.getElementById("price").innerText = Intl.NumberFormat().format(
    thisComputer.price
  );
  document.getElementById(
    "image"
  ).innerHTML = `<img src="https://hickory-quilled-actress.glitch.me/${thisComputer.image}" alt="${thisComputer.title}" /> `;
};

const buy = () => {
  if (balance > chosenComputer.price) {
    balance = balance - chosenComputer.price;
    document.getElementById("balance").innerText =
      Intl.NumberFormat().format(balance);

    let alert = `<div class="alert alert-success" role="alert">You have bought a new laptop!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>`;
    document.getElementById("alert").innerHTML = alert;
  } else {
    let alert = `<div class="alert alert-danger" role="alert">the computer is to expensive<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>`;
    document.getElementById("alert").innerHTML = alert;
  }
};
