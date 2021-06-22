const Category = require('../models/Category');
const Entry = require('../models/Entry');

module.exports.addEntry = (req, res) => {
	// console.log(req.body);

	let {date, time} = req.body

	if(!date) {
		date = new Date()
	}
	if(!time) {
		time = new Date()
	}

	let newEntry = new Entry({
		name: req.body.name,
		category: req.body.category,
		amount: req.body.amount,
		type: req.body.type,
		userId: req.user.id,
		date: date,
		time: time
	});



	newEntry
		.save()
		.then(entry => {
			res.send({ message: `Entry has been added.`, data: entry });
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.getEntries = (req, res) => {
	Entry.find({ userId: req.user.id })
		.then(entries => {

			res.send(entries.reverse());
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.getEntriesUnAuth = (req, res) => {
	Entry.find()
		.then(entries => {
			res.send(entries);
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.getEntry = (req, res) => {
	Entry.findById(req.params.id)
		.then(entryFound => {
			res.send(entryFound);
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.getExpenses = (req, res) => {
	Entry.find({ userId: req.user.id })
		.then(entries => {
			let expenses = entries.filter(entry => entry.type === 'expense');
			res.send(expenses);
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.getIncome = (req, res) => {
	Entry.find({ userId: req.user.id })
		.then(entries => {
			let income = entries.filter(entry => entry.type === 'income');
			res.send(income);
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.updateEntry = (req, res) => {
	let updates = {
		name: req.body.name,
		category: req.body.category,
		amount: req.body.amount,
		type: req.body.type,
		userId: req.user.id,
	};

	Entry.findByIdAndUpdate(req.params.id, updates, { new: true })
		.then(entry => {
			res.send({ message: `Entry has been updated.` });
		})
		.catch(err => {
			res.send(err);
		});
};

module.exports.deleteEntry = (req, res) => {
	Entry.findByIdAndDelete(req.params.id)
		.then(deletedItem => {
			console.log(deletedItem);
			res.send({ message: `Entry has been deleted.` });
		})
		.catch(err => {
			res.send(err);
		});
};

//Stretch Goals
module.exports.getEntriesByCategory = (req, res) => {
	let { category } = req.params;
	Entry.find({ userId: req.user.id })
		.then(entries => {
			const expenses = entries.filter(
				entry => entry.category.toLowerCase() === category.toLowerCase() 
			);
			res.send(expenses);
		})
		.catch(err => {
			res.send(err);
		});
};
