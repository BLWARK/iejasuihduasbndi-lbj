import usersData from "@/data/users";

export const getAuthorById = (authorId) =>
  usersData.find((user) => user.id === authorId) || {};
