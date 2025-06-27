export interface Location {
    lat: number;
    long: number;
    name: string;
}

export interface DriverData {
    id: string;
    name: string;
    phone: string;
    vehicle: string;
    status: 'available' | 'busy' | 'offline';
    location: Location;
}

export interface ClientData {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: Location;
}

export interface StorageData {
    id: string;
    name: string;
    type: 'local' | 'regional';
    capacity: number;
    currentLoad: number;
    location: Location;
    city: string;
}

export interface PackageData {
    id: string;
    clientId: string;
    driverId?: string;
    originStorageId: string;
    destinationStorageId: string;
    status: 'pending' | 'in-storage' | 'in-transit' | 'delivered' | 'cancelled';
    weight: number;
    dimensions: string;
    description: string;
    createdAt: string;
    currentLocation?: Location;
}

// Regional Storages (4 across 3 cities)
export const regionalStorages: StorageData[] = [
    {
        id: "RS001",
        name: "Centro de Distribuição São Paulo Norte",
        type: "regional",
        capacity: 10000,
        currentLoad: 7500,
        location: { lat: -23.5505, long: -46.6333, name: "Av. Paulista, 1000 - São Paulo, SP" },
        city: "São Paulo"
    },
    {
        id: "RS002",
        name: "Centro de Distribuição São Paulo Sul",
        type: "regional",
        capacity: 8000,
        currentLoad: 6200,
        location: { lat: -23.6821, long: -46.8755, name: "Av. das Nações Unidas, 2000 - São Paulo, SP" },
        city: "São Paulo"
    },
    {
        id: "RS003",
        name: "Centro de Distribuição Rio de Janeiro",
        type: "regional",
        capacity: 9000,
        currentLoad: 5400,
        location: { lat: -22.9068, long: -43.1729, name: "Av. Brasil, 500 - Rio de Janeiro, RJ" },
        city: "Rio de Janeiro"
    },
    {
        id: "RS004",
        name: "Centro de Distribuição Belo Horizonte",
        type: "regional",
        capacity: 7000,
        currentLoad: 4100,
        location: { lat: -19.9167, long: -43.9345, name: "Av. Afonso Pena, 800 - Belo Horizonte, MG" },
        city: "Belo Horizonte"
    }
];

// Local Storages (10 across the cities)
export const localStorages: StorageData[] = [
    // São Paulo - 4 local storages
    { id: "LS001", name: "Depósito Vila Madalena", type: "local", capacity: 500, currentLoad: 350, location: { lat: -23.5469, long: -46.6892, name: "Rua Harmonia, 123 - Vila Madalena, SP" }, city: "São Paulo" },
    { id: "LS002", name: "Depósito Moema", type: "local", capacity: 400, currentLoad: 280, location: { lat: -23.6031, long: -46.6691, name: "Av. Ibirapuera, 456 - Moema, SP" }, city: "São Paulo" },
    { id: "LS003", name: "Depósito Santana", type: "local", capacity: 600, currentLoad: 420, location: { lat: -23.5034, long: -46.6291, name: "Av. Cruzeiro do Sul, 789 - Santana, SP" }, city: "São Paulo" },
    { id: "LS004", name: "Depósito Itaim Bibi", type: "local", capacity: 450, currentLoad: 310, location: { lat: -23.5814, long: -46.6731, name: "Av. Faria Lima, 321 - Itaim Bibi, SP" }, city: "São Paulo" },
    
    // Rio de Janeiro - 3 local storages
    { id: "LS005", name: "Depósito Copacabana", type: "local", capacity: 300, currentLoad: 180, location: { lat: -22.9711, long: -43.1822, name: "Av. Atlântica, 111 - Copacabana, RJ" }, city: "Rio de Janeiro" },
    { id: "LS006", name: "Depósito Tijuca", type: "local", capacity: 550, currentLoad: 400, location: { lat: -22.9249, long: -43.2277, name: "Rua Conde de Bonfim, 222 - Tijuca, RJ" }, city: "Rio de Janeiro" },
    { id: "LS007", name: "Depósito Barra da Tijuca", type: "local", capacity: 400, currentLoad: 250, location: { lat: -23.0045, long: -43.3198, name: "Av. das Américas, 333 - Barra da Tijuca, RJ" }, city: "Rio de Janeiro" },
    
    // Belo Horizonte - 3 local storages
    { id: "LS008", name: "Depósito Savassi", type: "local", capacity: 350, currentLoad: 200, location: { lat: -19.9394, long: -43.9356, name: "Rua Pernambuco, 444 - Savassi, BH" }, city: "Belo Horizonte" },
    { id: "LS009", name: "Depósito Pampulha", type: "local", capacity: 300, currentLoad: 150, location: { lat: -19.8633, long: -43.9689, name: "Av. Antônio Carlos, 555 - Pampulha, BH" }, city: "Belo Horizonte" },
    { id: "LS010", name: "Depósito Centro", type: "local", capacity: 400, currentLoad: 320, location: { lat: -19.9227, long: -43.9450, name: "Rua da Bahia, 666 - Centro, BH" }, city: "Belo Horizonte" }
];

