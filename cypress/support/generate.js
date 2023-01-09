export const randomEmail = () => {
  const randomValue = new Date().getTime();
  const newEmail = `cloudapp+user+${randomValue}@testing.challenge.net`;
  return newEmail;
};
