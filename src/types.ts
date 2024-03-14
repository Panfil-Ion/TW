// types.ts

interface Interface1 {
    name: string;
    surname: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
}

interface Interface2 extends Interface1 {
    field6: string;
    field7: number;
    textToDisplay: string;
}
const myObject: Interface2 = {
    name: 'Harry',
    surname: 'Maguire',
    cardNumber: '89585839843948',
    expiration: '12/24',
    cvv: '433',
    field6: '20',
    field7: 20,
    textToDisplay: 'Some text',
};

export { myObject };

