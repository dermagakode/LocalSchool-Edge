let auth0 = null;
const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0 = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId,
  });
};

const updateUI = async () => {
  const isAuthenticated = await auth0.isAuthenticated();

  document.getElementById("btn-login").disabled = isAuthenticated;
  document.getElementById("btn-logout").disabled = !isAuthenticated;
  document.getElementById("btn-access").disabled = !isAuthenticated;

  if (isAuthenticated) {
    document.getElementById("btn-login").classList.add("hidden");
    document.getElementById("btn-logout").classList.remove("hidden");
    document.getElementById("btn-access").classList.remove("hidden");

    const claims = await auth0.getIdTokenClaims()
    const pictureUrl = claims.picture
    
    document.getElementById("welcome").innerText = "Welcome to LocalShool, " + claims.name
    document.getElementById("additional-info").innerText = "School: " + claims['https://localschool.dermagakode.com/school'] + ". Grade: "  + claims['https://localschool.dermagakode.com/grade']

    document.getElementById("avatar-img").src = pictureUrl || 'https://icon-library.net/images/icon-of-music/icon-of-music-8.jpg';
    document.getElementById("avatar-img-div").classList.remove("hidden")

  } else {
    document.getElementById("btn-login").classList.remove("hidden");
    document.getElementById("btn-logout").classList.add("hidden");
    document.getElementById("btn-access").classList.add("hidden");
  }
};

window.onload = async () => {
  await configureClient();
  updateUI();
  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    // Process the login state
    await auth0.handleRedirectCallback();
    
    updateUI();
    // Use replaceState to redirect the user away and remove the querystring parameters
    window.history.replaceState({}, document.title, "/");
  }
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin
  });
};

const logout = () => {
  auth0.logout({
    returnTo: window.location.origin
  });
};