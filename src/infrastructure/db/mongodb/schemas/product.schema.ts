import mongoose, {Schema} from 'mongoose'

const ProductSchema = new Schema({
  id: Number,
  brand: String,
  description: String,
  image: String,
  price: Number,
})

export default mongoose.model('products', ProductSchema)
