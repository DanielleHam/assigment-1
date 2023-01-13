window.onload = function () {
  getComputers();
};

let allComputers;
let chosenComputer;
let balance = 0;
let salary = 0;
let loan = 0;

async function getComputers() {
  let computers = await fetch(
    "https://hickory-quilled-actress.glitch.me/computers"
  )
    .then((response) => response.json())
    .then((data) => (allComputers = data));

  let options = `<option value="">Select</option>`;

  for (let computer of computers) {
    let title = computer.title;
    let id = computer.id;

    options += `<option value="${id}">${title}</option>`;
  }

  document.getElementById("computerName").innerHTML = options;
  document.getElementById("balance").innerText =
    Intl.NumberFormat().format(balance);
  document.getElementById("workPay").innerText =
    Intl.NumberFormat().format(salary);

  return computers;
}

const checkLoan = () => {
  let loanSum = document.getElementById("askedLoan").value;

  if (loanSum > balance * 2) {
    alert(
      "to high loan. can only be 2 times the amount on balance. so no higher then " +
        balance * 2
    );
    document.getElementById("getLoanButton").style.display = "none";
  } else {
    document.getElementById("getLoanButton").style.display = "block";
  }
};

const closeLoanModal = () => {
  document.getElementById("getLoanButton").style.display = "block";
};

const getALoan = () => {
  let loanSum = document.getElementById("askedLoan").value;
  loan = Number(loanSum);
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
      document.getElementById("lone").innerText =
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
  let selected = document.querySelector("#computerName");
  let output = selected.value;

  let thisComputer = allComputers.find((x) => x.id == output);
  chosenComputer = thisComputer;

  let featuresText = "";

  thisComputer.specs.forEach((text) => {
    featuresText += text + "\n";
  });

  document.getElementById("features").innerText = featuresText;
  document.getElementById("nameOfComputer").innerText = thisComputer.title;
  document.getElementById("description").innerText = thisComputer.description;
  document.getElementById("price").innerText = Intl.NumberFormat().format(
    thisComputer.price
  );
  document.getElementById(
    "image"
  ).innerHTML = `<img src="https://hickory-quilled-actress.glitch.me/${thisComputer.image}" alt=${thisComputer.title} /> `;
};

const buy = () => {
  if (balance === chosenComputer.price) {
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
