import { useState, useEffect } from 'react';

import Notification from '../ui/notification';
import classes from './contact-form.module.css';

function Contactform(){
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); //'pending', 'success', 'error'
    const [requestError, setRequestError] = useState();

    useEffect(()=>{
        if(requestStatus === 'success' || requestStatus === 'error'){
            const timer = setTimeout(()=>{
                setRequestError(null)
                setRequestStatus(null)
            },3000)
            return()=> clearTimeout(timer)
        }
    },[requestStatus])

    async function sendContactData(body){
        const response = await fetch('/api/contact/',{
            method:'POST',
            body: JSON.stringify(body),
            headers:{
                'content-type':'application/json'
            }
        })
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "Something went wrong")
        }
    }
 
    async function sendMessageHandler(event){
        event.preventDefault();
        setRequestStatus('pending');
        try{
            await sendContactData({
                name: enteredName,
                email: enteredEmail,
                message: enteredMessage
            })
            setRequestStatus('success')
            setEnteredEmail('');
            setEnteredMessage('');
            setEnteredName('');
        }catch(error){
            setRequestError(error.message)
            setRequestStatus('error')
        }
    }

    let notification;
    if(requestStatus === 'pending'){
        notification = {
            status: 'pending',
            title: 'Sending message....',
            message: 'Your message is on its way!'
        }
    }
    if(requestStatus === 'error'){
        notification = {
            status: 'error',
            title: 'Sending message....',
            message: requestError
        } 
    }

    if(requestStatus === 'success'){
        notification = {
            status: 'success',
            title: 'success!',
            message: 'Message sent successfully'
        } 
    }

    return(
        <section className={classes.contact}>
            <h1>How can I help you</h1>
            <form className={classes.form} onSubmit={sendMessageHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input type='email' id='email'  value={enteredEmail} onChange={event=>setEnteredEmail(event.target.value)} required/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input type='text' id='name' value={enteredName} onChange={event=>setEnteredName(event.target.value)} required/>
                    </div>
                </div> 
                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea id='message' rows={5} value={enteredMessage} onChange={event=>setEnteredMessage(event.target.value)} required></textarea>
                </div>
                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>
            {notification && <Notification {...notification}/>}
        </section>
    )
}

export default Contactform;