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

  let options = "";

  for (let computer of computers) {
    let title = computer.title;
    let id = computer.id;

    options += `<option value="${id}">${title}</option>`;
  }

  document.getElementById("computerName").innerHTML = options;

  console.log(computers);

  return computers;
}

function buy() {
  console.log(allComputers);
}
