import VERBA from "../../data/dummy-verba";
import {
  CREATE_VERBA,
  SET_VERBA,
  DELETE_VERBA,
  UPDATE_VERBA,
} from "../actions/verba";
import Verba from "../../models/verba";

const initialState = {
  verba: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_VERBA:
      console.log("YELO: " + action.verbaData.favorite);
      const newVerba = new Verba(
        action.verbaData.id.toString(),
        action.verbaData.norwegian,
        action.verbaData.english,
        action.verbaData.category,
        action.verbaData.partOfSpeech,
        action.verbaData.description,
        action.verbaData.imageUri,
        action.verbaData.favorite,
        action.verbaData.dateAdded
      );
      console.log(newVerba);
      return {
        verba: state.verba.concat(newVerba),
      };
    case SET_VERBA:
      console.log("SET_VERBA");
      return {
        verba: action.verba.map(
          (ve) =>
            new Verba(
              ve.id.toString(),
              ve.norwegian,
              ve.english,
              ve.category,
              ve.partOfSpeech,
              ve.description,
              ve.imageUri,
              ve.favorite,
              ve.dateAdded
            )
        ),
      };
    case DELETE_VERBA:
      return {
        verba: state.verba.filter((verba) => verba.id !== action.id),
      };
    case UPDATE_VERBA:
      const updatedVerba = new Verba(
        action.vId,
        action.verbaData.norwegian,
        action.verbaData.english,
        action.verbaData.category,
        action.verbaData.partOfSpeech,
        action.verbaData.description,
        action.verbaData.imageUri,
        action.verbaData.favorite,
        action.verbaData.dateAdded
      );

      const verbaIndex = state.verba.findIndex(
        (verba) => verba.id === action.vId
      );
      const updatedVerbas = [...state.verba];
      updatedVerbas[verbaIndex] = updatedVerba;
      return {
        verba: updatedVerbas,
      };
  }
  return state;
};
