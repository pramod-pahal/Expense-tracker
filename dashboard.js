// Get references to HTML elements
const expenseForm = document.getElementById('expense-form');
const expenseListUl = document.getElementById('expense-list-ul');
const chartCanvas = document.getElementById('spending-pattern-chart');

// Initialize local storage
const storage = window.localStorage;
let expenses = storage.getItem('expenses') ? JSON.parse(storage.getItem('expenses')) : [];  // Start with empty list if localStorage is empty

// Function to add a new expense
function addExpense(event) {
    event.preventDefault();
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    // Ensure all fields are filled
    if (!date || !category || isNaN(amount)) {
        alert("Please fill out all fields.");
        return;
    }

    const newExpense = { date, category, amount };
    expenses.push(newExpense);  // Add the new expense to the array
    storage.setItem('expenses', JSON.stringify(expenses));  // Save the updated array to localStorage
    
    renderExpenses();  // Re-render the list of expenses
    renderChart();  // Update the chart with new data
}

// Function to remove an expense
function removeExpense(index) {
    expenses.splice(index, 1);  // Remove the expense at the given index
    storage.setItem('expenses', JSON.stringify(expenses));  // Update local storage
    renderExpenses();  // Re-render the list
    renderChart();  // Re-render the chart
}

// Function to render the expense list
function renderExpenses() {
    expenseListUl.innerHTML = '';  // Clear the list before re-rendering
    expenses.forEach((expense, index) => {
        const li = document.createElement('li');
        li.textContent = `${expense.date} - ${expense.category} - $${expense.amount.toFixed(2)}`;

        // Create a Remove button for each expense
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.style.marginLeft = '10px';
        removeButton.style.backgroundColor = '#FF6347';
        removeButton.style.color = '#fff';
        removeButton.style.border = 'none';
        removeButton.style.borderRadius = '5px';
        removeButton.style.cursor = 'pointer';

        // Add click event to remove the expense
        removeButton.addEventListener('click', () => removeExpense(index));

        // Append the remove button to the list item
        li.appendChild(removeButton);

        // Append the list item to the UL
        expenseListUl.appendChild(li);
    });
}

// Function to render the chart dynamically
function renderChart() {
    const ctx = chartCanvas.getContext('2d');
    ctx.clearRect(0, 0, chartCanvas.width, chartCanvas.height);  // Clear the previous chart
    
    // Categorize expenses
    const categories = {};
    expenses.forEach((expense) => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    });

    // Prepare data for the chart
    const labels = Object.keys(categories);
    const data = Object.values(categories);
    
    // Draw the chart using Chart.js
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Expenses',
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Add event listener to form to handle form submission
expenseForm.addEventListener('submit', addExpense);

// Render initial expenses and chart on page load
document.addEventListener('DOMContentLoaded', () => {
    renderExpenses();
    renderChart();
});

// Auto-refresh the page every 30 seconds
setInterval(() => {
  window.location.reload();
}, 30000);  // 30000 milliseconds = 30 seconds


// animated

// Lottie Animation
const animation = lottie.loadAnimation({
  container: document.getElementById('lottie-icon'), // Container to render animation
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'path/to/your/lottie-animation.json' // JSON data for the animation
});
