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
  container.style.flexWrap = "wrap"; // Ensures items wrap into rows
  container.style.justifyContent = "flex-start"; // Align items to the start
  container.style.alignContent = "flex-start"; // Align wrapped rows to the top
  container.style.width = "80vw"; // Set grid width (responsive)
  container.style.height = "80vw"; // Set grid height to match width
  container.style.maxWidth = "600px"; // Cap size for large screens
  container.style.maxHeight = "600px"; // Match width cap
  container.style.margin = "1em auto";
  container.style.border = "1em black solid";
  container.style.boxSizing = "border-box"; // Includes border in dimensions
  container.style.cursor = "pointer";

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
  const containerWidth = gridContainer.clientWidth; // Get the actual container width
  const itemSize = containerWidth / size; // Divide the width evenly by the grid size

  // Create grid items
  for (let i = 0; i < size * size; i++) {
    const gridBox = document.createElement("div");
    gridBox.className = "gridBox";
    gridBox.style.width = `${itemSize}px`; // Set width based on calculation
    gridBox.style.height = `${itemSize}px`; // Set height equal to width for squares
    gridBox.style.boxSizing = "border-box"; // Ensure borders don't affect size
    gridBox.style.backgroundColor = "#f9f9f9";

    // Optional: Add a light border for visibility
    gridBox.style.border = "0.5px solid #ccc";

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
