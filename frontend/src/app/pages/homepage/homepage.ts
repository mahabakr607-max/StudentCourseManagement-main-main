import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import { AuthService } from '../../services/auth';
import { EnrollmentService } from '../../services/enrollment.service';

interface Course {
  _id?: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  image?: string;
}

@Component({
  selector: 'app-homepage',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Footer
  ],

  templateUrl: './homepage.html',
  styleUrl: './homepage.css'
})
export class Homepage implements OnInit {

  courses: Course[] = [];

  searchTerm: string = '';

  loading: boolean = false;

  selectedCourse: Course | null = null;

  showCourseModal: boolean = false;

  role: string = 'user';


  constructor(
    private authService: AuthService,
    private enrollmentService: EnrollmentService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.role = localStorage.getItem('role') || 'user';

    this.loadCourses();

  }


  isAdmin(): boolean {

    return this.role === 'admin';

  }


  loadCourses(): void {

    this.loading = true;

    this.http
      .get<any>('http://localhost:3000/courses')
      .subscribe({

        next: (response) => {

          console.log('Courses:', response);

          this.courses =
            response.courses || [];

          this.loading = false;

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Error loading courses:',
            error
          );

          this.courses = [];

          this.loading = false;

          this.cdr.detectChanges();

        }

      });

  }


  searchCourses(): void {

    const search =
      this.searchTerm.trim().toLowerCase();


    if (!search) {

      this.loadCourses();

      this.scrollToResults();

      return;

    }


    this.loading = true;


    this.http
      .get<any>('http://localhost:3000/courses')
      .subscribe({

        next: (response) => {

          const allCourses =
            response.courses || [];

          this.courses =
            allCourses.filter((course: Course) =>
              course.title
                .toLowerCase()
                .includes(search)
            );

          this.loading = false;

          this.cdr.detectChanges();

          this.scrollToResults();

        },

        error: (error) => {

          console.error(
            'Search error:',
            error
          );

          this.courses = [];

          this.loading = false;

          this.cdr.detectChanges();

          this.scrollToResults();

        }

      });

  }


  // بيودي اليوزر على طول لمكان نتيجة السيرش بدل ما يفضل
  // واقف فوق مش شايف حاجة اتغيرت
  scrollToResults(): void {

    setTimeout(() => {

      document
        .getElementById('coursesResults')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    });

  }


  goToCourses(): void {

    this.router.navigate(['/courses']);

  }


  viewCourse(course: Course): void {

    this.selectedCourse = course;

    this.showCourseModal = true;

  }


  closeCourseModal(): void {

    this.showCourseModal = false;

    this.selectedCourse = null;

  }


  // الزرار في المودال: الأدمن بيروح يعدل الكورس على طول،
  // واليوزر بيتسجل في الكورس ويتضاف في My Courses بتاعته
  handleModalAction(): void {

    if (!this.selectedCourse) {
      return;
    }

    if (this.isAdmin()) {

      const courseId = this.selectedCourse._id;

      this.closeCourseModal();

      this.router.navigate(
        ['/courses'],
        {
          queryParams: {
            edit: courseId
          }
        }
      );

      return;
    }

    const courseId = this.selectedCourse._id;

    if (!courseId) {

      alert('Course ID is missing.');

      return;
    }

    this.enrollmentService
      .enroll(courseId)
      .subscribe({

        next: (response) => {

          alert(
            response?.message ||
            'Enrolled successfully'
          );

          this.closeCourseModal();

        },

        error: (error) => {

          console.error(
            'Enrollment error:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to enroll in this course'
          );

        }

      });

  }


  goToProfile(): void {

    this.router.navigate(['/profile']);

  }


  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

  goToMyCourses(): void {
  this.router.navigate(['/my-courses']);
}
}