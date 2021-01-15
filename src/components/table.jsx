import React, { useState, useEffect } from "react";
import "./table.css";

function Table() {
  const [selected, setSelected] = useState(null);
  const [actualUser, setActualUser] = useState("Gino");
  const [points, setPoints] = useState(new Map());
  const [teamsSorted, setTeamsSorted] = useState([]);
  const [uncoveredCards, setUncoveredCards] = useState([])

  const users = ["Gino", "Roberto"];
  const TEAMS = [
    "boca",
    "river",
    "sanlorenzo",
    "estudiantes",
    "racing",
    "independiente",
    "velez",
    "huracan",
  ];

  useEffect(() => {
    const len = TEAMS.length;
    const SIZES = [2, 2, 2, 2, 2, 2, 2, 2];

    const localTeams = [];
    for (let n = 0; n < len * 2; n++) {
      let res;
      do {
        res = Math.round(Math.random() * (len - 1));
      } while (SIZES[res] === 0);
      localTeams.push(TEAMS[res]);
      SIZES[res]--;
    }
    setTeamsSorted(localTeams);

    const localPoints = new Map();
    users.forEach((user) => {
      localPoints.set(user, 0);
    });
    setPoints(localPoints);

    setActualUser("Gino");
    return () => {};
  }, []);

  const uncoverCard = (id) => {
    if (selected === null) {
      setSelected(id);
      return;
    }

    if (teamsSorted[id] === teamsSorted[selected]) {
      points.set(actualUser, points.get(actualUser) + 1);
      uncoveredCards.push(selected);
      uncoveredCards.push(id);
      setUncoveredCards(uncoveredCards)
    } else {
      setActualUser("Gino" === actualUser ? "Roberto" : "Gino");
    }

    setSelected(null);
  };

  return (
    <div>
      <div className="grid">
        {teamsSorted.map((team, i) => {
          const showCard = uncoveredCards.indexOf(i) > -1 || i === selected;
          return (
            <div
              className={`box ${
                showCard ? team : "coveredCard"
              }`}
              onClick={() => {
                uncoverCard(i);
              }}
            ></div>
          );
        })}
      </div>
      <div className="points">
        {Object.entries(points).map((key, v) => {
          return <div>{v[0]}</div>;
        })}
      </div>
    </div>
  );
}

export default Table;
