import { asyncComponent } from 'react-async-component'

export default {
  Home: asyncComponent({
    resolve: () => System.import('../containers/Home')
  }),
  UserInfo: asyncComponent({
    resolve: () => System.import('../containers/UserInfo')
  })
}
