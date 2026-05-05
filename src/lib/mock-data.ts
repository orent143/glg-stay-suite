export type RoomStatus = "Available" | "Occupied" | "Maintenance";
export type BookingStatus = "Pending" | "Approved" | "Rejected";
export type PaymentStatus = "Paid" | "Unpaid" | "Overdue";

export interface Room {
  id: string;
  name: string;
  type: "Single" | "Double" | "Studio" | "Shared";
  price: number; // PHP / month
  capacity: number;
  status: RoomStatus;
  amenities: string[];
  description: string;
  image: string;
  area: string;
}

export const rooms: Room[] = [
  {
    id: "R-101",
    name: "Sunrise Single Room",
    type: "Single",
    price: 3500,
    capacity: 1,
    status: "Available",
    amenities: ["Wi-Fi", "Aircon", "Private Bath", "Study Desk"],
    description: "A quiet single room facing the morning sun, ideal for students and young professionals based in Digos City.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80&auto=format&fit=crop",
    area: "12 sqm",
  },
  {
    id: "R-102",
    name: "Acacia Double Room",
    type: "Double",
    price: 5200,
    capacity: 2,
    status: "Occupied",
    amenities: ["Wi-Fi", "Aircon", "Shared Kitchen", "Laundry"],
    description: "Spacious double-occupancy room with natural ventilation, perfect for siblings or close friends.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80&auto=format&fit=crop",
    area: "18 sqm",
  },
  {
    id: "R-103",
    name: "Mahogany Studio",
    type: "Studio",
    price: 7800,
    capacity: 2,
    status: "Available",
    amenities: ["Wi-Fi", "Aircon", "Private Kitchen", "Private Bath", "Balcony"],
    description: "Fully furnished studio with private kitchen and balcony view of the neighborhood.",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=80&auto=format&fit=crop",
    area: "24 sqm",
  },
  {
    id: "R-104",
    name: "Narra Shared Room",
    type: "Shared",
    price: 2200,
    capacity: 4,
    status: "Available",
    amenities: ["Wi-Fi", "Fan", "Shared Bath", "Locker"],
    description: "Affordable shared accommodation with personal lockers and a friendly community feel.",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80&auto=format&fit=crop",
    area: "20 sqm",
  },
  {
    id: "R-105",
    name: "Talisay Single Premium",
    type: "Single",
    price: 4200,
    capacity: 1,
    status: "Maintenance",
    amenities: ["Wi-Fi", "Aircon", "Private Bath", "Smart TV"],
    description: "Premium single room with modern finishes, currently undergoing minor maintenance.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80&auto=format&fit=crop",
    area: "14 sqm",
  },
  {
    id: "R-106",
    name: "Ipil Double Deluxe",
    type: "Double",
    price: 6000,
    capacity: 2,
    status: "Available",
    amenities: ["Wi-Fi", "Aircon", "Private Bath", "Workspace"],
    description: "Deluxe double room with dedicated workspaces — designed for remote workers and graduate students.",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=80&auto=format&fit=crop",
    area: "20 sqm",
  },
];

export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  duration: string;
  status: BookingStatus;
  submittedAt: string;
  message?: string;
}

export const bookings: Booking[] = [
  { id: "BK-2041", guestName: "Maria Clara Santos", email: "maria.santos@example.com", phone: "+63 917 555 0142", roomId: "R-101", roomName: "Sunrise Single Room", checkIn: "May 12, 2026", duration: "6 months", status: "Pending", submittedAt: "2 hours ago", message: "Hi! I'm a nursing student starting clinicals next month." },
  { id: "BK-2040", guestName: "Juan Dela Cruz", email: "juan.dc@example.com", phone: "+63 928 233 1190", roomId: "R-103", roomName: "Mahogany Studio", checkIn: "May 20, 2026", duration: "12 months", status: "Pending", submittedAt: "5 hours ago" },
  { id: "BK-2039", guestName: "Andrea Lim", email: "andrea.l@example.com", phone: "+63 915 880 4421", roomId: "R-106", roomName: "Ipil Double Deluxe", checkIn: "May 1, 2026", duration: "6 months", status: "Approved", submittedAt: "Yesterday" },
  { id: "BK-2038", guestName: "Paolo Ramirez", email: "p.ramirez@example.com", phone: "+63 906 112 4567", roomId: "R-104", roomName: "Narra Shared Room", checkIn: "Apr 28, 2026", duration: "3 months", status: "Rejected", submittedAt: "2 days ago" },
  { id: "BK-2037", guestName: "Liza Mendoza", email: "liza.m@example.com", phone: "+63 977 441 0098", roomId: "R-102", roomName: "Acacia Double Room", checkIn: "Apr 15, 2026", duration: "12 months", status: "Approved", submittedAt: "1 week ago" },
];

