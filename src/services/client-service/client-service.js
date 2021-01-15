const clientsMock = [
    { id: 111, name: 'Lucas', lastname: 'Films' },
    { id: 222, name: 'Steve', lastname: 'Jobs' },
    { id: 333, name: 'Downey', lastname: 'Jr.' },
    { id: 444, name: 'Robert', lastname: 'De Niro' },
    { id: 555, name: 'John', lastname: 'Dee' },
    { id: 666, name: 'Al', lastname: 'Pacino' },
];

const getAllClients = () => Promise.resolve([...clientsMock]);

const clientService = {
    getAllClients,
};

export default clientService;
