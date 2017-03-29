// // src/views/Main/Login/Login.js

// import React, { PropTypes as T } from 'react'
// import {ButtonToolbar, Button} from 'react-bootstrap'
// import AuthService from '../utils/AuthService'

// export class AuthLogin extends React.Component {
//   static propTypes = {
//     location: T.object,
//     auth: T.instanceOf(AuthService)
//   }

//   render() {
//     const { auth } = this.props
//     console.log(this.props);
//     return (
//       <div className={styles.root}>
//         <h2>Login</h2>
//         <ButtonToolbar className={styles.toolbar}>
//           <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
//         </ButtonToolbar>
//       </div>
//     )
//   }
// }

// export default AuthLogin;