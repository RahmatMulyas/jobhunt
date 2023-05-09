const errorMessage = (message) => {
  let result = "";

  switch (message) {
    case "invalid_credentials":
      result = "Email/Password salah!";
      break;

    default:
      result = message;
      break;
  }

  return result;
};

export { errorMessage };
