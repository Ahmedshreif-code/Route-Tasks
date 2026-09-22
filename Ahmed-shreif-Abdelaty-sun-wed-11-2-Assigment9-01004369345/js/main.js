let userImageInput = document.getElementById("Image")
let fullNameInput = document.getElementById("FullName")
let phoneNumberInput = document.getElementById("Phone")
let emailInput = document.getElementById("Email")
let addressInput = document.getElementById("Address")
let groupInput = document.getElementById("Group")
let notesInput = document.getElementById("Notes")
let favoriteInput = document.getElementById("Favorite")
let emergencyInput = document.getElementById("Emergency")


let totalCounter = document.getElementById("Total")
let favoriteCounter = document.getElementById("Favorites")
let emergencyCounter = document.getElementById("emergency")
let TotalContacts = document.getElementById("TotalContacts")
let contactsContainer = document.getElementById("contactsContainer")
let favoriteContainer = document.getElementById("favoriteContainer")
let emergencyContainer = document.getElementById("emergencyContainer")

let contacts = JSON.parse(localStorage.getItem("contacts")) || []
let favorites = JSON.parse(localStorage.getItem("favorites")) || []
let emergency = JSON.parse(localStorage.getItem("emergency")) || []

totalCounter.innerHTML = contacts.length
TotalContacts.innerHTML = contacts.length
favoriteCounter.innerHTML = favorites.length
emergencyCounter.innerHTML = emergency.length

