import { Link, LinkProps } from 'expo-router'

interface LinkButtonProps extends LinkProps<string> {
  title: string
}

export function LinkButton({ title, ...props }: LinkButtonProps) {
  return (
    <Link
      className='text-slate-300 text-center text-base font-body'
      {...props}
    >
      {title}
    </Link>
  )
}
