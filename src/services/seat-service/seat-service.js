const seatsMock = [
    { id: 1, name: 'A1', isAtWindow: true },
    { id: 2, name: 'A2', isAtWindow: false },
    { id: 3, name: 'A3', isAtWindow: false },
    { id: 4, name: 'A4', isAtWindow: true },
    { id: 5, name: 'B1', isAtWindow: true },
    { id: 6, name: 'B2', isAtWindow: false },
    { id: 7, name: 'B3', isAtWindow: false },
    { id: 8, name: 'B4', isAtWindow: true },
    { id: 9, name: 'C1', isAtWindow: true },
    { id: 10, name: 'C2', isAtWindow: false },
    { id: 11, name: 'C3', isAtWindow: false },
    { id: 12, name: 'C4', isAtWindow: true },
];

const getAllSeats = () => Promise.resolve([...seatsMock]);

const seatService = {
    getAllSeats,
};

export default seatService;
