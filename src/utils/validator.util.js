export const regex = {
    email:/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/,
    name: /^[a-z A-Z]{2,30}/,
    phone: /^\d{10}$/g,
    dateofBirth: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
  };
    export const passwordValidator = (password) => {
      return regex.password.test(password);
    };
    export function validSignupData(req, res, next) {
      if (
        !req.body ||
        !req.body.email ||
        !req.body.name ||
        !req.body.password ||
        !req.body.phone
      ) {
        res
          .status(400)
          .send("Provide all Fields email, name, password, phone number");
      }
      if (!emailValidator(req.body.email)) {
        res.status(400).send("Enter Valid Email");
      } else if (!passwordValidator(req.body.password)) {
        res
          .status(400)
          .send(
            "Enter Valid Password combination of alphabets, at least one special character, and at least one digit with minimum of 8 and maximum of 16 characters."
          );
      } else if (!nameValidator(req.body.name)) {
        res.status(400).send("Enter Valid Name having min 2 and max 30 alphabets");
      } else if (!phoneValidator(req.body.phone)) {
        res.status(400).send("Enter 10 digit phone number");
      } else {
        next();
        return;
      }
    }
    export function validLoginData(req, res, next) {
      if (
        !req.body ||
        !req.body.email ||
        !req.body.password ||
        req.body.email.trim().length <= 0 ||
        req.body.password.trim().length <= 0
      ) {
        res.status(400).send("Please Provide both fields email, password");
      }
      if (!emailValidator(req.body.email)) {
        res.status(400).send("Enter Valid Email");
      } else {
        next();
        return;
      }
    }
    
   export function validUserEmail(req, res, next) {
      if (
        !req.query.email ||
        req.query.email.trim().length <= 0 ||
        !emailValidator(req.query.email)
      ) {
        res.status(400).send("Please Provide Valid Emailid");
      } else {
        next();
        return;
      }
    }
    export function validUpdateData(req, res, next) {
      if (!req.body || (!req.body.email && !req.body.name && !req.body.phone)) {
        res.status(400).send("Provide atleast data to update");
      } 
      else if(req.body.email && !emailValidator(req.body.email)) 
      {
          res.status(400).send("Enter Valid Updated Email");
      }
      else if (req.body.name && !nameValidator(req.body.name)) {
          res
            .status(400)
            .send("Enter Valid Updated Name having min 2 and max 30 alphabets");
      }
      else if (req.body.phone && !phoneValidator(req.body.phone)) {
          res.status(400).send("Enter Valid Updated 10 digit phone number");
      } else {
        next();
        return;
      }
    }  