import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  update,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWFTLQ7KDULSXxxFMA3YUISu7IkHR3i_4",
  authDomain: "crud-operation-515a7.firebaseapp.com",
  databaseURL: "https://crud-operation-515a7-default-rtdb.firebaseio.com",
  projectId: "crud-operation-515a7",
  storageBucket: "crud-operation-515a7.firebasestorage.app",
  messagingSenderId: "704249671248",
  appId: "1:704249671248:web:72850b33cd867f39fd6b55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Helper Function: Validate Inputs
function getInputValues() {
  const nameVal = document.getElementById("name").value.trim();
  const rollVal = document.getElementById("rollNumber").value.trim();
  const addressVal = document.getElementById("address").value.trim();
  const numberVal = document.getElementById("number").value.trim();

  if (!nameVal || !rollVal || !addressVal || !numberVal) {
    alert("Please fill out all fields.");
    return null; // Return null if validation fails
  }

  return { nameVal, rollVal, addressVal, numberVal };
}

// Helper Function: Clear Inputs
function clearInputs() {
  document.getElementById("name").value = "";
  document.getElementById("rollNumber").value = "";
  document.getElementById("address").value = "";
  document.getElementById("number").value = "";
}
function clearMsgBox() {
  setTimeout(() => {
    messageBox.innerText = ""; // Empty the message box
  }, 1000);
}
const messageBox = document.querySelector(".msg");
// CRUD Operations
document.addEventListener("DOMContentLoaded", function () {
  // Create Operation
  document.getElementById("create").onclick = function (evt) {
    evt.preventDefault();
    const inputValues = getInputValues();
    if (!inputValues) return; // Exit if validation fails

    const { nameVal, rollVal, addressVal, numberVal } = inputValues;

    set(ref(database, `Users/${rollVal}`), {
      name: nameVal,
      rollNo: rollVal,
      address: addressVal,
      number: numberVal,
    })
      .then(() => {
        messageBox.innerText = `Data Created Successfully`;

        console.log("Data Created:", { nameVal, rollVal, addressVal });
        clearInputs();
        clearMsgBox();
      })
      .catch((err) => {
        messageBox.innerText = `Failed to create data. Please try again.`;
        console.error("Error Creating Data:", err);
        clearMsgBox();
      });
  };

  // Update Operation
  document.getElementById("update").onclick = function (evt) {
    evt.preventDefault();
    const inputValues = getInputValues();
    if (!inputValues) return; // Exit if validation fails

    const { nameVal, rollVal, addressVal, numberVal } = inputValues;

    update(ref(database, `Users/${rollVal}`), {
      name: nameVal,
      address: addressVal,
      number: numberVal,
    })
      .then(() => {
        messageBox.innerText = `Data Updated Successfully`;
        console.log("Data Updated:", { nameVal, rollVal, addressVal });
        clearInputs();
        clearMsgBox();
      })
      .catch((err) => {
        messageBox.innerText = `Failed to update data. Please try again.`;
        console.error("Error Updating Data:", err);
        clearMsgBox();
      });
  };

  // Delete Operation
  document.getElementById("delete").onclick = function (evt) {
    evt.preventDefault();
    const rollVal = document.getElementById("rollNumber").value.trim();
    if (!rollVal) {
      alert("Please provide a Roll Number to delete the data.");
      return;
    }

    const userRef = ref(database, `Users/${rollVal}`);
    remove(userRef)
      .then(() => {
        messageBox.innerText = `Data Deleted Successfully`;
        console.log("Data Deleted for Roll Number:", rollVal);
        clearInputs();
        clearMsgBox();
      })
      .catch((err) => {
        messageBox.innerText = `Failed to delete data. Please try again.`;
        console.error("Error Deleting Data:", err);
        clearMsgBox();
      });
  };

  // Read Operation
  document.getElementById("read").onclick = function (evt) {
    evt.preventDefault();
    const rollVal = document.getElementById("rollNumber").value.trim();
    if (!rollVal) {
      alert("Please provide a Roll Number to read the data.");
      return;
    }

    const userRef = ref(database, `Users/${rollVal}`);
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          document.getElementById("name").value = data.name;
          document.getElementById("rollNumber").value = data.rollNo;
          document.getElementById("address").value = data.address;
          document.getElementById("number").value = data.number;
          messageBox.innerText = `Data Read Successfully`;
          console.log("Data Retrieved:", data);
          clearMsgBox();
        } else {
          messageBox.innerText = `No data found for the provided roll number.`;
          clearMsgBox();
        }
      },
      (err) => {
        console.error("Error Reading Data:", err);
        messageBox.innerText = `Failed to read data. Please try again.`;
        clearMsgBox();
      }
    );
  };
});
