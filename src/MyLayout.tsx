import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Card, Form, Input, Button, Modal, Typography } from 'antd';
import { myObject } from './types';

const { Header, Content } = AntLayout;
const { Title, Paragraph } = Typography;

interface CardInterface {
    id: number;
    name: string;
    surname: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
}

interface AddCardFormProps {
    addCard: (values: CardInterface) => void;
}

const MyLayout: React.FC = () => {
    const [aboutMeVisible, setAboutMeVisible] = useState<boolean>(false);
    const [submenuVisible, setSubmenuVisible] = useState<boolean>(false);
    const [cards, setCards] = useState<CardInterface[]>([]);
    const [showAddCardForm, setShowAddCardForm] = useState<boolean>(false);
    const [showCardInfo, setShowCardInfo] = useState<boolean>(false);

    const toggleAboutMeModal = () => {
        setAboutMeVisible(!aboutMeVisible);
    };

    const toggleSubmenu = () => {
        setSubmenuVisible(!submenuVisible);
    };

    const addCard = (values: CardInterface) => {
        const newCard: CardInterface = {
            id: cards.length + 1,
            name: values.name,
            surname: values.surname,
            cardNumber: values.cardNumber,
            expiration: values.expiration,
            cvv: values.cvv
        };
        setCards([...cards, newCard]);
        setShowAddCardForm(false);
        setShowCardInfo(true); // Afiseaza informatia cardului dupa ce este adaugat un nou card
    };

    return (
        <AntLayout style={{ minHeight: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} style={{ width: 'fit-content' }}>
                    <Menu.Item key="1" onClick={toggleAboutMeModal}>About me</Menu.Item>
                    <Menu.SubMenu
                        key="sub1"
                        title={<span onClick={toggleSubmenu}>Cards</span>}
                        popupClassName={submenuVisible ? "submenu-open" : ""}
                    >
                        <Menu.Item key="3" onClick={() => setShowAddCardForm(true)}>Add card</Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item key="5"><a href="/">Contact Us</a></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {showAddCardForm && (
                        <AddCardForm addCard={addCard} />
                    )}
                    {showCardInfo && (
                        <Card
                            title={`${myObject.name} ${myObject.surname}`}
                            style={{ width: '300px', margin: '16px' }}
                        >
                            <p><strong>Card Number:</strong> {myObject.cardNumber}</p>
                            <p><strong>Expiration:</strong> {myObject.expiration}</p>
                            <p><strong>CVV:</strong> {myObject.cvv}</p>
                        </Card>
                    )}
                    {cards.map(card => (
                        <Card key={card.id} title={`${card.name} ${card.surname}`} style={{ width: '300px', margin: '16px' }}>
                            <p><strong>Card Number:</strong> {card.cardNumber}</p>
                            <p><strong>Expiration:</strong> {card.expiration}</p>
                            <p><strong>CVV:</strong> {card.cvv}</p>
                        </Card>
                    ))}
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
    );
};

const AddCardForm: React.FC<AddCardFormProps> = ({ addCard }) => {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        addCard(values);
        form.resetFields();
    };

    const validateName = (_: any, value: string) => {
        const regex = /^[a-zA-Z\s]+$/; // Permite doar litere și spații
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only letters for name'));
        }
        return Promise.resolve();
    };

    const validateSurname = (_: any, value: string) => {
        const regex = /^[a-zA-Z\s]+$/; // Permite doar litere și spații
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only letters for surname'));
        }
        return Promise.resolve();
    };

    const validateCardNumber = (_: any, value: string) => {
        const regex = /^\d+$/; // Permite doar cifre
        if (!regex.test(value)) {
            return Promise.reject(new Error('Please enter only digits for card number'));
        }
        return Promise.resolve();
    };


    const validateExpiration = (_: any, value: string) => {
        // Adaugăm bara (/) după două cifre introduse pentru lună
        if (value.length === 2 && !value.includes('/')) {
            value += '/';
            form.setFieldsValue({ expiration: value });
        }

        // Verificăm formatul: două cifre pentru lună, bara (/), două cifre pentru an
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

export default MyLayout;
