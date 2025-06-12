import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { co } from '@fullcalendar/core/internal-common';
import { Store } from '@ngrx/store';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { Project } from 'src/app/models/ObjectModels/project.model';
import { ProjectService } from 'src/app/service/project.service';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';
import { toggleAnimation } from 'src/app/shared/animations';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './home.html',
    animations: [toggleAnimation],
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
    @ViewChild('modal20') modal20!: NgxCustomModalComponent;

    store: any;
    revenueChart: any;
    salesByCategory: any;
    dailySales: any;
    totalOrders: any;
    isLoading = true;
    form: FormGroup = this.formBuilder.group({
        firstName: '',
        lastName: '',
        address: '',
        country: '',
        phone: '',
        email: '',
        allowEmailReminders: false,
    });
    userId: number = Number(localStorage.getItem('userId'));
    isProfileCompleted?: boolean = false;
    dropdownPosition: 'down' | 'up' = 'down';
    imagePreview: string | null = null;
    selectedFile: File | null = null;
    profilePicture: string = "./assets/images/no-profiepic.png"; // Default image path
    inProgressTasks: number = 0;
    completedTasks: number = 0;
    tasksDoneByOthers: number = 0;
    activities: any[] = [];
    projects: Project[] = [];
    projectsLoading: boolean = false;

    constructor(
        public storeData: Store<any>,
        private formBuilder: FormBuilder,
        private userService: UserService,
        private taskService: TaskService,
        private projectService: ProjectService,
        private router: Router
    ) {
        this.initStore();
        this.loadUserDetails();
        this.loadTaskStatistics();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.projectsLoading = true;
        this.loadProjects();
    }

    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                const hasChangeTheme = this.store?.theme !== d?.theme;
                const hasChangeLayout = this.store?.layout !== d?.layout;
                const hasChangeMenu = this.store?.menu !== d?.menu;
                const hasChangeSidebar = this.store?.sidebar !== d?.sidebar;

                this.store = d;

                if (hasChangeTheme || hasChangeLayout || hasChangeMenu || hasChangeSidebar) {
                    if (this.isLoading || hasChangeTheme) {
                        this.initCharts(); //init charts
                    } else {
                        setTimeout(() => {
                            this.initCharts(); // refresh charts
                        }, 300);
                    }
                }
            });
    }

    initCharts() {
        const isDark = this.store.theme === 'dark' || this.store.isDarkMode ? true : false;
        const isRtl = this.store.rtlClass === 'rtl' ? true : false;

        // revenue
        this.revenueChart = {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1b55e2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#e7515a',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191e3a' : '#e0e6ed',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: true,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
            series: [
                {
                    name: 'Income',
                    data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
                },
                {
                    name: 'Expenses',
                    data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
                },
            ],
        };

        // sales by category
        this.salesByCategory = {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Apparel', 'Sports', 'Others'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
            series: [985, 737, 270],
        };

        // daily sales
        this.dailySales = {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
            series: [
                {
                    name: 'Sales',
                    data: [44, 55, 41, 67, 22, 43, 21],
                },
                {
                    name: 'Last Week',
                    data: [13, 23, 20, 8, 13, 27, 33],
                },
            ],
        };

        // total orders
        this.totalOrders = {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
            series: [
                {
                    name: 'Sales',
                    data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
                },
            ],
        };
    }

    loadTaskStatistics() {
        this.taskService.getTaskStatistics().subscribe(
            response => {
                if (response.isSuccess) {
                    if (response.data) {
                        this.inProgressTasks = response.data.inProgress || 0;
                        this.completedTasks = response.data.done || 0;
                        this.tasksDoneByOthers = response.data.doneByOtherTeamMembers || 0;
                    }
                } else {
                    console.error('Error loading task statistics:', response.message);
                }
            },
            error => {
                console.error('Error loading task statistics:', error);
            }
        );
    }


    submit(): void {
        if (this.form.valid) {
            const formData = new FormData();
            formData.append('id', this.userId.toString());
            formData.append('firstName', this.form.value.firstName);
            formData.append('lastName', this.form.value.lastName);
            formData.append('email', this.form.value.email);
            formData.append('address', this.form.value.address || '');
            formData.append('country', this.form.value.country || '');
            formData.append('phone', this.form.value.phone || '');
            formData.append('allowEmailReminders', this.form.value.allowEmailReminders.toString());
            if (this.selectedFile) {
                formData.append('profileImage', this.selectedFile, this.selectedFile.name);
            }

            this.userService.updateUserDetailsWithProfilePicture(formData).subscribe(
                (response: any) => {
                    if (response.isSuccess) {
                        Swal.fire({
                            title: 'Saved successfully',
                            padding: '2em',
                            customClass: {
                                popup: 'sweet-alerts',
                            }
                        }).then(() => {
                            this.userService.setProfileCompletedToTrue(this.userId).subscribe(
                                (response: any) => {
                                    if (response.result) {
                                        console.log('Profile completed');
                                    }
                                }
                            );
                            this.modal20.close();
                        });
                    } else {
                        const toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                        });
                        toast.fire({
                            icon: 'error',
                            title: 'Error while saving',
                            padding: '10px 20px',
                        });
                    }
                },
                (error) => {
                    console.error('Error updating profile:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update profile.',
                    });
                }
            );
        }
    }

    loadUserDetails(): void {
        this.userService.getUserById(this.userId).subscribe(
            response => {
                if (response.isSuccess) {
                    this.form.patchValue({
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        address: response.data.address,
                        country: response.data.country,
                        phone: response.data.phone,
                        allowEmailReminders: response.data.allowEmailReminders,
                    });
                    this.isProfileCompleted = response.data.profileCompleted;
                    this.profilePicture = response.data.profileImageUrl;
                    this.isLoading = false;
                    if (!this.isProfileCompleted) {
                        setTimeout(() => {
                            this.modal20.open();
                        }, 1000);
                    }
                }
            }
        );
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(this.selectedFile);
        }
    }

    loadProjects() {
        this.projectService.getProjects().subscribe({
            next: (response) => {
                if (response.isSuccess) {
                    this.projects = response.data.map((project: Project) => ({
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        status: project.status,
                        role: project.role,
                        imageUrl: project.imageUrl || '/assets/images/no-image-placeholder.png',
                        teamMembers: project.collaborators?.length, // Placeholder for now
                        startDate: project.startDate,
                        endDate: project.endDate,
                        collaborators: project.collaborators
                    }));
                    this.projectsLoading = false;
                }
            },
            error: (error) => {
                console.error('Error loading projects:', error);
                alert('Failed to load projects.');
                this.projectsLoading = false;
            },
        });
    }

    viewProject(project: any) {
        console.log("Viewing project:", project);
        this.router.navigate(['/app/project/', project.id, project.name]);
    }
    
    onProfileImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = '/assets/images/no-profilepic.png';
    }
}