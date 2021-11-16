const dungeonArray = [
  {
    name: "Goblin Dungeon",
    chestGroups: [
      {
        name: "Pre-Fog Chests",
        hours: 3,
        numOfChests: 6,
        lastLooted: [null, null, null, null, null, null],
        timeRemaining: [null, null, null, null, null, null],
      },
      {
        name: "Red Crystal",
        hours: 1,
        numOfChests: 2,
        lastLooted: [null, null],
        timeRemaining: [null, null],
      },
      {
        name: "Green Crystal",
        hours: 1,
        numOfChests: 1,
        lastLooted: [null],
        timeRemaining: [null],
      },
    ],
  },
];

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
          }
        }
      });
    });
  });
};
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
