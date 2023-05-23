const express = require('express');
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const uri = "mongodb+srv://alanchenjian:IloveMongo1340@cluster0.rclm3ng.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error);
});
// mongoose.connect('mongodb://127.0.0.1:27017/blog');

const app = express();

const articlesRouter = require('./routes/articles');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))

app.use('/articles', articlesRouter);


const Article = require('./models/article')
app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.listen(5000);