import { Brand } from "./brand"
import { Category } from "./categories"
import { Subcategory } from "./subCategory"

export interface WishListResponse {
  status: string
  count: number
  data: WishListData[]
}

export interface WishListData {
  sold: number
  images: string[]
  subcategory: Subcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Category
  brand: Brand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  __v: number
  id: string
}



