import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/user/login')({
  component: () => <div>Hello /user/login!</div>
})