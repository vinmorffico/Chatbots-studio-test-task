import { model, Schema } from 'mongoose';

const schema = new Schema({
  width: Number,
  height: Number,
  image: String,
  format: String,
});

const Dog = model('Dog', schema);

export default Dog;
