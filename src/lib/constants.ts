const BIRTH_DATE = new Date(1998, 5, 18);

export const AGE = calculateAge();

export const GRADUATION_DATE = new Date(2023, 5, 20, 12);

function calculateAge(): number {
  const diff = new Date().getTime() - BIRTH_DATE.getTime();
  return Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
}
