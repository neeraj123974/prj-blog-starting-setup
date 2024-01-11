import { Fragment } from "react";
import Head from 'next/head';

import Contactform from "../components/contact/contact-form";

function ContactPage(){
    return(
        <Fragment>
            <Head>
                <title>Contact Me</title>
                <meta name="description" content="Send me your messages!"/>
            </Head>
            <Contactform />
        </Fragment>
    )
}

export default ContactPage;