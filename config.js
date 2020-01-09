var config = {
development: {
    //url to be used in link generation
    url: 'https://horine.dev',
    //database connection settings
    database: {
      host: "pma.horine.dev",
      user: "user",
      password: "****",
      database: "recipes"
    },
    //server details
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
},
production: {
    //url to be used in link generation
    url: 'https:horine.dev',
    //mongodb connection settings
    database: {
      host: "horine.dev",
      user: "app",
      password: "****",
      database: "recipes"
    },
    //server details
    server: {
        host:   '127.0.0.1',
        port:   '3002'
    }
}
};
module.exports = config;
