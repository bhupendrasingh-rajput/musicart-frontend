export const typeOptions = [
    { value: '', label: 'Featured' },
    { value: 'In-Ear', label: 'In-ear headphone' },
    { value: 'On-Ear', label: 'On-ear headphone' },
    { value: 'Over-Ear', label: 'Over-ear headphone' },
]

export const companyOptions = [
    { value: '', label: 'Featured' },
    { value: 'JBL', label: 'JBL' },
    { value: 'Sony', label: 'Sony' },
    { value: 'Boat', label: 'Boat' },
    { value: 'Zebronics', label: 'Zebronics' },
    { value: 'Marshall', label: 'Marshall' },
    { value: 'Ptron', label: 'Ptron' },
]

export const colourOptions = [
    { value: '', label: 'Featured' },
    { value: 'Blue', label: 'Blue' },
    { value: 'Black', label: 'Black' },
    { value: 'White', label: 'White' },
    { value: 'Brown', label: 'Brown' },
]

export const priceOptions = [
    { value: 'featured', label: 'Featured' },
    { value: { min: 0, max: 1000 }, label: '₹0 - ₹1,000' },
    { value: { min: 1000, max: 10000 }, label: '₹1,000 - ₹10,000' },
    { value: { min: 10000, max: 20000 }, label: '₹10,000 - ₹20,000' },
]

export const sortingOptions = [
    { value: null, label: 'Featured' },
    { value: { field: 'price', order: 'asc' }, label: 'Price : Lowest' },
    { value: { field: 'price', order: 'desc' }, label: 'Price : Highest' },
    { value: { field: 'name', order: 'asc' }, label: 'Name : (A-Z)' },
    { value: { field: 'name', order: 'desc' }, label: 'Name : (Z-A)' },
];

export const feedbackOptions = [
    { name: 'type', value: 'Bugs', label: 'Bugs' },
    { name: 'type', value: 'Feedback', label: 'Feedback' },
    { name: 'type', value: 'Query', label: 'Query' },
]

export const quantityOptions = [
    {value:1, label:'1',},
    {value:2, label:'2',},
    {value:3, label:'3',},
    {value:4, label:'4',},
    {value:5, label:'5',},
    {value:6, label:'6',},
    {value:7, label:'7',},
    {value:8, label:'8',},
]

export const paymentOptions = [
    {value:'Pay on Delivery', label:'Pay on Delivery'},
    {value:'UPI', label:'UPI'},
    {value:'Card', label:'Card'},
]