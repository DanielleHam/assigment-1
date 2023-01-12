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

function work() {
  salary = salary + 100;

  document.getElementById("workPay").innerText =
    Intl.NumberFormat().format(salary);
}

function features() {
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
}

function buy() {
  if (balance === chosenComputer.price) {
    console.log("köp");

    balance = balance - chosenComputer.price;
    document.getElementById("balance").innerText = balance;

    let alert = `<div class="alert alert-success" role="alert">You have bought a new laptop!<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>`;
    document.getElementById("alert").innerHTML = alert;
  } else {
    let alert = `<div class="alert alert-danger" role="alert">the computer is to expensive<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button></div>`;
    document.getElementById("alert").innerHTML = alert;
    console.log("to expencive");
  }
}
