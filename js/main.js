let elevatorA = {
  id: "a",
  currentFloor: 0,
  isOpen: false
};

let elevatorB = {
  id: "b",
  currentFloor: 6,
  isOpen: false
};

let currentFloor = 0;

let currentElevator;

chooseFloor = floor => {
  currentFloor = floor;
};

callElevator = () => {
  let closestElevator = getClosestElevator(currentFloor);
  if (currentElevator && currentElevator.id == closestElevator.id) {
    closeDoor(currentElevator);
  }
  moveElevator(closestElevator, currentFloor);
};

closeDoor = elevator => {
  elevator.isOpen = false;
};

moveElevator = (elevator, toFloor) => {
  document.getElementById("lift-" + elevator.id).style.backgroundColor = "red";
  if (elevator.isOpen) {
    closeDoor(elevator);
  }
  if (elevator.currentFloor == toFloor) {
    openDoor(elevator);
  } else if (elevator.currentFloor < toFloor) {
    goUp(elevator, toFloor);
  } else {
    goDown(elevator, toFloor);
  }
};

goUp = (elevator, toFloor) => {
  setTimeout(() => {
    elevator.currentFloor++;
    let elevatorDiv = document.getElementById("lift-" + elevator.id);
    elevatorDiv.querySelector(".lift-current-floor").innerHTML = currentFloor;
    elevatorDiv.querySelector(".lift-arrow-up").style.display = "block";
    if (elevator.currentFloor < toFloor) {
      goUp(elevator, toFloor);
    } else {
      openDoor(elevator);
    }
  }, 1000);
};

goDown = (elevator, toFloor) => {
  setTimeout(() => {
    elevator.currentFloor--;
    let elevatorDiv = document.getElementById("lift-" + elevator.id);
    elevatorDiv.querySelector(".lift-current-floor").innerHTML = currentFloor;
    elevatorDiv.querySelector(".lift-arrow-down").style.display = "block";
    if (elevator.currentFloor > toFloor) {
      goDown(elevator, toFloor);
    } else {
      openDoor(elevator);
    }
  }, 1000);
};
getClosestElevator = floor => {
  return Math.abs(elevatorA.currentFloor - floor) <=
    Math.abs(elevatorB.currentFloor - floor)
    ? elevatorA
    : elevatorB;
};

openDoor = elevator => {
  let elevatorDiv = document.getElementById("lift-" + elevator.id);
  elevatorDiv.style.backgroundColor = "green";
  elevatorDiv.querySelector(".lift-arrow-up").style.display = "none";
  elevatorDiv.querySelector(".lift-arrow-down").style.display = "none";
  elevator.isOpen = true;
  currentElevator = elevator;
};
