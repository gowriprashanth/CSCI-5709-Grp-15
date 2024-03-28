// import {
//   SortableContext,
//   horizontalListSortingStrategy,
// } from "@dnd-kit/sortable";
import React, { useEffect, useState } from "react";
import { TeamTickets } from "./TeamTickets";

export default function Teams({
  tasks,
  columns,
  handleDeleteColumn,
  handleEditTeam,
}) {
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
      ...tickets,
      {
        id: tickets.length + 1,
        col_id: parseInt(id.split("-")[1]),
        description: values.description,
        title: values.title,
        status: { st: "Not Started", color: "red" },
      },
    ]);
  };

  return (
    <div className="board">
      <div className="board-container">
        
      </div>
    </div>
  );
}
