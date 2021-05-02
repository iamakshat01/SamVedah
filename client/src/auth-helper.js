// import { signout } from './api-auth.js'

const auth = {
  isAuthenticated() {
    if (localStorage.getItem('jwtToken'))
      return JSON.parse(localStorage.getItem('jwtToken'))
    else
      return false
  }
//   ,
//   authenticate(jwt, cb) {
//     if (typeof window !== "undefined")
//       localStorage.setItem('jwt', JSON.stringify(jwt))
//     cb()
//   },
//   clearJWT(cb) {
//     if (typeof window !== "undefined")
//       sessionStorage.removeItem('jwt')
//     cb()
//     //optional
//     signout().then((data) => {
//       document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
//     })
//   }
}

export default auth
