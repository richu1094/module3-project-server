module.exports = app => {
    const projectsRoutes = require("./projects.routes");
    app.use("/api/projects", projectsRoutes);

    const usersRoutes = require("./users.routes");
    app.use("/api/users", usersRoutes);

    const categoryRoutes = require("./category.routes")
    app.use("/api/category", categoryRoutes);

    const planRoutes = require("./plan.routes")
    app.use("/api/plan", planRoutes);

    const authRoutes = require("./auth.routes");
    app.use("/api/auth", authRoutes);

    const uploadRoutes = require("./upload.routes");
    app.use("/api/upload", uploadRoutes);
}