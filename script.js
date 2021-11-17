const dungeonArray = [
  {
    name: "GoblinDungeon",
    chestGroups: [
      {
        name: "Pre-FogChests",
        hours: 3,
        numOfChests: 6,
        lastLooted: [null, null, null, null, null, null],
        timeRemaining: [null, null, null, null, null, null],
      },
      {
        name: "RedCrystal",
        hours: 1,
        numOfChests: 2,
        lastLooted: [null, null],
        timeRemaining: [null, null],
      },
      {
        name: "GreenCrystal",
        hours: 1,
        numOfChests: 1,
        lastLooted: [null],
        timeRemaining: [null],
      },
    ],
  },
];

if (localStorage.getItem("timers")) {
  let parsedTimers;
  try {
    parsedTimers = JSON.parse(localStorage.getItem("timers"));
  } catch (err) {
    console.error("Err parsing existing timer: " + err);
  }

  Object.assign(dungeonArray, parsedTimers);
}

const setLastLooted = (reqDungeonName, reqChestGroup, reqChestNum) => {
  const matchingDungeon = dungeonArray.find(
    (dungeon) => dungeon.name === reqDungeonName
  );
  if (!matchingDungeon) return console.error("No matching dungeon");

  const matchingChestGroup = matchingDungeon.chestGroups.find(
    (chestGroup) => chestGroup.name === reqChestGroup
  );
  if (!matchingChestGroup) return console.error("No matching chest group");

  if (reqChestNum < 1 || reqChestNum > matchingChestGroup.numOfChests)
    return console.error("Invalid chest requested");

  matchingChestGroup.lastLooted[reqChestNum - 1] = Date.now();

  document.querySelector(
    `#${matchingChestGroup.name} .loot-chest-${reqChestNum}-btn`
  ).disabled = true;

  document.querySelector(
    `#${matchingChestGroup.name} .reset-chest-${reqChestNum}-btn`
  ).disabled = false;
};

const resetChest = (reqDungeonName, reqChestGroup, reqChestNum) => {
  const matchingDungeon = dungeonArray.find(
    (dungeon) => dungeon.name === reqDungeonName
  );
  if (!matchingDungeon) return console.error("No matching dungeon");

  const matchingChestGroup = matchingDungeon.chestGroups.find(
    (chestGroup) => chestGroup.name === reqChestGroup
  );
  if (!matchingChestGroup) return console.error("No matching chest group");

  if (reqChestNum < 1 || reqChestNum > matchingChestGroup.numOfChests)
    return console.error("Invalid chest requested");

  matchingChestGroup.lastLooted[reqChestNum - 1] = null;

  document.querySelector(
    `#${matchingChestGroup.name} .chest${reqChestNum}remaining`
  ).innerHTML = `00:00:00`;

  document.querySelector(
    `#${matchingChestGroup.name} .loot-chest-${reqChestNum}-btn`
  ).disabled = false;

  document.querySelector(
    `#${matchingChestGroup.name} .reset-chest-${reqChestNum}-btn`
  ).disabled = true;
};

