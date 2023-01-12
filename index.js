window.onload = function () {
  getComputers();
};

let allComputers;

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

  return computers;
}

function features() {
  let selected = document.querySelector("#computerName");
  let output = selected.value;

  let thisComputer = allComputers.find((x) => x.id == output);

  let featuresText = "";

  thisComputer.specs.forEach((text) => {
    featuresText += text + "\n";
  });

  document.getElementById("features").innerText = featuresText;
  document.getElementById("nameOfComputer").innerText = thisComputer.title;
  document.getElementById("description").innerText = thisComputer.description;
  document.getElementById("price").innerText = thisComputer.price;
  document.getElementById(
    "image"
  ).innerHTML = `<img src="https://hickory-quilled-actress.glitch.me/${thisComputer.image}" alt=${thisComputer.title} /> `;
}

function buy() {
  console.log(allComputers);
}
