"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let habits = [
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
      id: "navBtn1",
      imageId: "btnDumbbel",
      src: "img/dumbbell.svg",
      srcWhite: "img/dumbbell-white.svg",
    },
    {
      id: "navBtn2",
      imageId: "btnWater",
      src: "img/water.svg",
      srcWhite: "img/water-white.svg",
    },
    {
      id: "navBtn3",
      imageId: "btnEat",
      src: "img/eat.svg",
      srcWhite: "img/eat-white.svg",
    },
    {
      id: "navBtn4",
      imageId: "btnAdd",
      src: "img/add.svg",
      srcWhite: "img/add-white.svg",
    },
    {
      id: "navBtn5",
      imageId: "Dumbbel",
      src: "img/dumbbell.svg",
      srcWhite: "img/dumbbell-white.svg",
    },
    {
      id: "navBtn6",
      imageId: "Water",
      src: "img/water.svg",
      srcWhite: "img/water-white.svg",
    },
    {
      id: "navBtn7",
      imageId: "Eat",
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
  };
  window.pageElements = pageElements;

  let globalActiveHabitId = habits[0];

  function addHabit () {
    console.log('в разработке...')
  }

  function togglePopup () {
    const dialog = document.querySelector("dialog");
  document.querySelector("#navBtn4").onclick = function () {
    dialog.showModal();
  };
  document.querySelector("#close").onclick = function () {
    dialog.close();
  };

  }

  function addDay () {
    document
    .getElementById("commentForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      alert("Форма отправлена!");
    });
  }
  
  function deleteDay () {
    console.log('в разработке...')
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
    pageElements.daysList.innerHTML = "";

    for (let i = 0; i < habit.days.length; i++) {
      const item = habit.days[i];
      const reportItem = document.createElement("li");
      reportItem.classList.add("main__item", "report");

      reportItem.innerHTML = `
        <span class="report__day">День ${i + 1}</span>
        <span class="report__text">${item.comment}</span>
        <button class="report__del-button">
          <img src="img/delete.svg" alt="Корзина" />
        </button>
      `;

      pageElements.daysList.appendChild(reportItem);
    }
  }

  function rerenderMenu(habits) {
    let itemBtn = pageElements.menu;

    for (const habit of habits) {
      const existed = document.querySelector(`[menu-habit-id="${habit.id}"]`);
      if (existed) {
        continue;
      }

      let button = document.createElement("button");
      button.classList.add("nav__btn");
      button.setAttribute("menu-habit-id", habit.id);

      if (globalActiveHabitId.id === habit.id) {
        button.classList.add("nav__btn--activ");
      }

      let img = document.createElement("img");
      img.src = 1; // не придумала как вытянуть данные
      button.appendChild(img);

      button.addEventListener("click", () => {
        rerenderHead(habit);
        rerenderContent(habit);
      });

      itemBtn.appendChild(button);
    }
  }
  rerenderMenu(habits);
});
