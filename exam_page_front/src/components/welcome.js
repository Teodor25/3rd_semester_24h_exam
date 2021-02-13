import React from 'react'
import {Link} from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import httpService from '../service/httpService';

export default function Welcome() {
    
    const initDb = () => {
        httpService
            .post("/initdb")
            .then( (response) => 
            {
                console.log('database initiated: ' + response.data)
                if(!response.data) {
                    alert('Theres already data in the database')
                    console.log("Database already contains data.")
                } else {
                    alert('The database has been filled')
                    console.log('Database has been filled.')
                }
            }, (error) => {
                alert(`Error, failed to initiate database`)
            })
            .catch( (e) => { console.log(e) });
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h3>Welcome to</h3>
            <h1 style={{fontWeight: 'bold', fontSize:'78px'}}>Teodor Jonasson's</h1>
            <h3>3rd semester exam project</h3><br/> 
            <Link to='/login'> 
                <MDBBtn color="dark">Login</MDBBtn> 
            </Link>
            <Link to='/createstudent'> 
                <MDBBtn color="dark">Create Student User</MDBBtn> 
            </Link>
            <MDBBtn color="dark" onClick={initDb}>Init DB</MDBBtn> 
        </div>

    )
}
