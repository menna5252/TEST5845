import { IPagination } from "./pagination"

export interface CategoriesResponse {
  results: number
  metadata: IPagination
  data: Category[]
}


export interface Category {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}