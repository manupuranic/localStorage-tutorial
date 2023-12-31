const baseURL =
  "https://crudcrud.com/api/16ef0de04fbb4c25a7cc20e0b7c11a5f/appointmentdata";

const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const itemList = document.querySelector(".items");

const del = document.querySelector(".delete");

const showUserOutput = (data) => {
  const name = data.name;
  const email = data.email;
  const phone = data.phone;
  const uid = data._id;
  // add the user details in the list.
  let newli = document.createElement("li");
  newli.className = "item";
  newli.id = uid;

  let namespan = document.createElement("span");
  let emailspan = document.createElement("span");
  let phonespan = document.createElement("span");
  namespan.className = "name";
  emailspan.className = "email";
  phonespan.className = "phone";
  namespan.appendChild(document.createTextNode(name));
  emailspan.appendChild(document.createTextNode(email));
  phonespan.appendChild(document.createTextNode(phone));
  newli.appendChild(namespan);
  newli.appendChild(emailspan);
  newli.appendChild(phonespan);

  // add delete button to the list
  let delbtn = document.createElement("button");
  delbtn.className = "delete";
  delbtn.appendChild(document.createTextNode("Delete"));

  newli.appendChild(delbtn);

  delbtn.addEventListener("click", removeUser);

  // add edit button to the list
  let editbtn = document.createElement("button");
  editbtn.className = "edit";
  editbtn.appendChild(document.createTextNode("Edit"));

  newli.appendChild(editbtn);

  editbtn.addEventListener("click", editUser);

  itemList.appendChild(newli);
};

function getUsers(event) {
  itemList.replaceChildren();
  axios
    .get(baseURL)
    .then((res) => {
      const userList = res.data;
      if (userList.length > 0) {
        userList.forEach((user) => {
          showUserOutput(user);
        });
      } else {
        itemList.innerHTML = "<h4>No users available</h4>";
      }
    })
    .catch((err) => {
      msg.innerText = `Something went wrong: ${err.message}`;
      msg.classList.add("error");
      setTimeout(() => {
        msg.remove("error");
      }, 3000);
    });
}
document.addEventListener("DOMContentLoaded", getUsers);

const submitHandler = (event) => {
  event.preventDefault();
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const uid = document.querySelector(".btn").id;

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
    if (uid !== "") {
      axios
        .put(`${baseURL}/${uid}`, userDetails)
        .then((res) => {
          getUsers();
          msg.innerText = "Successfully updated the user.";
          msg.classList.add("success");
          setTimeout(() => {
            msg.remove("success");
          }, 3000);
        })
        .catch((err) => {
          msg.innerText = `Something went wrong: ${err.message}`;
          msg.classList.add("error");
          setTimeout(() => {
            msg.remove("error");
          }, 3000);
        });
      document.querySelector(".btn").value = "Submit";
      document.querySelector(".btn").id = "";
    } else {
      axios
        .post(baseURL, userDetails)
        .then((res) => {
          showUserOutput(res.data);
          msg.innerText = "Successfully added the user.";
          msg.classList.add("success");
          setTimeout(() => {
            msg.remove("success");
          }, 3000);
        })
        .catch((err) => {
          msg.innerText = `Something went wrong: ${err.message}`;
          msg.classList.add("error");
          setTimeout(() => {
            msg.remove("error");
          }, 3000);
        });
    }

    // localStorage.setItem(email.value, JSON.stringify(userDetails));

    name.value = "";
    email.value = "";
    phone.value = "";
  }
};

const removeUser = (e) => {
  const li = e.target.parentElement;
  const uid = li.id;
  axios
    .delete(`${baseURL}/${uid}`)
    .then(() => {
      msg.innerText = "Successfully deleted the user.";
      msg.classList.add("success");
      setTimeout(() => {
        msg.remove("success");
      }, 3000);
    })
    .catch((err) => {
      msg.innerText = `Something went wrong: ${err.message}`;
      msg.classList.add("error");
      setTimeout(() => {
        msg.remove("error");
      }, 3000);
    });
  // localStorage.removeItem(email);
  itemList.removeChild(li);
};

const editUser = (e) => {
  const li = e.target.parentElement;
  const name = li.querySelector(".name").textContent;
  const email = li.querySelector(".email").textContent;
  const phone = li.querySelector(".phone").textContent;
  const uid = li.id;
  document.querySelector(".btn").id = uid;
  document.querySelector(".btn").value = "Edit";
  // localStorage.removeItem(email);
  itemList.removeChild(li);
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
};
