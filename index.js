let drawingMode = "random"; // Default mode

function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .gridContainer {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      width: 80vw;
      height: 80vw;
      max-width: 600px;
      max-height: 600px;
      margin: 1em auto;
      border: 1em solid black;
      box-sizing: border-box;
      cursor: pointer;
    }
    .gridBox {
      box-sizing: border-box;
      background-color: rgba(255, 255, 255, 1); /* Default white background */
    }
    #colorMode {
      margin: 1em;
      padding: 0.5em;
      border: 1px solid blue;
      border-radius: 5px;
      cursor: pointer;
    }
    #resetButton {
      margin: 1em auto 0;
      padding: 0.5em 1em;
      border: 1px solid blue;
      border-radius: 5px;
      cursor: pointer;
      text-align: center;
    }
    h1 {
      margin-bottom: 1em;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

function createContainer() {
  const container = document.createElement("div");
  container.className = "gridContainer";
  return container;
}

function createDropdown() {
  const dropdown = document.createElement("select");
  dropdown.id = "colorMode";

  const modes = [
    { value: "grayscale", text: "Grayscale" },
    { value: "random", text: "Random Color" },
    { value: "custom", text: "Custom RGB" },
  ];

  modes.forEach((mode) => {
    const option = document.createElement("option");
    option.value = mode.value;
    option.textContent = mode.text;
    dropdown.appendChild(option);
  });

  dropdown.addEventListener("change", (event) => {
    drawingMode = event.target.value;
    if (drawingMode === "custom") {
      const customColor = prompt("Enter an RGB value (e.g., 255,0,0 for red):");
      if (customColor && /^(\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})$/.test(customColor)) {
        document.body.dataset.customColor = customColor;
      } else {
        alert("Invalid RGB value! Falling back to random color.");
        drawingMode = "random";
      }
    }
    regenerateGrid();
  });

  return dropdown;
}

function setGrid(size, colorFunction) {
  const gridContainer = document.querySelector(".gridContainer");
  if (gridContainer) {
    gridContainer.innerHTML = ""; // Clear existing grid items
  }

  const containerWidth = gridContainer.clientWidth;
  const itemSize = containerWidth / size;

  for (let i = 0; i < size * size; i++) {
    const gridBox = document.createElement("div");
    gridBox.className = "gridBox";
    gridBox.style.width = `${itemSize}px`;
    gridBox.style.height = `${itemSize}px`;
    gridBox.dataset.opacity = 0.1; // Initialize opacity

    // Hover effect for mouse
    gridBox.addEventListener("mouseenter", () => {
      const colorWithOpacity = colorFunction(gridBox);
      gridBox.style.backgroundColor = colorWithOpacity;
    });

    gridContainer.appendChild(gridBox);
  }

  // Enable touch support for the grid
  enableTouchEvents(gridContainer, colorFunction);
}

function enableTouchEvents(container, colorFunction) {
  container.addEventListener("touchstart", (event) => handleTouch(event, colorFunction));
  container.addEventListener("touchmove", (event) => {
    handleTouch(event, colorFunction);
    event.preventDefault(); // Prevent scrolling
  });
}

function handleTouch(event, colorFunction) {
  const touch = event.touches[0]; // Get the first touch point
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (target && target.classList.contains("gridBox")) {
    const colorWithOpacity = colorFunction(target);
    target.style.backgroundColor = colorWithOpacity;
  }
}

function getGrayscaleColor(element) {
  let currentOpacity = parseFloat(element.dataset.opacity);
  currentOpacity = Math.min(currentOpacity + 0.1, 1.0); // Increment opacity by 0.1
  element.dataset.opacity = currentOpacity;
  return `rgba(0, 0, 0, ${currentOpacity})`;
}

function getRandomColor(element) {
  let currentOpacity = parseFloat(element.dataset.opacity);
  currentOpacity = Math.min(currentOpacity + 0.1, 1.0); // Increment opacity by 0.1
  element.dataset.opacity = currentOpacity;

  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return `rgba(${R}, ${G}, ${B}, ${currentOpacity})`;
}

function getCustomColor(element) {
  let currentOpacity = parseFloat(element.dataset.opacity);
  currentOpacity = Math.min(currentOpacity + 0.1, 1.0); // Increment opacity by 0.1
  element.dataset.opacity = currentOpacity;

  const customColor = document.body.dataset.customColor || "0,0,0";
  return `rgba(${customColor},${currentOpacity})`;
}

function determineColorFunction() {
  if (drawingMode === "grayscale") return getGrayscaleColor;
  if (drawingMode === "random") return getRandomColor;
  if (drawingMode === "custom") return getCustomColor;
}

function regenerateGrid() {
  const colorFunction = determineColorFunction();
  setGrid(16, colorFunction);
}

function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.id = "resetButton";
  resetButton.textContent = "Reset Grid";

  resetButton.addEventListener("click", () => {
    const gridSize = parseInt(prompt("Enter Grid Size (e.g., 16):"));
    if (gridSize && gridSize > 0 && gridSize <= 100) {
      const colorFunction = determineColorFunction();
      setGrid(gridSize, colorFunction);
    } else {
      alert("Please enter a valid number greater than 0 and less than 100!");
    }
  });

  return resetButton;
}

// Initialize the body and elements
injectStyles();

const body = document.querySelector("body");

const title = document.createElement("h1");
title.textContent = "Etch-a-Sketch";
body.appendChild(title);

const dropdown = createDropdown();
body.appendChild(dropdown);

const gridContainer = createContainer();
body.appendChild(gridContainer);

const resetButton = createResetButton();
body.appendChild(resetButton);

regenerateGrid(); // Default grid size and color function
