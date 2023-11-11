import React from 'react';

const courseCardStyle: React.CSSProperties = {
  width: '300px',
  padding: '16px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  margin: '16px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const titleStyle: React.CSSProperties = {
  fontSize: '1.2em',
  fontWeight: 'bold',
  marginBottom: '8px',
};

const instructorStyle: React.CSSProperties = {
  fontSize: '0.9em',
  color: '#555',
};

const detailStyle: React.CSSProperties = {
  marginTop: '8px',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '12px',
  padding: '8px 12px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const CourseCard: React.FC<{ title: string; instructor: string; details: string }> = ({ title, instructor, details }) => {
  const handleGoToCourse = () => {
    // Handle navigation to the course page
    console.log('Navigating to the course:', title);
  };

  return (
    <div style={courseCardStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={instructorStyle}>{instructor}</div>
      <div style={detailStyle}>{details}</div>
      <button style={buttonStyle} onClick={handleGoToCourse}>
        Go to Course
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <CourseCard
        title="Introduction to React"
        instructor="John Doe"
        details="Learn the basics of React and build your first web application."
      />
      <CourseCard
        title="Advanced TypeScript"
        instructor="Jane Smith"
        details="Deepen your TypeScript knowledge with advanced concepts and best practices."
      />
      {/* Add more CourseCard components with different data */}
    </div>
  );
};

export default App;
