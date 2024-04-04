import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { TeamTickets } from "./TeamTickets";

export default function Teams({
  tasks,
  columns,
  handleDeleteColumn,
  handleEditTeam
}) {
  //eslint-disable-next-line no-unused-vars
  const [data, setData] = useState(null);
  const [items, setItems] = useState({});
  const [containers, setContainers] = useState([]);
  const [tickets, setTickets] = useState(tasks);

  useEffect(() => {
    if (tickets) {
      setData(tickets);
      let cols = {};
      columns.sort((a, b) => a.order - b.order);
      columns.forEach((c) => {
        cols["column-" + c.id] = [];
      });
      tickets.forEach((d) => {
        if (!("column-" + d.col_id in cols)) {
          cols["column-" + d.col_id] = [];
        }
        cols["column-" + d.col_id].push("task-" + d.id);
      });
      setItems(cols);
      setContainers(Object.keys(cols));
    }
  }, [tickets, columns]);

  const handleSubmitRaiseTicket = (id, values) => {
    setTickets([
      ...tickets
    ]);

  };

  return (
    <div className="board">
      <div className="board-container">
        <SortableContext
          items={containers}
          strategy={horizontalListSortingStrategy}
        >
          {containers.map((containerId) => {
            const checkPos = columns.filter(
              (c) => "column-" + c.id === containerId
            );
            if (checkPos.length > 0 && checkPos[0].isDeleted === false) {
              const columnName = columns.filter(
                (c) => "column-" + c.id === containerId
              )[0].name;
              const columnDescription = columns.filter(
                (c) => "column-" + c.id === containerId
              )[0].description;
              const pid = columns.filter(
                (c) => "column-" + c.id === containerId
              )[0]._id;

              return (
                <TeamTickets
                  pid={pid}
                  id={containerId}
                  key={containerId}
                  items={items[containerId]}
                  name={columnName}
                  description={columnDescription}
                  handleDeleteColumn={handleDeleteColumn}
                  handleEditTeam={handleEditTeam}
                  handleSubmitRaiseTicket={handleSubmitRaiseTicket}
                />
              );
            } else {
              return null;
            }
          })}
        </SortableContext>
      </div>
    </div>
  );
}
