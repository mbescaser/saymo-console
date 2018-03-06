import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
// import Signup from '@/components/Signup'
import Wrapper from '@/components/wrapper/Wrapper'
import Dashboard from '@/components/wrapper/dashboard/Dashboard'

import ChannelsWrapper from '@/components/wrapper/channels/Wrapper'
import ChannelsIndex from '@/components/wrapper/channels/Channels'
import RequestedPlaces from '@/components/wrapper/channels/RequestedPlaces'

import TopicsWrapper from '@/components/wrapper/topics/Wrapper'
import TopicsIndex from '@/components/wrapper/topics/Topics'
import TopicsFlagged from '@/components/wrapper/topics/Flagged'
import TopicsCreate from '@/components/wrapper/topics/Topic'

import MessagesWrapper from '@/components/wrapper/messages/Wrapper'
import MessagesFlagged from '@/components/wrapper/messages/Flagged'

const routes = [{
    path: '/',
    component: Wrapper,
    redirect: '/dashboard',
    children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    }, {
        path: 'channels',
        component: ChannelsWrapper,
        children: [{
            path: '',
            name: 'channels',
            component: ChannelsIndex,
            meta: { requiresAuth: true }
        }, {
            path: 'requested-places',
            name: 'channels.requested-places',
            component: RequestedPlaces,
            meta: { requiresAuth: true }
        }]
    }, {
        path: 'topics',
        component: TopicsWrapper,
        children: [{
            path: '',
            name: 'topics',
            component: TopicsIndex,
            meta: { requiresAuth: true }
        }, {
            path: 'flagged',
            name: 'topics.flagged',
            component: TopicsFlagged,
            meta: { requiresAuth: true }
        }, {
            path: 'create',
            name: 'topics.create',
            component: TopicsCreate,
            meta: { requiresAuth: true }
        }]
    }, {
        path: 'messages',
        component: MessagesWrapper,
        children: [{
            path: '',
            redirect: '/messages/flagged'
        }, {
            path: 'flagged',
            name: 'messages.flagged',
            component: MessagesFlagged,
            meta: { requiresAuth: true }
        }]
    }]
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/logout',
    name: 'logout',
    component: {
        template: '<div></div>',
        created() {
            this.$store.dispatch('set_user', null)
            this.$router.push('/login')
        }
    },
    meta: { requiresAuth: true }
}, {
    path: '*',
    redirect: '/login'
}]

export default routes
