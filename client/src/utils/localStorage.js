
export const addMentorToLocalStorage = (caseMentor, id) => {
  localStorage.setItem(caseMentor, id);
};

export const getMentorFromLocalStorage = (caseName) => {
  return localStorage.getItem(caseName);
};

export const removeMentorFromLocalStorage = (caseName) => {
  return localStorage.removeItem(caseName);
};
