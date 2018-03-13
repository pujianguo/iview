import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/pages/Login'
import Logout from '@/views/pages/Logout'
import NotFound from '@/views/pages/NotFound'
import Page1 from '@/views/pages/Page1'

import Full from '@/views/framework/Full'
import Home from '@/components/home/Home'

import Form from '@/components/form/Form'
import BaseForm from '@/components/form/BaseForm'
import Edit from '@/components/form/Edit'
import MarkDown from '@/components/form/MarkDown'
import MarkDownShow from '@/components/form/MarkDownShow'
import CodeMirror from '@/components/form/CodeMirror'
import Upload from '@/components/form/Upload'

import Table from '@/components/table/Table'
import BaseTable from '@/components/table/BaseTable'

import Other from '@/components/other/Other'
import Event from '@/components/other/Event'
import Async from '@/components/other/Async'
import Network from '@/components/other/Network'
import TransitionCss from '@/components/other/TransitionCss'
import TransitionJs from '@/components/other/TransitionJs'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/',
      component: Full,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },

        // form
        {
          path: 'form',
          component: Form,
          children: [
            {
              path: 'baseform',
              name: 'baseform',
              component: BaseForm
            },
            {
              path: 'eidt',
              name: 'edit',
              component: Edit
            },
            {
              path: 'markdownshow',
              name: 'markdownshow',
              component: MarkDownShow
            },
            {
              path: 'markdown',
              name: 'markdown',
              component: MarkDown
            },
            {
              path: 'codemirror',
              name: 'codemirror',
              component: CodeMirror
            },
            {
              path: 'upload',
              name: 'upload',
              component: Upload
            }
          ]
        },

        // table
        {
          path: 'table',
          component: Table,
          children: [
            {
              path: 'basetable',
              name: 'basetable',
              component: BaseTable
            }
          ]
        },

        // other
        {
          path: 'other',
          component: Other,
          children: [
            {
              path: 'event',
              name: 'event',
              component: Event
            },
            {
              path: 'async',
              name: 'async',
              component: Async
            },
            {
              path: 'network',
              name: 'network',
              component: Network
            },
            {
              path: 'transitioncss',
              name: 'transitioncss',
              component: TransitionCss
            },
            {
              path: 'transitionjs',
              name: 'transitionjs',
              component: TransitionJs
            }
          ]
        },

        // // audit
        // {
        //   path: 'audit',
        //   component: Audit,
        //   children: [
        //     {
        //       path: '',
        //       name: 'audit_list',
        //       component: AuditList
        //     }, {
        //       path: 'add',
        //       name: 'audit_add',
        //       component: AuditEdit
        //     }, {
        //       path: 'edit/:id',
        //       name: 'audit_edit',
        //       component: AuditEdit
        //     }, {
        //       path: ':id',
        //       name: 'audit_detail',
        //       component: AuditDetail
        //     }
        //   ]
        // },

        // not find
        {
          path: '*',
          component: NotFound
        }
      ]
    }
  ]
})
