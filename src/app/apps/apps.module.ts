import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

// shared module
import { SharedModule } from 'src/shared.module';

import { ScrumboardComponent } from '../pages/board/scrumboard';
import { ContactsComponent } from '../pages/friends/contacts';
import { NotesComponent } from '../pages/notes/notes';
import { TasksComponent } from '../pages/tasks/tasks';
import { InvoicePreviewComponent } from './invoice/preview';
import { InvoiceAddComponent } from './invoice/add';
import { InvoiceEditComponent } from './invoice/edit';
import { CalendarComponent } from './calendar';
import { ChatComponent } from './chat';
import { MailboxComponent } from './mailbox';
import { InvoiceListComponent } from './invoice/list';

const routes: Routes = [
    // { path: 'app/chat', component: ChatComponent, data: { title: 'Chat' } },
    // { path: 'app/mailbox', component: MailboxComponent, data: { title: 'Mailbox' } },
    // { path: 'app/scrumboard', component: ScrumboardComponent, data: { title: 'Scrumboard' } },
    // { path: 'app/contacts', component: ContactsComponent, data: { title: 'Contacts' } },
    // { path: 'app/notes', component: NotesComponent, data: { title: 'Notes' } },
    // { path: 'app/tasks', component: TasksComponent, data: { title: 'Tasks' } },
    // { path: 'app/invoice/list', component: InvoiceListComponent, data: { title: 'Invoice List' } },
    // { path: 'app/invoice/preview', component: InvoicePreviewComponent, data: { title: 'Invoice Preview' } },
    // { path: 'app/invoice/add', component: InvoiceAddComponent, data: { title: 'Invoice Add' } },
    // { path: 'app/invoice/edit', component: InvoiceEditComponent, data: { title: 'Invoice Edit' } },
    // { path: 'app/calendar', component: CalendarComponent, data: { title: 'Calendar' } }
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, SharedModule.forRoot()],
    declarations: [
        // ChatComponent,
        // ScrumboardComponent,
        // ContactsComponent,
        // NotesComponent,
        // TasksComponent,
        // InvoiceListComponent,
        // InvoicePreviewComponent,
        // InvoiceAddComponent,
        // InvoiceEditComponent,
        // CalendarComponent,
        // MailboxComponent,
    ],
})
export class AppsModule {}
