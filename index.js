"use strict";

let habits = [];

const buttons = [
  {
    id: "navBtn5",
    imageId: "dumbbel",
    src: "img/dumbbell.svg",
    srcWhite: "img/dumbbell-white.svg",
  },
  {
    id: "navBtn6",
    imageId: "water",
    src: "img/water.svg",
    srcWhite: "img/water-white.svg",
  },
  {
    id: "navBtn7",
    imageId: "eat",
    src: "img/eat.svg",
    srcWhite: "img/eat-white.svg",
  },
];

let pageElements = {
  daysList: document.querySelector(".main__list"),
  reportComment: document.querySelector(".comment"),
  commentInput: document.querySelector(".comment__comment-input"),
  menu: document.querySelector(".nav"),
  header: document.querySelector(".header"),
  daysComment: document.querySelector(".comment__day"),
};

window.pageElements = pageElements;

let globalactiveHabitId = 1;

let activeHabit = {};

function loadHabits() {
  try {
    const habitsJSON = localStorage.getItem('habits');
    return JSON.parse(habitsJSON) || [];
  } catch(error) {
    console.warn(error);
    return [];
  }
}

function save(habits) {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function render(activeHabit) {
  rerenderMenu();
  rerenderHead(activeHabit);
  rerenderContent(activeHabit);
}

function resetRadio() {
  const labels = document.querySelectorAll('.modal__progress_button');
  labels.forEach(label => {
    switch (label.dataset.icon) {
      case "dumbbell":
        label.setAttribute('style', "background-image: url('./img/dumbbell.svg'); background-color: var(--color-white);");
        break;
      case "water":
        label.setAttribute('style', "background-image: url('./img/water.svg'); background-color: var(--color-white);");
        break;
      case "eat":
        label.setAttribute('style', "background-image: url('./img/eat.svg'); background-color: var(--color-white);");
        break;
    }
  });
}

function activRadio(event) {
  resetRadio();

  const activLabel = event.target.closest('.modal__progress_button');
  switch (activLabel.dataset.icon) {
    case "dumbbell":
      activLabel.setAttribute('style', "background-image: url('./img/dumbbell-white.svg'); background-color: var(--color-primary);");
      break;
    case "water":
      activLabel.setAttribute('style', "background-image: url('./img/water-white.svg'); background-color: var(--color-primary);");
      break;
    case "eat":
      activLabel.setAttribute('style', "background-image: url('./img/eat-white.svg'); background-color: var(--color-primary);");
      break;
  }
}

function dialogHendler() {
  const dialog = document.querySelector(".modal-bacdrop")
  if (!dialog.hasAttribute("open")) {
    dialog.showModal();
  } else {
    dialog.close();
  }
}

function addHabit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const icon = formData.get("icon");
  const name = formData.get("name");
  const target = formData.get("target");


  const newHabit = {
    id: habits.length ? habits[habits.length - 1].id + 1 : 1,
    icon: icon,
    name: name,
    target: target,
    days: [],
  };

  habits.push(newHabit);
  save(habits);

  render(activeHabit);
  resetRadio();
  dialogHendler();
  
}

function addDay(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const commentValue = formData.get("comment");

  if (commentValue.trim()) {
    habits = habits.map((habit) => {
      if (habit.id !== activeHabit.id) {
        return habit;
      }
      habit.days.push({ comment: commentValue });
      return habit;
    });
    rerenderContent(
      habits.filter((habit) => habit.id === globalactiveHabitId)[0]
    );
  }
  const commentInput = document.querySelector(".comment__comment-input");
  commentInput.value = "";
  save(habits);
  render(activeHabit);
}

function deleteDay(habitIndex, dayIndex) {
  habits[habitIndex].days.splice(dayIndex, 1);
  rerenderContent(habits[habitIndex]);
}

function rerenderHead(habit) {
  pageElements.header.innerHTML = `
              <h1 class="header__title">${habit.name}</h1>
              <div class="progress">
                  <div class="progress__title">
                    <p class="progress__text">Прогресс</p>
                    <p class="progress__percentage">80%</p>
                  </div>
                  <div class="progress__line">
                      <div class="progress__line-percentage"></div>
                  </div>
              </div>
    `;

  let progressBar = document.querySelector(".progress__line-percentage");
  let percentage = 0;
  if (progressBar && habit.target > 0) {
    let daysCompleted = habit.days.length;
    percentage = (daysCompleted / habit.target) * 100;
    progressBar.style.width = `${percentage}%`;
  }

  let progressLine = document.querySelector(".progress__percentage");
  if (progressLine) {
    progressLine.textContent = `${Math.round(percentage)}%`;
  }
}

function rerenderContent(habit) {
  const habitIndex = habits.findIndex((item) => item.id === habit.id);

  pageElements.daysList.innerHTML = "";

  habit.days.forEach((item, dayIndex) => {
    const reportItem = document.createElement("li");
    reportItem.classList.add("main__item", "report");

    reportItem.innerHTML = `
        <span class="report__day">День ${dayIndex + 1}</span>
        <span class="report__text">${item.comment}</span>
        <button class="report__del-button" onclick="deleteDay(${habitIndex}, ${dayIndex})">
          <img src="img/delete.svg" alt="Корзина" />
        </button>
      `;

    pageElements.daysList.appendChild(reportItem);
  });
  pageElements.daysComment.textContent = `День ${habit.days.length + 1}`;
}

function rerenderMenu() {
  let itemBtn = pageElements.menu;

  for (const habit of habits) {
    let button = document.querySelector(`[menu-habit-id="${habit.id}"]`);
    const isActiv = activeHabit?.id === habit?.id;
    if (!button) {
      button = document.createElement("button");
      button.classList.add("nav__btn");
      button.setAttribute("menu-habit-id", habit.id);

      button.setAttribute("onclick", `menuClickHandler(${habit.id})`);
    }
    const img = `<img 
        src="/img/${habit.icon}${isActiv ? "-white" : ""}.svg"
        >`;

    button.innerHTML = img;

    isActiv
      ? button.classList.add("nav__btn--activ")
      : button.classList.remove("nav__btn--activ");

    itemBtn.appendChild(button);
  }
}

function menuClickHandler(habitId) {
  globalactiveHabitId = habitId;
  activeHabit = habits.filter((habit) => habit.id === habitId)[0];

  render(activeHabit);
}

document.addEventListener("DOMContentLoaded", () => {
  habits = loadHabits();
  activeHabit = habits[0]
  if (activeHabit) {
    render(activeHabit);
  } else {
    dialogHendler()
  }

  
});
