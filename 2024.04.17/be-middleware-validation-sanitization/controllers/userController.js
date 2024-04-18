export function showUserValidationComplete(req, res) {
  res.send("user validation completed, valid user");
}

export function showSanitizeUser(req, res) {
  //? this is a longer version of creating this controller function
  // const { firstName, lastName, age, profession, favoriteBands, email } = req.body;

  // res.json({
  //   firstName: firstName,
  //   lastName: lastName,
  //   age: age,
  //   profession: profession,
  //   favoriteBands: favoriteBands,
  //   email: email,
  // });

  //? this is a shorter version of creating this controller function
  res.send(req.body);
}
