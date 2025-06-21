import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  projects = [
    {
      name: 'MenewConnect — Restaurant POS & Admin Portal',
      link: 'https://hub-staging.menew.in/?rid=5fce26e7e1d68a177425b007',
      description:
        'Built a comprehensive restaurant management system for order processing, billing, and admin control.',
      techStack: [
        'Angular',
        'Node.js',
        'Express.js',
        'JavaScript',
        'HTML5 + CSS3',
        'MongoDB',
      ],
      features: [
        {
          title: 'QR-Based Ordering',
          icon: '📱',
          description:
            'Customers scan QR to place orders directly from their phones.',
        },
        {
          title: 'POS for Restaurant',
          icon: '🧾',
          description:
            'Real-time billing, kitchen order tickets, and payment processing.',
        },
        {
          title: 'Admin Portal',
          icon: '🛠️',
          description:
            'Dashboard with analytics, menu control, and role-based access.',
        },
      ],
    },
    {
      name: 'Automatic Certificate Generator Software',
      description:
        'A Python-based tool that automates personalized certificate creation using the PIL library and SQL database integration.',
      techStack: ['Python', 'PIL', 'SQL', 'SQLite'],
      features: [
        {
          title: 'Dynamic Text Overlay',
          icon: '🖼️',
          description:
            'Uses PIL to position participant details on certificate templates with customizable fonts and styles.',
        },
        {
          title: 'Bulk Certificate Generation',
          icon: '📦',
          description:
            'Processes batches of participant data for fast, automated certificate creation.',
        },
        {
          title: 'Database Management',
          icon: '💾',
          description:
            'Stores and retrieves participant details using SQL to ensure data integrity and prevent duplicates.',
        },
      ],
    },
    {
      name: 'E web — E-Commerce Website',
      link: 'https://transcendent-klepon-0a22e6.netlify.app/',
      description:
        'A fully functional E-Commerce website built using the MERN stack. The platform supports cart management, user authentication, and admin features with a modern and responsive UI.',
      techStack: [
        'React.js',
        'HTML5',
        'CSS3',
        'Redux',
        'Node.js',
        'Express.js',
        'MongoDB',
      ],
      features: [
        {
          title: 'User Authentication',
          icon: '🔐',
          description:
            'Secure login and registration with password hashing and session handling.',
        },
        {
          title: 'Cart Functionality',
          icon: '🛒',
          description:
            'Add, remove, and manage products in cart using Redux state management.',
        },
        {
          title: 'Responsive UI',
          icon: '📱',
          description:
            'Attractive and mobile-friendly interface designed using modern HTML/CSS.',
        },
        // {
        //   title: 'Admin Dashboard',
        //   icon: '🧑‍💼',
        //   description:
        //     'Manage products, orders, and users with proper MVC structure in backend.',
        // },
      ],
    },
  ];
}
