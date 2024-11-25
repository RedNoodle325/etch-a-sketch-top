function createContainer() {
  const container = document.createElement("div");
  container.className = "gridContainer";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.justifyContent = "flex-start";
  container.style.alignContent = "flex-start";
  container.style.width = "80vw";
  container.style.height = "80vw";
  container.style.maxWidth = "600px";
  container.style.maxHeight = "600px";
  container.style.margin = "1em auto";
  container.style.border = "1em black solid";
  container.style.boxSizing = "border-box";
  container.style.cursor = "pointer";

  return container;
}
// Initialize Body
function generateBody() {
  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.flexDirection = "column";
  body.style.alignItems = "center";
  body.style.justifyContent = "center";
  body.style.margin = "0";
  body.style.padding = "0";
  return body;
}
// Function to generate a random RGBA color with adjustable opacity
function generateRandomColor(opacity = 1.0) {
  const R = Math.floor(Math.random() * 256);
  const G = Math.floor(Math.random() * 256);
  const B = Math.floor(Math.random() * 256);
  return `rgba(${R}, ${G}, ${B}, ${opacity})`;
}
// Function to increment opacity up to a maximum value of 1.0
function incrementOpacity(currentOpacity, increment = 0.1, maxOpacity = 1.0) {
  return Math.min(currentOpacity + increment, maxOpacity);
}

function generateGrid(size) {
  // Remove existing grid
  const existingGrid = document.querySelector(".gridContainer");
  if (existingGrid) {
    existingGrid.remove();
  }

  // Create a new grid container
  const gridContainer = createContainer();
  body.appendChild(gridContainer);

  // Calculate the size of each grid item
  const containerWidth = gridContainer.clientWidth;
  const itemSize = containerWidth / size;

  // Create grid items
  for (let i = 0; i < size * size; i++) {
    const gridBox = document.createElement("div");
    gridBox.className = "gridBox";
    gridBox.style.width = `${itemSize}px`;
    gridBox.style.height = `${itemSize}px`;
    gridBox.style.boxSizing = "border-box";
    gridBox.style.backgroundColor = "rgba(255, 255, 255, 1)";
    gridBox.dataset.opacity = 0.1;

    // Hover effect for mouse
    gridBox.addEventListener("mouseenter", () => {
      const currentOpacity = parseFloat(gridBox.dataset.opacity);
      const newOpacity = incrementOpacity(currentOpacity);
      gridBox.dataset.opacity = newOpacity;
      gridBox.style.backgroundColor = generateRandomColor(newOpacity);
    });

    // Add grid box to the container
    gridContainer.appendChild(gridBox);
  }

  // Enable touch support for the grid
  enableTouchEvents(gridContainer);
}

function enableTouchEvents(container) {
  // Handle when the finger touches the grid
  container.addEventListener("touchstart", (event) => {
    handleTouch(event);
  });

  // Handle when the finger moves across the grid
  container.addEventListener("touchmove", (event) => {
    handleTouch(event);
    event.preventDefault(); // Prevent scrolling
  });
}

function handleTouch(event) {
  const touch = event.touches[0]; // Get the first touch point
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (target && target.classList.contains("gridBox")) {
    const currentOpacity = parseFloat(target.dataset.opacity);
    const newOpacity = incrementOpacity(currentOpacity);
    target.dataset.opacity = newOpacity;
    target.style.backgroundColor = generateRandomColor(newOpacity);
  }
}

/* Generate a reset button with each grid...probably makes more 
sense to just hardcode that into the HTML but that's the the project reqs. */
function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.textContent = "Reset Grid";
  resetButton.style.margin = "1em";
  resetButton.style.padding = "0.5em 1em";
  resetButton.style.border = "1px solid blue";
  resetButton.style.borderRadius = "5px";
  resetButton.style.cursor = "pointer";
  resetButton.addEventListener("click", () => {
    const gridSize = parseInt(prompt("Enter Grid Size (e.g., 16):"));
    if (gridSize && gridSize > 0 && gridSize <= 100) {
      generateGrid(gridSize);
    } else {
      alert("Please enter a valid number greater than 0 and less than 100!");
    }
  });
  return resetButton;
}


const body = generateBody();
const resetButton = createResetButton();
const title = document.createElement("h1");

//Create Title
body.appendChild(title);
title.textContent = "Etch-a-Sketch";
// Initialize the grid
generateGrid(16); // Default grid size
body.appendChild(resetButton);