let errorMessage = document.getElementsByClassName("Error")
const nameRegex = /^[\p{L}\s\-']{2,50}$/u
const phoneRegex = /^01[0125][0-9]{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// validation 
fullNameInput.addEventListener("input", () => {
  if (nameRegex.test(fullNameInput.value)) {
    errorMessage[0].classList.add("d-none")
  } else {
    errorMessage[0].classList.remove("d-none")
  }
})
phoneNumberInput.addEventListener("input", () => {
  if (phoneRegex.test(phoneNumberInput.value)) {
    errorMessage[1].classList.add("d-none")
  } else {
    errorMessage[1].classList.remove("d-none")
  }
})
emailInput.addEventListener("input", () => {
  if (emailRegex.test(emailInput.value)) {
    errorMessage[2].classList.add("d-none")
  } else {
    errorMessage[2].classList.remove("d-none")
  }
})

// Add contact
function handelAddContact() {
  let contact = {
    image: userImageInput.files[0]?.name,
    name: fullNameInput.value,
    phone: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
    group: groupInput.value,
    notes: notesInput.value,
    favoriteCat: favoriteInput.checked,
    emergencyCat: emergencyInput.checked,
  }


  const phoneExists = contacts.find(item => item.phone === contact.phone);
  if (!nameRegex.test(contact.name)) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
  } else if (!phoneRegex.test(contact.phone)) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
  } else if (phoneExists) {
    Swal.fire({
      icon: "error",
      title: "Duplicated phone",
      text: `A contact with this phone number already exists: ${phoneExists.name}`,
    });
  }
  else if (!emailRegex.test(contact.email)) {
    Swal.fire({
      icon: "error",
      title: "Missing email",
      text: "Please enter an email!",
    });
  } else {
    contacts.push(contact)
    localStorage.setItem("contacts", JSON.stringify(contacts));
    const modalElement = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
    Swal.fire({
      title: "Added",
      text: "Contact has been added successfully.",
      icon: "success",
      draggable: false,
      timer: 1500,
      showConfirmButton: false,
    });

    if (contact.favoriteCat) {
      favorites.push(contact)
      localStorage.setItem("favorites", JSON.stringify(favorites))
    }
    if (contact.emergencyCat) {
      emergency.push(contact)
      localStorage.setItem("emergency", JSON.stringify(emergency))
    }
    handleClearForm()
    handleDisplayContacts()

  }



}
function handelAddFavoriteContact(i) {
  const contact = contacts[i];

  if (!contact.favoriteCat) {
    // Add to favorites
    contact.favoriteCat = true;

    favorites.push(contact);
  } else {
    // Remove from favorites
    contact.favoriteCat = false;

    const favoriteIndex = favorites.findIndex(
      item => item.phone === contact.phone
    );

    if (favoriteIndex !== -1) {
      favorites.splice(favoriteIndex, 1);
    }
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  localStorage.setItem("favorites", JSON.stringify(favorites));

  handleDisplayContacts();
}
function handelAddEmergencyContact(i) {
  const contact = contacts[i];

  if (!contact.emergencyCat) {
    // Add to favorites
    contact.emergencyCat = true;

    emergency.push(contact);
  } else {
    // Remove from favorites
    contact.emergencyCat = false;

    const emergencyIndex = emergency.findIndex(
      item => item.phone === contact.phone
    );

    if (emergencyIndex !== -1) {
      emergency.splice(emergencyIndex, 1);
    }
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
  localStorage.setItem("emergency", JSON.stringify(emergency));

  handleDisplayContacts();
}

// Display contacts
function handleDisplayContacts(contactsArray = contacts) {
  totalCounter.innerHTML = contacts.length
  TotalContacts.innerHTML = contacts.length
  favoriteCounter.innerHTML = favorites.length
  emergencyCounter.innerHTML = emergency.length
  // all
  let temp1 = ""
  for (i = 0; i < contactsArray.length; i++) {
    const realIndex = contacts.indexOf(contactsArray[i]);
    temp1 += `
    <div class="col-md-6 col-12">
                <div class="card contact rounded-4">
                  <div class="card-body p-3">
                    <div class="d-flex gap-2 align-items-center">
                      <div class="position-relative">
                        <i
                          class="photo fa-canvas-roomy rounded-3 main-color-bg text-white p-3"
                        >
                          ${contactsArray[i].name.split(" ").splice(0, 2).map(word => word[0]).join("").toUpperCase()}
                        </i>
                        <i
                          class="fa-solid fa-star fa-canvas-roomy rounded-3 bg-warning text-white rounded-circle border border-2 border-white fav-icon position-absolute ${contactsArray[i].favoriteCat ? " " : "d-none"}"
                        >
                        </i>
                        <i
                          class="fa-solid fa-heartbeat fa-canvas-roomy rounded-3 bg-danger text-white rounded-circle border border-2 border-white emer-icon position-absolute ${contactsArray[i].emergencyCat ? " " : "d-none"}"
                        >
                        </i>
                      </div>
                      <div class="title my-2">
                        <h5 class="m-0">${contactsArray[i].name}</h5>
                        <p class="m-0">
                          <i
                            class="fa-solid fa-phone fa-canvas-roomy bg-primary-subtle text-primary rounded-2 p-1"
                          ></i>
                         ${contactsArray[i].phone}
                        </p>
                      </div>
                    </div>
                    <p class="e-mail my-2 text-muted">
                      <i
                        class="fa-solid fa-envelope fa-canvas-roomy mail rounded-2 fa-1 p-1"
                      ></i>
                     ${contactsArray[i].email}
                    </p>
                    <p class="address my-2 text-muted">
                      <i
                        class="fa-solid fa-location-dot fa-canvas-roomy bg-success-subtle text-success rounded-2 fa-1 p-1"
                      ></i>
                    ${contactsArray[i].address}
                    </p>
                    <div
                      class="category d-flex justify-content-start align-items-center gap-2"
                    >
                      <p
                        class="m-0 ${contactsArray[i].group == "Work" ? "work" : contactsArray[i].group == "Family" ? "family" : contactsArray[i].group == "Freinds" ? "freinds" : contactsArray[i].group == "School" ? "school" : contactsArray[i].group == "Other" ? "other" : contactsArray[i].group == "Select a group" ? "d-none" : ""}  p-1 rounded-2"
                      >
                        ${contactsArray[i].group}
                      </p>
                      <p
                        class="my-0 bg-danger-subtle text-danger p-1 rounded-2  ${contactsArray[i].emergencyCat ? " " : "d-none"}"
                      >
                        <i class="fa-solid fa-heartbeat fa-canvas-roomy" class="padgeEmergency"></i>
                        Emergency
                      </p>
                    </div>
                  </div>
                  <div
                    class="card-footer d-flex justify-content-between align-items-center py-3"
                  >
                    <div class="call">
                      <a
                        href="tel:${contactsArray[i].phone}"
                        class="fa-canvas-roomy p-2 bg-success-subtle text-success text-decoration-none rounded-3"
                      >
                        <i class="fa-solid fa-phone"></i>
                      </a>
                      <a
                        href="mailto:${contactsArray[i].email}"
                        class="fa-canvas-roomy p-2 mail text-decoration-none rounded-3 mx-2"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </a>
                    </div>
                    <div class="btns">
                      <button
                      onclick="handelAddFavoriteContact(${realIndex})"
                        class="favorite fa-canvas-roomy p-2 ${contactsArray[i].favoriteCat ? "bg-warning-subtle text-warning" : ""}  rounded-3 btn mx-1"
                      >
                        <i class=" ${contactsArray[i].favoriteCat ? "fa-solid fa-star " : "fa-regular fa-star text-muted"} "></i>
                      </button>
                      <button
                      onclick="handelAddEmergencyContact(${realIndex})"
                        class="emergency fa-canvas-roomy p-2 ${contactsArray[i].emergencyCat ? "bg-danger-subtle text-danger" : ""}  rounded-3 btn mx-1"
                      >
                        <i class=" ${contactsArray[i].emergencyCat ? "fa-solid fa-heartbeat" : "fa-regular fa-heart text-muted"}"></i>
                      </button>
                      <button
                        class="edite fa-canvas-roomy p-2 rounded-3 btn mx-1"
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onclick=" handelEditeContact(${realIndex})"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </button>
                      <button class="delete fa-canvas-roomy p-2 rounded-3 btn" onclick="handelDeleteContact(${realIndex})">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
    `
  }
  // favorite
  let temp2 = ""
  for (i = 0; i < favorites.length; i++) {
    temp2 += `
    <div
                      class="p-3 my-2 d-flex justify-content-between align-items-center rounded-3 contac"
                    >
                      <div class="d-flex gap-2 align-items-center">
                        <i
                          class="fa-canvas-roomy rounded-3 main-color-bg text-white p-2 fa-x fst-normal"
                        >
                          ${favorites[i].name.split(" ").splice(0, 2).map(word => word[0]).join("").toUpperCase()}
                        </i>
                        <div class="title">
                          <h5 class="m-0">${favorites[i].name}</h5>
                          <p class="m-0">${favorites[i].phone}</p>
                        </div>
                      </div>
                      <div class="call">
                        <a href="tel:${favorites[i].phone}" class="text-decoration-none">
                          <i
                            class="fa-solid fa-phone fa-canvas-roomy rounded-3 p-2"
                          ></i>
                        </a>
                      </div>
                    </div>
    `
    // emergency
  }
  let temp3 = ""
  for (i = 0; i < emergency.length; i++) {
    temp3 += `
      <div
                      class="p-3 my-2 d-flex justify-content-between align-items-center rounded-3 contac"
                    >
                      <div class="d-flex gap-2 align-items-center">
                        <i
                          class="fa-canvas-roomy rounded-3 main-color-bg text-white p-2 fa-x fst-normal"
                        >
                          ${emergency[i].name.split(" ").splice(0, 2).map(word => word[0]).join("").toUpperCase()}
                        </i>
                        <div class="title">
                          <h5 class="m-0">${emergency[i].name}</h5>
                          <p class="m-0">${emergency[i].phone}</p>
                        </div>
                      </div>
                      <div class="call">
                        <a href="tel:${emergency[i].phone}" class="text-decoration-none">
                          <i
                            class="fa-solid fa-phone fa-canvas-roomy rounded-3 p-2"
                          ></i>
                        </a>
                      </div>
                    </div>
    `
  }

  contactsContainer.innerHTML = temp1
  favoriteContainer.innerHTML = temp2
  emergencyContainer.innerHTML = temp3


  let noContact = document.getElementsByClassName("no-contact")
  let noFavorite = document.getElementsByClassName("No-Favorite")
  let noemergency = document.getElementsByClassName("No-emergency")
  if (contactsArray.length == 0) {
    noContact[0].classList.remove("d-none")
  } else {
    noContact[0].classList.add("d-none")
  }
  if (favorites.length == 0) {
    noFavorite[0].classList.remove("d-none")
  } else {
    noFavorite[0].classList.add("d-none")
  }
  if (emergency.length == 0) {
    noemergency[0].classList.remove("d-none")
  } else {
    noemergency[0].classList.add("d-none")
  }
}

// delete contact
function handelDeleteContact(i) {
  const deletedContact = contacts[i];

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger mx-2",
      cancelButton: "btn btn-secondary mx-2",
    },
    buttonsStyling: false,
  });

  swalWithBootstrapButtons
    .fire({
      title: "Delete Contact?",
      text: `Are you sure you want to delete ${deletedContact.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Delete from contacts
        contacts.splice(i, 1);

        // Delete from favorites
        favorites = favorites.filter(
          (contact) => contact.phone !== deletedContact.phone
        );

        // Delete from emergency
        emergency = emergency.filter(
          (contact) => contact.phone !== deletedContact.phone
        );

        // Save to localStorage
        localStorage.setItem("contacts", JSON.stringify(contacts));
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("emergency", JSON.stringify(emergency));

        // Success alert
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: `${deletedContact.name} has been deleted successfully.`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,

        });

        handleDisplayContacts();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Cancel alert
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: `${deletedContact.name} is safe.`,
          icon: "info",
          showConfirmButton: false,
          timer: 1500,

        });
      }
    });
}


// edite and update contact 
let efullNameInput = document.getElementById("eFullName")
let ephoneNumberInput = document.getElementById("ePhone")
let eemailInput = document.getElementById("eEmail")
let eaddressInput = document.getElementById("eAddress")
let egroupInput = document.getElementById("eGroup")
let enotesInput = document.getElementById("eNotes")
let efavoriteInput = document.getElementById("eFavorite")
let eemergencyInput = document.getElementById("eEmergency")
let con

efullNameInput.addEventListener("input", () => {
  if (nameRegex.test(efullNameInput.value)) {
    errorMessage[3].classList.add("d-none")
  } else {
    errorMessage[3].classList.remove("d-none")
  }
})
ephoneNumberInput.addEventListener("input", () => {
  if (phoneRegex.test(ephoneNumberInput.value)) {
    errorMessage[4].classList.add("d-none")
  } else {
    errorMessage[4].classList.remove("d-none")
  }
})
eemailInput.addEventListener("input", () => {
  if (emailRegex.test(eemailInput.value)) {
    errorMessage[5].classList.add("d-none")
  } else {
    errorMessage[5].classList.remove("d-none")
  }
})

function handelEditeContact(i) {
  efullNameInput.value = contacts[i].name
  ephoneNumberInput.value = contacts[i].phone
  eemailInput.value = contacts[i].email
  eaddressInput.value = contacts[i].address
  egroupInput.value = contacts[i].group
  enotesInput.value = contacts[i].notes
  efavoriteInput.checked = contacts[i].favoriteCat
  eemergencyInput.checked = contacts[i].emergencyCat
  con = i

}
function handelUpdateContact() {
  let newContact = {
    name: efullNameInput.value,
    phone: ephoneNumberInput.value,
    email: eemailInput.value,
    address: eaddressInput.value,
    group: egroupInput.value,
    notes: enotesInput.value,
    favoriteCat: efavoriteInput.checked,
    emergencyCat: eemergencyInput.checked,
  }

  // validation
  const phoneExists = contacts.find((item, index) => item.phone === newContact.phone && index !== con);
  if (!nameRegex.test(newContact.name)) {
    Swal.fire({
      icon: "error",
      title: "Missing Name",
      text: "Please enter a name for the contact!",
    });
  } else if (!phoneRegex.test(newContact.phone)) {
    Swal.fire({
      icon: "error",
      title: "Missing Phone",
      text: "Please enter a phone number!",
    });
  } else if (phoneExists) {
    Swal.fire({
      icon: "error",
      title: "Duplicated phone",
      text: `A contact with this phone number already exists: ${phoneExists.name}`,
    })
  }
  else if (!emailRegex.test(newContact.email)) {
    Swal.fire({
      icon: "error",
      title: "Missing email",
      text: "Please enter an email!",
    });
  } else {
    contacts[con] = newContact
    localStorage.setItem("contacts", JSON.stringify(contacts));
    Swal.fire({
      title: "Updated",
      text: "Contact has been updated successfully.",
      icon: "success",
      draggable: false,
      timer: 1500,
      showConfirmButton: false,
    });
    const favoriteIndex = favorites.findIndex(
      item => item.phone === newContact.phone
    );
    if (newContact.favoriteCat) {

      if (favoriteIndex === -1) {
        favorites.push(newContact);
      } else {
        favorites[favoriteIndex] = newContact;
      }

    } else {

      if (favoriteIndex !== -1) {
        favorites.splice(favoriteIndex, 1);
      }
    }


    const emergencyIndex = emergency.findIndex(
      item => item.phone === newContact.phone
    );

    if (newContact.emergencyCat) {

      if (emergencyIndex === -1) {
        emergency.push(newContact);
      } else {
        emergency[emergencyIndex] = newContact;
      }

    } else {

      if (emergencyIndex !== -1) {
        emergency.splice(emergencyIndex, 1);
      }

    }


    const modalElement = document.getElementById("exampleModal");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    localStorage.setItem("contacts", JSON.stringify(contacts));
    localStorage.setItem("favorites", JSON.stringify(favorites));
    localStorage.setItem("emergency", JSON.stringify(emergency));


    handleClearForm()
    handleDisplayContacts()

  }

}


// search contact
let searchInput = document.getElementById("searchInput")
function handleSearch(value) {
  let searchInputValue = searchInput.value.toLowerCase()
  let result = []
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].name.toLowerCase().includes(searchInputValue) || contacts[i].phone.toLowerCase().includes(searchInputValue) || contacts[i].email.toLowerCase().includes(searchInputValue)) {
      result.push(contacts[i])
    }
  }
  handleDisplayContacts(result)
}





// clear form 
function handleClearForm() {
  fullNameInput.value = ""
  phoneNumberInput.value = ""
  emailInput.value = ""
  addressInput.value = ""
  groupInput.value = "Select a group"
  notesInput.value = ""
  favoriteInput.checked = false
  emergencyInput.checked = false
}

handleDisplayContacts()