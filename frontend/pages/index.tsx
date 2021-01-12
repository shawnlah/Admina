import React from "react";
import { useAuth0 } from "../auth/auth0-spa";

export default function HomePage() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  console.log(user)
  return (
    <div>
      <h1>Initial Page</h1>

      <div>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Log in</button>
        )}

        {isAuthenticated && (
          <div>
            <p>{user && user.nickname}</p>
            <button onClick={() => logout()}>Log out</button>
          </div>
        )}
      </div>
    </div>
  )
}
