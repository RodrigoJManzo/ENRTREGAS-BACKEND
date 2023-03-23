import axios from 'axios';

// GraphQL schema

const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    lastname: String!
    email: String!
    age: Int!
    number: Int!
  }

  type Product {
    id: ID!
    title: String!
    description: String!
    code: String!
    thumbnail: String!
    price: Float!
    stock: Int!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    login(email: String!, password: String!): User!
    signup(
      name: String!
      lastname: String!
      email: String!
      age: Int!
      number: Int!
      password: String!
    ): User!
    createProduct(
      title: String!
      description: String!
      code: String!
      thumbnail: String!
      price: Float!
      stock: Int!
    ): Product!
    updateProduct(id: ID!, stock: Int!): Product!
  }
`;

// resolvers
const resolvers = {
  Query: {
    products: async () => {
      const { data } = await axios.get('https://localhost:8080/api/products');
      return data;
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const { data } = await axios.post('https://localhost:8080/api/auth', { email, password });
      return data;
    },
    signup: async (_, args) => {
      const { data } = await axios.post('https://localhost:8080/api/auth/signup', args);
      return data;
    },
    createProduct: async (_, args) => {
      const { data } = await axios.post('https://localhost:8080/api/products', args);
      return data;
    },
    updateProduct: async (_, { id, stock }) => {
      const { data } = await axios.put(`https://localhost:8080/api/products/${id}`, { stock });
      return data;
    },
  },
};

const graphQlScheema = { typeDefs , resolvers} 

export default graphQlScheema
