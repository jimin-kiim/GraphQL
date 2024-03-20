import { ApolloServer, gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID
        username: String
    }

    type Tweet {
        id: ID
        text: String
        author: User
    }

    type Query {
        allTweets: [Tweet] # similar to GET /api/v1/tweets from REST API
        tweet(id: ID): Tweet # similar to GET /api/v1/tweet/:id from REST API url variable from REST ~= argument from gql
    }
`;

const server = new ApolloServer({typeDefs});

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
