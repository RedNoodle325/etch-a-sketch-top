const body = document.querySelector("body");
body.style.display = "flex";
body.style.flexDirection = "column";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.margin = "0";
body.style.padding = "0";

const title = document.createElement("h1");
body.appendChild(title);
title.textContent = "Etch-a-Sketch";

function createContainer() {
  const container = document.createElement("div");
  container.className = "gridContainer";
  container.style.display = "flex";
  container.style.flexWrap = "wrap"; // Allows items to wrap
  container.style.justifyContent = "center"; // Centers the grid
  container.style.alignContent = "center"; // Ensures grid stays centered vertically
  container.style.width = "80vw"; // Set grid width (responsive)
  container.style.height = "80vw"; // Set grid height to match width for square shape
  container.style.maxWidth = "600px"; // Optional: cap size for large screens
  container.style.maxHeight = "600px"; // Match width cap for perfect square
  container.style.margin = "1em auto";
  container.style.border = "1px solid #000"; // Optional border for grid
  return container;
}

function setGrid(size) {
  // Remove existing grid
  const existingGrid = document.querySelector(".gridContainer");
  if (existingGrid) {
    existingGrid.remove();
  }

  // Create a new grid container
  const gridContainer = createContainer();
  body.appendChild(gridContainer);

  // Calculate the size of each grid item
  const containerWidth = gridContainer.offsetWidth; // Get actual container width
  const itemSize = Math.floor(containerWidth / size); // Ensure grid items fit exactly

  for (let i = 0; i < size * size; i++) {
    const gridBox = document.createElement("div");
    gridBox.className = "gridBox";
    gridBox.style.width = `${itemSize}px`; // Set exact width
    gridBox.style.height = `${itemSize}px`; // Set exact height for square
    gridBox.style.boxSizing = "border-box"; // Includes border in size
    gridBox.style.border = "1px solid #ccc";
    gridBox.style.backgroundColor = "#f9f9f9";

    // Hover effect
    gridBox.addEventListener("mouseenter", () => {
      gridBox.style.backgroundColor = "grey";
    });

    // Add grid box to the container
    gridContainer.appendChild(gridBox);
  }
}

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
      setGrid(gridSize);
    } else {
      alert("Please enter a valid number greater than 0 and less than 100!");
    }
  });
  return resetButton;
}

// Initialize the grid
const resetButton = createResetButton();
setGrid(16); // Default grid size
body.appendChild(resetButton);
