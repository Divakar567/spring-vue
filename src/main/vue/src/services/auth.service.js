import * as msal from "@azure/msal-browser";
import store from "../store";

const msalConfig = {
  auth: {
    clientId: "7898f094-3cd8-49f3-a915-6f7f3bc26db1",
    authority:
      "https://login.microsoftonline.com/38d0d425-ba52-4c0a-a03e-2a65c8e82e2d",
    knownAuthorities: [],
    redirectUri: "http://localhost:8080",
    postLogoutRedirectUri: "http://localhost:8080",
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true,
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

msalInstance
  .handleRedirectPromise()
  .then((response) => {
    if (response) {
      console.log("loginRedirectResponse: {}", response);
      store.commit("setUserAccount", selectAccount(response));
    }
  })
  .catch((error) => {
    console.log(error);
  });

const login = () => {
  const loginRequest = {
    scopes: ["openid", "profile", "User.Read"],
  };
  msalInstance.loginRedirect(loginRequest);
};

const getToken = async () => {
  const silentRequest = {
    scopes: [],
    account: store.state.user.account,
  };

  try {
    const response = await msalInstance.acquireTokenSilent(silentRequest);
    console.log("acquireTokenSilent response", response);
    return response.idToken;
  } catch (err) {
    console.log("acquireTokenSilent failed", err);
    try {
      const response = await msalInstance.loginPopup(silentRequest);
      console.log("loginPopup response", response);
      store.commit("setUserAccount", response.account);
      return response.idToken;
    } catch (err1) {
      console.log("loginPopup failed", err1);
    }
  }
};

const logout = async () => {
  const currentAccount = selectAccount();
  await msalInstance.logoutRedirect({
    account: currentAccount,
  });
};

const selectAccount = () => {
  const currentAccounts = msalInstance.getAllAccounts();
  console.log("currentAccounts: {}", currentAccounts);

  if (currentAccounts.length < 1) {
    return;
  } else if (currentAccounts.length > 1) {
    const accounts = currentAccounts.filter(
      (account) => account.idTokenClaims.aud === msalConfig.auth.clientId
    );

    if (accounts.length > 1) {
      if (
        accounts.every(
          (account) => account.localAccountId === accounts[0].localAccountId
        )
      ) {
        return accounts[0];
      } else {
        logout();
      }
    } else if (accounts.length === 1) {
      return accounts[0];
    }
  } else if (currentAccounts.length === 1) {
    return currentAccounts[0];
  }
};

export default {
  msalInstance,
  login,
  getToken,
  logout,
  selectAccount,
};