// Drivers (10 total)
export const drivers: DriverData[] = [
    { id: "D001", name: "João Silva", phone: "(11) 99999-0001", vehicle: "Fiat Fiorino", status: "busy", location: { lat: -23.5505, long: -46.6333, name: "Av. Paulista, 1200 - São Paulo, SP" } },
    { id: "D002", name: "Maria Santos", phone: "(21) 99999-0002", vehicle: "VW Saveiro", status: "available", location: { lat: -22.9068, long: -43.1729, name: "Copacabana - Rio de Janeiro, RJ" } },
    { id: "D003", name: "Pedro Oliveira", phone: "(11) 99999-0003", vehicle: "Ford Transit", status: "busy", location: { lat: -23.6031, long: -46.6691, name: "Moema - São Paulo, SP" } },
    { id: "D004", name: "Ana Costa", phone: "(31) 99999-0004", vehicle: "Renault Kangoo", status: "available", location: { lat: -19.9167, long: -43.9345, name: "Centro - Belo Horizonte, MG" } },
    { id: "D005", name: "Carlos Mendes", phone: "(11) 99999-0005", vehicle: "Iveco Daily", status: "offline", location: { lat: -23.5469, long: -46.6892, name: "Vila Madalena - São Paulo, SP" } },
    { id: "D006", name: "Lucia Ferreira", phone: "(21) 99999-0006", vehicle: "Fiat Ducato", status: "busy", location: { lat: -22.9249, long: -43.2277, name: "Tijuca - Rio de Janeiro, RJ" } },
    { id: "D007", name: "Roberto Lima", phone: "(31) 99999-0007", vehicle: "Mercedes Sprinter", status: "available", location: { lat: -19.8633, long: -43.9689, name: "Pampulha - Belo Horizonte, MG" } },
    { id: "D008", name: "Fernanda Rocha", phone: "(11) 99999-0008", vehicle: "Hyundai HR", status: "busy", location: { lat: -23.5814, long: -46.6731, name: "Itaim Bibi - São Paulo, SP" } },
    { id: "D009", name: "Bruno Alves", phone: "(21) 99999-0009", vehicle: "Peugeot Boxer", status: "available", location: { lat: -23.0045, long: -43.3198, name: "Barra da Tijuca - Rio de Janeiro, RJ" } },
    { id: "D010", name: "Camila Souza", phone: "(31) 99999-0010", vehicle: "Fiat Fiorino", status: "busy", location: { lat: -19.9394, long: -43.9356, name: "Savassi - Belo Horizonte, MG" } }
];

