const express = require('express');
const path =require('path');
const hbs= require('hbs');

const geocode = require('./util/geocode');
const forecast = require('./util/forecast');

const app =new express();

const publicDirectory =path.join(__dirname,'public');
const templateDirectory = path.join(__dirname,'templates/views');
const partialTemplateDirectory= path.join(__dirname,'templates/partials');
// setting up view engine and directory path
app.set('view engine', 'hbs');
app.set('views',templateDirectory);
hbs.registerPartials(partialTemplateDirectory);
// for static content
app.use(express.static(publicDirectory));


app.get('',(req,res) => {
    res.render('index');
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'A help message from hbs :-)',
        name:'A help page'
    });
});
// app.get('/',(req,res)=>{

//     res.send('<h1>hello world</h1>');
// });


// app.use('/help',(req,res)=>{
//     res.send('<title>Weather App</title>');
// });

app.get('/about', (req, res) => {
    res.render('about',{
        name:'About page'
    });
});

app.get('/weather',(req,res)=>{
    const {address} = req.query;

    if(!address) {
        return res.send({
            error:'No address query parameter provided',
            address: !req.query.address
        });
    }


    geocode(address, () => {
        console.log('Error occurred while geocoding....');
        return res.send({
            error:'Error occurred in geocoding'
        });
    }, (data) => {
        const { place } = data;
        forecast(data, (err, forecastingData) => {
            if (err) {
                // return console.log(err);
                return res.send({
                    error:err
                });
            }

            console.log('Location is ,', place, '  and', forecastingData);
            res.send({
                forecast: forecastingData,
                location: place, 
                address: address
            });

        });
    });    
});


app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help data not loaded'
    });
});
app.get('*',(req,res)=>{
    res.render('404',{
        message:'Page not found'
    });
});

app.listen(3000,()=>{
    console.log('server is running on port');
});