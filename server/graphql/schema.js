const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");

let users = require(`${__dirname}/model`);

function getArrays(url) {
  return axios.get(url).then(response => response.data);
}

const PersonType = new GraphQLObjectType({
  name: "Person",
  fields() {
    return {
      id: {
        type: GraphQLNonNull(GraphQLInt),
        resolve(person) {
          return person.id;
        }
      },
      name: {
        type: GraphQLNonNull(GraphQLString),
        resolve(person) {
          return person.name;
        }
      },
      height: {
        type: GraphQLNonNull(GraphQLInt),
        resolve(person) {
          return person.height;
        }
      },
      mass: {
        type: GraphQLInt,
        resolve(person) {
          return person.mass;
        }
      },
      homeWorld: {
        type: WorldType,
        resolve(person) {
          return axios.get(person.homeworld).then(response => response.data);
        }
      },
      films: {
        type: new GraphQLList(MovieType),
        resolve(person) {
          return person.films[0] ? person.films.map(getArrays) : [];
        }
      }
    };
  }
});

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields() {
    return {
      title: {
        type: GraphQLString,
        resolve(movie) {
          return movie.title;
        }
      },
      releaseDate: {
        type: GraphQLString,
        resolve(movie) {
          return movie.release_date;
        }
      }
    };
  }
});

const WorldType = new GraphQLObjectType({
  name: "World",
  fields() {
    return {
      name: {
        type: GraphQLString,
        resolve(world) {
          return world.name;
        }
      },
      terrain: {
        type: GraphQLString,
        resolve(world) {
          return world.terrain;
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields() {
    return {
      people: {
        type: new GraphQLNonNull(GraphQLList(GraphQLNonNull(PersonType))),
        resolve(root, args) {
          return users;
        }
      },
      person: {
        type: PersonType,
        args: {
          id: {
            type: GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, args) {
          return users.filter(user => user.id === args.id)[0];
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields() {
    return {
      deletePerson: {
        type: GraphQLInt,
        args: {
          id: { type: GraphQLNonNull(GraphQLInt) }
        },
        resolve(root, args) {
          users = users.filter(user => user.id !== args.id);
          return args.id;
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
