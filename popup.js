document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  let currentInput = "";

  // Function to handle input and update the display
  function updateDisplay(value) {
    currentInput += value;
    display.value = currentInput;
  }

  // Function to safely calculate the result
  function calculateResult() {
    try {
      // Replace the power symbol (^) with the correct exponentiation operator (**)
      let result = currentInput.replace(/\^/g, "**");

      // Remove any invalid characters (only numbers, basic operators, and parentheses allowed)
      if (/[^0-9+\-*/^(). ]/.test(result)) {
        throw new Error("Invalid input");
      }

      // Evaluate the result using eval safely
      result = eval(result);
      if (isNaN(result) || result === Infinity || result === -Infinity) {
        throw new Error("Invalid calculation");
      }
      display.value = result;
      currentInput = result.toString(); // Update current input with the result for further calculations
    } catch (e) {
      display.value = "Error";
      currentInput = ""; // Reset the current input after an error
    }
  }

  // Handle button clicks for the calculator
  document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "=") {
        calculateResult();
      } else if (value === "C") {
        currentInput = "";
        display.value = "";
      } else if (value === "√") {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        display.value = currentInput;
      } else if (value === "x²") {
        currentInput = Math.pow(parseFloat(currentInput), 2).toString();
        display.value = currentInput;
      } else if (value === "^") {
        updateDisplay("^");
      } else if (value === "+") {
        updateDisplay("+");
      } else if (value === "-") {
        updateDisplay("-");
      } else if (value === "*") {
        updateDisplay("*");
      } else if (value === "/") {
        updateDisplay("/");
      } else {
        updateDisplay(value);
      }
    });
  });
});
