import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBBtn} from "mdbreact";
import {Link, useHistory} from 'react-router-dom';

import httpService from '../service/httpService';

function CreateStudent() 
{
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [supervisor, setSupervisor] = useState({ firstName: 'Teodor',      lastName: 'Jonasson',       id: 1 });
    
    const supervisors = [
        { firstName: 'Teodor',      lastName: 'Jonasson',       id: 1 },
        { firstName: 'Alex',        lastName: 'Maccaganowich',   id: 2 },
        { firstName: 'Cristian',    lastName: 'Pruchea',        id: 3 },
        { firstName: 'Jan',         lastName: 'Watashiyeet',    id: 4 },
    ];

    const updateInfo = (type, text) => 
    {
        if (type === 'firstName'){ setFirstName(text); } 
        else if (type === 'lastName'){ setLastName(text); } 
        else if (type === 'email'){ setEmail(text); } 
        else if (type === 'password') { setPassword(text); }
        else if (type === 'supervisor') { setSupervisor(text); }
    }

    //Redirect to dashboard after login succes
    const history = useHistory();
    const goStudentList = (sessionID) => history.push('/studentlist');

    const create = () => 
    {
        if(firstName==='') { alert(`You are missing First Name`); return;  } 
        else if (lastName==='') { alert(`You are missing Last Name`); return; } 
        else if (email==='') { alert(`You are missing E-mail`); return; } 
        else if (password==='') { alert(`You are missing your Password`); return; }

        if (email.match("^\\b[\\w.!#$%&’*+\\/=?^`{|}~-]+@[\\w-]+(?:\\.[\\w-]+)+\\b$") == null)
        {
            console.log("Provided email does not seem to be a valid email");
            alert(`Email is inactive, please use an active email`); 
            return;
        }

        const newStudent = 
        {
            firstName: firstName,
            lastName: lastName,
            supervisor: supervisor, 
            email: email,
            password: password 
        }

        httpService
            .post("/students", newStudent)
            .then( (response) => 
            {
                console.log(response)
                console.log('Student added: ' + firstName + ' ' + lastName)
                goStudentList('')
            }, (error) => {
                alert(`Error, Email possibly already exists in the system. Try logging in`)
                updateInfo('password', '')
                console.log("error")
            })
            .catch( (e) => { console.log(e) });
    }

    return (
        <div className="createPage" data-testid="createUser" style={{width:"100%"}}>
            <Container>
                <Row style={{paddingTop: '7%'}}>
                     <Col xs={0} md={2} lg={3}></Col>
                    <Col xs={12} md={8} lg={6} >
                        <h1 style={{color:"white", marginBottom: '2vh'}}>Create Student</h1>
                        <MDBInput label="First Name" style={{color:'white'}}
                            onChange={e => updateInfo('firstName', e.target.value)} value={firstName}/>

                        <MDBInput label="Last Name" style={{color:'white'}}
                            onChange={e => updateInfo('lastName', e.target.value)} value={lastName} />

                        <MDBInput label="E-mail" style={{color:'white'}}
                            onChange={e => updateInfo('email', e.target.value)} value={email} />

                        <MDBInput label="password" style={{color:'white'}}
                            onChange={e => updateInfo('password', e.target.value)} value={password} />

                        <p style={{textAlign:'left', fontSize:"16px", marginBottom: 0, color:'grey'}}>Select Supervisor</p>
                        
                        <select 
                            className="browser-default custom-select" 
                            onChange={e => { updateInfo('supervisor', supervisors[e.target.value]) }}
                            style={{background: 'none', color:'white'}}
                        > {
                            supervisors.map((supervisor, index) => (
                                <option value={supervisor.id} key={index}>
                                    {supervisor.firstName} {supervisor.lastName}
                                </option>)
                            )}
                        </select>
                        <br/><br/>
                        <div>
                            <MDBBtn color="unique" style={{width:'100%', marginLeft:0}} onClick={create}>
                                Create Student User
                            </MDBBtn> 
                            <Link to='/login'> 
                                <MDBBtn color="dark" style={{width:'100%', marginLeft:0}}>
                                    Login
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

export default CreateStudent; 