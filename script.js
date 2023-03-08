function Form() {
  this.form = document.getElementById("sign-up");
  this.email = this.form.querySelector("label[for='email']>input");
  this.country = this.form.querySelector("label[for='country']>select");
  this.zip = this.form.querySelector("label[for='zip']>input");
  this.pass = this.form.querySelector("label[for='pass']>input");
  this.pass2 = this.form.querySelector("label[for='pass2']>input");
  this.submit = this.form.querySelector("button[type='submit']");

  this.initValidation = function () {
    checkEmail.bind(this.email)();
    checkZip.bind(this.zip, this.country)();
    checkPassword.bind(this.pass, this.pass2)();
    this.email.addEventListener("input", checkEmail.bind(this.email));
    this.zip.addEventListener("input", checkZip.bind(this.zip, this.country));
    this.country.addEventListener(
      "input",
      checkZip.bind(this.zip, this.country)
    );
    this.pass.addEventListener(
      "input",
      checkPassword.bind(this.pass, this.pass2)
    );
    this.pass2.addEventListener(
      "input",
      checkPassword.bind(this.pass, this.pass2)
    );
    this.submit.addEventListener("click", (e) => {
      checkSubmit(e, this.submit, this.email, this.zip, this.pass);
    });
  };
}

function checkEmail() {
  if (this.validity.typeMismatch || this.value === "") {
    this.setCustomValidity("Please enter an email");
  } else {
    this.setCustomValidity("");
  }
}

function checkZip(country) {
  let reqLength;
  switch (country.value) {
    case "Switzerland":
      reqLength = 4;
      break;
    default:
      reqLength = 5;
  }
  if (this.value.length !== reqLength) {
    this.setCustomValidity(`Please enter a zipcode of ${reqLength} digits`);
  } else {
    this.setCustomValidity("");
  }
}

function checkPassword(pass2) {
  if (this.value !== pass2.value) {
    this.setCustomValidity("Passwords do not match");
  } else if (this.value.length < 8) {
    this.setCustomValidity("Password must be at least 8 digits");
  } else {
    this.setCustomValidity("");
  }
}

function checkSubmit(e, submitBtn, email, zip, pass) {
  e.preventDefault();
  if (email.reportValidity() && zip.reportValidity() && pass.reportValidity()) {
    showSubmitMessage(submitBtn, "success");
  } else {
    showSubmitMessage(submitBtn, "fail");
  }
}

function showSubmitMessage(button, submitState) {
  if (submitState === "success") {
    console.log("a");
    button.parentNode.querySelector("span.success").style["display"] = "block";
    button.parentNode.querySelector("span.fail").style["display"] = "none";
  } else {
    button.parentNode.querySelector("span.fail").style["display"] = "block";
    button.parentNode.querySelector("span.success").style["display"] = "none";
  }
}

const signUpForm = new Form();
signUpForm.initValidation();
