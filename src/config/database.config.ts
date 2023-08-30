export default () => ({
  database: {
    development: {
      host: process.env.DATABASE_HOST_DEV,
      port: parseInt(process.env.DATABASE_PORT_DEV, 10) || 5432,
      name: process.env.DATABASE_NAME_DEV,
      user: process.env.DATABASE_USER_DEV,
      password: process.env.DATABASE_PASSWORD_DEV,
    },
  },
});
