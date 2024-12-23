const mongoose = require('mongoose');  // Импортируем mongoose

const { Schema, model } = mongoose; // Деструктурируем Schema и model из mongoose

// Схема для закладок треков
const TrackBookmarkSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
    trackNumber: { type: String, required: true },
    trackId: { type: Schema.Types.ObjectId, ref: 'Track', required: false },
    currentStatus: { type: Schema.Types.ObjectId, ref: 'Status', default: null }
  });

// Схема для архива закладок
const ArchiveBookmarkSchema = new Schema({
    createdAt: { type: Date, default: Date.now },
    description: { type: String, required: true },
    trackNumber: { type: String, required: true },
    history: {
        type: [{
            status: { type: Schema.Types.ObjectId, ref: 'Status' },
            date: { type: Date, default: Date.now }
        }],
        default: []
    }
});



// Основная схема пользователя
const UserSchema = new Schema({
    phone: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: false },
    role: { type: String, default: "client" },
    createdAt: { type: Date, default: Date.now },
    bookmarks: [TrackBookmarkSchema],  // Закладки треков
    archive: [ArchiveBookmarkSchema],  // Архив закладок
    profilePhoto: { type: String, required: false },
});

module.exports = model('User', UserSchema);
