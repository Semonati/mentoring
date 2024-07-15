import {
  addMentorToLocalStorage,
  getMentorFromLocalStorage,
  removeMentorFromLocalStorage,
} from "./localStorage";

export const isUserMentor = (id, value) => {
  if (!value) return null;
  const mentor = getMentorFromLocalStorage(`mentor-${value.name}`);
  if (mentor) return "Already exist";
  if (!mentor) {
    addMentorToLocalStorage(`mentor-${value.name}`, id);
    addMentorToLocalStorage(`isMentor-${value.name}`, true);
    return "Add to local storage";
  }
};

export const removeMentor = (name) => {
  removeMentorFromLocalStorage(name.mentorCase);
  removeMentorFromLocalStorage(name.mentorValue);
};

// Checks if the student answered correct on the question
export const checkSolution = (result, solution) => {
  if (result == "") return alert("Your solution is wrong. please try again!");
  let isCorrect = new Function(result)().toString();
  let answer = new Function(solution)().toString();
  if (isCorrect && answer === isCorrect) alert("Your answer is correct! 👌");
  if (isCorrect && answer !== isCorrect)
    alert("Your answer is wrong. please try again!");
};
