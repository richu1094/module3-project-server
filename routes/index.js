module.exports = app => {
    const projectsRoutes = require("./projects.routes.js");
    app.use("/api/projects", projectsRoutes);

    const usersRoutes = require("./users.routes.js");
    app.use("/api/users", usersRoutes);

    const authRoutes = require("./auth.routes.js");
    app.use("/api/auth", authRoutes);
}