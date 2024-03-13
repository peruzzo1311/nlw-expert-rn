import { CategoryButton } from '@/components/category'
import { Header } from '@/components/header'
import { Product } from '@/components/product'
import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'
import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { FlatList, SectionList, Text, View } from 'react-native'

export default function Home() {
  const [category, setCategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const { productsCart } = useCartStore()

  const cartQuantityItems = productsCart.reduce((total, product) => total + product.quantity, 0)

  function handleCategoryChange(category: string) {
    setCategory(category)

    const index = CATEGORIES.indexOf(category)

    if (sectionListRef.current) {
      sectionListRef.current?.scrollToLocation({ sectionIndex: index, itemIndex: 0, animated: true })
    }
  }

  return (
    <View className='flex-1 pt-8'>
      <Header
        title={'Faça seu pedido'}
        cartQuantityItems={cartQuantityItems}
      />

      <FlatList
        data={CATEGORIES}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={category === item}
            onPress={() => handleCategoryChange(item)}
          />
        )}
        horizontal
        className='max-h-10 mt-5'
        contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        showsHorizontalScrollIndicator={false}
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link
            href={`/product/${item.id}`}
            asChild
          >
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl text-white font-heading my-4'>{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        className='flex-1 p-5'
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}
