/* 
Logout component that erases a user's local data, triggering logout
 */

import { useHistory } from "react-router-dom"

// Sets the local storage of userId to empty, thus logging the user out according to our authentication flow
export const Logout = props => {
  localStorage.removeItem("zotero_user")
  useHistory().push("/")
  
  return null
}