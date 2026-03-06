import {
  Clock,
  ChefHat,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";

export const ORDER_STATUSES = [
  {
    value: "Pending",
    label: "Pending",
    color: "bg-gray-100 text-gray-700",
    icon: Clock,
  },
  {
    value: "Preparing",
    label: "Preparing",
    color: "bg-yellow-100 text-yellow-700",
    icon: ChefHat,
  },
  {
    value: "Out For Delivery",
    label: "Out For Delivery",
    color: "bg-blue-100 text-blue-700",
    icon: Package,
  },
  {
    value: "Delivered",
    label: "Delivered",
    color: "bg-green-100 text-green-700",
    icon: CheckCircle,
  },
  {
    value: "Cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: XCircle,
  },
];