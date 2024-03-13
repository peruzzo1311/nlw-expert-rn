import { ReactNode } from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

interface ButtonProps extends TouchableOpacityProps {
  children: ReactNode
}

interface ButtonTextProps {
  children: ReactNode
}

interface ButtonIconProps {
  children: ReactNode
}

function Button({ children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      className='h-12 bg-lime-400 rounded-md items-center justify-center flex-row'
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
}

function ButtonText({ children }: ButtonTextProps) {
  return <Text className='text-black font-heading text-base mx-2'>{children}</Text>
}

function ButtonIcon({ children }: ButtonIconProps) {
  return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export default Button
