const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  try{
  if (email.match(regEx)) return true;
  else return false;
  }catch(err){
    console.log(err);
  }
};

const isEmpty = (string) => {
  try{
  if (string.trim() === '') return true;
  else return false;
  }catch(err){
    console.log(err);
  }
};

exports.validateSignupData = (data) => {
  let errors = {};

  try{
  if (isEmpty(data.email)) {
    errors.email = 'Must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Must be a valid email address';
  }

  if (isEmpty(data.password)) errors.password = 'Must not be empty';
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = 'Passwords must match';
  if (isEmpty(data.handle)) errors.handle = 'Must not be empty';

  
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
  }catch(err){
    console.log(err);
  }
};



exports.validateLoginData = (data) => {
  try{
  let errors = {};

  if (isEmpty(data.email)) errors.email = 'Must not be empty';
  if (isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  };
  }catch(err){
    console.log(err);
  }

};

exports.reduceUserDetails = (data) => {
  try
  {
  let userDetails = {};

  if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
  if (!isEmpty(data.website.trim())) {
    // https://website.com
    if (data.website.trim().substring(0, 4) !== 'http') {
      userDetails.website = `http://${data.website.trim()}`;
    } else userDetails.website = data.website;
  }
  if (!isEmpty(data.location.trim())) userDetails.location = data.location;

  return userDetails;
  }catch(err){
    console.log(err);
  }
};
