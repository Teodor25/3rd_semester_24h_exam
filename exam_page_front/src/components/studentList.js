import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { MDBBtn } from "mdbreact";
import {Link} from 'react-router-dom';

import httpService from '../service/httpService';

export default class StudentList extends React.Component {
    
    constructor(props) {
        super(props);
        this.getStudentList = this.getStudentList.bind(this);
        this.state = {
            students: [],
        }
    }
    
    getStudentList = () => {
        httpService
            .get('/students')
            .then( (response) => {
                console.log('Response data: ');
                console.log(response.data) 
                this.setState({
                    students: response.data
                })
            }, (error) => {
                console.log('We failed, master. Error : ' + error)
            })
            .catch((e) => {
                console.log(e)
            })
    }

    componentDidMount()
    {
        this.getStudentList();
    }

    findStudent(id) {
        return this.state.students.filter(student => {
            return student.id === id
        })
    }

    openUpdatePage = (id) => {
        const student = this.findStudent(id);

    }

    removeStudent = (id) => {
        httpService
            .delete('/studentDelete/?id=' + id)
            .then( (response) => {
                console.log(response)
            }, (error) => {
                console.log('We failed, master. ' + error)
            })
            .catch((e) => {
                console.log(e)
            })
    } 

    render() {
        const studentList = this.state.students;
        return (
            <div className="col-" style={{width: "80%", margin: "auto"}}>
                <Row style={{marginBottom:'4vh'}}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2 style={{fontSize:'48px'}}> STUDENT LIST </h2>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Link to='/'> <MDBBtn color='dark'>Back</MDBBtn> </Link>
                    </Col>
                </Row> 
                <Row>
                    <Col xs={1}>ID</Col>
                    <Col>Full Name</Col>
                    <Col>E-mail</Col>
                    <Col xs={2}>Sup ID</Col>
                    <Col>Action</Col>
                </Row>
                <hr style={{border: '1px solid white'}}></hr>
                <ul style={{listStyleType: 'none'}}>
                    {
                        studentList && studentList.map((student, index) => {
                            return (
                                <Row key={index} style={{fontSize:'14px', justifyContent:'center'}}>
                                    <Col xs={1}>{student.id}</Col>
                                    <Col>{student.firstName} {student.lastName}</Col>
                                    <Col>{student.email}</Col>
                                    <Col xs={2} >{student.supervisor ? student.supervisor.id : "-"}</Col>
                                    <Col>
                                        <Link to={{
                                            pathname: '/update',
                                            state: { id: student.id }
                                        }}>
                                            <MDBBtn className="mr-1"  > Update </MDBBtn>
                                        </Link>
                                        <MDBBtn color="danger" onClick={() => this.removeStudent(student.id)}> Delete </MDBBtn>
                                    </Col>
                                </Row>
                            )
                        })
                    }
                </ul>
            </div>
        ); 
    }; 
}
