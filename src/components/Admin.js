import React , { useState } from 'react'

const Admin = ({history}) => {
    const [adminData, setAdminData] = useState({})

    const checkAdmin = () => {
        if (adminData.username === 'admin' && adminData.password === 'admin') {
            localStorage.setItem('admin', JSON.stringify(adminData.username))
            history.push('/control-panel')
        }
        else
            alert('The username or password is incorrect')
    }

    const backToHome = () => {
        history.push('/')
    }

    return (
        <div>
            <div className="customer-form">
                <form className='form-container'>
                    <input type="text" name='username' placeholder='username'  onChange={e=> setAdminData({...adminData, [e.target.name]: e.target.value})} />
                    <input type="password" name='password' placeholder='password' onChange={e=> setAdminData({...adminData, [e.target.name]: e.target.value})} />

                    <div className='admin-buttons'>
                        <div onClick={() => backToHome() } className='back-to-home'>Back</div>
                        <div onClick={() => checkAdmin() } className='log-in'>Log in</div>
                    </div>

                </form>
            </div> 
        </div>
    )
}

export default Admin;
