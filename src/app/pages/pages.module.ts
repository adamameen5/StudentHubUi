import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Shared Module
import { SharedModule } from 'src/shared.module';

// Components
import { ContactUsBoxedComponent } from './contact-us-boxed';
import { ContactUsCoverComponent } from './contact-us-cover';
import { ComingSoonBoxedComponent } from './coming-soon-boxed';
import { ComingSoonCoverComponent } from './coming-soon-cover';
import { Error404Component } from './error404';
import { Error500Component } from './error500';
import { Error503Component } from './error503';
import { MaintenenceComponent } from './maintenence';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { JobBoardComponent } from './job-board/job-board.component';
import { JobCardComponent } from './job-board/job-card/job-card.component';
import { HomeComponent } from './home/home';
import { AlumniCardComponent } from './alumni-connect/alumni-card/alumni-card.component';
import { AlumniConnectComponent } from './alumni-connect/alumni-connect.component';
import { InternshipComponent } from './internship/internship.component';
import { InternshipCardComponent } from './internship/internship-card/internship-card.component';
import { SkillDevelopmentComponent } from './skill-development/skill-development.component';
import { SkillDevelopmentCardComponent } from './skill-development/skill-development-card/skill-development-card.component';
import { ProjectShowcaseComponent } from './project-showcase/project-showcase.component';
import { ProjectShowcaseCardComponent } from './project-showcase/project-showcase-card/project-showcase-card.component';
import { CourseEngagementComponent } from './course-engagement/course-engagement.component';
import { CourseEngagementSubjectCardComponent } from './course-engagement/course-engagement-subject-card/course-engagement-subject-card.component';
import { LecturerCardComponent } from './lecturer-list/lecturer-card/lecturer-card.component';
import { LecturerDetailsComponent } from './lecturer-details/lecturer-details.component';
import { LecturerListComponent } from './lecturer-list/lecturer-list.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ChatComponent } from '../apps/chat';
import { ScrumboardComponent } from './board/scrumboard';
import { ContactsComponent } from './friends/contacts';
import { NotesComponent } from './notes/notes';
import { TasksComponent } from './tasks/tasks';
import { InvoiceListComponent } from '../apps/invoice/list';
import { InvoicePreviewComponent } from '../apps/invoice/preview';
import { InvoiceAddComponent } from '../apps/invoice/add';
import { InvoiceEditComponent } from '../apps/invoice/edit';
import { CalendarComponent } from '../apps/calendar';
import { MailboxComponent } from '../apps/mailbox';

// Array for all components
const components = [
    ContactUsBoxedComponent,
    ContactUsCoverComponent,
    ComingSoonBoxedComponent,
    ComingSoonCoverComponent,
    Error404Component,
    Error500Component,
    Error503Component,
    MaintenenceComponent,
    ComingSoonPageComponent,
    JobBoardComponent,
    JobCardComponent,
    AlumniConnectComponent,
    AlumniCardComponent,
    InternshipComponent,
    InternshipCardComponent,
    SkillDevelopmentComponent,
    SkillDevelopmentCardComponent,
    ProjectShowcaseComponent,
    ProjectShowcaseCardComponent,
    CourseEngagementComponent,
    CourseEngagementSubjectCardComponent,
    LecturerListComponent,
    LecturerDetailsComponent,
    LecturerCardComponent,
    ProjectsComponent,
    ProjectDetailsComponent,
    ChatComponent,
    ScrumboardComponent,
    ContactsComponent,
    NotesComponent,
    TasksComponent,
    InvoiceListComponent,
    InvoicePreviewComponent,
    InvoiceAddComponent,
    InvoiceEditComponent,
    CalendarComponent,
    MailboxComponent,
];

const routes: Routes = [
    { path: 'pages/contact-us-boxed', component: ContactUsBoxedComponent, data: { title: 'Contact Us Boxed' } },
    { path: 'pages/contact-us-cover', component: ContactUsCoverComponent, data: { title: 'Contact Us Cover' } },
    { path: 'pages/coming-soon-boxed', component: ComingSoonBoxedComponent, data: { title: 'Coming Soon Boxed' } },
    { path: 'pages/coming-soon-cover', component: ComingSoonCoverComponent, data: { title: 'Coming Soon Cover' } },
    { path: 'pages/error404', component: Error404Component, data: { title: 'Error 404' } },
    { path: 'pages/error500', component: Error500Component, data: { title: 'Error 500' } },
    { path: 'pages/error503', component: Error503Component, data: { title: 'Error 503' } },
    { path: 'pages/maintenence', component: MaintenenceComponent, data: { title: 'Maintenence' } },

    // StudentHub Main Pages
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'app/chat', component: ChatComponent, data: { title: 'Chat' } },
    { path: 'app/mailbox', component: MailboxComponent, data: { title: 'Mailbox' } },
    { path: 'app/scrumboard', component: ScrumboardComponent, data: { title: 'Scrumboard' } },
    { path: 'app/contacts', component: ContactsComponent, data: { title: 'Contacts' } },
    { path: 'app/notes', component: NotesComponent, data: { title: 'Notes' } },
    { path: 'app/tasks', component: TasksComponent, data: { title: 'Tasks' } },
    { path: 'app/invoice/list', component: InvoiceListComponent, data: { title: 'Invoice List' } },
    { path: 'app/invoice/preview', component: InvoicePreviewComponent, data: { title: 'Invoice Preview' } },
    { path: 'app/invoice/add', component: InvoiceAddComponent, data: { title: 'Invoice Add' } },
    { path: 'app/invoice/edit', component: InvoiceEditComponent, data: { title: 'Invoice Edit' } },
    { path: 'app/calendar', component: CalendarComponent, data: { title: 'Calendar' } },    
    { path: 'app/internships', component: InternshipComponent, data: { title: 'Coming Soon' } },
    { path: 'app/job-board', component: JobBoardComponent, data: { title: 'Job Board' } },
    { path: 'app/project-showcase', component: ProjectShowcaseComponent, data: { title: 'Coming Soon' } },
    { path: 'app/events', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
    { path: 'app/alumni-connect', component: AlumniConnectComponent, data: { title: 'Alumni Connect' } },
    { path: 'app/ai-project-hub', component: ComingSoonPageComponent, data: { title: 'Coming Soon' } },
    { path: 'app/skills-development-and-certifications', component: SkillDevelopmentComponent, data: { title: 'Skills Development and Certification' } },
    { path: 'app/course-engagement', component: CourseEngagementComponent, data: { title: 'Course Engagement' } },
    { path: 'app/projects', component: ProjectsComponent, data: { title: 'Projects' } },
    { path: 'app/lecturer/:subjectId/:subjectName', component: LecturerListComponent }, // Use route params to get lecturer details
    { path: 'app/project/:projectId/:projectName', component: ProjectDetailsComponent }, // Use route params to get lecturer details
    { path: '', redirectTo: '/subjects', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        SharedModule.forRoot()
    ],
    declarations: [
        ...components // Spread operator to include all components from the array
    ],
})
export class PagesModule { }
