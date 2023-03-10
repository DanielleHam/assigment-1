window.onload = function () {
  getComputers();
};

let allComputers;
let chosenComputer;
let balance = 0;
let salary = 0;
let loan = 0;

const getComputers = async () => {
  try {
    let res = await fetch(
      "https://hickory-quilled-actress.glitch.me/computers"
    );

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
    // call the function to add the information about the computer
    features();

    return computers;
  } catch (error) {
    return error;
  }
};

const checkLoan = () => {
  let desiredLoanSum = document.getElementById("desiredLoan").value;

  if (desiredLoanSum > balance * 2) {
    alert(
      "to high loan. can only be 2 times the amount on balance. so no higher then " +
        balance * 2
    );
    // take away to get a loan button in the modal so user can't press it
    document.getElementById("getLoanButton").style.display = "none";
  } else {
    // display the button for user to apply for a loan
    document.getElementById("getLoanButton").style.display = "block";
  }
};

const getALoan = () => {
  if (loan > 0) {
    alert("You already have a loan");
  } else {
    let desiredLoanSum = document.getElementById("desiredLoan").value;

    document.getElementById("desiredLoan").value = "";
    loan = Number(desiredLoanSum);
    balance = balance + loan;

    // show the repay loan button
    document.getElementById("repayLoanButton").style.display = "block";
    // remove the get a loan button
    document.getElementById("modal").style.display = "none";
    // show the text with the loan amount
    document.getElementById("loanSum").style.display = "flex";

    document.getElementById("LoanBalance").innerText =
      Intl.NumberFormat().format(loan);
    document.getElementById("balance").innerText =
      Intl.NumberFormat().format(balance);
  }
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

    // remove the repay loan button
    document.getElementById("repayLoanButton").style.display = "none";
    // show the get a loan button
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
  if (salary === 0) {
    alert("you have to work some first");
  } else {
    let deductedSalaryAmount = salary * 0.1;

    if (loan > 0) {
      if (loan > deductedSalaryAmount) {
        loan = loan - deductedSalaryAmount;

        let left = salary - deductedSalaryAmount;
        balance = balance + left;
        document.getElementById("balance").innerText =
          Intl.NumberFormat().format(balance);
        document.getElementById("LoanBalance").innerText =
          Intl.NumberFormat().format(loan);

        salary = 0;
        document.getElementById("workPay").innerText =
          Intl.NumberFormat().format(salary);
      } else if (loan <= deductedSalaryAmount) {
        let sumLeftAfterRepay = deductedSalaryAmount - loan;
        let salaryLeft = salary - deductedSalaryAmount;
        lone = 0;

        balance = balance + sumLeftAfterRepay + salaryLeft;

        document.getElementById("balance").innerText =
          Intl.NumberFormat().format(balance);
        document.getElementById("LoanBalance").innerText =
          Intl.NumberFormat().format(loan);

        salary = 0;
        document.getElementById("workPay").innerText =
          Intl.NumberFormat().format(salary);

        // remove the loan text
        document.getElementById("loanSum").style.display = "none";
        // remove the repay loan button
        document.getElementById("repayLoanButton").style.display = "none";
        // show the get a loan button
        document.getElementById("modal").style.display = "block";
      }
    } else {
      balance = balance + salary;
      document.getElementById("balance").innerText =
        Intl.NumberFormat().format(balance);

      salary = 0;
      document.getElementById("workPay").innerText =
        Intl.NumberFormat().format(salary);
    }
  }
};

const work = () => {
  salary = salary + 100;

  document.getElementById("workPay").innerText =
    Intl.NumberFormat().format(salary);
};

const features = async () => {
  let selected = document.querySelector("#computerName").value;

  let selectedComputer = allComputers.find((x) => x.id == selected);
  chosenComputer = selectedComputer;

  let featuresText = "";

  selectedComputer.specs.forEach((text) => {
    featuresText += text + "\n";
  });

  document.getElementById("features").innerText = featuresText;
  // show the buy button and price
  document.getElementById("buyPart").style.display = "block";

  document.getElementById("nameOfComputer").innerText = selectedComputer.title;
  document.getElementById("description").innerText =
    selectedComputer.description;
  document.getElementById("price").innerText = Intl.NumberFormat().format(
    selectedComputer.price
  );

  await getPicture(selectedComputer);
};

const getPicture = async (computer) => {
  // se if image link works

  let res = await fetch(
    `https://hickory-quilled-actress.glitch.me/${computer.image}`
  );

  if (res.ok) {
    let img = res.url;

    document.getElementById(
      "image"
    ).innerHTML = `<img src=${img} alt="${computer.title}" /> `;
  } else {
    // if img not exist testing to change the ending of the link
    if (computer.image.search("jpg") > 0) {
      let newLinkEnd = computer.image.replace("jpg", "png");

      let res2 = await fetch(
        `https://hickory-quilled-actress.glitch.me/${newLinkEnd}`
      );
      document.getElementById(
        "image"
      ).innerHTML = `<img src=${res2.url} alt="${computer.title}" /> `;
      if (res2.ok) {
        document.getElementById(
          "image"
        ).innerHTML = `<img src=${res2.url} alt="${computer.title}" /> `;
      } else {
        // if no picture add a placeholder picture
        document.getElementById(
          "image"
        ).innerHTML = `<img src="no-image-icon.png" alt="${computer.title}" /> `;
      }
    } else {
      let newLinkEnd = computer.image.replace("png", "jpg");

      let res3 = await fetch(
        `https://hickory-quilled-actress.glitch.me/${newLinkEnd}`
      );
      if (res3.ok) {
        document.getElementById(
          "image"
        ).innerHTML = `<img src=${res3.url} alt="${computer.title}" /> `;
      } else {
        // if no picture add a placeholder picture
        document.getElementById(
          "image"
        ).innerHTML = `<img src="no-image-icon.png" alt="${computer.title}" /> `;
      }
    }
  }
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
    let alert = `<div class="alert alert-danger" role="alert">The computer is to expensive<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>`;
    document.getElementById("alert").innerHTML = alert;
  }
};
