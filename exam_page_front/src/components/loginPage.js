import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBBtn } from "mdbreact";
import {Link, useHistory} from 'react-router-dom';

import httpService from '../service/httpService';

export default function LoginPage() {
    
    //Hooks for login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    //Redirect to dashboard after login succes
    const history = useHistory();
    const goStudentList = (sessionID) => history.push('/studentlist');

    //Update inputfields
    const updateInfo = (type, text) => 
    {
        if(type==='email'){
            setEmail(text);
        } else if (type==='password') {
            setPassword(text);
        }
    }

    //Check if the fields have been written before submitting the login
    const checkFields = () => 
    {
        if(email===''){
            alert('The E-mail field is empty, please write your E-mail and try again.');
            return false;
        } else if(password===''){
            alert('The password field is empty, please write your Password and try again.')
            return false; 
        } else {
            console.log("Fields written: " + true);
            return true; 
        }
    }

    //Login responding with User 
    const login = () => 
    {    
        if(checkFields())
        {
            httpService
                .post('/studentLogin/?email=' + email + '&password=' + password)
                .then( (response) => 
                {
                    console.log('data returned :' + response.data);
                    if(response.data!==''){
                        console.log('You are loggid in Student ID: ' + response.data.id + ' - ' + response.data.firstName); 
                        goStudentList('');
                    } else {
                        console.log('you have falied me, son.')
                    } 
                }, (error) => 
                {
                    console.log('We messed up man -> ' + error)
                })
                .catch((e) => 
                {
                    console.log(e)
                });   
        }
    }
    
    return (
        <div className="loginPage" data-testid="login" style={{width:"100%"}}>
            <Container>
                <Row style={{paddingTop: '7%'}}>
                    <Col xs={0} md={2} lg={3}></Col>
                    <Col xs={12} md={8} lg={6}>
                        <h1>Login</h1>
                        <MDBInput label='E-mail' style={{color:'white'}}
                            onChange={e => updateInfo('email', e.target.value)} value={email} /> 

                        <MDBInput label='Password' style={{color:'white'}}
                            onChange={e => updateInfo('password', e.target.value)} value={password} /> 
                        <br/>
                        <div>
                            <MDBBtn color="unique" style={{width:'100%', marginLeft:0}} onClick={login}>
                                Login
                            </MDBBtn>
                            <Link to='/createstudent'> 
                                <MDBBtn color='dark' style={{width:'100%', marginLeft:0}}>
                                    Create Student
                                </MDBBtn> 
                            </Link>
                            <Link to='/'> 
                                <MDBBtn color='dark' style={{width:'100%', marginLeft:0}}>
                                    Back To Welcome Page
                                </MDBBtn> 
                            </Link>
                            <p style={{fontSize:'14px', marginTop:'2vh'}}>
                                <strong>Create</strong> a student user or <strong>login</strong> to see and edit student list
                            </p>
                        </div>
                    </Col>
                </Row> 
            </Container>
        </div>
    )
}
