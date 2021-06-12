const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const mongoose= require('mongodb')

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(
    process.env.DB_URI,
    {
      useUnifiedTopology: true}
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
        console.log("MongoDB database connection established successfully");
    })

const usersRouter= require('./routes/users.js')
const transactionsRouter= require('./routes/transactions.js')
const transferRouter= require('./routes/transfer.js')
const viewRouter= require('./routes/view.js')
const usertransRouter= require('./routes/usertrans.js')

app.use('/users', usersRouter);
app.use('/transactions', transactionsRouter);
app.use('/users/view/transfer', transferRouter);
app.use('/users/view',viewRouter);
app.use('/usertrans',usertransRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
