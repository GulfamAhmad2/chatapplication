import Message from '../models/message.model.js'

export const sendMessage = async (req, res) => {
    const senderId = req.user.id
    const {encrypted_message, sessionId, receiverId} = req.body

    // note 
    // websockte ko use 
    // this is just a basic sendMessage logic we will make it more advance
    try {
        if (!senderId || !encrypted_message || !sessionId || !receiverId) {
            return res.status(400).json({message: "Missing required fields"})
        }
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            sessionId,
            encrypted_message 
        })
        await newMessage.save()
        return res.status(201).json({message: "Message sent successfully"})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getMessages = async (req, res) => {
    const {receiverId} = req.user.id
    const {sessionId} = req.body
    try {
        if (!sessionId) {
            return res.status.json({message: "Session Id missiong"})
        }
        const messages = await Message.find({sessionId, receiverId})
        if (!messages) return res.status(404).json({message: "No messages found."})
        res.status(200).json(messages)
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteMessages = async (req, res) => {
    const {sessionId} = req.body
    try {
        if (!sessionId) {
            return res.status(400).json({message: "Missing required fields"})
        }
        await Message.deleteMany({sessionId})
        return res.status(200).json({message: "All your chats has been deleted from our end"})
    } catch(error) {
        console.log("Error: " + error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

