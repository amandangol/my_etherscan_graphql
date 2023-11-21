// Import Apollo Server and schema import utility
const { ApolloServer } = require("apollo-server"); 
const { importSchema } = require("graphql-import");

// Import custom data source 
const EtherDataSource = require("./datasource/ethDatasource");

// Import GraphQL schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables
require("dotenv").config();

// Create resolver map
const resolvers = {
 Query: {
   // Resolver for etherBalanceByAddress query
   etherBalanceByAddress: (root, _args, { dataSources }) =>  
     dataSources.ethDataSource.etherBalanceByAddress(),

   // Resolver for totalSupplyOfEther query   
   totalSupplyOfEther: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.totalSupplyOfEther(),

   // Resolver for latestEthereumPrice query
   latestEthereumPrice: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getLatestEthereumPrice(),

   // Resolver for blockConfirmationTime query
   blockConfirmationTime: (root, _args, { dataSources }) =>
     dataSources.ethDataSource.getBlockConfirmationTime(),
 },
};

// Create ApolloServer instance
const server = new ApolloServer({
 typeDefs,
 resolvers,
 
 // Pass EtherDataSource instance to dataSources
 dataSources: () => ({
   ethDataSource: new EtherDataSource(), 
 }),
}); 

// Disable request timeout
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
 console.log(`🚀 Server ready at ${url}`); 
});

