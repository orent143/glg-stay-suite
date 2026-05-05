import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Rooms from "./pages/Rooms.tsx";
import RoomDetail from "./pages/RoomDetail.tsx";
import Inquiry from "./pages/Inquiry.tsx";
import AdminLayout from "./components/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import RoomsAdmin from "./pages/admin/RoomsAdmin.tsx";
import BookingsAdmin from "./pages/admin/BookingsAdmin.tsx";
import TenantsAdmin from "./pages/admin/TenantsAdmin.tsx";
import PaymentsAdmin from "./pages/admin/PaymentsAdmin.tsx";
import InquiriesAdmin from "./pages/admin/InquiriesAdmin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<RoomsAdmin />} />
            <Route path="bookings" element={<BookingsAdmin />} />
            <Route path="tenants" element={<TenantsAdmin />} />
            <Route path="payments" element={<PaymentsAdmin />} />
            <Route path="inquiries" element={<InquiriesAdmin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
