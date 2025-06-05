export interface CardData {
    id: string;
    driver: string;
    destino: string;
    partida: string;
    status: 'pending' | 'in-transit' | 'delivered' | 'cancelled';
    localizacao: {
        lat: number;
        long: number;
    };
}

export const fakeCardData: CardData[] = [
    {
        id: "001",
        driver: "João Silva",
        destino: "Rua das Flores, 123 - São Paulo, SP",
        partida: "Av. Paulista, 456 - São Paulo, SP",
        status: "in-transit",
        localizacao: {
            lat: -23.5505,
            long: -46.6333
        }
    },
    {
        id: "002",
        driver: "Maria Santos",
        destino: "Rua do Comércio, 789 - Rio de Janeiro, RJ",
        partida: "Copacabana, 321 - Rio de Janeiro, RJ",
        status: "delivered",
        localizacao: {
            lat: -22.9068,
            long: -43.1729
        }
    },
    {
        id: "003",
        driver: "Pedro Oliveira",
        destino: "Av. Beira Mar, 555 - Fortaleza, CE",
        partida: "Centro, 111 - Fortaleza, CE",
        status: "pending",
        localizacao: {
            lat: -3.7319,
            long: -38.5267
        }
    },
    {
        id: "004",
        driver: "Ana Costa",
        destino: "Rua da Praia, 222 - Salvador, BA",
        partida: "Pelourinho, 888 - Salvador, BA",
        status: "in-transit",
        localizacao: {
            lat: -12.9714,
            long: -38.5014
        }
    },
    {
        id: "005",
        driver: "Carlos Mendes",
        destino: "Av. Goiás, 999 - Goiânia, GO",
        partida: "Setor Central, 777 - Goiânia, GO",
        status: "cancelled",
        localizacao: {
            lat: -16.6864,
            long: -49.2643
        }
    }
];