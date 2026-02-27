import { useState, useEffect } from "react";
import { getCategories, menuItems } from "../data/menuData";
import SearchBar from "../components/users/menu/SearchBar";
import CategoryList from "../components/users/menu/CategoryList";
import MenuGrid from "../components/users/menu/MenuGrid";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const filteredItems = menuItems.filter(
    (item) =>
      (category === "All" || item.category === category) &&
      item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen px-4 py-8 container mx-auto">

      <SearchBar search={search} setSearch={setSearch} />

      <CategoryList
        categories={categories}
        category={category}
        setCategory={setCategory}
      />

      <MenuGrid items={filteredItems} />
    </div>
  );
}