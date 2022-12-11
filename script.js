"use strict";

const stepsNavigator = document.querySelectorAll(".rounded__number__container");
const inputName = document.querySelector(".inputName");
const inputEmail = document.querySelector(".inputEmail");
const inputNumber = document.querySelector(".inputNumber");
const inputs = document.querySelectorAll(".input_box_section > input");
const errorMessage = document.querySelectorAll(".errorMsg");

const buttons = document.querySelectorAll("button");
const plans = document.querySelectorAll(".plan");
const plans__pricing = document.querySelectorAll(".plan__pricing");
const planName = document.querySelectorAll(".plan__name");
const toggle = document.querySelector(".toggle__section > i");
const addons = document.querySelectorAll(".add-on");
const nextDOMElement = document.querySelectorAll(".iterator");

const form = document.querySelector("form");
const activePlan = document.querySelector(".plan__active");
const activePlanColor = document.querySelectorAll(".toggle__section > p");
const yearlyPricing = document.querySelectorAll(".yearly__pricing");
const text = document.querySelectorAll(".unique");
const navigateBack = document.querySelectorAll(".navigate__back");

const selectedPlan = document.querySelector(".selected__plan :first-child");
const selectedPlanSummary = document.querySelector(
  ".selected__plan__summary > p"
);
const planSummarySelected = document.querySelectorAll(".summaryColorGray");
const planSummary = document.querySelectorAll(".summaryColor");

const addOnToBeSelected = document.querySelectorAll(
  ".add-on_to_be_selected :first-child"
);
const addon_P = document.querySelectorAll(".add-on > p");
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
const container = document.querySelector(".add-ons__selected");

form.addEventListener("click", (e) => {
  e.preventDefault();
});

let nameValue = false;
let email = false;
let phoneNumber = false;

// To keep track of the what rendered page we are on the iteration
let index = 0;

// first button
buttons[0].addEventListener("click", () => {
  // check if valid inputs were entered
  conditionalsCheck();

  // move to next step
  moveToNextStep();

  // call the checkActivePlan() so that selection would be made possible
  checkActivePlan();
});

function checkActiveStep() {
  if (stepsNavigator[index - 1].classList.contains("active__step")) {
    stepsNavigator[index - 1].classList.remove("active__step");
  }
}

// checks if all inputs were valid
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

// function for the error Messages being displayed
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
  if (((nameValue === phoneNumber) === email) === true) {
    stepFurther();
  }
}

// Second Rendered Element Section

buttons[1].addEventListener("click", () => {
  console.log("I'm being clicked");
  // checks for the active plan and removes previous active plans where necessary
  checkActivePlan();

  // move to the next page
  stepFurther();
});

function checkActivePlan() {
  plans.forEach((plan, i) => {
    plan.addEventListener("click", () => {
      removePreviousActivePlan();
      plan.classList.add("plan__detail__selected");

      // rendering the plan selected to the fourth step and the pricing inclusive
      planSummary[0].textContent = `${planName[i].textContent} (Monthly)`;

      planSummary[1].textContent = plans__pricing[i].textContent;

      // rendering the addon selected on the fourth step
      // comeback later to render this, only if the checkbox was checked
      // and also render an insertAdjacentHTML() for if the last element was selected
      planSummary[2].textContent = addon_P[0].textContent;
      planSummary[3].textContent = addon_P[1].textContent;
      // adding all of the sumamry balances together
      planSummary[4].textContent = `+$${
        returnPerfectNumber(planSummary[1].textContent) +
        returnPerfectNumber(planSummary[2].textContent) +
        returnPerfectNumber(planSummary[3].textContent)
      }/mo`;
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

toggle.addEventListener("click", () => {
  toggle.classList.toggle("fa-toggle-on");
  activePlanColor[0].classList.toggle("plan__active");
  activePlanColor[1].classList.toggle("plan__active");

  plans__pricing.forEach((price, i) => {
    plans__pricing[i].classList.toggle("hide");
    text[i].classList.toggle("hide");
  });

  yearlyPricing.forEach((price, i) => {
    yearlyPricing[i].classList.toggle("hide");
  });
});

navigateBack[0].addEventListener("click", () => {
  moveBackwardOneStep();
});

function stepFurther() {
  index++;
  stepsNavigator[index].classList.add("active__step");

  // the previous content of the DOM should be set to hide
  nextDOMElement[index - 1].classList.add("hide");
  console.log(index);
  // the next content of the DOM should be shown or rendered
  nextDOMElement[index].classList.remove("hide");

  // check for active step
  checkActiveStep();
}

function moveBackwardOneStep() {
  index--;
  console.log(index);

  stepsNavigator[index].classList.add("active__step");

  stepsNavigator[index + 1].classList.remove("active__step");

  // the next content of the DOM should be hidden and previous shown
  nextDOMElement[index].classList.remove("hide");

  nextDOMElement[index + 1].classList.add("hide");
}

// Third step section

buttons[2].addEventListener("click", () => {
  stepFurther();
  // call the renderCheckedBoxes() function to check for the renderboxes and render them
  renderCheckedBoxes();
});

navigateBack[1].addEventListener("click", () => {
  moveBackwardOneStep();
  container.textContent = "";
});

// fourth section

buttons[3].addEventListener("click", () => {
  // because we aren't navigating through any steps further, that's why I didn't call the stepfurther()
  index++;

  // the previous content of the DOM should be set to hide
  nextDOMElement[index - 1].classList.add("hide");
  console.log(index);
  // the next content of the DOM should be shown or rendered
  nextDOMElement[index].classList.remove("hide");
});

navigateBack[2].addEventListener("click", () => {
  moveBackwardOneStep();
});

function renderCheckedBoxes() {
  container.innerHTML = "";
  checkBoxes.forEach((checkBox, i) => {
    // console.log(checkBox.checked);
    if (checkBoxes[i].checked) {
      const html = `
                <div class="addon${i + 1}">
                  <p class="summaryColorGray">${
                    addOnToBeSelected[i].textContent
                  }</p>
                  <p class="summaryColor" style="font-weight: lighter">
                    ${addon_P[i].textContent}
                  </p>
                </div>
    `;

      container.insertAdjacentHTML("afterend", html);
    }
  });
}

function returnPerfectNumber(value) {
  const result = value
    .replaceAll("$", "")
    .replaceAll("/", "")
    .replaceAll("mo", "");
  return Number(result);
}
