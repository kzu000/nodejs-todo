// Update with your config settings.

module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      database: "todo_app",
      user: "root",
      password: "K42u_z8o5",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  staging: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: "K42u_z8o5",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "mysql",
    connection: {
      database: "todo_app",
      user: "root",
      password: "K42u_z8o5",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
