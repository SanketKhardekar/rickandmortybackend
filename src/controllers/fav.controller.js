import Fav from "../schemas/favouriteCharacter.schema.js";
const handlerDuplicateField = (err) => {
  let message;
  const keys = Object.keys(err.keyValue);
  if (keys.includes("email")) message = "User already exists";
  return message;
};
const handleValidationError = (err) => {
  let message;
  const key = Object.keys(err.errors);
  if (err.errors[key[0]] && err.errors[key[0]].properties) {
    message = err.errors[key[0]].properties.message;
  }
  return message;
};

export const addFavourite = async (req, res) => {
  try {
    const fav = new Fav({
      userId: req.userData.id,
      id: req.body.id,
      name: req.body.name,
      origin: req.body.origin,
      image: req.body.image,
      status: req.body.status,
      species: req.body.species,
      gender: req.body.gender,
      location: req.body.location,
    });
    const result = await fav.save();
    res.status(200).json({
      statusCode: 200,
      success: true,
      payload: {
        message: "Favourite Added Successfully",
        name: result._id,
      },
    });
  } catch (error) {
      console.log(error);
    let message = "Something Went Wrong";
    if (error.code === 11000) message = handlerDuplicateField(error);
    if (error.name === "ValidationError")
      message = handleValidationError(error);
    res
      .status(400)
      .json({ statusCode: 400, error: true, payload: { message: message } });
    return;
  }
};

export const fetchFavourites = async (req, res) => {
  try {
    console.log("Here");
    const favs = await Fav.find({
      userId: req.userData.id,
      active: true,
    }).select({
      createdManagerId: 0,
      active: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if (favs) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        payload: {
          message: "Favoutites Data",
          data: favs,
        },
      });
      return;
    } else {
      res.status(400).json({
        statusCode: 400,
        error: true,
        payload: { message: "Error While Fetching Data" },
      });
      return;
    }
  } catch (error) {
    console.log(error.message);
    let message = "Something Went Wrong";
    res
      .status(400)
      .json({ statusCode: 400, error: true, payload: { message } });
    return;
  }
};

export const deleteFavCharacter = async (req, res) => {
  try {
    if (!req.query.favId) {
      res.status(400).json({
        statusCode: 400,
        error: true,
        payload: {
          message: "Please Provide Favourite Character Id For Deletion",
        },
      });
      return;
    }
    const fav = await Fav.findByIdAndUpdate(req.query.favId, { active: false });
    if (fav === null) {
      res.status(400).json({
        statusCode: 400,
        error: true,
        payload: { message: "Character Not In Favourites" },
      });
      return;
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      payload: {
        message: "Character Removed From Favourites Successfully",
      },
    });
    return;
  } catch (error) {
    let message = "Something Went Wrong";
    res
      .status(400)
      .json({ statusCode: 400, error: true, payload: { message } });
    return;
  }
};
