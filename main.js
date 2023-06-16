const btn = document.querySelector(".btn");
const li = document.querySelector(".items").firstElementChild;
const msg = document.querySelector(".msg");

const submitHandler = (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  if (name.value === "" || email.value === "") {
    msg.innerText = "Please enter all the fields";
    msg.classList.add("error");

    setTimeout(() => {
      msg.remove("error");
    }, 3000);
  } else {
    localStorage.setItem("userName", name.value);
    localStorage.setItem("userEmail", email.value);
    msg.innerText = "Successfully logged the values.";
    msg.classList.add("success");

    setTimeout(() => {
      msg.remove("success");
    }, 3000);
    name.value = "";
    email.value = "";
  }
};

btn.addEventListener("click", (e) => {
  //   e.preventDefault();
  document.querySelector("body").style.background = "lightgreen";
  setTimeout(() => {
    document.querySelector("body").style.background = "white";
  }, 3000);
});

li.addEventListener("mouseout", () => {
  li.style.background = "#f4f4f4";
  li.style.color = "black";
});

li.addEventListener("mouseover", () => {
  li.style.background = "black";
  li.style.color = "white";
});

document.querySelector(".items").firstElementChild.style.background = "teal";