export interface Tenant {
  id: string;
  name: string;
  roomId: string;
  roomName: string;
  contact: string;
  moveInDate: string;
  status: "Active" | "Notice Given" | "Past";
}

export const tenants: Tenant[] = [
  { id: "T-014", name: "Andrea Lim", roomId: "R-106", roomName: "Ipil Double Deluxe", contact: "+63 915 880 4421", moveInDate: "May 1, 2026", status: "Active" },
  { id: "T-013", name: "Liza Mendoza", roomId: "R-102", roomName: "Acacia Double Room", contact: "+63 977 441 0098", moveInDate: "Apr 15, 2026", status: "Active" },
  { id: "T-012", name: "Carlos Aguilar", roomId: "R-102", roomName: "Acacia Double Room", contact: "+63 939 220 1167", moveInDate: "Mar 10, 2026", status: "Active" },
  { id: "T-011", name: "Mika Tolentino", roomId: "R-104", roomName: "Narra Shared Room", contact: "+63 921 008 7741", moveInDate: "Feb 1, 2026", status: "Notice Given" },
  { id: "T-010", name: "Renz Villanueva", roomId: "R-104", roomName: "Narra Shared Room", contact: "+63 998 715 4422", moveInDate: "Jan 8, 2026", status: "Active" },
];

export interface Payment {
  id: string;
  tenant: string;
  roomName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: PaymentStatus;
  method?: string;
}

export const payments: Payment[] = [
  { id: "PAY-3082", tenant: "Andrea Lim", roomName: "Ipil Double Deluxe", amount: 6000, dueDate: "May 5, 2026", paidDate: "May 3, 2026", status: "Paid", method: "GCash" },
  { id: "PAY-3081", tenant: "Liza Mendoza", roomName: "Acacia Double Room", amount: 5200, dueDate: "May 5, 2026", status: "Unpaid" },
  { id: "PAY-3080", tenant: "Carlos Aguilar", roomName: "Acacia Double Room", amount: 5200, dueDate: "Apr 28, 2026", status: "Overdue" },
  { id: "PAY-3079", tenant: "Mika Tolentino", roomName: "Narra Shared Room", amount: 2200, dueDate: "Apr 30, 2026", paidDate: "Apr 29, 2026", status: "Paid", method: "Bank Transfer" },
  { id: "PAY-3078", tenant: "Renz Villanueva", roomName: "Narra Shared Room", amount: 2200, dueDate: "Apr 25, 2026", status: "Overdue" },
  { id: "PAY-3077", tenant: "Andrea Lim", roomName: "Ipil Double Deluxe", amount: 6000, dueDate: "Apr 5, 2026", paidDate: "Apr 4, 2026", status: "Paid", method: "Cash" },
];

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  preview: string;
  body: string;
  receivedAt: string;
  unread: boolean;
}

export const inquiries: Inquiry[] = [
  { id: "INQ-501", name: "Joseph Tan", email: "joseph.tan@example.com", subject: "Are pets allowed in studio rooms?", preview: "Hi, I'd like to ask if small pets such as cats are allowed...", body: "Hi, I'd like to ask if small pets such as cats are allowed in your Mahogany Studio. I'm planning to move in by June and would appreciate a quick response. Thanks!", receivedAt: "10:24 AM", unread: true },
  { id: "INQ-500", name: "Sofia Reyes", email: "sofia.r@example.com", subject: "Long-term discount inquiry", preview: "Good day! I'm interested in renting for one year...", body: "Good day! I'm interested in renting one of your double rooms for a full year. Do you offer any discount for long-term contracts?", receivedAt: "Yesterday", unread: true },
  { id: "INQ-499", name: "Mark Vergara", email: "mark.v@example.com", subject: "Site visit this Saturday", preview: "Hello, may I schedule a viewing this Saturday afternoon?", body: "Hello, may I schedule a viewing this Saturday afternoon around 2PM? I'm bringing a friend who might also rent.", receivedAt: "2 days ago", unread: false },
  { id: "INQ-498", name: "Ella Garcia", email: "ella.g@example.com", subject: "Payment method options", preview: "What modes of payment do you accept?", body: "What modes of payment do you accept? Do you take GCash or Maya?", receivedAt: "3 days ago", unread: false },
];

export const formatPHP = (n: number) =>
  new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 }).format(n);
