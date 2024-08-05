"use strict";

const habits = [
  {
    id: 1,
    icon: "dumbbell",
    name: "Отжимания!",
    target: 15,
    days: [
      { comment: "Первый подход всегда даётся тяжело" },
      { comment: "Второй день уже проще" },
    ],
  },
  {
    id: 2,
    icon: "eat",
    name: "Правильное питание!",
    target: 15,
    days: [{ comment: "Круто!" }],
  },
];

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

let globalActiveHabitId = 1;

let activeHabitId = habits.filter(
  (habit) => habit.id === globalActiveHabitId
)[0];

function render(activeHabitId) {
  rerenderMenu(activeHabitId);
  rerenderHead(activeHabitId);
  rerenderContent(activeHabitId);
  togglePopup(buttons);
}

function togglePopup(buttons) {
  const dialog = document.querySelector(".modal-bacdrop");

  document.querySelector("#open").addEventListener("click", () => dialog.showModal());
  document.querySelector("#close").addEventListener("click", () => dialog.close());

  buttons.forEach(({ id, imageId, src, srcWhite }) => {
    const button = document.getElementById(id);
    const image = document.getElementById(imageId);

    if (button && image) {
      image.src = src;

      button.addEventListener("click", () => {
        buttons.forEach(({ id, imageId, src }) => {
          const btn = document.getElementById(id);
          const btnImage = document.getElementById(imageId);
          if (btn && btnImage) {
            btn.classList.remove("modal__progress-activ");
            btnImage.src = src;
          }
        });

        button.classList.add("modal__progress-activ");
        image.src = srcWhite;
      });
    }
  });
}

function addHabit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const icon = document.querySelector(".modal__progress-activ").getAttribute("id");
  const name = formData.get("name");
  const target = formData.get("target");

  const newHabit = {
    id: habits.length + 1,
    icon: icon,
    name: name,
    target: target,
    days: [{ comment: "" }],
  };

  habits.push(newHabit);
  rerenderMenu(habits);
  document.querySelector(".modal__add").addEventListener("click", () => dialog.close());
}

// не смогла определить конкретный хэбит
function addDay(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const commentValue = formData.get("comment");

  if (commentValue.trim()) {
    habits[0].days.push({ comment: commentValue });
    rerenderContent(habits[0]);
  }
  const commentInput = document.querySelector(".comment__comment-input");
  commentInput.value = "";
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

    pageElements.daysComment.textContent = `День ${habit.days.length + 1}`;
    pageElements.daysList.appendChild(reportItem);
  });
}

function rerenderMenu(habit) {
  let itemBtn = pageElements.menu;

  for (const habit of habits) {
    let button = document.querySelector(`[menu-habit-id="${habit.id}"]`);
    const isActiv = activeHabitId.id === habit.id;
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
  globalActiveHabitId = habitId;
  activeHabitId = habits.filter((habit) => habit.id === habitId)[0];

  render(activeHabitId);
}

document.addEventListener("DOMContentLoaded", () => {
  render(activeHabitId);
});
