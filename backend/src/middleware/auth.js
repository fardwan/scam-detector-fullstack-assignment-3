import jwt from "jsonwebtoken";

/**
 * 🔐 AUTH MIDDLEWARE (VERIFY JWT TOKEN)
 */
export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const parts = authHeader.split(" ");

        if (parts.length !== 2) {
            return res.status(401).json({
                message: "Invalid token format",
            });
        }

        const token = parts[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // { id, role }

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token",
        });
    }
};

/**
 * 👑 ADMIN ONLY MIDDLEWARE (optional future use)
 */
export const isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Admin access only",
            });
        }

        next();

    } catch (err) {
        return res.status(500).json({
            message: err.message,
        });
    }
};