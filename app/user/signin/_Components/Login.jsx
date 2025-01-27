import './LoginStyle.css'

export default function Login(){
    return (
        <>
            <div id="loginContainer">
                <div id="completeForm">
                    <div id="textContainer">
                        <h1>Login to echat</h1>
                    </div>
                    <form id="formContainer">
                        <label htmlFor='email'>Email</label><br/>
                        <input type='text' id='email' name='email'/><br/>
                        <label htmlFor='password'>Password</label><br/>
                        <input type='password' id='password' name='password'/><br/>
                        <input type='submit' value='Login'/>
                    </form>
                    <div id="iconContainer"></div>
                </div>
            </div>
        </>
    )
}