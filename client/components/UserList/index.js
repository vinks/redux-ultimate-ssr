import React from 'react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

const UserList = ({ list }) => (
  <div className={styles.UserList}>
    <h4>User List</h4>
    <ul>
      {list.map(user => (
        <li key={user.id}>
          <Link to={`/userinfo/${user.id}`}>{user.name}</Link>
        </li>
      ))}
    </ul>
  </div>
)

UserList.defaultProps = {
  list: {
    id: '',
    name: ''
  }
}

export default UserList
