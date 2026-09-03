//async

const fetchUserDataAsync = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
};

//Promise

const fetchUserData = () => {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log("Something went wrong:", error));
};
