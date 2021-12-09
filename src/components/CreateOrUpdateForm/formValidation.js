import * as yup from 'yup';

// TODO: Dynamic categories and manufacturers

export const categories = ['Интериорни врати', 'Входни врати'];
export const manufacturers = [
    'Variodor',
    'Eurostill',
    'New Style Doors',
    'Star Security Door',
];

const validation = yup.object().shape({
    category: yup
        .string('Стойността трябва да бъде текст!')
        .oneOf(categories, 'Невалидна категория!')
        .required('Това поле е задължително!'),
    manufacturer: yup
        .string('Стойността трябва да бъде текст!')
        .oneOf(manufacturers, 'Невалиден производител!')
        .required('Това поле е задължително!'),
    title: yup
        .string('Стойността трябва да бъде текст!')
        .required('Това поле е задължително!'),
    imageUrl: yup
        .string('Стойността трябва да бъде текст!')
        .required('Това поле е задължително!')
        .url('Невалиден линк!'),
    price: yup
        .number('Цената трябва да бъде число!')
        .required('Това поле е задължително!')
        .positive('Цената трябва да бъде положително число!')
        .integer('Цената трябва да бъде цяло число!'),
    discountedPrice: yup
        .number('Цената трябва да бъде число!')
        .positive('Цената трябва да бъде положително число!')
        .integer('Цената трябва да бъде цяло число!'),
});

export default validation;
