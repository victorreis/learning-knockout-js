const mealsMock = [
    { id: 101, name: 'Standard (sandwich)', price: 0 },
    { id: 202, name: 'Premium (lobster)', price: 34.95 },
    { id: 303, name: 'Ultimate (whole zebra)', price: 290 },
];

const getAllMeals = () => Promise.resolve([...mealsMock]);

const mealService = {
    getAllMeals,
};

export default mealService;
