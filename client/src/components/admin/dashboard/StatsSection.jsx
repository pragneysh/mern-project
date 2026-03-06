import StatsCard from "./StatsCard";
import { ShoppingCart, IndianRupee, Clock, Utensils } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { title: "Total Orders", value: "245", icon: ShoppingCart },
    { title: "Total Revenue", value: "₹52,430", icon: IndianRupee },
    { title: "Pending Orders", value: "18", icon: Clock },
    { title: "Menu Items", value: "32", icon: Utensils },
  ];

  return (
    <div className="w-full px-4 sm:px-0">
      <div className="grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-2 
        lg:grid-cols-4 
        gap-4 sm:gap-6 
        mb-8"
      >
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </div>
    </div>
  );
}