// Clients (20 total)
export const clients: ClientData[] = [
    { id: "C001", name: "Gabriel Martins", email: "gabriel@email.com", phone: "(11) 88888-0001", location: { lat: -23.5629, long: -46.6544, name: "Rua Augusta, 100 - Consolação, SP" } },
    { id: "C002", name: "Isabella Cruz", email: "isabella@email.com", phone: "(21) 88888-0002", location: { lat: -22.9583, long: -43.2096, name: "Rua Visconde de Pirajá, 200 - Ipanema, RJ" } },
    { id: "C003", name: "Matheus Barbosa", email: "matheus@email.com", phone: "(31) 88888-0003", location: { lat: -19.9208, long: -43.9378, name: "Av. do Contorno, 300 - Centro, BH" } },
    { id: "C004", name: "Sophia Ribeiro", email: "sophia@email.com", phone: "(11) 88888-0004", location: { lat: -23.5934, long: -46.6890, name: "Rua Oscar Freire, 400 - Jardins, SP" } },
    { id: "C005", name: "Lucas Pereira", email: "lucas@email.com", phone: "(21) 88888-0005", location: { lat: -22.9519, long: -43.2105, name: "Rua Barata Ribeiro, 500 - Copacabana, RJ" } },
    { id: "C006", name: "Manuela Dias", email: "manuela@email.com", phone: "(31) 88888-0006", location: { lat: -19.9512, long: -43.9239, name: "Rua Sapucaí, 600 - Floresta, BH" } },
    { id: "C007", name: "Rafael Gomes", email: "rafael@email.com", phone: "(11) 88888-0007", location: { lat: -23.5505, long: -46.6170, name: "Rua da Consolação, 700 - República, SP" } },
    { id: "C008", name: "Valentina Moreira", email: "valentina@email.com", phone: "(21) 88888-0008", location: { lat: -22.9035, long: -43.2096, name: "Rua Voluntários da Pátria, 800 - Botafogo, RJ" } },
    { id: "C009", name: "Enzo Cardoso", email: "enzo@email.com", phone: "(31) 88888-0009", location: { lat: -19.8157, long: -43.9542, name: "Av. Pedro II, 900 - São Cristóvão, BH" } },
    { id: "C010", name: "Alice Fernandes", email: "alice@email.com", phone: "(11) 88888-0010", location: { lat: -23.5475, long: -46.6361, name: "Rua Teodoro Sampaio, 1000 - Pinheiros, SP" } },
    { id: "C011", name: "Arthur Castro", email: "arthur@email.com", phone: "(21) 88888-0011", location: { lat: -22.9711, long: -43.1822, name: "Av. Nossa Senhora de Copacabana, 1100 - Copacabana, RJ" } },
    { id: "C012", name: "Helena Melo", email: "helena@email.com", phone: "(31) 88888-0012", location: { lat: -19.9281, long: -43.9419, name: "Rua Curitiba, 1200 - Centro, BH" } },
    { id: "C013", name: "Bernardo Ramos", email: "bernardo@email.com", phone: "(11) 88888-0013", location: { lat: -23.5320, long: -46.6395, name: "Av. São João, 1300 - Centro, SP" } },
    { id: "C014", name: "Laura Teixeira", email: "laura@email.com", phone: "(21) 88888-0014", location: { lat: -22.9068, long: -43.1729, name: "Rua Senador Dantas, 1400 - Centro, RJ" } },
    { id: "C015", name: "Davi Monteiro", email: "davi@email.com", phone: "(31) 88888-0015", location: { lat: -19.9167, long: -43.9345, name: "Av. Afonso Pena, 1500 - Centro, BH" } },
    { id: "C016", name: "Giovanna Azevedo", email: "giovanna@email.com", phone: "(11) 88888-0016", location: { lat: -23.6178, long: -46.6990, name: "Av. Brigadeiro Luís Antônio, 1600 - Bela Vista, SP" } },
    { id: "C017", name: "João Pedro Nunes", email: "joaopedro@email.com", phone: "(21) 88888-0017", location: { lat: -22.9322, long: -43.1966, name: "Rua do Passeio, 1700 - Lapa, RJ" } },
    { id: "C018", name: "Maria Eduarda Silva", email: "mariaeduarda@email.com", phone: "(31) 88888-0018", location: { lat: -19.9394, long: -43.9356, name: "Rua Antônio de Albuquerque, 1800 - Savassi, BH" } },
    { id: "C019", name: "Guilherme Correia", email: "guilherme@email.com", phone: "(11) 88888-0019", location: { lat: -23.5581, long: -46.6614, name: "Rua 25 de Março, 1900 - Centro, SP" } },
    { id: "C020", name: "Lara Vieira", email: "lara@email.com", phone: "(21) 88888-0020", location: { lat: -22.9249, long: -43.2277, name: "Rua Conde de Bonfim, 2000 - Tijuca, RJ" } }
];

