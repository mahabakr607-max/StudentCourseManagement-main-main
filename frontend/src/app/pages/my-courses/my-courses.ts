import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService, Course } from '../../services/course.service';
import { Navbar } from '../navbar/navbar';

interface MyCourseItem {
  enrollmentId: string;
  _id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  image?: string;
}

@Component({
  selector: 'app-my-courses',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Navbar
  ],
  templateUrl: './my-courses.html',
  styleUrl: './my-courses.css'
})
export class MyCoursesComponent implements OnInit {

  role: string = 'user';

  // شاشة اليوزر (الكورسات اللي عامل عليها enrollment)
  items: MyCourseItem[] = [];

  // شاشة الأدمن (الكورسات اللي الأدمن ضايفها في المنصة)
  adminCourses: Course[] = [];

  loading = false;
  errorMsg = '';

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.role = localStorage.getItem('role') || 'user';

    if (this.isAdmin()) {
      this.getAdminCourses();
    } else {
      this.getMyCourses();
    }
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  // ================= ADMIN =================

  getAdminCourses(): void {

    this.loading = true;
    this.errorMsg = '';

    this.courseService.getCourses().subscribe({

      next: (res) => {

        console.log('ADMIN MY-COURSES RESPONSE:', res);

        this.adminCourses = res.courses || [];

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('ADMIN MY-COURSES ERROR:', err);

        this.errorMsg =
          err.error?.message ||
          'Failed to load your courses';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }

  deleteCourse(id?: string): void {

    if (!id) {
      return;
    }

    const confirmed = confirm(
      'Are you sure you want to delete this course?'
    );

    if (!confirmed) {
      return;
    }

    this.courseService.deleteCourse(id).subscribe({

      next: () => {

        this.adminCourses =
          this.adminCourses.filter(
            (course) => course._id !== id
          );

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('DELETE COURSE ERROR:', err);

        alert(
          err.error?.message ||
          'Failed to delete course'
        );
      }

    });
  }

  // ================= STUDENT =================

  getMyCourses(): void {

    this.loading = true;

    this.errorMsg = '';

    this.enrollmentService.getMyCourses().subscribe({

      next: (res) => {

        console.log('MY COURSES RESPONSE:', res);

        this.items = (res.courses || [])
          .filter((enrollment) => !!enrollment.course)
          .map((enrollment) => ({
            enrollmentId: enrollment.enrollmentId,
            _id: enrollment.course._id,
            title: enrollment.course.title,
            description: enrollment.course.description,
            instructor: enrollment.course.instructor,
            price: enrollment.course.price,
            duration: enrollment.course.duration,
            image: enrollment.course.image || ''
          }));

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error('MY COURSES ERROR:', err);

        this.errorMsg =
          err.error?.message ||
          'Failed to load my courses';

        this.loading = false;

        this.cdr.detectChanges();
      }

    });
  }
}