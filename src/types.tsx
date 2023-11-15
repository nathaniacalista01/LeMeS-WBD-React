export type Courses = {
    id: number;
    title: String;
    description: String;
    image_path: String;
    release_date: string;
}

export type Modules = {
    id: number;
    title: string;
    description: string;
    course_id: number;
  };

export type Materials = {
    id: number;
    title: string;
    description: string;
    source_type: string;
    material_path: string;
  };

export type users = {
    user_id: number;
    username: string;
    fullname: string;
    role: string;
  };