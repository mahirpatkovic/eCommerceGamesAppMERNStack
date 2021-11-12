const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter game name'],
    },
    title: {
        type: String,
        required: [true, 'Please enter game title'],
    },
    description: {
        type: String,
        default: 'Game description',
    },
    developer: {
        type: String,
        default: 'Game developer',
    },
    images: Array,
    genre: {
        type: String,
        default: 'Game genre',
    },
    languages: Array,
    modes: {
        type: String,
        default: 'Game modes',
    },
    platform: {
        type: String,
        default: 'Game platform',
    },
    poster: {
        type: String,
        default: 'Game poster',
    },
    price: Number,
    publisher: {
        type: String,
        default: 'Game publisher',
    },
    quantity: Number,
    releaseDate: String,
    trailer: String,
    macMinimumReqs: Array,
    macRecommendedReqs: Array,
    windowsMinimumReqs: Array,
    windowsRecommendedReqs: Array,
    // mac: {
    //     minimum: {
    //         processor: String,
    //         os: String,
    //         memory: String,
    //         graphics: String,
    //         storage: String,
    //     },
    //     recommended: {
    //         processor: String,
    //         os: String,
    //         memory: String,
    //         graphics: String,
    //         storage: String,
    //     },
    // },
    // windows: {
    //     minimum: {
    //         processor: String,
    //         os: String,
    //         memory: String,
    //         graphics: String,
    //         storage: String,
    //     },
    //     recommended: {
    //         processor: String,
    //         os: String,
    //         memory: String,
    //         graphics: String,
    //         storage: String,
    //     },
    // },
    // },
    languages: {
        English: {
            audio: { type: Boolean, default: false },
            interface: { type: Boolean, default: false },
            subtitles: { type: Boolean, default: false },
        },
        German: {
            audio: { type: Boolean, default: false },
            interface: { type: Boolean, default: false },
            subtitles: { type: Boolean, default: false },
        },
        Portugese: {
            audio: { type: Boolean, default: false },
            interface: { type: Boolean, default: false },
            subtitles: { type: Boolean, default: false },
        },
        Spanish: {
            audio: { type: Boolean, default: false },
            interface: { type: Boolean, default: false },
            subtitles: { type: Boolean, default: false },
        },
        Turkish: {
            audio: { type: Boolean, default: false },
            interface: { type: Boolean, default: false },
            subtitles: { type: Boolean, default: false },
        },
    },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
