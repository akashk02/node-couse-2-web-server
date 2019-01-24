const express = require('express');
const hbs = require('hbs');

const fs= require('fs');

let app = express();


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs')

// app.use((req, res, next)=>{
//     res.render('maintaince.hbs')
// });

app.use( (req, res, next)=>{
    let log = new Date().toString();
console.log(`${log}  ${req.method} ${req.url}`);
fs.appendFile('server.log',log+'\n', (err)=>{
    if(err){
        console.log('unable to append file data');
    }
})

next();

} )


app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('capsOn',(text)=>{
return text.toUpperCase();
});

app.get('/', (req,res)=>{
    res.render('welcome.hbs' , {
        pageTitle:'this is dynamic rendering welcome page',
        paragraph:'dynamic rendering paragraph'
    } );
} );

app.get('/about', (req,res)=>{
    res.render('about.hbs' , {
        pageTitle:'this is dynamic rendering about page',
    } );
} );

app.get('/bad123',(req,res)=>{
    res.send( { 
        error_message : 'unable to fulfill request'
    } );
} );

app.get('/abc',(req,res)=>{
    res.send('abcd')
} )

app.listen(3000, ()=>{
    console.log('server is up');
} );