export const generateSecureSixDigitCode = () => {
  // Create a Uint32Array to hold the random value
  const array = new Uint32Array(1);

  // Fill the array with cryptographically secure random values
  crypto.getRandomValues(array);

  // Generate a 6-digit code by taking the value modulo 900000 and adding 100000
  // Adding 100000 shifts the range to 100000 to 999999, ensuring a 6-digit number.
  const code = (array[0] % 900000) + 100000;

  return code.toString().padStart(6, '0');
};
