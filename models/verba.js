class Verba {
  constructor(id, norwegian, english, category, partOfSpeech, description, imageUri, favorite, dateAdded) {
    this.id = id;
    this.norwegian = norwegian;
    this.english = english;
    this.category = category;
    this.partOfSpeech = partOfSpeech;
    this.description = description;
    this.imageUri = imageUri;
    this.favorite = favorite;
    this.dateAdded = dateAdded;
  }
}

export default Verba;