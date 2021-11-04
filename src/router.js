import Vue from "vue"
import Router from "vue-router"

Vue.use(Router)

export const STATIC_ROUTES = {
  home: "/",
  categories: "/categories",
  quiz: "/quiz/:category",
  results: "/results",
  viewResult: "/results/:id",
  ranking: "/ranking",
  login: "/login",
  register: "/register",
  logout: "/logout"
}

const routes = [
  {
    path: STATIC_ROUTES.home,
    name: "home",
    component: () => import("@/views/Home"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.categories,
    name: "categories",
    component: () => import("@/views/Categories"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.quiz,
    name: "quiz",
    component: () => import("@/views/Quiz"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.results,
    name: "results",
    component: () => import("@/views/Results"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.viewResult,
    name: "viewResult",
    component: () => import("@/views/ViewResult"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.ranking,
    name: "ranking",
    component: () => import("@/views/Ranking"),
    meta: { requiresAuth: true }
  },
  {
    path: STATIC_ROUTES.login,
    name: "login",
    component: () => import("@/views/Login"),
    meta: { requiresAuth: false }
  },
  {
    path: STATIC_ROUTES.register,
    name: "register",
    component: () => import("@/views/Register"),
    meta: { requiresAuth: false }
  },
  {
    path: STATIC_ROUTES.logout,
    name: "logout",
    component: () => import("@/views/Logout"),
    meta: { requiresAuth: true }
  }
]

const createRouter = () => {
  return new Router({
    base: "",
    mode: "history",
    scrollBehavior: () => ({ y: 0 }),
    routes
  })
}

const router = createRouter()

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("loggedUser")
  const isAuthenticatedRoute = to.matched.some(
    (record) => record.meta.requiresAuth
  )

  if (isAuthenticated && isAuthenticatedRoute) {
    next()
  } else if (!isAuthenticated && !isAuthenticatedRoute) {
    next()
  } else if (!isAuthenticated && isAuthenticatedRoute) {
    next({ name: "login" })
  }
})

export default router
