const mongoose = require('mongoose');
const EntrySchema = new mongoose.Schema(
	{
		name: String,
		category: {
			type: String,
			required: [true, 'Category name required'],
		},
		userId: {
			type: String,
			required: [true, 'User Id required'],
		},
		// bookId: {
		// 	type: String,
		// 	required: true
		// },
		amount: {
			type: Number,
			required: [true, 'Amount required'],
		},
		// balance: {
		// 	type: Number,
		// 	required: [true, 'Balance required'],
		// },
		type: {
			type: String,
			required: [true, 'Entry type required'],
		},
		date: {
			type: Date,
			required: true,
		},
		time: {
			type: Date,
			required: true,
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Entry', EntrySchema);
