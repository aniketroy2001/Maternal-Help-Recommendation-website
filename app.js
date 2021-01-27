
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver');
var createError = require('http-errors');

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('express-flash');
var session1 = require('express-session');
var app = express();
var driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('Aniket','panda2009'));
var session = driver.session();

//view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());

app.use(session1({ 
    secret: '123456cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.get('/', function(req,res){
    res.render("index");
})

app.get('/location', function(req,res){
    res.render("location");
})

app.get('/login_Register', function(req,res){
    res.render("login_Register");
})
app.get('/nanny', function(req,res){
    res.render("nanny");
})
app.get('/Hospital', function(req,res){
    res.render("Hospital");
})
app.get('/doctors', function(req,res){
    res.render("doctors");
})
app.get('/register', function(req,res){
    res.render("register");
})
app.get('/contact', function(req,res){
    res.render("contact");
})
app.get('/permission', function(req,res){
    res.render("permission");
})
// app.post('/search',function(req,res){
//     var searchval = req.body.search_item;

//     session
//         .run('MATCH (n:Hospital) WHERE toLower(n.name) CONTAINS toLower($UserNameParam) RETURN n',{UserNameParam:searchval})
//         .then(function(result){
//             var nameArr = [];
//             for(let i=0;i<result.records.length;i++){
//                 nameArr.push({
//                     name: result.records[i]._fields[0].properties.name
//                 });
//             };
//             res.render("search", {
//                 names: nameArr
//             });
//         })
//         run("MATCH (n:Nanny) WHERE toLower(n.name) CONTAINS toLower($UserNameParam) RETURN n",{UserNameParam:searchval})
//         .then(function(result){
//             var nameArr = [];
//             for(let i=0;i<result.records.length;i++){
//                 nameArr.push({
//                     name: result.records[i]._fields[0].properties.name
//                 });
//             };
//             res.render("search", {
//                 names: nameArr
//             });
//         })
//         .catch(function(err){
//             if(err){
//                 console.log(err);
//             }
//         })
// }); 
app.get('/regionhospitals',function(req,res){
     session
         .run('MATCH (h:Hospital) WHERE DISTANCE(point({latitude:h.lat,longitude:h.long}),point({latitude:19.037677360774182, longitude:72.92352143390009}))<4000 RETURN h')
         .then(function(result){
             var HospitalArr=[];
             console.log('ok');
             result.records.forEach(function(record){
                 HospitalArr.push({
                    name: record._fields[0].properties.name,
                    phone:record._fields[0].properties.phone
                });
             });
            
             res.render('regionhospitals',{
                 hospitals:HospitalArr
             });
         })
         .catch(function(err){
             console.log(err);
        });
 });
 app.get('/allhospitals',function(req,res){
    session
        .run('MATCH (h:Hospital) RETURN h')
        .then(function(result){
            var DoctorArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                DoctorArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone
               });
            });
           
            res.render('allhospitals',{
                hospitals:DoctorArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
app.get('/regiondoctors',function(req,res){
    session
        .run('MATCH (h:Doctor) WHERE DISTANCE(point({latitude:h.latitude,longitude:h.longitude}),point({latitude:19.037677360774182, longitude:72.92352143390009}))<4000 RETURN h')
        .then(function(result){
            var DoctorArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                DoctorArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone
               });
            });
           
            res.render('regiondoctors',{
                doctors:DoctorArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
app.get('/alldoctors',function(req,res){
    session
        .run('MATCH (h:Doctor) RETURN h')
        .then(function(result){
            var DoctorArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                DoctorArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone
               });
            });
           
            res.render('alldoctors',{
                doctors:DoctorArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
 app.get('/rating3',function(req,res){
    session
        .run('MATCH (n:Nanny) WHERE n.rating>=3 RETURN n')
        .then(function(result){
            var NannyArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                NannyArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone,
                   rating:record._fields[0].properties.rating
               });
            });
           
            res.render('rating3',{
                nannies:NannyArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
app.get('/rating4',function(req,res){
    session
        .run('MATCH (n:Nanny) WHERE n.rating>=4 RETURN n')
        .then(function(result){
            var NannyArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                NannyArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone,
                   rating:record._fields[0].properties.rating
               });
            });
           
            res.render('rating4',{
                nannies:NannyArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
app.get('/rating5',function(req,res){
    session
        .run('MATCH (n:Nanny) WHERE n.rating=5 RETURN n')
        .then(function(result){
            var NannyArr=[];
            console.log('ok');
            result.records.forEach(function(record){
                NannyArr.push({
                   name: record._fields[0].properties.name,
                   phone:record._fields[0].properties.phone,
                   rating:record._fields[0].properties.rating
               });
            });
           
            res.render('rating5',{
                nannies:NannyArr
            });
        })
        .catch(function(err){
            console.log(err);
       });
});
app.post('/login/get', function(req, res) {
    var UserName = req.body.username;
    var Password = req.body.password;
    console.log(UserName,Password);
    session
        .run('MATCH (n:User{username: $UserNameParam, password: $PasswordParam}) RETURN n',{UserNameParam: UserName, PasswordParam: Password })
        .then(function(result){
            console.log(result);
            if(result.records.length==0){
                //res.flash('error', 'Please correct enter email and Password!');
                res.redirect('/login_Register');
            }
            else{
               
                req.session.loggedin = true;
                req.session.name = UserName;
                res.redirect('/');
            }
        })
        .catch(function(err){
            if(err){
                console.log(err);
            }
        })
    })

    app.get('/', function(req, res) {
        if (req.session.loggedin) {
            res.render("index", {
                title:"Dashboard",
                name: req.session.name,     
            });
        }
        else {
            req.flash('success', 'Please login first!');
            res.redirect('/login_Register');
        }
    })

    app.get('/logout', function (req, res) {
        req.session.destroy();
        res.redirect('/login');
    })


app.post('/username/add',function(req,res){
    var UserName = req.body.username;
    var Password = req.body.password;
    var EmailID = req.body.emailid;

    session
        .run('MATCH(p:Admin) CREATE(n:User{username:$UserNameParam,password:$PasswordParam,emailid:$EmailIDParam}) <-[r:Moderates_over]-(p) RETURN n.UserName',{UserNameParam:UserName,PasswordParam:Password,EmailIDParam:EmailID})
        .then(function(result){
            res.redirect('/');

            session.close();
        })
        .catch(function(err){
            console.log(err);
        });


    res.redirect('/')
})
app.post('/contact/add',function(req,res){
    var UserName = req.body.username;
    var Phone = req.body.phone;
    var EmailID = req.body.emailid;
    var Concern = req.body.concern;
    
    session
        .run('CREATE(n:Contact{username:$UserNameParam,phone:$PhoneParam,emailid:$EmailIDParam,concern:$ConcernParam}) RETURN n',{UserNameParam:UserName,PhoneParam:Phone,EmailIDParam:EmailID,ConcernParam:Concern})
        .then(function(result){
            res.redirect('/');

            session.close();
        })
        .catch(function(err){
            console.log(err);
        });


    res.redirect('/')
})

app.listen(3000);
console.log('server started on port 3000');

module.exports = app;