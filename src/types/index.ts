export interface Price {
  value: number
  symbol: string
  isDefault: boolean
}

export interface Guarantee {
  start: string
  end: string
}

export interface Product {
  id: number
  serialNumber: string
  isNew: boolean
  photo: string
  title: string
  type: string
  specification: string
  guarantee: Guarantee
  price: Price[]
  order: number
  date: string
}

export interface Order {
  id: number
  title: string
  date: string
  description: string
  products: Product[]
}

export interface Group {
  id: number
  title: string
  description: string
  products: Product[]
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  name: string
  avatar: string
  email: string
}

export interface AppState {
  orders: Order[]
  products: Product[]
  groups: Group[]
  selectedOrder: Order | null
  selectedGroup: Group | null
  activeSessions: number
  currentTime: string
  currentDate: string
  isLoading: boolean
  error: string | null
}

export interface FilterState {
  productType: string
  specification: string
}

export interface ModalState {
  isOpen: boolean
  type: 'delete' | 'add-product' | 'add-group' | 'add-existing-product' | 'edit-product' | 'edit-group' | null
  data: any
}

export interface ProductFormData {
  title: string
  type: string
  specification: string
  serialNumber: string
  isNew: boolean
  photo: string
  guarantee: {
    start: string
    end: string
  }
  price: Price[]
  order: number
}

export interface GroupFormData {
  title: string
  description: string
  productIds: number[]
}
