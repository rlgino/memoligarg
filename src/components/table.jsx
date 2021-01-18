import React, { useState, useEffect } from "react";
import "./table.css";

function Table() {
  const [selected, setSelected] = useState(null);
  const [actualUser, setActualUser] = useState("Gino");
  const [points, setPoints] = useState(new Map());
  const [teamsSorted, setTeamsSorted] = useState([]);
  const [uncoveredCards, setUncoveredCards] = useState([]);
  const [msg, setMsg] = useState(null)

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
    if (msg !== null)
      return
    console.log(`Show card ${id}`);
    uncoveredCards.push(id)
    setUncoveredCards(uncoveredCards)
    if (selected === null) {
      setSelected(id);
      return;
    }

    if (teamsSorted[id] === teamsSorted[selected]) {
      setMsg("Coincidencia! Punto para " + actualUser)
      points.set(actualUser, points.get(actualUser) + 1);
      setSelected(null);
    } else {
      setMsg("No coincide")
      setTimeout(()=> {
        const id1 = uncoveredCards.pop()
        const id2 = uncoveredCards.pop()
        console.log(`Hide cards ${id1} ${id2}`);
        setUncoveredCards(uncoveredCards);
        setActualUser("Gino" === actualUser ? "Roberto" : "Gino");
        setSelected(null);
        setMsg(null)
      }, 3000)
    }
  };

  return (
    <div>
      <div>{ msg !== null ? `Error msg: ${msg}` : <></>}</div>
      <div className="grid">
        {teamsSorted.map((team, i) => {
          const showCard = uncoveredCards.indexOf(i) > -1 || i === selected;
          return (
            <div key={i}
              className={`box ${showCard ? team : "coveredCard"}`}
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
