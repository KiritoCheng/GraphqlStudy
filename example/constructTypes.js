var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');

var fakeDatabase = {
    'a': {
        id: 'a',
        name: '拉姆',
    },
    'b': {
        id: 'b',
        name: '艾米莉亚'
    },
};

// var schema = buildSchema(`
//     type User {
//         id: String
//         name: String
//     }

//     type Query {
//         user(id: String): User
//     }
// `)

// var root = {
//     user: function ({ id }) {
//         return fakeDatabase[id]
//     }
// };

// app.use('/graphql', graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true,
// }));

var userType = new graphql.GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: graphql.GraphQLString },
        name: { type: graphql.GraphQLString },
    }
})

var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        user: {
            type: userType,
            args: {
                id: { type: graphql.GraphQLString }
            },
            resolve: function (_, { id }) {
                return fakeDatabase[id];
            }
        }
    }
});

var schema = new graphql.GraphQLSchema({ query: queryType })

var app = express()
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log("Running a GraphQL API server at localhost:4000/graphql")
});

// {
//     user(id:"a") {
//       id
//       name
//     }
//   }
