
import ReportRecovery from './components/ReportRecovery.vue'
import HelloWorld from './components/HelloWorld.vue'




    const routes =  [
        {
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/report',
            name: 'ReportRecovery',
            component: ReportRecovery
        }
    ]

    export default routes;
