import { makeAutoObservable } from 'mobx';

export interface CardInterface {
    id: number;
    name: string;
    surname: string;
    cardNumber: string;
    expiration: string;
    cvv: string;
}

class CardStore {
    cards: CardInterface[] = [];
    showCardInfo: boolean = false;
    loading: boolean = true; // Adăugăm o variabilă pentru a gestiona starea de încărcare

    constructor() {
        makeAutoObservable(this);
        this.loadInitialData(); // Încărcăm datele inițiale la crearea instanței
    }

    async loadInitialData() {
        // Setăm loading-ul pe true pentru a afișa indicatorul de încărcare
        this.loading = true;

        // Folosim setTimeout pentru a simula o întârziere de 2 secunde în încărcare
        setTimeout(() => {
            // După 2 secunde, oprim indicatorul de încărcare și încărcăm datele din localStorage
            this.loading = false;
            this.loadCardsFromLocalStorage();
        }, 2000);
    }

    async addCard(card: CardInterface) {
        // Setăm loading-ul pe true pentru a afișa indicatorul de încărcare
        this.loading = true;

        this.cards.push(card);
        this.showCardInfo = true;

        // Folosim setTimeout pentru a simula o întârziere în adăugarea cardului
        setTimeout(() => {
            this.saveCardsToLocalStorage();

            // Oprim indicatorul de încărcare după ce adăugarea este completă
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
        console.log("Deleting card with ID:", cardId); // Verificați dacă ID-ul cardului este corect

        // Setăm loading-ul pe true pentru a afișa indicatorul de încărcare
        this.loading = true;

        const index = this.cards.findIndex(card => card.id === cardId);
        if (index !== -1) {
            this.cards.splice(index, 1); // Eliminați doar cardul identificat în funcție de ID
            console.log("Remaining cards:", this.cards); // Verificați cardurile rămase după ștergere

            // Folosim setTimeout pentru a simula o întârziere în ștergere
            setTimeout(() => {
                this.saveCardsToLocalStorage();

                // Oprim indicatorul de încărcare după ce ștergerea este completă
                this.loading = false;
            }, 2000);
        } else {
            // Dacă cardul nu a fost găsit, oprim indicatorul de încărcare imediat
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