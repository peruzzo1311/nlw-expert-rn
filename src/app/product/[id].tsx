import Button from '@/components/button'
import { LinkButton } from '@/components/link-button'
import { useCartStore } from '@/stores/cart-store'
import { PRODUCTS } from '@/utils/data/products'
import { formatCurrency } from '@/utils/functions/format-currency'
import { Feather } from '@expo/vector-icons'
import { Link, useLocalSearchParams, useNavigation } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

export default function Product() {
  const { id } = useLocalSearchParams()
  const { addToCart } = useCartStore()
  const navigation = useNavigation()

  const product = PRODUCTS.find(product => product.id === id)

  function handleAddToCart() {
    if (!product) {
      return
    }

    addToCart(product)
    navigation.goBack()
  }

  if (!product) {
    return (
      <View className='flex-1 justify-center items-center gap-6'>
        <Text className='text-white font-heading text-2xl'>Produto não encontrado!</Text>

        <Link
          href={'/'}
          asChild
        >
          <TouchableOpacity className='bg-slate-800 px-6 justify-center rounded-md h-12'>
            <Text className='text-white font-subtitle'>Voltar ao cardápio</Text>
          </TouchableOpacity>
        </Link>
      </View>
    )
  }

  return (
    <View className='flex-1'>
      <Image
        source={product.cover}
        className='w-full h-52'
        resizeMode='cover'
      />

      <View className='p-5 mt-4 flex-1'>
        <Text className='text-white text-xl font-heading'>{product.title}</Text>

        <Text className='text-lime-400 text-2xl font-heading my-2'>{formatCurrency(product.price)}</Text>

        <Text className='text-slate-400 font-body text-base leading-6 mb-6'>{product.description}</Text>

        {product.ingredients &&
          product.ingredients.map((ingredient, index) => (
            <Text
              key={index}
              className='text-slate-400 font-body text-base leading-6'
            >
              {'\u2022'} {ingredient}
            </Text>
          ))}
      </View>

      <View className='p-5 pb-8 gap-5'>
        <Button onPress={handleAddToCart}>
          <Button.Icon>
            <Feather
              name='plus-circle'
              size={20}
            />

            <Button.Text>Adicionar ao carrinho</Button.Text>
          </Button.Icon>
        </Button>

        <LinkButton
          title='Voltar ao cardápio'
          href='/'
        />
      </View>
    </View>
  )
}
