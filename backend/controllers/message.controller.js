import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
    const senderId = req.user.id
    const {receiverId} = req.params
    const {encrypted_message} = req.body

    // this is just a basic sendMessage logic we will make it more advance
    try {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            encrypted_message 
        })
        await newMessage.save()
        return res.status(201).json({message: "Message sent successfully"})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMessage = async (req, res) => {

    try {
        const 
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}