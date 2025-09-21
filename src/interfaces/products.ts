import { Brand } from "./brand"
import { Category } from "./categories"
import { IPagination } from "./pagination"
import { Subcategory } from "./subCategory"

export interface ProductsResponse {
  results: number
  metadata: IPagination
  data: Product[]
}



export interface Product {
  sold?: number
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
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}



