const { Schema, default: mongoose } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    image: {
        type: String,
        default: 'avatar.png'
    },
    role: {
        type: [String],
        default: ['Subscriber'],
        enum: ['Subscriber', 'Instructor', 'Admin']
    },
    stripe_account_id: {},
    stripe_seller: {},
    stripe_session: {}
}, { timestamps: true });

module.exports = User = mongoose.model('User', userSchema);