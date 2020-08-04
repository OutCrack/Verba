import * as FileSystem from "expo-file-system";

export const CREATE_VERBA = "CREATE_VERBA";
export const SET_VERBA = "SET_VERBA";
export const DELETE_VERBA = "DELETE_VERBA";
export const UPDATE_VERBA = "UPDATE_VERBA";

import {
  insertVerba,
  fetchVerba,
  removeVerba,
  updateVerba,
} from "../../helper/db";

export const loadVerba = (props) => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchVerba(props);
      console.log("LOAD VERBA:");
      console.log(dbResult);
      dispatch({ type: SET_VERBA, verba: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const createVerba = (
  norwegian,
  english,
  category,
  partOfSpeech,
  description,
  imageUri,
  favorite,
  dateAdded
) => {
  return async (dispatch) => {
    if (!imageUri) {
      try {
        const dbResult = await insertVerba(
          norwegian,
          english,
          category,
          partOfSpeech,
          description,
          imageUri,
          favorite,
          dateAdded
        );
        console.log("------------------ Create Verba Without Image ------------------");
        console.log(dbResult);
        dispatch({
          type: CREATE_VERBA,
          verbaData: {
            id: dbResult.insertId,
            norwegian: norwegian,
            english: english,
            category: category,
            partOfSpeech: partOfSpeech,
            description: description,
            imageUri: imageUri,
            favorite: favorite,
            dateAdded: dateAdded
          },
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    } else {
      const imageSource = imageUri.split("/").shift();
      let newPath;
      if(imageSource === "https:") {
        console.log("IMAGE by URL")
        newPath = imageUri;
      } else {
        const filename = imageUri.split("/").pop();
        newPath = FileSystem.documentDirectory + filename;
        await FileSystem.moveAsync({
          from: imageUri,
          to: newPath,
        });
      }

      try {
        const dbResult = await insertVerba(
          norwegian,
          english,
          category,
          partOfSpeech,
          description,
          newPath,
          favorite,
          dateAdded
        );
        console.log("------------------ Create Verba ------------------");
        console.log(dbResult);
        dispatch({
          type: CREATE_VERBA,
          verbaData: {
            id: dbResult.insertId,
            norwegian: norwegian,
            english: english,
            category: category,
            partOfSpeech: partOfSpeech,
            description: description,
            imageUri: newPath,
            favorite: favorite,
            dateAdded: dateAdded
          },
        });
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };
};

export const editVerba = (
  id,
  norwegian,
  english,
  category,
  partOfSpeech,
  description,
  imageUri,
  favorite,
  dateAdded
) => {
  return async (dispatch) => {
    try {
      const dbResult = await updateVerba(
        id,
        norwegian,
        english,
        category,
        partOfSpeech,
        description,
        imageUri,
        favorite
      );
      console.log("------------------ Edit Verba ------------------");
      console.log(dbResult);
      dispatch({
        type: UPDATE_VERBA,
        vId: dbResult.insertId,
        verbaData: {
          norwegian: norwegian,
          english: english,
          category: category,
          partOfSpeech: partOfSpeech,
          description: description,
          imageUri: imageUri,
          favorite: favorite,
          dateAdded: dateAdded
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const deleteVerba = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await removeVerba(id);
      console.log("------------------ Delete Verba ------------------");
      console.log(dbResult);
      dispatch({ type: DELETE_VERBA, verbaData: { id: dbResult.insertId } });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};
