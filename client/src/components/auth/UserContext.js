import React from "react";

/** Context: provides currentUser object and setter for it throughout app. */

const UserContext = React.createContext();

export default UserContext;

/** This gives us a component:

<UserContext.Provider> 

- allows you to provide a value to the context */
