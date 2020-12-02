const routes = require('next-routes')()
    /*
   LPC ROUTES
   */
    .add({
        name: 'home',
        pattern: '/',
        page: 'lpc/home',
    })
    .add({
        name: 'connexion',
        pattern: '/connexion',
        page: 'lpc/authentication',
    })
    .add({
        name: 'terms',
        pattern: '/conditions-generales-utilisation',
        page: 'lpc/terms',
    })
    .add({
        name: 'odvp',
        pattern: '/on-double-votre-pot-2020',
        page: 'lpc/odvp',
    })
    /*
    DASHBOARD ROUTES
    */
    .add({
        name: 'dashboard-home',
        pattern: '/dashboard',
        page: 'dashboard/home-page',
    })
    .add({
        name: 'dashboard-connexion',
        pattern: '/dashboard/connexion',
        page: 'dashboard/sign-in-page',
    })
    .add({
        name: 'dashboard-workspace',
        pattern: '/dashboard/workspace',
        page: 'dashboard/workspace-page',
    })
    .add({
        name: 'dashboard-parnters',
        pattern: '/dashboard/partners',
        page: 'dashboard/partners-page',
    });

module.exports = routes;
