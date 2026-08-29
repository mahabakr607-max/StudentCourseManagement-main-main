import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import {
  CourseService,
  Course
} from '../../services/course.service';

import {
  EnrollmentService
} from '../../services/enrollment.service';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-courses',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar
  ],

  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses implements OnInit {

  courses: Course[] = [];

  role: string = 'user';

  showForm = false;

  editMode = false;

  selectedCourseId = '';

  // لو جينا من صفحة تانية (زي الهوم بيدج) وعايزين نفتح فورم
  // التعديل لكورس معين على طول من غير ما اليوزر يدوس Update تاني
  private pendingEditId: string | null = null;


  course: Course = {

    title: '',
    description: '',
    instructor: '',
    price: 0,
    duration: '',
    image: ''

  };


  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {

    this.loadRole();

    // لو الرابط جاي بـ ?edit=<courseId> هنفتح فورم التعديل
    // بتاع الكورس ده على طول بعد ما الكورسات تحمل
    this.pendingEditId =
      this.route.snapshot.queryParamMap.get('edit');

    this.loadCourses();
  }


  loadRole(): void {

    const token =
      localStorage.getItem('token');

    if (!token) {

      this.role = 'user';

      return;
    }


    try {

      const payload =
        JSON.parse(
          atob(
            token
              .split('.')[1]
              .replace(/-/g, '+')
              .replace(/_/g, '/')
          )
        );

      this.role =
        payload.role || 'user';

    } catch {

      this.role = 'user';
    }
  }


  isAdmin(): boolean {

    return this.role === 'admin';
  }


  loadCourses(): void {

    this.courseService
      .getCourses()
      .subscribe({

        next: (response) => {

          console.log(
            'Courses API response:',
            response
          );

          this.courses =
            response?.courses || [];

          this.cdr.detectChanges();

          this.openPendingEditIfAny();
        },

        error: (error) => {

          console.error(
            'Error loading courses:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to load courses'
          );
        }

      });
  }


  // لو فيه كورس مطلوب تعديله جاي من صفحة تانية،
  // بندور عليه في اللستة ونفتح فورم التعديل بتاعه على طول
  private openPendingEditIfAny(): void {

    if (!this.pendingEditId) {
      return;
    }

    const targetCourse =
      this.courses.find(
        (course) => course._id === this.pendingEditId
      );

    this.pendingEditId = '';

    if (targetCourse) {
      this.openEditForm(targetCourse);
    }
  }


  openAddForm(): void {

    this.editMode = false;

    this.selectedCourseId = '';

    this.course = {

      title: '',
      description: '',
      instructor: '',
      price: 0,
      duration: '',
      image: ''

    };

    this.showForm = true;
  }


  openEditForm(course: Course): void {

    this.editMode = true;

    this.selectedCourseId =
      course._id || '';

    this.course = {
      ...course
    };

    this.showForm = true;

    this.cdr.detectChanges();

    this.scrollToForm();
  }


  // بيودي اليوزر على طول عند فورم التحديث بدل ما يفضل
  // يدور عليه لو هو تحت في الصفحة
  private scrollToForm(): void {

    setTimeout(() => {

      document
        .getElementById('courseFormSection')
        ?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

    });
  }


  saveCourse(): void {

    if (
      !this.course.title.trim() ||
      !this.course.description.trim() ||
      !this.course.instructor.trim() ||
      !this.course.duration.trim() ||
      this.course.price < 0
    ) {

      alert(
        'Please fill all fields correctly.'
      );

      return;
    }


    if (this.editMode) {

      if (!this.selectedCourseId) {

        alert(
          'Course ID is missing.'
        );

        return;
      }


      this.courseService
        .updateCourse(
          this.selectedCourseId,
          {
            title: this.course.title,
            description: this.course.description,
            instructor: this.course.instructor,
            price: Number(this.course.price),
            duration: this.course.duration,
            image: this.course.image || ''
          }
        )
        .subscribe({

          next: () => {

            alert(
              'Course updated successfully.'
            );

            this.closeForm();

            this.loadCourses();
          },

          error: (error) => {

            console.error(
              'Update course error:',
              error
            );

            alert(
              error.error?.message ||
              'Failed to update course'
            );
          }

        });

      return;
    }


    this.courseService
      .addCourse({

        title: this.course.title,

        description:
          this.course.description,

        instructor:
          this.course.instructor,

        price:
          Number(this.course.price),

        duration:
          this.course.duration,

        image:
          this.course.image || ''

      })
      .subscribe({

        next: (response) => {

          console.log(
            'Add course response:',
            response
          );

          alert(
            response?.message ||
            'Course added successfully.'
          );

          this.closeForm();

          this.loadCourses();
        },

        error: (error) => {

          console.error(
            'Add course error:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to add course'
          );
        }

      });
  }


  deleteCourse(
    id?: string
  ): void {

    if (!id) {

      alert(
        'Course ID is missing.'
      );

      return;
    }


    const confirmed =
      confirm(
        'Are you sure you want to delete this course?'
      );


    if (!confirmed) {
      return;
    }


    this.courseService
      .deleteCourse(id)
      .subscribe({

        next: () => {

          alert(
            'Course deleted successfully.'
          );

          this.loadCourses();
        },

        error: (error) => {

          console.error(
            'Delete course error:',
            error
          );

          alert(
            error.error?.message ||
            'Failed to delete course'
          );
        }

      });
  }


  addToMyCourses(
    course: Course
  ): void {

    if (!course._id) {

      alert(
        'Course ID is missing.'
      );

      return;
    }


    this.enrollmentService
      .enroll(course._id)
      .subscribe({

        next: (response) => {

          alert(
            response.message ||
            'Enrolled successfully'
          );
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


  closeForm(): void {

    this.showForm = false;

    this.editMode = false;

    this.selectedCourseId = '';

    this.course = {

      title: '',
      description: '',
      instructor: '',
      price: 0,
      duration: '',
      image: ''

    };
  }
}