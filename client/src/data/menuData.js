const BASE_URL = "http://localhost:3000/menu/categories";

const defaultCategory = {
  name: "All",
  image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
};

let cachedCategories = null;

export async function getCategories() {
  // ✅ memory cache (prevents multiple API calls)
  if (cachedCategories) {
    return cachedCategories;
  }

  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();

    cachedCategories = [defaultCategory, ...data];

    return cachedCategories;
  } catch (error) {
    console.error("Category API Error:", error);

    // fallback safe return
    return [defaultCategory];
  }
}

export const menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 299,
    rating: 4.5,
    image:
      "https://img.freepik.com/premium-photo/pizza-with-cheese-tomatoes_807701-1693.jpg",
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 199,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 3,
    name: "Cold Coffee",
    category: "Drinks",
    price: 149,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
  },
  {
    id: 4,
    name: "Chocolate Brownie",
    category: "Dessert",
    price: 179,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52",
  },
  {
    id: 5,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e",
  },
  {
    id: 6,
    name: "Veggie Supreme Pizza",
    category: "Pizza",
    price: 329,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591",
  },
  {
    id: 7,
    name: "Paneer Burger",
    category: "Burger",
    price: 219,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  },
  {
    id: 8,
    name: "Double Patty Burger",
    category: "Burger",
    price: 259,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b",
  },
  {
    id: 9,
    name: "French Fries",
    category: "Snacks",
    price: 129,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
  },
  {
    id: 10,
    name: "Peri Peri Fries",
    category: "Snacks",
    price: 149,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d",
  },
  {
    id: 11,
    name: "Veg Sandwich",
    category: "Snacks",
    price: 159,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
  },
  {
    id: 12,
    name: "Grilled Cheese Sandwich",
    category: "Snacks",
    price: 179,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122",
  },
  {
    id: 13,
    name: "Mojito",
    category: "Drinks",
    price: 139,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87",
  },
  {
    id: 14,
    name: "Oreo Milkshake",
    category: "Drinks",
    price: 189,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
  },
  {
    id: 15,
    name: "Strawberry Shake",
    category: "Drinks",
    price: 169,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888",
  },
  {
    id: 16,
    name: "Vanilla Ice Cream",
    category: "Dessert",
    price: 99,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb",
  },
  {
    id: 17,
    name: "Chocolate Ice Cream",
    category: "Dessert",
    price: 109,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371",
  },
  {
    id: 18,
    name: "Red Velvet Cake",
    category: "Dessert",
    price: 199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f",
  },
  {
    id: 19,
    name: "Tandoori Paneer Pizza",
    category: "Pizza",
    price: 379,
    rating: 4.6,
    image:
      "https://tse1.mm.bing.net/th/id/OIP.Fp45aEw9ZK27Cl95B-nmwgHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1.1&o=7&rm=3",
  },
  {
    id: 20,
    name: "Mexican Burger",
    category: "Burger",
    price: 239,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1550317138-10000687a72b",
  },
  {
    id: 21,
    name: "Masala Coke",
    category: "Drinks",
    price: 89,
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a",
  },
  {
    id: 22,
    name: "Garlic Bread",
    category: "Snacks",
    price: 149,
    rating: 4.2,
    image:
      "https://www.scrumptiously.com/wp-content/uploads/2023/10/GarlicBread.webp",
  },
  {
    id: 23,
    name: "Cheese Garlic Bread",
    category: "Snacks",
    price: 179,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
  },
  {
    id: 24,
    name: "Blueberry Cheesecake",
    category: "Dessert",
    price: 229,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
  },
  {
    id: 25,
    name: "Classic Lemonade",
    category: "Drinks",
    price: 119,
    rating: 4.1,
    image:
      "https://static.vecteezy.com/system/resources/previews/040/805/736/large_2x/ai-generated-refreshing-iced-lemonade-with-lemon-slice-and-mint-on-bright-outdoor-patio-free-photo.jpg",
  },
];
