import { Routes } from '@angular/router';

// dashboard
import { HomeComponent } from './pages/home/home';
import { IndexComponent } from './index';
import { AnalyticsComponent } from './analytics';
import { FinanceComponent } from './finance';
import { CryptoComponent } from './crypto';

// widgets
import { WidgetsComponent } from './widgets';

// tables
import { TablesComponent } from './tables';

// font-icons
import { FontIconsComponent } from './font-icons';

// charts
import { ChartsComponent } from './charts';

// dragndrop
import { DragndropComponent } from './dragndrop';

// layouts
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

// pages
import { KnowledgeBaseComponent } from './pages/knowledge-base';
import { FaqComponent } from './pages/faq';
import { AuthGuard } from '../app/auth/auth.guard'; 
import { BoxedSigninComponent } from './pages/signin/boxed-signin';
import { ComingSoonPageComponent } from './pages/coming-soon-page/coming-soon-page.component';
import { JobBoardComponent } from './pages/job-board/job-board.component';

export const routes: Routes = [
    // Auth Routes (Sign-In as default route)
    {
        path: 'auth',
        component: AuthLayout,
        children: [
            { path: '', component: BoxedSigninComponent, pathMatch: 'full' },
            { path: 'auth', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },

    // Protected Routes for App (with AuthGuard)
    {
        path: '',
        component: AppLayout,
        canActivate: [AuthGuard],
        children: [
            // dashboard
            { path: '', component: HomeComponent, data: { title: 'Home' } },
            { path: 'home', component: HomeComponent, data: { title: 'Home' } },
            { path: 'dashboard', component: IndexComponent, data: { title: 'Sales Admin' } },
            { path: 'analytics', component: AnalyticsComponent, data: { title: 'Analytics Admin' } },
            { path: 'finance', component: FinanceComponent, data: { title: 'Finance Admin' } },
            { path: 'crypto', component: CryptoComponent, data: { title: 'Crypto Admin' } },

            // widgets
            { path: 'widgets', component: WidgetsComponent, data: { title: 'Widgets' } },

            // font-icons
            { path: 'font-icons', component: FontIconsComponent, data: { title: 'Font Icons' } },

            // charts
            { path: 'charts', component: ChartsComponent, data: { title: 'Charts' } },

            // dragndrop
            { path: 'dragndrop', component: DragndropComponent, data: { title: 'Dragndrop' } },

            // pages
            { path: 'pages/knowledge-base', component: KnowledgeBaseComponent, data: { title: 'Knowledge Base' } },
            { path: 'pages/faq', component: FaqComponent, data: { title: 'FAQ' } },

            //apps
            // { path: '', loadChildren: () => import('./app/apps.module').then((d) => d.AppsModule) },

            // components
            { path: '', loadChildren: () => import('./components/components.module').then((d) => d.ComponentsModule) },

            // elements
            { path: '', loadChildren: () => import('./elements/elements.module').then((d) => d.ElementsModule) },

            // forms
            { path: '', loadChildren: () => import('./forms/form.module').then((d) => d.FormModule) },

            // users
            { path: '', loadChildren: () => import('./pages/profile/user.module').then((d) => d.UsersModule) },

            //coming-soon-page
            // { path: 'app/internships', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
            // { path: 'app/job-board', component: JobBoardComponent, data: { title: 'Coming Soon' } },
            // { path: 'app/project-showcase', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
            // { path: 'app/events', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
            // { path: 'app/alumni-connect', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
            // { path: 'app/ai-project-hub', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },

            // tables
            { path: 'tables', component: TablesComponent, data: { title: 'Tables' } },
            { path: '', loadChildren: () => import('./datatables/datatables.module').then((d) => d.DatatablesModule) },
            { path: '', loadChildren: () => import('./pages/pages.module').then((d) => d.PagesModule) }
        ],
    },

    {
        path: '',
        component: AuthLayout,
        children: [
            // pages
            

            // auth
            { path: '', loadChildren: () => import('./auth/auth.module').then((d) => d.AuthModule) },
        ],
    },

    // Catch-all route (Redirect to sign-in if route not found)
    { path: '**', component: BoxedSigninComponent }
];
