import  mongoose  from 'mongoose'

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },console.log('mongoose connecting'))
}

export default connectDB
