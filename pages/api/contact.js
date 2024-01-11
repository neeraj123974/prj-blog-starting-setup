import {connectDatabase} from '../../helpers/db-util';

async function handler(req, res){
    if(req.method === 'POST'){
        const {name, message, email} = req.body;
        if(
            !email || 
            !email.includes('@') || 
            !name || 
            name.trim() === '' || 
            !message || 
            message.trim() === ''
        ){
            res.status(422).json({message: 'Invalid value of input'})
            return;
        }
        //store it in a database
        let client;
        try{
             client = await connectDatabase();
        }catch(error){
            res.status(500).json({message: 'Could not connect to database'})
            return;
        }
        const db = client.db();
        const newMessage = {
            name, email, message
        }
        try{
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
            client.close();
            res.status(201).json({ message: 'Successfully stored message!', message: newMessage})
        }catch(error){
            client.close();
            res.status(500).json({message: 'Storing message failed!', message: newMessage})
            return;
        }
    }
}

export default handler;