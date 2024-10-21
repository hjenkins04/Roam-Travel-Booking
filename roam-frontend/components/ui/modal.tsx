import Document, { Html, Head, Main, NextScript } from 'next/document';

class Modal extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Your App Title</title>
                    {/* Add any additional meta tags or links here */}
                </Head>
                <body>
                    <Main /> {/* This is where your Next.js app will be rendered */}
                    <div id="modal-root"></div> {/* Modal portal root */}
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default Modal;