const btn = document.querySelector(".btn");
const li = document.querySelector(".items").firstElementChild;
const msg = document.querySelector(".msg");
const itemList = document.querySelector(".items");

const del = document.querySelector(".delete");

const submitHandler = (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  if (name.value === "" || email.value === "") {
    msg.innerText = "Please enter all the fields";
    msg.classList.add("error");

    setTimeout(() => {
      msg.remove("error");
    }, 3000);
  } else {
    let userDetails = {
      name: name.value,
      email: email.value,
      phone: phone.value,
    };
    localStorage.setItem(email.value, JSON.stringify(userDetails));
    msg.innerText = "Successfully logged the values.";
    msg.classList.add("success");

    // add the user details in the list.
    let newli = document.createElement("li");
    newli.className = "item";
    newli.appendChild(
      document.createTextNode(
        name.value + " " + email.value + " " + phone.value
      )
    );

    // add delete button to the list
    let delbtn = document.createElement("button");
    delbtn.className = "delete";
    delbtn.appendChild(document.createTextNode("Delete"));

    newli.appendChild(delbtn);

    delbtn.addEventListener("click", removeUser);

    itemList.appendChild(newli);

    setTimeout(() => {
      msg.remove("success");
    }, 3000);
    name.value = "";
    email.value = "";
    phone.value = "";
  }
};

btn.addEventListener("click", (e) => {
  //   e.preventDefault();
  document.querySelector("body").style.background = "lightgreen";
  setTimeout(() => {
    document.querySelector("body").style.background = "white";
  }, 3000);
});

// li.addEventListener("mouseout", () => {
//   li.style.background = "#f4f4f4";
//   li.style.color = "black";
// });

// li.addEventListener("mouseover", () => {
//   li.style.background = "black";
//   li.style.color = "white";
// });

const removeUser = (e) => {
  let email = e.target.parentElement.firstChild.textContent.split(" ")[1];
  console.log(e);
  localStorage.removeItem(email);
  itemList.removeChild(e.target.parentElement);
};
