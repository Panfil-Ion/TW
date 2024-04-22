// store.ts
import { makeAutoObservable } from 'mobx';

export interface CardInterface {
    id: number;
    name: string;
    surname: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
}

export interface UserInterface {
    username: string;
    password: string;
}

class CardStore {
    cards: CardInterface[] = [];
    users: UserInterface[] = [ // Array of mock users
        { username: 'user1', password: 'pass1' },
        { username: 'user2', password: 'pass2' },
        { username: 'user3', password: 'pass3' }
    ];
    showCardInfo: boolean = false;
    loading: boolean = true;

    constructor() {
        makeAutoObservable(this);
        this.loadInitialData();
    }

    async loadInitialData() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
            this.loadCardsFromLocalStorage();
        }, 2000);
    }

    async addCard(card: CardInterface) {
        this.loading = true;
        this.cards.push(card);
        this.showCardInfo = true;
        setTimeout(() => {
            this.saveCardsToLocalStorage();
            this.loading = false;
        }, 2000);
    }

    toggleShowCardInfo() {
        this.showCardInfo = !this.showCardInfo;
    }

    editCard(updatedCard: CardInterface) {
        const index = this.cards.findIndex(card => card.id === updatedCard.id);
        if (index !== -1) {
            this.cards[index] = updatedCard;
            this.saveCardsToLocalStorage();
        }
    }

    async deleteCard(cardId: number) {
        this.loading = true;
        const index = this.cards.findIndex(card => card.id === cardId);
        if (index !== -1) {
            this.cards.splice(index, 1);
            setTimeout(() => {
                this.saveCardsToLocalStorage();
                this.loading = false;
            }, 2000);
        } else {
            this.loading = false;
        }
    }

    private saveCardsToLocalStorage() {
        localStorage.setItem('cards', JSON.stringify(this.cards));
    }

    private loadCardsFromLocalStorage() {
        const storedCards = localStorage.getItem('cards');
        if (storedCards) {
            this.cards = JSON.parse(storedCards);
        }
    }
}

const cardStore = new CardStore();
export default cardStore;
