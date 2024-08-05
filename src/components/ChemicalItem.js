import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Row, Col, Table, ModalHeader, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';
import { deleteItem, updateItem } from '../redux/chemicalSlice';
import SearchChemical from './SearchChemical'
import './chemicalItem.css';

export default function ChemicalItem() {
    const dispatch = useDispatch();
    const { chemicals, searchChemical  } = useSelector(
        (state) => state.chemicals
    );
    const [modal, setModal] = useState(false);
    const [chemicalToUpdate, setChemicalToUpdate] = useState({});


    const filterBySearchName = (list) => {
        console.log(searchChemical);
        return list.filter((item) => item.name.includes(searchChemical));
    };

    const toggleModal = () => {
        setModal(!modal);
    };

    const handleUpdate = (chemical) => {
        setChemicalToUpdate(chemical);
        toggleModal();
    };

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        dispatch(updateItem(chemicalToUpdate));
        toggleModal();
    };

    const handle_delete = (id) => {
        dispatch(deleteItem(id));
    };

    return (
        <Container className='chemical-list'>
            <Row>
                <Col>
                    <h3 className='text-center mt-5'>Chemical List</h3>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Chemical Name</th>
                                <th>Chemical Formula</th>
                                <th className='text-align-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chemicals.map((item, index) => (
                                <tr key={item.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.formula}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button color="danger" onClick={() => handle_delete(item.id)}>
                                            Delete
                                        </Button>
                                        <Button color='success' onClick={() => handleUpdate(item)}>Edit</Button>
                                    </td>
                                </tr>
                            ))}
                            {filterBySearchName(chemicals).map((item) => (
                                <ChemicalItem chemical={item} />
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Update Chemical</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmitUpdate}>
                        <label>Chemical Name</label>
                        <Input
                            type='text'
                            value={chemicalToUpdate.name}
                            onChange={(e) => setChemicalToUpdate({ ...chemicalToUpdate, name: e.target.value })}
                        ></Input>
                        <br />
                        <label>Chemical Formula</label>
                        <Input
                            type='text'
                            value={chemicalToUpdate.formula}
                            onChange={(e) => setChemicalToUpdate({ ...chemicalToUpdate, formula: e.target.value })}
                        ></Input>
                        <br />
                        <Button type='submit' color="primary"> Update</Button>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color='secondary' onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </Container>
    );
}
