const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String // 실제 서비스에서는 비밀번호를 평문으로 저장하면 안됩니다.
});

module.exports = mongoose.model('User', userSchema);
