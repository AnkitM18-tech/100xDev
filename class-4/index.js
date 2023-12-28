function calculatesum() {
  const first = document.getElementById("firstNum").value;
  const second = document.getElementById("secondNum").value;
  const finalSum = document.getElementById("finalSum");
  //   const sumResult = parseInt(first) + parseInt(second);
  fetch("https://sum-server.100xdevs.com/sum?a=" + first + "&b=" + second)
    .then(function (response) {
      return response.text();
    })
    .then(function (ans) {
      console.log(ans);
      finalSum.innerHTML = ans;
    });
  //   finalSum.innerHTML = "Sum is: " + sumResult;
}

async function calculatesum2() {
  const first = document.getElementById("firstNum").value;
  const second = document.getElementById("secondNum").value;
  const finalSum = document.getElementById("finalSum");

  const response = await fetch(
    "https://sum-server.100xdevs.com/sum?a=" + first + "&b=" + second
  );
  const ans = await response.text();
  finalSum.innerHTML = "Sum is: " + ans;
}

// throttling -- backend, debouncing -- frontend
// oninput - run the function anytime input changes
let timeout;
function debounceCalculateSum() {
  clearTimeout(timeout);
  timeout = setTimeout(() => calculatesum2(), 1000);
}

async function calculateInterest() {
  const principal = document.getElementById("principal").value;
  const roi = document.getElementById("roi").value;
  const time = document.getElementById("time").value;
  const interest = document.getElementById("interest");

  const response = await fetch(
    "https://sum-server.100xdevs.com/interest?principal=" +
      principal +
      "&rate=" +
      roi +
      "&time=" +
      time
  );
  interest.innerHTML = "Result is: " + (await response.text());
}
