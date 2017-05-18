import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import * as action from './action'
import UserCard from '../../components/UserCard'
import styles from './styles.scss'

// Export this for unit testing more easily
export class UserInfo extends PureComponent {

  static defaultProps: {
    userInfo: {},
    match: { params: { id: '' } },
    fetchUserIfNeeded: () => {},
  };

  componentDidMount() {
    const { fetchUserIfNeeded, match: { params } } = this.props

    fetchUserIfNeeded(params.id)
  }

  renderUserCard = () => {
    const { userInfo, match: { params } } = this.props
    const userInfoById = userInfo[params.id]

    if (!userInfoById || userInfoById.readyStatus === action.USER_REQUESTING) {
      return <p>Loading...</p>
    }

    if (userInfoById.readyStatus === action.USER_FAILURE) {
      return <p>Oops, Failed to load info!</p>
    }

    return <UserCard info={userInfoById.info} />
  }

  render() {
    return (
      <div className={styles.UserInfo}>
        <Helmet title="User Info" />
        {this.renderUserCard()}
      </div>
    )
  }
}

const connector = connect(
  ({ userInfo }) => ({ userInfo }),
  dispatch => ({
    fetchUserIfNeeded: (id: string) => dispatch(action.fetchUserIfNeeded(id))
  })
)

export default connector(UserInfo)
