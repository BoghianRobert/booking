import React , { useState } from 'react'

const Admin = ({history}) => {
    const [adminData, setAdminData] = useState({})

    const checkAdmin = () => {
        if (adminData.username === 'admin' && adminData.password === 'admin')
            history.push('/control-panel')
        else
            alert('The username or password is incorrect')
    }

    return (
        <div>
            <div className="customer-form">
                <form className='form-container'>
                    <input type="text" name='username' placeholder='username'  onChange={e=> setAdminData({...adminData, [e.target.name]: e.target.value})} />
                    <input type="password" name='password' placeholder='password' onChange={e=> setAdminData({...adminData, [e.target.name]: e.target.value})} />

                    <div onClick={e => checkAdmin() } className='place-order'>Log in</div>
                </form>
            </div> 
        </div>
    )
}

export default Admin;
