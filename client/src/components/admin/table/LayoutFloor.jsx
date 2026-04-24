import Draggable from "react-draggable";
import { useRef, useMemo, useState, useEffect } from "react";
import TableItem from "./TableItem";
import React from "react";
import Cookies from "js-cookie";

export default function LayoutFloor({
  tables,
  updatePosition,
  onEdit,
  onDelete,
  width,
  height,
  selectedTable,
  setSelectedTable,
}) {
  const nodeRefs = useRef({});
  const containerRef = useRef(null);
  const isAdmin = Cookies.get("isAdmin") === "true";

  const canvasWidth = parseInt(width);
  const canvasHeight = parseInt(height);

  const [containerWidth, setContainerWidth] = useState(canvasWidth);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scale = useMemo(() => {
    if (!tables.length) return containerWidth / canvasWidth;

    const maxX = Math.max(...tables.map((t) => t.x));
    const maxY = Math.max(...tables.map((t) => t.y));

    const scaleX = containerWidth / (maxX + 150);
    const scaleY = canvasHeight / (maxY + 150);

    return Math.min(scaleX, scaleY, containerWidth / canvasWidth, 1);
  }, [tables, canvasWidth, canvasHeight, containerWidth]);

  return (
    <div className="bg-white rounded-xl shadow p-4 border">
      <div
        ref={containerRef}
        className="relative bg-gray-50 rounded-lg overflow-hidden border w-full"
        style={{ height }}
      >
        <div
          style={{
            width: canvasWidth,
            height: canvasHeight,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          {tables.map((table) => {
            if (!nodeRefs.current[table.id]) {
              nodeRefs.current[table.id] = React.createRef();
            }

            const isSelected = selectedTable === table.name;

            return (
              <Draggable
                key={table.id}
                nodeRef={nodeRefs.current[table.id]}
                position={{ x: table.x, y: table.y }}
                onStop={(e, data) =>
                  updatePosition && updatePosition(table.id, data.x, data.y)
                }
                disabled={!isAdmin}
              >
                <div
                  ref={nodeRefs.current[table.id]}
                  className="absolute cursor-pointer"
                  onClick={() => {
                    if (!isAdmin && setSelectedTable) {
                      setSelectedTable(table.name);
                    }
                  }}
                >
                  <TableItem
                    table={table}
                    isSelected={isSelected}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSelect={(name) => {
                      if (selectedTable === name) {
                        setSelectedTable(null);
                      } else {
                        setSelectedTable(name);
                      }
                    }}
                  />
                </div>
              </Draggable>
            );
          })}
        </div>
      </div>
    </div>
  );
}
