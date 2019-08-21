let db = {
    users: [
        {
            userId: 'aY1ICA854UYip39vYvVSxmQduTJ2',
            email: 'user@email.com',
            handle: 'user',
            createdAt: '2019-08-01T13:30:37.625Z',
            imageUrl: 'image/dsfsdkhgjdeknvr/jefkjsdkde',
            bio: 'Hello, my name is user, nice to meet you ',
            website: 'https://user.com',
            location: 'London, UK'
        }
    ],
    posts: [
        {
            userHandle: 'user',
            body: 'this is the post body',
            createdAt: '2019-07-10T16:37:36.611Z',
            likeCount: 5,
            commentCount: 2 
        }
    ],
    comments: [
        {
            userHandle: 'user',
            postId: 'kdjsfgdksuufhgkdsufky',
            body: 'nice one',
            createdAt: '2019-07-10T16:37:36.611Z'
        }
    ],
    notifications: [
        {
            recipient: 'user',
            sender: 'john',
            read: 'true | false',
            postId: 'kdjsfgdksuufhgkdsufky',
            type: "like | comment",
            createdAt: '2019-03-15T10:59:52.798Z'
        }
    ]
};

const userDetails = {
    //Redux data
    credentials: {
        userId: 'aY1ICA854UYip39vYvVSxmQduTJ2',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2019-07-10T16:37:36.611Z',
        imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
        bio: 'Hello my name is user',
        website:'https://user.com',
        location: 'London, UK'
    },
    likes: [
        {
            userHandle: 'user',
            postId: 'hh705oWfWucVzGbHH2pa'
        },
        {
            userHandle: 'user',
            postId: '3IOnFoQexRcofs50hBXO'
        }
    ]
}