import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Card, Form, Input, Button, Modal, Typography, Spin } from 'antd';
import { observer } from 'mobx-react';
import cardStore, { CardInterface } from './store';
import { myObject } from './types';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';


const { Header, Content } = AntLayout;
const { Title, Paragraph } = Typography;

interface MyLayoutProps {
    handleLogout: () => void;
}


const MyLayout: React.FC<MyLayoutProps> = observer(({ handleLogout }) => {
    const [aboutMeVisible, setAboutMeVisible] = useState<boolean>(false);
    const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);
    const [showAddCardForm, setShowAddCardForm] = useState<boolean>(false);
    const [editCardData, setEditCardData] = useState<CardInterface | null>(null);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);



    const toggleAboutMeModal = () => {
        setAboutMeVisible(!aboutMeVisible);
    };

    const toggleSubmenu = () => {
        setSubmenuVisible(!submenuVisible);
    };

    const addCard = (values: CardInterface) => {
        cardStore.addCard(values);
    };

    const deleteCard = (cardId: number) => {
        cardStore.deleteCard(cardId);
    };

    const editCard = (card: CardInterface) => {
        setEditCardData(card);
        setEditModalVisible(true);
    };

    const handleEditFormSubmit = (updatedCard: CardInterface) => {
        cardStore.editCard(updatedCard);
        setEditModalVisible(false);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
    };

    return (
        <Router>
            <AntLayout style={{ minHeight: '100vh' }}>
                <Header>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} style={{ width: 'fit-content' }}>

                        <Menu.Item key="1" onClick={toggleAboutMeModal}>
                            <Button type="primary" shape="round" size="small" style={{ minWidth: 'auto' }}>
                                <Link to="/about">About me</Link>
                            </Button>
                        </Menu.Item>
                        <Menu.Item key="2" style={{ minWidth: 'auto' }}>
                            <Button type="primary" shape="round" size="small"><Link to="/add-card">Add Card</Link></Button>
                        </Menu.Item>
                        <Menu.Item key="3" style={{ minWidth: 'auto' }}>
                            <Button type="primary" shape="round" size="small"><Link to="/Cards">Cards</Link></Button>
                        </Menu.Item>
                        <Menu.Item key="4" onClick={handleLogout} style={{ minWidth: 'auto' }}>
                            <Button type="primary" shape="round" size="small"><Link to="/login">Logout</Link></Button>
                        </Menu.Item>
                    </Menu>
                </Header>


                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <Routes>
                            <Route path="/add-card" element={<AddCardForm addCard={addCard} />} />
                            
                        </Routes>

                    {showAddCardForm && (
                        <AddCardForm addCard={addCard} />
                    )}
                    {editCardData && (
                        <Modal
                            title="Edit Card"
                            visible={editModalVisible}
                            onCancel={handleEditModalCancel}
                            footer={null}
                        >
                            <EditCardForm card={editCardData} onSubmit={handleEditFormSubmit} />
                        </Modal>
                    )}
                    {cardStore.loading ? ( // Verificăm starea de încărcare pentru a afișa indicatorul de încărcare
                        <div style={{ display: 'flex', justifyContent: 'center',  alignItems: 'center', height: '85vh', width: '200vh', position: 'fixed' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <>
                            {cardStore.showCardInfo && (
                                <Card
                                    title={`${myObject.name} ${myObject.surname}`}
                                    style={{ width: '300px', margin: '16px' }}
                                >
                                    <p><strong>Card Number:</strong> {myObject.cardNumber}</p>
                                    <p><strong>Expiration:</strong> {myObject.expiration}</p>
                                    <p><strong>CVV:</strong> {myObject.cvv}</p>
                                </Card>
                            )}
                            {cardStore.cards.map(card => (
                                <Card key={card.id} title={`${card.name} ${card.surname}`} style={{ width: '300px', margin: '16px' }}>
                                    <p><strong>Card Number:</strong> {card.cardNumber}</p>
                                    <p><strong>Expiration:</strong> {card.expiration}</p>
                                    <p><strong>CVV:</strong> {card.cvv}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                                        <Button type="primary" onClick={() => deleteCard(card.id)}>Delete</Button>
                                        <Button type="primary" onClick={() => editCard(card)}>Edit</Button>
                                    </div>
                                </Card>
                            ))}
                        </>
                    )}
                </div>
            </Content>

            <Modal
                title="About Me"
                visible={aboutMeVisible}
                onCancel={toggleAboutMeModal}
                footer={null}
            >
                <div style={{ textAlign: 'center' }}>
                    <Title level={3}>Bun venit la Grupa Noastră</Title>
                    <Paragraph>Numele meu este <strong>Panfil Ion</strong>.</Paragraph>
                    <Paragraph>Sunt în grupa <strong>CR-221</strong>.</Paragraph>
                </div>
            </Modal>

        </AntLayout>

            </Router>
    );
});

const AddCardForm: React.FC<{ addCard: (values: CardInterface) => void }> = ({ addCard }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        addCard(values);
        form.resetFields();
    };

    const validateName = (_: any, value: string) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only letters for name'));
        }
        return Promise.resolve();
    };

    const validateSurname = (_: any, value: string) => {
        const regex = /^[a-zA-Z\s]+$/;
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only letters for surname'));
        }
        return Promise.resolve();
    };

    const validateCardNumber = (_: any, value: string) => {
        const regex = /^\d+$/;
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only digits for card number'));
        }
        return Promise.resolve();
    };


    const validateExpiration = (_: any, value: string) => {
        if (value.length === 2 && !value.includes('/')) {
            value += '/';
            form.setFieldsValue({ expiration: value });
        }

        const regex = /^(0[1-9]|1[0-2])\/(20\d{2}|2[1-9])$/;
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter a valid expiration date (MM/YY)'));
        }
        return Promise.resolve();
    };

    const validateCVV = (_: any, value: string) => {
        const regex = /^\d{3}$/;
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter a valid 3-digit CVV'));
        }
        return Promise.resolve();
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name" rules={[{ required: true, validator: validateName }]}>
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="surname" rules={[{ required: true, validator: validateSurname }]}>
                <Input placeholder="Surname" />
            </Form.Item>
            <Form.Item name="cardNumber" rules={[{ required: true, validator: validateCardNumber }]}>
                <Input placeholder="Card Number" maxLength={16} />
            </Form.Item>
            <Form.Item name="expiration" rules={[{ required: true, validator: validateExpiration }]}>
                <Input placeholder="Expiration (MM/YY)" maxLength={5} />
            </Form.Item>
            <Form.Item name="cvv" rules={[{ required: true, validator: validateCVV }]}>
                <Input placeholder="CVV" maxLength={3} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add Card
                </Button>
            </Form.Item>
        </Form>
    );
};

const EditCardForm: React.FC<{ card: CardInterface; onSubmit: (updatedCard: CardInterface) => void }> = ({ card, onSubmit }) => {
    const [form] = Form.useForm();

    form.setFieldsValue(card);

    const onFinish = (values: any) => {
        onSubmit({ ...card, ...values });
    };

    return (
        <Form form={form} onFinish={onFinish}>
            <Form.Item name="name">
                <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="surname">
                <Input placeholder="Surname" />
            </Form.Item>
            <Form.Item name="cardNumber">
                <Input placeholder="Card Number" maxLength={16} />
            </Form.Item>
            <Form.Item name="expiration">
                <Input placeholder="Expiration (MM/YY)" maxLength={5} />
            </Form.Item>
            <Form.Item name="cvv">
                <Input placeholder="CVV" maxLength={3} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyLayout;