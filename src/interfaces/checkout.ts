export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  paymentMethod: "cash" | "card";
}
