import { ApolloServer, gql } from "apollo-server";

let tweets = [
  {
    id: "1",
    text: "first tweet",
    userId: "2"
  },
  {
    id: "2",
    text: "second tweet",
    userId: "1"
  }
];

let users = [
  {
    id: "1",
    firstName: "jimin",
    lastName: "kim"
  }
];

const typeDefs = gql`
  """
  User object represents a resource for a User
  """
  type User {
    """
    id of a user
    """
    id: ID!

    """
    first name of a user
    """
    firstName: String!

    """
    last name of a user
    """
    lastName: String!

    """
    fullName is the sum of firstName and lastName as a string
    """
    fullName: String! # a field that doesn't exist in the data but the resolver does. So it works
  }
  """
  Tweet object represents a resource for a Tweet
  """
  type Tweet {
    """
    id of a tweet
    """
    id: ID!

    """
    text contents of a tweet
    """
    text: String!

    """
    author of a tweet
    """
    author: User
  }

  type Query { # GET (REST API)
    """
    getting all the users exist in db
    """
    allUsers: [User!]!

    """
    getting all the tweets exist in db
    """
    allTweets: [Tweet!]! # similar to GET /api/v1/tweets from REST API # it always should be a list and the inside of the list always should be Tweet. empty can be allowed
    """
    getting a tweet with an id
    """
    tweet(id: ID!): Tweet # similar to GET /api/v1/tweet/:id from REST API url variable from REST ~= argument from gql
  }

  type Mutation { # POST, PUT, DELETE (REST API)
    """
    post a tweet if userId is valid else return error
    """
    postTweet(text: String!, userId: ID!): Tweet

    """
    delete a tweet if found, else return false
    """
    deleteTweet(id: ID!): Boolean!
  }
`;

const resolvers = {
  User: {
    fullName({ firstName, lastName }) {
      // opening the root argument and getting two infos
      return `${firstName} ${lastName}`;
    }
  },

  Tweet: {
    author({ userId }) {
      return users.find((user) => user.id === userId);
    }
  },

  // resolver for the fields
  Query: {
    allUsers() {
      return users;
    },

    allTweets() {
      return tweets;
    },

    tweet(_, { id }) {
      // root, args. {id} is opening up the args and getting id.
      // when the tweet field in Query is reduired, this function is called.
      return tweets.find((tweet) => tweet.id === id);
    }
  },

  Mutation: {
    postTweet(_, { text, userId }) {
      const user = users.find((user) => user.id === userId);
      if (!user) throw new Error(`User ID ${userId} is not found.`);
      
      const newTweet = {
        id: tweets.length + 1,
        text,
        userId
      };
      tweets.push(newTweet);
      return newTweet;
    },

    deleteTweet(_, { id }) {
      const tweet = tweets.find((tweet) => tweet.id === id);
      if (!tweet) return false;
      tweets = tweets.filter((tweet) => tweet.id !== id);
      return true;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
