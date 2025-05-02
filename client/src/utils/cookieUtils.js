// Set cookie with expiration time
const setCookie = (name, value, expiresIn) => {
  const expires = new Date(Date.now() + expiresIn * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
};

const getCookie = (name) => {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return cookie ? cookie.split('=')[1] : null;
};

export { setCookie, getCookie };
