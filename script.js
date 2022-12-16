"use strict";

const stepsNavigator = document.querySelectorAll(".rounded__number__container");
const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");
const inputNumber = document.querySelector(".inputNumber");
const inputs = document.querySelectorAll(".input_box_section > input");
const errorMessage = document.querySelectorAll(".errorMsg");

const buttons = document.querySelectorAll("button");
const plans = document.querySelectorAll(".plan");
const monthlyPlan = document.querySelectorAll(".plan__pricing");
const planName = document.querySelectorAll(".plan__name");
const toggle = document.querySelector(".toggle__section > i");
const addons = document.querySelectorAll(".add-on");
const nextDOMElement = document.querySelectorAll(".iterator");

const form = document.querySelector("form");
const activePlan = document.querySelector(".plan__active");
const activePlanColor = document.querySelectorAll(".toggle__section > p");
const yearlyPricingPlan = document.querySelectorAll(".yearly__pricing");
const yearlyPricing = document.querySelectorAll(".unique");
const navigateBack = document.querySelectorAll(".navigate__back");

const selectedPlan = document.querySelector(".selected__plan :first-child");
const selectedPlanSummary = document.querySelector(
  ".selected__plan__summary > p"
);
// this was in All before
const planSummarySelected = document.querySelector(".summaryColorGray");
const planSummary = document.querySelectorAll(".summaryColor");
const addOnToBeSelected = document.querySelectorAll(
  ".add-on_to_be_selected :first-child"
);

const addonMonthlyPricing = document.querySelectorAll(".addonMonthlyPricing");
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const container = document.querySelector(".add-ons__selected");
const addonYearlyPricing = document.querySelectorAll(".addonYearlyPricing");
const yearlyToggle = document.querySelector(".toggle__section :last-child");
const selected__plan__summary = document.querySelector(
  ".selected__plan__summary"
);

/* 
- What is the variable renderedSummaryColor - renderedSummaryColor is the variable declared but not yet assigned used to get the nodelist of the plans and addons rendered on the last page of the form

// FORM
- I listened for click event on the button nested in the form.
- when clicked it doesn't reload the webpage

// nameValue, email, phonumber
- These are variables to keep track of the validity of the input entered. 
- By default, they're set to false

// INDEX
- used to keep track of the current position we are at each iteration
- It's default and initial value is 0;

*/

let renderedSummaryColor;

form.addEventListener("click", (e) => {
  e.preventDefault();
});

let nameValue = false;
let email = false;
let phoneNumber = false;

let index = 0;

/* 
// BUTTONS
- The buttons element is a nodelist of all the buttons rendered on each page of the iteration.
- since each button is rendered accordingly, selecting them based on their index is a good approach to this.

// BUTTON[0] - FIRST BTN
- listening for click events
- onclick invokes this three functions:

** conditionalsCheck() - this returns true to the (nameValue, email, phoneNumber variables) if all the conditions were met and if not it invokes the showErrorMessage() function 

** moveToNextStep() - this checks if all the variables are true, if so it calls the stepFurther() function.

** checkActivePlan() 

** the stepFurther() function increments index each time it's called and updates the necessary elements to render the next element in the iteration

** the moveBackwardOneStep() function does the inverse of the stepFurther() function
*/

buttons[0].addEventListener("click", () => {
  conditionalsCheck();
  moveToNextStep();
  checkActivePlan();
});

function conditionalsCheck() {
  // if the input contains letters from A-Z and not a single number
  if (inputName.value.match(/[a-zA-Z]/g) && !inputName.value.match(/\d/g)) {
    nameValue = true;
  } else {
    showErrorMessage(0, "Please input only letters from A-Z", 0);
  }

  if (inputEmail.value) {
    email = true;
  } else {
    showErrorMessage(1, "This field is required", 1);
  }

  if (inputNumber.value) {
    phoneNumber = true;
  } else {
    showErrorMessage(2, "This field is required", 2);
  }
}

// this accepts the errormessage index to be displayed, the errormessage, and the inputindex. Most likely the inputindex = errorindex
function showErrorMessage(errorIndex, errorMsg, inputIndex) {
  errorMessage[errorIndex].textContent = errorMsg;
  errorMessage[errorIndex].style.color = "red";
  errorMessage[errorIndex].style.fontSize = "12px";
  inputs[inputIndex].classList.add("errorMessageBorder");

  setTimeout(() => {
    errorMessage[errorIndex].textContent = "";
    inputs[inputIndex].classList.remove("errorMessageBorder");
  }, 3000);
}

function moveToNextStep() {
  // if the inputs fulfills the conditionalsCheck()
  if (nameValue === true && phoneNumber === true && email === true) {
    stepFurther();
  }
}

// takes the user back one step the iteration flow
navigateBack[0].addEventListener("click", () => {
  moveBackwardOneStep();
});

function checkActivePlan() {
  plans.forEach((plan, i) => {
    plan.addEventListener("click", () => {
      removePreviousActivePlan();
      plan.classList.add("plan__detail__selected");
    });
  });
}

function removePreviousActivePlan() {
  plans.forEach((plan) => {
    if (plan.classList.contains("plan__detail__selected")) {
      plan.classList.remove("plan__detail__selected");
    }
  });
}

function stepFurther() {
  index++;
  stepsNavigator[index].classList.add("active__step");

  nextDOMElement[index - 1].classList.add("hide");

  nextDOMElement[index].classList.remove("hide");

  // check for active step
  checkActiveStep();
}

function moveBackwardOneStep() {
  index--;

  stepsNavigator[index].classList.add("active__step");

  stepsNavigator[index + 1].classList.remove("active__step");

  nextDOMElement[index].classList.remove("hide");

  nextDOMElement[index + 1].classList.add("hide");
}