// Packages (25 total - at least 1 per client)
export const packages: PackageData[] = [
    { id: "P001", clientId: "C001", driverId: "D001", originStorageId: "LS001", destinationStorageId: "LS002", status: "in-transit", weight: 2.5, dimensions: "30x20x15cm", description: "Eletrônicos", createdAt: "2024-01-15T10:30:00Z", currentLocation: { lat: -23.5505, long: -46.6333, name: "Av. Paulista, 1200 - São Paulo, SP" } },
    { id: "P002", clientId: "C002", originStorageId: "LS005", destinationStorageId: "LS006", status: "in-storage", weight: 1.8, dimensions: "25x15x10cm", description: "Roupas", createdAt: "2024-01-15T11:00:00Z", currentLocation: { lat: -22.9711, long: -43.1822, name: "Depósito Copacabana" } },
    { id: "P003", clientId: "C003", driverId: "D004", originStorageId: "LS008", destinationStorageId: "LS009", status: "in-transit", weight: 3.2, dimensions: "40x30x20cm", description: "Livros", createdAt: "2024-01-15T12:15:00Z", currentLocation: { lat: -19.9167, long: -43.9345, name: "Centro - Belo Horizonte, MG" } },
    { id: "P004", clientId: "C004", originStorageId: "LS003", destinationStorageId: "LS004", status: "pending", weight: 0.5, dimensions: "15x10x5cm", description: "Documentos", createdAt: "2024-01-15T13:20:00Z", currentLocation: { lat: -23.5034, long: -46.6291, name: "Depósito Santana" } },
    { id: "P005", clientId: "C005", driverId: "D006", originStorageId: "LS007", destinationStorageId: "LS005", status: "delivered", weight: 4.1, dimensions: "50x40x30cm", description: "Equipamentos", createdAt: "2024-01-14T09:00:00Z", currentLocation: { lat: -22.9711, long: -43.1822, name: "Depósito Copacabana" } },
    { id: "P006", clientId: "C006", originStorageId: "LS010", destinationStorageId: "LS008", status: "in-storage", weight: 2.0, dimensions: "35x25x18cm", description: "Cosméticos", createdAt: "2024-01-15T14:45:00Z", currentLocation: { lat: -19.9227, long: -43.9450, name: "Depósito Centro" } },
    { id: "P007", clientId: "C007", driverId: "D003", originStorageId: "LS002", destinationStorageId: "LS001", status: "in-transit", weight: 1.2, dimensions: "20x15x8cm", description: "Medicamentos", createdAt: "2024-01-15T15:30:00Z", currentLocation: { lat: -23.6031, long: -46.6691, name: "Moema - São Paulo, SP" } },
    { id: "P008", clientId: "C008", originStorageId: "LS006", destinationStorageId: "LS007", status: "pending", weight: 3.8, dimensions: "45x35x25cm", description: "Artesanato", createdAt: "2024-01-15T16:10:00Z", currentLocation: { lat: -22.9249, long: -43.2277, name: "Depósito Tijuca" } },
    { id: "P009", clientId: "C009", driverId: "D007", originStorageId: "LS009", destinationStorageId: "LS010", status: "in-transit", weight: 2.7, dimensions: "30x25x20cm", description: "Brinquedos", createdAt: "2024-01-15T17:00:00Z", currentLocation: { lat: -19.8633, long: -43.9689, name: "Pampulha - Belo Horizonte, MG" } },
    { id: "P010", clientId: "C010", originStorageId: "LS004", destinationStorageId: "LS003", status: "delivered", weight: 1.5, dimensions: "25x20x12cm", description: "Acessórios", createdAt: "2024-01-14T08:30:00Z", currentLocation: { lat: -23.5034, long: -46.6291, name: "Depósito Santana" } },
    { id: "P011", clientId: "C011", originStorageId: "LS005", destinationStorageId: "LS006", status: "in-storage", weight: 0.8, dimensions: "18x12x6cm", description: "Jóias", createdAt: "2024-01-15T18:15:00Z", currentLocation: { lat: -22.9711, long: -43.1822, name: "Depósito Copacabana" } },
    { id: "P012", clientId: "C012", driverId: "D010", originStorageId: "LS008", destinationStorageId: "LS009", status: "in-transit", weight: 5.2, dimensions: "60x40x35cm", description: "Ferramentas", createdAt: "2024-01-15T19:00:00Z", currentLocation: { lat: -19.9394, long: -43.9356, name: "Savassi - Belo Horizonte, MG" } },
    { id: "P013", clientId: "C013", originStorageId: "LS001", destinationStorageId: "LS002", status: "pending", weight: 1.9, dimensions: "28x18x14cm", description: "Perfumes", createdAt: "2024-01-15T20:30:00Z", currentLocation: { lat: -23.5469, long: -46.6892, name: "Depósito Vila Madalena" } },
    { id: "P014", clientId: "C014", originStorageId: "LS007", destinationStorageId: "LS005", status: "cancelled", weight: 3.5, dimensions: "42x32x22cm", description: "Decoração", createdAt: "2024-01-15T21:15:00Z", currentLocation: { lat: -23.0045, long: -43.3198, name: "Depósito Barra da Tijuca" } },
    { id: "P015", clientId: "C015", driverId: "D004", originStorageId: "LS010", destinationStorageId: "LS008", status: "delivered", weight: 2.3, dimensions: "32x22x16cm", description: "Material escolar", createdAt: "2024-01-14T07:45:00Z", currentLocation: { lat: -19.9394, long: -43.9356, name: "Depósito Savassi" } },
    { id: "P016", clientId: "C016", originStorageId: "LS003", destinationStorageId: "LS004", status: "in-storage", weight: 4.6, dimensions: "55x35x28cm", description: "Instrumentos musicais", createdAt: "2024-01-15T22:00:00Z", currentLocation: { lat: -23.5034, long: -46.6291, name: "Depósito Santana" } },
    { id: "P017", clientId: "C017", driverId: "D009", originStorageId: "LS006", destinationStorageId: "LS007", status: "in-transit", weight: 1.1, dimensions: "22x16x9cm", description: "Relógios", createdAt: "2024-01-15T08:20:00Z", currentLocation: { lat: -23.0045, long: -43.3198, name: "Barra da Tijuca - Rio de Janeiro, RJ" } },
    { id: "P018", clientId: "C018", originStorageId: "LS009", destinationStorageId: "LS010", status: "pending", weight: 3.9, dimensions: "48x38x26cm", description: "Produtos orgânicos", createdAt: "2024-01-16T09:30:00Z", currentLocation: { lat: -19.8633, long: -43.9689, name: "Depósito Pampulha" } },
    { id: "P019", clientId: "C019", originStorageId: "LS002", destinationStorageId: "LS001", status: "in-storage", weight: 2.8, dimensions: "36x26x19cm", description: "Material esportivo", createdAt: "2024-01-16T10:45:00Z", currentLocation: { lat: -23.6031, long: -46.6691, name: "Depósito Moema" } },
    { id: "P020", clientId: "C020", driverId: "D006", originStorageId: "LS005", destinationStorageId: "LS006", status: "in-transit", weight: 1.7, dimensions: "26x18x11cm", description: "Produtos de beleza", createdAt: "2024-01-16T11:30:00Z", currentLocation: { lat: -22.9249, long: -43.2277, name: "Tijuca - Rio de Janeiro, RJ" } },
    { id: "P021", clientId: "C001", originStorageId: "LS001", destinationStorageId: "LS003", status: "pending", weight: 0.9, dimensions: "19x13x7cm", description: "Cartões comemorativos", createdAt: "2024-01-16T12:15:00Z", currentLocation: { lat: -23.5469, long: -46.6892, name: "Depósito Vila Madalena" } },
    { id: "P022", clientId: "C005", originStorageId: "LS007", destinationStorageId: "LS005", status: "delivered", weight: 3.1, dimensions: "38x28x21cm", description: "Utensílios domésticos", createdAt: "2024-01-15T06:00:00Z", currentLocation: { lat: -22.9711, long: -43.1822, name: "Depósito Copacabana" } },
    { id: "P023", clientId: "C010", driverId: "D008", originStorageId: "LS004", destinationStorageId: "LS002", status: "in-transit", weight: 2.4, dimensions: "33x23x17cm", description: "Produtos pet", createdAt: "2024-01-16T13:00:00Z", currentLocation: { lat: -23.5814, long: -46.6731, name: "Itaim Bibi - São Paulo, SP" } },
    { id: "P024", clientId: "C015", originStorageId: "LS008", destinationStorageId: "LS010", status: "in-storage", weight: 4.8, dimensions: "52x42x32cm", description: "Equipamentos de camping", createdAt: "2024-01-16T14:20:00Z", currentLocation: { lat: -19.9394, long: -43.9356, name: "Depósito Savassi" } },
    { id: "P025", clientId: "C012", originStorageId: "LS009", destinationStorageId: "LS008", status: "pending", weight: 1.6, dimensions: "24x17x12cm", description: "Suplementos alimentares", createdAt: "2024-01-16T15:10:00Z", currentLocation: { lat: -19.8633, long: -43.9689, name: "Depósito Pampulha" } }
];
// This file contains fake data for the map component, including locations of drivers, clients, storages, and packages.
// It is used to simulate real data in the application for development and testing purposes.