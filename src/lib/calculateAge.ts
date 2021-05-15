function calculateAge(): number {
  const diff = new Date().getTime() - new Date(1998, 5, 18).getTime();
  return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
}

export const AGE = calculateAge();
