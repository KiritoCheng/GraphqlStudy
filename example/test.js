var { graphql, buildSchema } = require('graphql');

//定义hello参数名字
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);


var root = {
    hello: () => {
        return 'Hello world!';
    },
};

// 使用hello
graphql(schema, '{ hello }', root).then((response) => {
    console.log(response);
});