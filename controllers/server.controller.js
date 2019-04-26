const Account = require('../models/server.model');
var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');


//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.account_insert = function (req, res) {
	console.log(req.body);
    let account = new Account(
        {
            userName: req.body.userName,
            accountNumber: req.body.accountNumber,
            emailAddress:req.body.emailAddress,
            identityNumber:req.body.identityNumber
        }
    );

    account.save(function (err) {
        if (err) {
        	console.log(err);
        }
        res.send('Account Created successfully')
    })
};


// exports.get_acc_byname = function (req, res) {
//     Account.find({ 'userName': req.params.name }, function (err, account) {
//         if (err) return next(err);
//         res.send(account);
//     })
// };

exports.get_acc_byname = function (req, res) {
	redis.get(req.params.name, function (err, reply) {
        if (err) console.log(err);
        else if (reply) //Book exists in cache
    	res.send(JSON.parse(reply));
		else {
			Account.find({ 'userName': req.params.name }, function (err, account) {
		        if (err) return next(err);
		        redis.set(req.params.name, JSON.stringify(account), function () {
		        	res.send(account);
		    	})
			})
		}
	})
};


exports.get_acc_byidentity = function (req, res) {
    Account.findById({ 'identityNumber': Number(req.params.identity) }, function (err, account) {
        if (err) console.log(err);
        res.send(account);
    })
};

exports.acc_update = function (req, res) {
    Account.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, account) {
        if (err) return next(err);
        redis.set(req.body.userName, JSON.stringify(account), function (err) {
                if (err) console.log(err);
                res.send('Account udpated.');
            });        
    });
};

exports.acc_delete = function (req, res) {
    Account.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        redis.del(req.params.userName, function(error, response){
        	if (error) console.log('Error delete redis');
        	else res.send('Deleted successfully!');
        });
    })
};
