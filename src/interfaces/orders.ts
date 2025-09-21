import { CartProduct } from "./cart"
import { ShippingAddress } from "./checkout"

export interface OrderResponse {
  shippingAddress: ShippingAddress
  taxPrice: number
  shippingPrice: number
  totalOrderPrice: number
  paymentMethodType: string
  isPaid: boolean
  isDelivered: boolean
  _id: string
  user: User
  cartItems: CartProduct[]
  createdAt: string
  updatedAt: string
  id: number
  __v: number
  paidAt?: string
}



export interface User {
  _id: string
  name: string
  email: string
  phone: string
}

