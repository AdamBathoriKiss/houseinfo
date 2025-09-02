import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route('main', 'routes/main.tsx')] satisfies RouteConfig;
