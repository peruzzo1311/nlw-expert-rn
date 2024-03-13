import { ProductProps } from '@/utils/data/products'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface ProductCartProps extends ProductProps {
  quantity: number
}

interface StateProps {
  productsCart: ProductCartProps[]
  addToCart: (product: ProductProps) => void
  removeProductFromCart: (id: string) => void
  clearCart: () => void
}

export const useCartStore = create(
  persist<StateProps>(
    set => ({
      productsCart: [],
      addToCart: product =>
        set(state => {
          const productIndex = state.productsCart.findIndex(product => product.id === product.id)

          if (productIndex !== -1) {
            state.productsCart[productIndex].quantity += 1
          } else {
            state.productsCart.push({ ...product, quantity: 1 })
          }

          return { productsCart: state.productsCart }
        }),
      removeProductFromCart: id =>
        set(state => {
          const productIndex = state.productsCart.findIndex(product => product.id === id)

          if (productIndex !== -1) {
            state.productsCart[productIndex].quantity -= 1

            if (state.productsCart[productIndex].quantity === 0) {
              state.productsCart.splice(productIndex, 1)
            }
          }

          return { productsCart: state.productsCart }
        }),
      clearCart: () => set({ productsCart: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