const updateTimeRemaining = () => {
  dungeonArray.forEach((dungeon) => {
    dungeon.chestGroups.forEach((chestGroup) => {
      const passedMsRequired = 1000 * 60 * 60 * chestGroup.hours;
      chestGroup.lastLooted.forEach((time, index) => {
        if (time !== null) {
          const timeMsElapsed = Date.now() - time;

          let timeRemaining = passedMsRequired - timeMsElapsed;

          if (timeRemaining <= 0) {
            chestGroup.lastLooted[index] = null;
            chestGroup.timeRemaining[index] = null;

            document.querySelector(
              `#${chestGroup.name} .chest${index + 1}remaining`
            ).innerHTML = `00:00:00`;

            // Make sure buttons are still in correct state
            document.querySelector(
              `#${chestGroup.name} .loot-chest-${index + 1}-btn`
            ).disabled = false;
            document.querySelector(
              `#${chestGroup.name} .reset-chest-${index + 1}-btn`
            ).disabled = true;
          } else {
            const hoursLeft = Math.floor(timeRemaining / 1000 / 60 / 60)
              .toString()
              .padStart(2, "0");

            timeRemaining -= 1000 * 60 * 60 * Math.floor(hoursLeft);

            const minutesLeft = Math.floor(timeRemaining / 1000 / 60)
              .toString()
              .padStart(2, "0");

            timeRemaining -= 1000 * 60 * Math.floor(timeRemaining / 1000 / 60);

            const secondsLeft = Math.floor(timeRemaining / 1000)
              .toString()
              .padStart(2, "0");

            chestGroup.timeRemaining[
              index
            ] = `${hoursLeft}:${minutesLeft}:${secondsLeft}`;

            document.querySelector(
              `#${chestGroup.name} .chest${index + 1}remaining`
            ).innerHTML = `${hoursLeft}:${minutesLeft}:${secondsLeft}`;

            // Make sure buttons are still in correct state
            document.querySelector(
              `#${chestGroup.name} .loot-chest-${index + 1}-btn`
            ).disabled = true;
            document.querySelector(
              `#${chestGroup.name} .reset-chest-${index + 1}-btn`
            ).disabled = false;
          }
        } else {
          document.querySelector(
            `#${chestGroup.name} .chest${index + 1}remaining`
          ).innerHTML = `00:00:00`;

          // Make sure buttons are still in correct state
          document.querySelector(
            `#${chestGroup.name} .loot-chest-${index + 1}-btn`
          ).disabled = false;
          document.querySelector(
            `#${chestGroup.name} .reset-chest-${index + 1}-btn`
          ).disabled = true;
        }
      });
    });
  });
};

window.setInterval(() => {
  updateTimeRemaining();
}, 1000);

const showDungeon = (reqDungeonName) => {
  const requestedDungeon = dungeonArray.find(
    (dungeon) => dungeon.name === reqDungeonName
  );

  if (!requestedDungeon) return console.error("No dungeon found by that name");

  document.getElementById(`${requestedDungeon.name}`).classList.remove("dnone");
  document.getElementById("dungeon-list").classList.add("dnone");
};

const showMainPage = () => {
  document
    .querySelectorAll(".dungeon-section")
    .forEach((item) => item.classList.add("dnone"));

  document.getElementById("dungeon-list").classList.remove("dnone");
};

const lootAll = (reqDungeonName, reqChestGroup) => {
  const matchingDungeon = dungeonArray.find(
    (dungeon) => dungeon.name === reqDungeonName
  );
  if (!matchingDungeon) return console.error("No matching dungeon");

  const matchingChestGroup = matchingDungeon.chestGroups.find(
    (chestGroup) => chestGroup.name === reqChestGroup
  );
  if (!matchingChestGroup) return console.error("No matching chest group");

  matchingChestGroup.lastLooted.forEach(
    (timer, index) => (matchingChestGroup.lastLooted[index] = Date.now())
  );

  document
    .querySelectorAll(`#matchingChestGroup span`)
    .forEach((span) => (span.innerHTML = "00:00:00"));
};

const resetAll = (reqDungeonName, reqChestGroup) => {
  const matchingDungeon = dungeonArray.find(
    (dungeon) => dungeon.name === reqDungeonName
  );
  if (!matchingDungeon) return console.error("No matching dungeon");

  const matchingChestGroup = matchingDungeon.chestGroups.find(
    (chestGroup) => chestGroup.name === reqChestGroup
  );
  if (!matchingChestGroup) return console.error("No matching chest group");

  matchingChestGroup.lastLooted.forEach(
    (timer, index) => (matchingChestGroup.lastLooted[index] = null)
  );
};

const saveInterval = window.setInterval(() => {
  const dataToSave = JSON.stringify(dungeonArray);
  localStorage.setItem("timers", dataToSave);
}, 50);

const calculateAvailableChests = window.setInterval(() => {
  dungeonArray.forEach((dungeon) => {
    let availableString = "";

    dungeon.chestGroups.forEach((chestGroup) => {
      chestGroup.hours;
      let availableChests = 0;
      chestGroup.lastLooted.forEach((timer) => {
        if (timer === null) {
          availableChests++;
        }
      });

      availableString += `${chestGroup.hours}h (${availableChests}/${chestGroup.lastLooted.length}) `;
    });

    document.getElementById(`${dungeon.name}-totals`).innerHTML =
      availableString;
  });
}, 100);
