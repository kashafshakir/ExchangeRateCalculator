const exchange_screen = document.querySelector(".exchangescreen");
const herosection = document.querySelector(".hero_section");
const startbutton = document.querySelector("#start_button");
const from_currency = document.querySelector(".from select");
const to_currency = document.querySelector(".to select");

startbutton.addEventListener("click", () => {
    herosection.classList.add("move_screen");
    setTimeout(() => {
        herosection.style.display = "none";
        exchange_screen.style.display = "flex";
    }, 1000);
});

// Correct API Base URL
const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdowns select");

for (let select of dropdowns) {
    for (let code in countryList) {
        let new_option = document.createElement("option");
        new_option.innerText = code;
        new_option.value = code;
        select.append(new_option);

        if (select.name === "from" && code === "USD") {
            new_option.selected = true;
        } else if (select.name === "to" && code === "PKR") {
            new_option.selected = true;
        }

        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

// Function to update country flag based on currency selection
const exchangeButton = document.querySelector("#exchangebutton");

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurr = from_currency.value.toLowerCase();
    let toCurr = to_currency.value.toLowerCase();
    
    // Fetch base currency exchange rates
    let response = await fetch(`${BASE_URL}/${fromCurr}.json`);
    let data = await response.json();

    if (!data[fromCurr] || !data[fromCurr][toCurr]) {
        alert("Failed to fetch exchange rate. Please try again.");
        return;
    }

    let rate = data[fromCurr][toCurr]; // Corrected formula
    let finalAmount = (amtVal * rate).toFixed(2); // Rounded to 2 decimal places

    const msg = document.querySelector("#result");
    msg.innerText = `${amtVal} ${from_currency.value} = ${finalAmount} ${to_currency.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

exchangeButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
