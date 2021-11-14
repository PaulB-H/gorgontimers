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
