import { asyncComponent } from 'react-async-component'

export const Home = asyncComponent({
  resolve: () => System.import('../containers/Home')
})

export const UserInfo = asyncComponent({
  resolve: () => System.import('../containers/UserInfo')
})
