import { useState, useEffect } from "react";
import axios from "axios";

import LayoutFloor from "../admin/table/LayoutFloor";

export default function TableLayout({ selectedTable, setSelectedTable }) {
  const [tables, setTables] = useState([]);

  const fetchTables = async () => {
    const res = await axios.get("http://localhost:3000/tables");

    const formatted = res.data.map((t) => ({
      id: t.id,
      name: t.tableNumber,
      type: t.shape,
      capacity: t.capacity,
      isActive: t.isActive,
      x: t.positionX,
      y: t.positionY,
    }));

    setTables(formatted);
  };

  useEffect(() => {
    fetchTables();
  }, []);

  return (
    <LayoutFloor
      tables={tables}
      width={"365px"}
      height={"200px"}
      selectedTable={selectedTable}
      setSelectedTable={setSelectedTable}
    />
  );
}
