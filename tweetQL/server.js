import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first tweet"
  },
  {
    id: "2",
    text: "second tweet"
  }
];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    firstName: String!
    lastName: String!
  }

  type Tweet {
    id: ID!
    text: String!
    author: User
  }

  type Query { # GET (REST API)
    allTweets: [Tweet!]! # similar to GET /api/v1/tweets from REST API # it always should be a list and the inside of the list always should be Tweet. empty can be allowed
    tweet(id: ID!): Tweet # similar to GET /api/v1/tweet/:id from REST API url variable from REST ~= argument from gql
  }

  type Mutation { # POST, PUT, DELETE (REST API)
    postTweet(text: String!, userId: ID!): Tweet!
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  // resolver for the fields
  Query: {
    allTweets() {
      return tweets;
    },

    tweet(_, {id}) { // root, args. {id} is opening up the args and getting id.
      // when the tweet field in Query is reduired, this function is called.
      return tweets.find(tweet => tweet.id === id);
    }
  },
  
  Mutation: {
    postTweet(_, {text, userId}) {
      const newTweet = {
        id: tweets.length + 1,
        text,
      };
      tweets.push(newTweet);
      return newTweet;
    },

    deleteTweet(_, {id}) {
      const tweet = tweets.find(tweet =>  tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter(tweet => tweet.id !== id);
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
