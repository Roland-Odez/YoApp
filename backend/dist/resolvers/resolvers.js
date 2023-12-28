// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const users = [
    {
        id: 1,
        name: 'Roland',
        message: 'how are you? i was thinking of seeing you today... are you chance?',
        read: false,
        lastSeen: 1695988799,
        img: 'roland.jpg'
    },
    {
        id: 2,
        name: 'Sam Okes',
        message: 'how are you? i was thinking of seeing you today... are you chance?',
        read: false,
        lastSeen: 8635988799,
        img: 'okes.jpeg'
    },
    {
        id: 3,
        name: 'Titus',
        message: 'You dey come today?',
        read: true,
        lastSeen: 1835999799,
        img: 'titus.jpeg'
    }
];
const message = [
    {
        id: 1,
        sender: {
            id: 1,
            name: 'Roland',
            message: 'how are you? i was thinking of seeing you today... are you chance?',
            read: false,
            lastSeen: 169000008799,
            img: 'roland.jpg'
        },
        reciever: {
            id: 2,
            name: 'Sam Okes',
            message: 'how are you? i was thinking of seeing you today... are you chance?',
            read: false,
            lastSeen: 8635988799,
            img: 'okes.jpeg'
        },
        message: 'hey',
        timeStamp: 278908083827,
        read: true
    },
    {
        id: 2,
        reciever: {
            id: 1,
            name: 'Roland',
            message: 'how are you? i was thinking of seeing you today... are you chance?',
            read: false,
            lastSeen: 1695988799,
            img: 'roland.jpg'
        },
        sender: {
            id: 2,
            name: 'Sam Okes',
            message: 'how are you? i was thinking of seeing you today... are you chance?',
            read: false,
            lastSeen: 8635988799,
            img: 'okes.jpeg'
        },
        message: 'wassup Roland',
        timeStamp: 278625382737,
        read: true
    }
];
export const resolvers = {
    Query: {
        users: () => users,
        messages: () => message,
        user: (_, args) => {
            return users.find((user) => user.id === Number(args.id));
        }
    },
};
