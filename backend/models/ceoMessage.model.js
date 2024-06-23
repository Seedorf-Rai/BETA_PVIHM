const mongoose = require('mongoose')

const ceoMsgSchema = new mongoose.Schema({
    message: String,
    image: String
},
{
    timestamps: true
}
)
const MsgCEO = mongoose.model('MsgCEO',ceoMsgSchema)
module.exports = MsgCEO;