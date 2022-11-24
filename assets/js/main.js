const url_api = "https://62f75136ab9f1f8e89fb8f1e.mockapi.io/api/tes/user";

const req_api = (url, type, data) => {
  if (type === "GET") {
    return fetch(url)
      .then((result) => result.json())
      .then((result) => result);
  } else if (type === "POST") {
    return fetch(url, {
      method: type,
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => result);
  }
};

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

const btnRegister = () => {
  if (
    select("#usernameRegis").value === "" &&
    select("#emailRegis").value === "" &&
    select("#passwordRegis").value === "" &&
    select("#confirmPasswordRegis").value === ""
  ) {
    swal({
      icon: "error",
      text: "Please input field",
    });
  } else {
    // ambil semua nilai
    let username = select("#usernameRegis").value;
    let email = select("#emailRegis").value;
    let password = select("#passwordRegis").value;
    let confirmPassword = select("#confirmPasswordRegis").value;

    if (password === confirmPassword) {
      register(username, email, password);
    } else {
      return;
    }
  }
};

const clean = () => {
  select("#usernameRegis").value = "";
  select("#emailRegis").value = "";
  select("#passwordRegis").value = "";
  select("#confirmPasswordRegis").value = "";
};

const register = (username, email, password) => {
  req_api(url_api, "POST", {
    username: username,
    email: email,
    password: password,
  }).then((result) => {
    if (!result.ok === true) {
      throw new Error(result.statusText);
      swal({
        icon: "error",
        text: "Your user not created.",
      });
      clean();
    } else {
      swal({
        icon: "success",
        text: "Your user has been created.",
      });
      clean();
    }
  });
};

const btnLogin = () => {
  if (
    select("#usernameLog").value === "" &&
    select("#passwordLog").value === ""
  ) {
    swal({
      icon: "error",
      text: "Please input field",
    });
  } else {
    // ambil semua nilai
    let username = select("#usernameLog").value;
    let password = select("#passwordLog").value;

    login(username, password);
  }
};

const login = (username, password) => {
  req_api(url_api, "GET").then((result) => {
    result.forEach((obj) => {
      if (obj["username"] === username) {
        if (obj["password"] === password) {
          // set local storage
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          document.location.href = "dashboard.html";
          return;
        } else {
          swal({
            icon: "error",
            text: "The user does not exist.",
          });
        }
        return;
      } else {
        swal({
          icon: "error",
          text: "The user does not exist.",
        });
      }
    });
  });
};
