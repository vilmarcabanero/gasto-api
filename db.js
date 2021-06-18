const mongoose = require('mongoose')

module.export = mongoose.connect('mongodb+srv://teejae1234:teejae1234@cluster0.wzomk.mongodb.net/budget-tracker-api?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( () => {
    console.log("Connected to database")
}).catch( err => {
    console.log(err)
})
