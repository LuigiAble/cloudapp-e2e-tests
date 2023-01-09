export const randomEmail = () => {
  const randomValue = new Date().getTime();
  const newEmail = `cloudapp+user+${randomValue}@testing.e2e.net`;
  return newEmail;
};
