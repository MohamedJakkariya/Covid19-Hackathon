    
dbPassword = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0-atf8h.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

// mongodb+srv://Mdjack:<password>@cluster0-atf8h.mongodb.net/test?retryWrites=true&w=majority

module.exports = {
    mongoURI: dbPassword
};
