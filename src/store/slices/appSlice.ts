import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState, Order, Product, Group, FilterState, ModalState } from '@/types'
import { orders, products, groups } from '@/data/mockData'

const initialState: AppState = {
  orders,
  products,
  groups,
  selectedOrder: null,
  selectedGroup: null,
  activeSessions: 1,
  currentTime: '',
  currentDate: '',
  isLoading: false,
  error: null,
}

const filterInitialState: FilterState = {
  productType: '',
  specification: '',
}

const modalInitialState: ModalState = {
  isOpen: false,
  type: null,
  data: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload
    },
    setSelectedGroup: (state, action: PayloadAction<Group | null>) => {
      state.selectedGroup = action.payload
    },
    setActiveSessions: (state, action: PayloadAction<number>) => {
      state.activeSessions = action.payload
    },
    setCurrentTime: (state, action: PayloadAction<string>) => {
      state.currentTime = action.payload
    },
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    deleteOrder: (state, action: PayloadAction<number>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload)
      state.products = state.products.filter(product => product.order !== action.payload)
      if (state.selectedOrder?.id === action.payload) {
        state.selectedOrder = null
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload)
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload)
    },
    addExistingProductToOrder: (state, action: PayloadAction<{ productId: number, orderId: number }>) => {
      const { productId, orderId } = action.payload
      const product = state.products.find(p => p.id === productId)
      if (product) {
        product.order = orderId
        const order = state.orders.find(o => o.id === orderId)
        if (order) {
          order.products.push(product)
        }
      }
    },
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload)
    },
    deleteGroup: (state, action: PayloadAction<number>) => {
      state.groups = state.groups.filter(group => group.id !== action.payload)
      if (state.selectedGroup?.id === action.payload) {
        state.selectedGroup = null
      }
    },
  },
})

export const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setProductType: (state, action: PayloadAction<string>) => {
      state.productType = action.payload
    },
    setSpecification: (state, action: PayloadAction<string>) => {
      state.specification = action.payload
    },
    clearFilters: (state) => {
      state.productType = ''
      state.specification = ''
    },
  },
})

export const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: 'delete' | 'add-product' | 'add-group' | 'add-existing-product' | 'edit-product' | 'edit-group', data: any }>) => {
      state.isOpen = true
      state.type = action.payload.type
      state.data = action.payload.data
    },
    closeModal: (state) => {
      state.isOpen = false
      state.type = null
      state.data = null
    },
  },
})

export const { 
  setSelectedOrder, 
  setSelectedGroup,
  setActiveSessions, 
  setCurrentTime, 
  setCurrentDate, 
  setLoading, 
  setError,
  deleteOrder,
  deleteProduct,
  addProduct,
  addExistingProductToOrder,
  addGroup,
  deleteGroup
} = appSlice.actions

export const { setProductType, setSpecification, clearFilters } = filterSlice.actions

export const { openModal, closeModal } = modalSlice.actions

export const appReducer = appSlice.reducer
export const filterReducer = filterSlice.reducer
export const modalReducer = modalSlice.reducer
