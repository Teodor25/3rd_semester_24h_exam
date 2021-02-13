import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBInput, MDBBtn} from "mdbreact";
import {Link} from 'react-router-dom';

import httpService from '../service/httpService';

export default class UpdateStudent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            supervisor: '',
        }
    }

    supervisors = [
        { firstName: 'Teodor',      lastName: 'Jonasson',       id: 1 },
        { firstName: 'Alex',        lastName: 'Maccaganowich',  id: 2 },
        { firstName: 'Cristian',    lastName: 'Pruchea',        id: 3 },
        { firstName: 'Jan',         lastName: 'Watashiyeet',    id: 4 },
    ];

    getStudent(id) {
        httpService
            .get('/students/'+id)
            .then( (response) => {
                console.log('supervisor id :' + response.data.supervisor.id)
                this.setState({
                    id: response.data.id,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    password: response.data.password,
                })
                this.updateInfo(this.supervisors[response.data.supervisor.id - 1]); 
            })
    }

    componentDidMount() {
        this.getStudent(this.props.location.state.id)
    }

    updateInfo = (type, text) => 
    {
        if (type === 'firstName'){ 
            this.setState({
                firstName: text
            })
        } 
        else if (type === 'lastName'){ 
            this.setState({
                lastName: text
            })
        }
        else if (type === 'email'){ 
            this.setState({
                email: text
            })
        }
        else if (type === 'password') { 
            this.setState({
                password: text
            })
        }
        else if (type === 'supervisor') { 
            console.log(text)
            this.setState({
                supervisor: text
            })
        }
    }

    updateStudent() {
        const updateStudent = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            supervisor: this.state.supervisor
        }
        httpService
            .put('/updateStudent', updateStudent)
            .then((response) =>{
                console.log("student with id:"+updateStudent.id + " has been updated: "+ response.data)
            })
    }
    
    render() {
        return (
            <div className="updateStudentPage" style={{width:"100%"}}>
            <Container>
                <Row style={{paddingTop: '7%'}}>
                     <Col xs={0} md={2} lg={3}></Col>
                    <Col xs={12} md={8} lg={6} >
                        <h1 style={{color:"white", marginBottom: '4vh'}}>UPDATE {this.state.firstName.toUpperCase()}</h1>
                        <MDBInput label="First Name" style={{color:'white'}}
                            onChange={e => this.updateInfo('firstName', e.target.value)} value={this.state.firstName}/>

                        <MDBInput label="Last Name" style={{color:'white'}}
                            onChange={e => this.updateInfo('lastName', e.target.value)} value={this.state.lastName} />

                        <MDBInput label="E-mail" style={{color:'white'}}
                            onChange={e => this.updateInfo('email', e.target.value)} value={this.state.email} />

                        <MDBInput label="password" style={{color:'white'}}
                            onChange={e => this.updateInfo('password', e.target.value)} value={this.state.password} />

                        <p style={{textAlign:'left', fontSize:"16px", marginBottom: 0, color:'grey'}}>Select Supervisor</p>
                        
                        <select 
                            className="browser-default custom-select"
                            style={{background: 'none', color:'white'}}
                            onChange={e => { 
                                console.log("nr: " + e.target.value)
                                this.updateInfo('supervisor', this.supervisors[e.target.value - 1]) 
                            }}
                        > 
                        {
                            this.supervisors.map((supervisor, index) => (
                                <option value={supervisor.id} key={index}>
                                    {supervisor.firstName} {supervisor.lastName}
                                </option>)
                            )
                        }
                        </select>
                        <br/><br/>
                        <div>
                            <MDBBtn 
                                color="unique" 
                                style={{width:'100%', marginLeft:0}} 
                                onClick={() => this.updateStudent()}
                            >
                                Update {this.state.firstName}
                            </MDBBtn>
                            <Link to='/studentlist'> 
                                <MDBBtn color='dark' style={{width:'100%', marginLeft:0}}>
                                    Back To student list
                                </MDBBtn> 
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        )
    }
}
