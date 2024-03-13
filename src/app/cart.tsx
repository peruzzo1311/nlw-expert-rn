import { Alert, KeyboardAvoidingView, Linking, Platform, ScrollView, Text, View } from 'react-native'

import { Header } from '@/components/header'
import { Input } from '@/components/input'
import { Product } from '@/components/product'

import Button from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { ProductCartProps, useCartStore } from '@/stores/cart-store'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import { useState } from 'react'

export default function Cart() {
  const [address, setAddress] = useState('')
  const { productsCart, removeProductFromCart, clearCart } = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(productsCart.reduce((acc, product) => acc + product.price * product.quantity, 0))

  function handleProductRemove(product: ProductCartProps) {
    Alert.alert('Remover produto', `Deseja remover o produto ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Remover',
        onPress: () => removeProductFromCart(product.id),
      },
    ])
  }

  function handleOrder() {
    if (!address.trim()) {
      Alert.alert('Endereço de entrega', 'Informe o endereço completo para entrega')

      return
    }

    const products = productsCart.map(product => `\n ${product.quantity} ${product.title}`).join('')

    const message = `
*** NOVO PEDIDO ***

\n Entregar em: ${address}

${products}

\n Valor total: ${total}
    `

    Linking.openURL(`whatsapp://send?phone=5511999999999&text=${message}`)

    Alert.alert('Pedido realizado', 'Seu pedido foi enviado com sucesso!')
    clearCart()
    navigation.goBack()
  }

  return (
    <View className='flex-1 pt-8'>
      <Header title={'Carrinho'} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className='flex-1'
      >
        {productsCart.length === 0 && (
          <View className='flex-1 gap-4 items-center justify-center'>
            <Text className='text-white text-2xl font-subtitle'>Seu carrinho está vazio</Text>

            <LinkButton
              title='Voltar ao cardápio'
              href='/'
            />
          </View>
        )}

        {productsCart.length > 0 && (
          <View className='flex-1 p-5'>
            <ScrollView className='flex-1'>
              <View>
                {productsCart.map(product => (
                  <Product
                    key={product.id}
                    data={product}
                    onLongPress={() => handleProductRemove(product)}
                  />
                ))}
              </View>
            </ScrollView>

            <View className='flex-row gap-2 items-center mt-5 mb-4'>
              <Text className='text-white text-xl font-subtitle'>Total:</Text>

              <Text className='text-lime-400 text-2xl font-heading'>{total}</Text>
            </View>

            <Input
              placeholder='Informe o endereço completa para entrega'
              value={address}
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              returnKeyType='send'
              blurOnSubmit
            />

            <View className='my-4 gap-4'>
              <Button onPress={handleOrder}>
                <Button.Text>Enviar Pedido</Button.Text>

                <Button.Icon>
                  <Feather
                    name='arrow-right-circle'
                    size={20}
                  />
                </Button.Icon>
              </Button>

              <LinkButton
                title='Voltar ao cardápio'
                href='/'
              />
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  )
}
