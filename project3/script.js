const taskInput = document.querySelector("#task-input");

const addButton = document.querySelector("#add-btn");

const taskList = document.querySelector("#task-list");

const completedCount = document.querySelector("#completed-count");

const pendingCount = document.querySelector("#pending-count");

const clearButton = document.querySelector("#clear-btn");

const greeting = document.querySelector("#greeting");

const hour = new Date().getHours();

if (hour < 12) {
    greeting.textContent = "Good Morning, Girlytech 👋";
}
else if (hour < 18) {
    greeting.textContent = "Good Afternoon, Girlytech ☀️";
}
else {
    greeting.textContent = "Good Evening, Girlytech 🌙";
}

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a goal");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
    
    <span>${taskText}</span>

    <div class="task-buttons">
        <button class="complete-btn">✓</button>
    </div>
    
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounts();


    addTaskEvents();

    saveTasks();

}

addButton.addEventListener("click", addTask);

function updateCounts() {

    const allTasks = document.querySelectorAll("#task-list li");

    const completedTasks = document.querySelectorAll(
        "#task-list li.completed"
    );

    completedCount.textContent = completedTasks.length;

    pendingCount.textContent =
        allTasks.length - completedTasks.length;

}

clearButton.addEventListener(
    "click",
    function () {

        const completedTasks =
            document.querySelectorAll(
                "#task-list li.completed"
            );

        completedTasks.forEach(
            function (task) {

                task.remove();

            }
        );

        updateCounts();

        saveTasks();

    });

function saveTasks() {

    localStorage.setItem(
        "goals",
        taskList.innerHTML
    );

}

function loadTasks() {

    const savedTasks =
        localStorage.getItem("goals");

    if (savedTasks) {

        taskList.innerHTML = savedTasks;

        addTaskEvents();

        updateCounts();

    }

}

function addTaskEvents() {

    const allTasks =
        document.querySelectorAll("#task-list li");

    allTasks.forEach(function (li) {

        const completeButton =
            li.querySelector(".complete-btn");

        const deleteButton =
            li.querySelector(".delete-btn");


        completeButton.addEventListener(
            "click",
            function () {

                li.classList.toggle(
                    "completed"
                );

                updateCounts();

                saveTasks();

            }
        );


        deleteButton.addEventListener(
            "click",
            function () {

                li.remove();

                updateCounts();

                saveTasks();

            }
        );

    });

}

const quote = document.querySelector("#quote");

const quoteButton = document.querySelector("#quote-btn");

const quotes = [
    "Small progress is still progress.",
    "Consistency beats motivation.",
    "Discipline will take you where feelings cannot.",
    "You do not become confident first. You become confident by doing.",
    "Focus on being better than yesterday.",
    "Every expert was once a beginner.",
    "Keep showing up even on difficult days.",
    "Growth happens outside comfort zones."
];

quoteButton.addEventListener("click", function () {

    const randomNumber = Math.floor(
        Math.random() * quotes.length
    );

    quote.textContent = quotes[randomNumber];

});

loadTasks();