function checkActiveStep() {
  if (stepsNavigator[index - 1].classList.contains("active__step")) {
    stepsNavigator[index - 1].classList.remove("active__step");
  }
}

/* 
  // BUTTON[1] - SECOND BTN
  - litsen for click events
  - check for active plan and remove active plan where necessary
  - invoke the stepFurther() function to move to the next step

  - call the renderSelectedPlan() to render the textContent of the planName and the pricing to the last page (summary) each time the button is clicked
*/

// Second Rendered Element Section

buttons[1].addEventListener("click", () => {
  checkActivePlan();
  stepFurther();

  // rendering the plan selected name and pricing to the equivalent textContent on the summary page
  renderSelectedPlan();
});

function renderSelectedPlan() {
  plans.forEach((plan, i) => {
    plan.addEventListener("click", () => {
      // emptying the innerHTML before rendering a new content to the DOM
      selected__plan__summary.innerHTML = "";
      selected__plan__summary.innerHTML = `
                  <div class="selected__plan">
                    <p class="summaryColorT">${planName[i].textContent} (${
        yearlyToggle.classList.contains("plan__active") ? "Yearly" : "Monthly"
      })</p>
                    <p><a href="#">Change</a></p>
                </div>
                <p class="summaryColorT">${
                  yearlyToggle.classList.contains("plan__active")
                    ? yearlyPricing[i].textContent
                    : monthlyPlan[i].textContent
                }</p>
                          `;
    });
  });
}

// toggle between monthly and yearly plans
toggle.addEventListener("click", () => {
  toggle.classList.toggle("fa-toggle-on");
  activePlanColor[0].classList.toggle("plan__active");
  activePlanColor[1].classList.toggle("plan__active");

  monthlyPlan.forEach((price, i) => {
    price.classList.toggle("hide");
    yearlyPricing[i].classList.toggle("hide");

    // for the addonYealyPricing
    addonYearlyPricing[i].classList.toggle("hide");
    addonMonthlyPricing[i].classList.toggle("hide");

    planSummarySelected.textContent = `Total (per ${
      yearlyToggle.classList.contains("plan__active") ? "Year" : "Month"
    })`;
  });

  yearlyPricingPlan.forEach((price) => {
    price.classList.toggle("hide");
  });
});

// Third step section
let sum = [];
let uniqueArr = [];

/* 
- BUTTON[2] - THIRD BTN
- listen for clicks
- calls the stepFurther(), renderedCheckedBoxes(), isYear(), and run() function
- assigned the renderedSummaryColor to the nodelist of class name given to all the rendered plan or addons pricing on the summary page 

*/

buttons[2].addEventListener("click", () => {
  stepFurther();

  renderCheckedBoxes();
  renderedSummaryColor = document.querySelectorAll(".summaryColorT");

  // checking if the year plan was toggled
  isYear();
  run();
});

// move one step back in the iteration flow
navigateBack[1].addEventListener("click", () => {
  moveBackwardOneStep();
  container.textContent = "";
});

function isYear() {
  plans.forEach((plan, i) => {
    if (
      plan.classList.contains("plan__detail__selected") &&
      activePlanColor[1].classList.contains("plan__active")
    ) {
      // emptying the innerHTML before rendering a new content to the DOM
      selected__plan__summary.innerHTML = "";
      selected__plan__summary.innerHTML = `
                  <div class="selected__plan">
                    <p class="summaryColorT">${planName[i].textContent} (${
        yearlyToggle.classList.contains("plan__active") ? "Yearly" : "Monthly"
      })</p>
                      <p><a href="#">Change</a></p>
                </div>
                <p class="summaryColorT">${
                  yearlyToggle.classList.contains("plan__active")
                    ? yearlyPricing[i].textContent
                    : monthlyPlan[i].textContent
                }</p>
                          `;
    }
  });
}

function renderCheckedBoxes() {
  container.innerHTML = "";
  checkBoxes.forEach((checkBox, i) => {
    if (checkBox.checked) {
      const html = `
                <div class="addon${i + 1}">
                  <p class="summaryColorGray">${
                    addOnToBeSelected[i].textContent
                  }</p>
                  <p class="summaryAddon summaryColorT" style="font-weight: lighter">
                    ${
                      yearlyToggle.classList.contains("plan__active")
                        ? addonYearlyPricing[i].textContent
                        : addonMonthlyPricing[i].textContent
                    }
                  </p>
                </div>
    `;

      container.insertAdjacentHTML("afterbegin", html);
    }
  });
}

// toggle the checked activeBox/es
checkBoxes.forEach((checkBox, i) => {
  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      addons[i].classList.toggle("checked");
    } else {
      addons[i].classList.toggle("checked");
    }
  });
});

// final page addition
function run() {
  renderedSummaryColor.forEach((plan) => {
    sum.push(returnPerfectNumber(plan.textContent));
  });

  uniqueArr = sum.filter((Num) => Num > 0);

  let result = uniqueArr.reduce((acc, cur) => acc + cur, 0);

  planSummary[1].textContent = `+$${result}/${
    yearlyToggle.classList.contains("plan__active") ? "yr" : "mo"
  }`;
  sum = [];
}

// fourth section

buttons[3].addEventListener("click", () => {
  index++;
  nextDOMElement[index - 1].classList.add("hide");
  nextDOMElement[index].classList.remove("hide");
});

navigateBack[2].addEventListener("click", () => {
  moveBackwardOneStep();
});

function returnPerfectNumber(value) {
  const result = value
    .replaceAll("$", "")
    .replaceAll("/", "")
    .replaceAll("mo", "")
    .replaceAll("yr", "")
    .replaceAll("+", "");
  return Number(result);
}
